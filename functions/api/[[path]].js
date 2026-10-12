// API del Cimitero di Giuleppe — Cloudflare Pages Functions + D1
//
// Pubblico:   GET  /api/lapidi            elenco delle lapidi
//             GET  /api/foto/:id          foto di una lapide
// Admin:      POST /api/login             controlla la password
//             POST /api/lapidi            nuova lapide
//             PUT  /api/lapidi/:id        modifica
//             DELETE /api/lapidi/:id      elimina
//             PUT  /api/ordine            nuovo ordine { ids: [...] }
//             PUT  /api/foto/:id?pixel=1  carica foto (corpo = immagine)
//             DELETE /api/foto/:id        toglie la foto
//             POST /api/fiori/:id         posa un fiore (pubblico, uno al giorno per persona)
//             GET  /api/vecchietta        racconto programmato per oggi (pubblico)
//             GET  /api/vecchietta/programmati   racconti programmati da oggi in poi
//             PUT  /api/vecchietta/:data  programma un racconto { testo }
//             DELETE /api/vecchietta/:data
//
// Binding richiesti: DB (database D1) e variabile ADMIN_PASSWORD
// (una o più password separate da virgola).

const SEED = [
  { id: 'esse', nome: 'E S S E', tipo: 'suicidato', genere: 'm', entrata: '', uscita: '2026-08-30',
    motivo: "Si è tolto la vita alle 17:23 di un pomeriggio di fine agosto. Aveva così tanti spazi nel nome che alla fine se n'è preso uno anche dal gruppo." },
  { id: 'mastino', nome: 'Mastino', tipo: 'impiccato', genere: 'm', entrata: '', uscita: '2026-09-21',
    motivo: 'Impiccato per aver abbaiato nei vocali a qualsiasi ora del giorno e della notte. Prima vittima della Notte delle Forche: alle 21:59 era già appeso.' },
  { id: 'numero-sconosciuto', nome: 'Numero Sconosciuto', tipo: 'impiccato', genere: 'm', entrata: '', uscita: '2026-09-21',
    motivo: 'Impiccato alle 22:00 in punto perché in tutti questi anni nessuno ha mai salvato il suo numero. Al funerale nessuno sapeva chi fosse. Nemmeno il prete.' },
  { id: 'thomas', nome: 'Thomas', tipo: 'impiccato', genere: 'm', entrata: '', uscita: '2026-09-21',
    motivo: 'Impiccato per aver risposto "ahah" a un messaggio serio. Il boia ha dovuto aspettare quattro minuti perché Thomas stava ancora scrivendo.' },
  { id: 'ciubetta', nome: 'Ciubetta', tipo: 'suicidato', genere: 'f', entrata: '', uscita: '2026-09-21',
    motivo: 'Dopo la strage delle 22 non ha retto il lutto. Alle 23:23 ha espresso un desiderio, ha premuto "Esci dal gruppo" e il desiderio si è avverato.' },
  { id: 'migliore-amica', nome: 'Migliore Amica♡', tipo: 'suicidato', genere: 'f', entrata: '', uscita: '2026-10-09',
    motivo: "Si faceva chiamare Migliore Amica. Alle 22:55 di un venerdì sera ha scelto la libertà, senza nemmeno un vocale d'addio. Visualizzato e uscito." },
];

const MAX_FOTO = 1_500_000; // byte
const MAX_RACCONTO = 700; // caratteri

const oggiRoma = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

async function impronta(testo) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(testo));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
const TIPI_FOTO = ['image/jpeg', 'image/png', 'image/webp'];

class Errore extends Error {
  constructor(status, msg) { super(msg); this.status = status; }
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

let pronto = null;
async function prepara(db) {
  if (!pronto) {
    pronto = (async () => {
      await db.batch([
        db.prepare(`CREATE TABLE IF NOT EXISTS lapidi (
          id TEXT PRIMARY KEY, nome TEXT NOT NULL, tipo TEXT NOT NULL, genere TEXT NOT NULL DEFAULT 'm',
          entrata TEXT NOT NULL DEFAULT '', uscita TEXT NOT NULL DEFAULT '', motivo TEXT NOT NULL DEFAULT '',
          ordine INTEGER NOT NULL DEFAULT 0, foto BLOB, foto_tipo TEXT, foto_v INTEGER NOT NULL DEFAULT 0,
          foto_pixel INTEGER NOT NULL DEFAULT 0, fiori INTEGER NOT NULL DEFAULT 0,
          creata TEXT NOT NULL DEFAULT (datetime('now')))`),
        db.prepare('CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT)'),
      ]);
      // aggiornamento v2: fiori e racconti della vecchietta
      const schema = await db.prepare("SELECT v FROM meta WHERE k = 'schema'").first();
      if (!schema || Number(schema.v) < 2) {
        try {
          await db.prepare('ALTER TABLE lapidi ADD COLUMN fiori INTEGER NOT NULL DEFAULT 0').run();
        } catch (e) {
          if (!/duplicate column/i.test(String(e && e.message))) throw e;
        }
        await db.batch([
          db.prepare(`CREATE TABLE IF NOT EXISTS fiori_log (lapide TEXT NOT NULL, chiave TEXT NOT NULL, giorno TEXT NOT NULL,
            PRIMARY KEY (lapide, chiave, giorno))`),
          db.prepare('CREATE TABLE IF NOT EXISTS racconti (data TEXT PRIMARY KEY, testo TEXT NOT NULL)'),
          db.prepare("INSERT OR REPLACE INTO meta (k, v) VALUES ('schema', '2')"),
        ]);
      }
      const seminato = await db.prepare("SELECT v FROM meta WHERE k = 'seminato'").first();
      if (!seminato) {
        const ins = db.prepare(
          'INSERT OR IGNORE INTO lapidi (id, nome, tipo, genere, entrata, uscita, motivo, ordine) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        await db.batch([
          ...SEED.map((l, i) => ins.bind(l.id, l.nome, l.tipo, l.genere, l.entrata, l.uscita, l.motivo, i)),
          db.prepare("INSERT OR REPLACE INTO meta (k, v) VALUES ('seminato', '1')"),
        ]);
      }
    })().catch((e) => { pronto = null; throw e; });
  }
  return pronto;
}

async function autorizza(request, env) {
  const elenco = String(env.ADMIN_PASSWORD || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!elenco.length) throw new Errore(500, 'Password admin non configurata: aggiungi la variabile ADMIN_PASSWORD.');
  let pw = request.headers.get('x-password') || '';
  try { pw = decodeURIComponent(pw); } catch { /* lascia com'è */ }
  pw = pw.trim();
  const enc = new TextEncoder();
  const impronta = async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)));
  const mia = await impronta(pw);
  let ok = false;
  for (const vera of elenco) {
    const v = await impronta(vera);
    let diff = 0;
    for (let i = 0; i < v.length; i++) diff |= v[i] ^ mia[i];
    if (diff === 0) ok = true;
  }
  if (!ok) throw new Errore(401, 'Password sbagliata.');
}

const dataOk = (s) => s === '' || /^\d{4}-\d{2}-\d{2}$/.test(s);

function valida(body, nuova) {
  if (!body || typeof body !== 'object') throw new Errore(400, 'Dati mancanti.');
  const out = {};
  if (nuova || 'nome' in body) {
    const nome = String(body.nome ?? '').trim();
    if (!nome) throw new Errore(400, 'Serve un nome per la lapide.');
    if ([...nome].length > 40) throw new Errore(400, 'Il nome può avere al massimo 40 caratteri.');
    out.nome = nome;
  }
  if (nuova || 'tipo' in body) {
    const tipo = body.tipo ?? 'impiccato';
    if (!['suicidato', 'impiccato'].includes(tipo)) throw new Errore(400, 'Tipo di morte non valido.');
    out.tipo = tipo;
  }
  if (nuova || 'genere' in body) {
    const g = body.genere ?? 'm';
    if (!['m', 'f'].includes(g)) throw new Errore(400, 'Genere non valido.');
    out.genere = g;
  }
  for (const k of ['entrata', 'uscita']) {
    if (nuova || k in body) {
      const v = String(body[k] ?? '').trim();
      if (!dataOk(v)) throw new Errore(400, `Data di ${k} non valida (usa AAAA-MM-GG).`);
      out[k] = v;
    }
  }
  if ('fiori' in body) {
    const f = Number(body.fiori);
    if (!Number.isInteger(f) || f < 0 || f > 99999) throw new Errore(400, 'Numero di fiori non valido.');
    out.fiori = f;
  }
  if (nuova || 'motivo' in body) {
    const m = String(body.motivo ?? '').trim();
    if ([...m].length > 300) throw new Errore(400, 'Il motivo può avere al massimo 300 caratteri.');
    out.motivo = m;
  }
  return out;
}

const slug = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'anima';

const pubblica = (r) => ({
  id: r.id, nome: r.nome, tipo: r.tipo, genere: r.genere, entrata: r.entrata, uscita: r.uscita, motivo: r.motivo,
  foto: r.foto_v ? `/api/foto/${encodeURIComponent(r.id)}?v=${r.foto_v}` : null,
  fotoPixel: !!r.foto_pixel,
  fiori: r.fiori || 0,
});
const CAMPI = 'id, nome, tipo, genere, entrata, uscita, motivo, ordine, foto_v, foto_pixel, fiori';

async function una(db, id) {
  const r = await db.prepare(`SELECT ${CAMPI} FROM lapidi WHERE id = ?`).bind(id).first();
  if (!r) throw new Errore(404, 'Lapide non trovata.');
  return r;
}

export async function onRequest({ request, env, params }) {
  try {
    if (!env.DB) throw new Errore(500, 'Database non collegato: aggiungi il binding D1 chiamato DB.');
    const db = env.DB;
    await prepara(db);
    const parti = Array.isArray(params.path) ? params.path : [params.path].filter(Boolean);
    const [risorsa, id] = parti;
    const metodo = request.method;
    const url = new URL(request.url);

    if (risorsa === 'login' && metodo === 'POST') {
      await autorizza(request, env);
      return json({ ok: true });
    }

    if (risorsa === 'lapidi' && !id) {
      if (metodo === 'GET') {
        const { results } = await db.prepare(`SELECT ${CAMPI} FROM lapidi ORDER BY ordine, creata`).all();
        return json({ lapidi: results.map(pubblica) });
      }
      if (metodo === 'POST') {
        await autorizza(request, env);
        const d = valida(await request.json().catch(() => null), true);
        let nuovoId = slug(d.nome);
        const esiste = await db.prepare('SELECT 1 FROM lapidi WHERE id = ?').bind(nuovoId).first();
        if (esiste) nuovoId += '-' + crypto.randomUUID().slice(0, 4);
        const max = await db.prepare('SELECT COALESCE(MAX(ordine), -1) AS m FROM lapidi').first();
        await db.prepare('INSERT INTO lapidi (id, nome, tipo, genere, entrata, uscita, motivo, ordine) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
          .bind(nuovoId, d.nome, d.tipo, d.genere, d.entrata, d.uscita, d.motivo, (max?.m ?? -1) + 1).run();
        return json({ lapide: pubblica(await una(db, nuovoId)) }, 201);
      }
    }

    if (risorsa === 'lapidi' && id) {
      await autorizza(request, env);
      if (metodo === 'PUT') {
        await una(db, id);
        const d = valida(await request.json().catch(() => null), false);
        const chiavi = Object.keys(d);
        if (chiavi.length) {
          await db.prepare(`UPDATE lapidi SET ${chiavi.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`)
            .bind(...chiavi.map((k) => d[k]), id).run();
        }
        return json({ lapide: pubblica(await una(db, id)) });
      }
      if (metodo === 'DELETE') {
        await una(db, id);
        await db.prepare('DELETE FROM lapidi WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }
    }

    if (risorsa === 'ordine' && metodo === 'PUT') {
      await autorizza(request, env);
      const body = await request.json().catch(() => null);
      if (!body || !Array.isArray(body.ids)) throw new Errore(400, 'Serve l\'elenco degli id.');
      const st = db.prepare('UPDATE lapidi SET ordine = ? WHERE id = ?');
      if (body.ids.length) await db.batch(body.ids.map((x, i) => st.bind(i, String(x))));
      return json({ ok: true });
    }

    if (risorsa === 'fiori' && id && metodo === 'POST') {
      await una(db, id);
      const body = await request.json().catch(() => ({}));
      const visitatore = String((body && body.v) || '').slice(0, 64);
      const ip = request.headers.get('cf-connecting-ip') || '';
      const giorno = oggiRoma();
      const chiave = await impronta(`${ip}|${visitatore}|${env.ADMIN_PASSWORD || ''}`);
      const ins = await db.prepare('INSERT OR IGNORE INTO fiori_log (lapide, chiave, giorno) VALUES (?, ?, ?)')
        .bind(id, chiave, giorno).run();
      const nuovo = ((ins && ins.meta && ins.meta.changes) || 0) > 0;
      if (nuovo) {
        await db.batch([
          db.prepare('UPDATE lapidi SET fiori = fiori + 1 WHERE id = ?').bind(id),
          db.prepare('DELETE FROM fiori_log WHERE giorno < ?').bind(giorno),
        ]);
      }
      const r = await db.prepare('SELECT fiori FROM lapidi WHERE id = ?').bind(id).first();
      return json({ fiori: (r && r.fiori) || 0, nuovo });
    }

    if (risorsa === 'vecchietta') {
      const oggi = oggiRoma();
      if (!id && metodo === 'GET') {
        const r = await db.prepare('SELECT testo FROM racconti WHERE data = ?').bind(oggi).first();
        return json({ oggi, racconto: r ? r.testo : null });
      }
      await autorizza(request, env);
      if (id === 'programmati' && metodo === 'GET') {
        const { results } = await db.prepare('SELECT data, testo FROM racconti WHERE data >= ? ORDER BY data').bind(oggi).all();
        return json({ oggi, racconti: results });
      }
      if (id && /^\d{4}-\d{2}-\d{2}$/.test(id)) {
        if (metodo === 'PUT') {
          const body = await request.json().catch(() => null);
          const testo = String((body && body.testo) || '').trim();
          if (!testo) throw new Errore(400, 'Scrivi il racconto prima di salvarlo.');
          if ([...testo].length > MAX_RACCONTO) throw new Errore(400, `Il racconto può avere al massimo ${MAX_RACCONTO} caratteri.`);
          await db.prepare('INSERT OR REPLACE INTO racconti (data, testo) VALUES (?, ?)').bind(id, testo).run();
          return json({ data: id, testo });
        }
        if (metodo === 'DELETE') {
          await db.prepare('DELETE FROM racconti WHERE data = ?').bind(id).run();
          return json({ ok: true });
        }
      }
    }

    if (risorsa === 'foto' && id) {
      if (metodo === 'GET') {
        const r = await db.prepare('SELECT foto, foto_tipo FROM lapidi WHERE id = ?').bind(id).first();
        if (!r || !r.foto) return new Response('Nessuna foto', { status: 404 });
        const bytes = r.foto instanceof ArrayBuffer ? new Uint8Array(r.foto) : new Uint8Array(r.foto);
        return new Response(bytes, {
          headers: {
            'content-type': r.foto_tipo || 'image/jpeg',
            'cache-control': url.searchParams.has('v') ? 'public, max-age=31536000, immutable' : 'public, max-age=60',
          },
        });
      }
      await autorizza(request, env);
      await una(db, id);
      if (metodo === 'PUT') {
        const tipo = (request.headers.get('content-type') || '').split(';')[0].trim();
        if (!TIPI_FOTO.includes(tipo)) throw new Errore(415, 'Formato foto non supportato (usa JPG, PNG o WebP).');
        const buf = await request.arrayBuffer();
        if (!buf.byteLength) throw new Errore(400, 'La foto è vuota.');
        if (buf.byteLength > MAX_FOTO) throw new Errore(413, 'Foto troppo pesante (massimo 1,5 MB).');
        const pixel = url.searchParams.get('pixel') === '1' ? 1 : 0;
        await db.prepare('UPDATE lapidi SET foto = ?, foto_tipo = ?, foto_v = foto_v + 1, foto_pixel = ? WHERE id = ?')
          .bind(buf, tipo, pixel, id).run();
        return json({ lapide: pubblica(await una(db, id)) });
      }
      if (metodo === 'DELETE') {
        await db.prepare('UPDATE lapidi SET foto = NULL, foto_tipo = NULL, foto_v = 0, foto_pixel = 0 WHERE id = ?').bind(id).run();
        return json({ lapide: pubblica(await una(db, id)) });
      }
    }

    throw new Errore(404, 'Qui non è sepolto niente.');
  } catch (e) {
    if (e instanceof Errore) return json({ errore: e.message }, e.status);
    console.error(e);
    return json({ errore: 'Errore interno del cimitero.' }, 500);
  }
}
