# Cimitero di Giuleppe

Il cimitero pixel art degli ex membri del gruppo "Gli amici di Giuleppe".

- `/` il cimitero (intro con i lampi, pioggia, tuoni, lapidi da scorrere, lapide zoomata)
- `/admin/` il pannello del becchino (aggiungi, modifica, elimina, foto, ordine)

Gira su **Cloudflare Pages** con un database **D1**. Niente build, niente npm.

## Fiori e Donna Carmela

- **Posa un fiore**: dentro ogni lapide zoomata. Ognuno può posare un fiore al giorno per lapide; i fiori compaiono sul tumulo (fino a 15 visibili). Dal pannello si può correggere il numero.
- **Donna Carmela**: la vecchietta col lumino. Una volta al giorno entra nel cimitero, racconta una notizia assurda e la collega sempre ad Afragola. Poi resta il suo ritratto in alto a sinistra per rileggerla.
  - Le storie sono in `public/storie.js` (50, cambiano a mezzanotte, ora italiana). Per aggiungerne basta aggiungere righe all'elenco.
  - Dal pannello, sezione "Donna Carmela", potete scrivere un racconto per un giorno preciso. `{nome}` diventa il nome di un morto a caso.

## Gli altri personaggi

- **Luiginov Marinovskij**, il custode: nell'intro arriva davanti al cancello, parla nel fumetto e al tocco del pulsante apre il cancello cigolando.
- **Gigirish**: biondo, occhi rossi, sempre nascosto dietro una tomba a caso. Toccalo e ti fa "psst".
- **Jediego**: a ogni visita piange, con la spada laser piantata per terra, vicino a un'altra tomba a caso. Toccalo per sentire cosa dice.
- Le frasi di tutti sono in `public/storie.js` (`custode`, `gigirish`, `jediego`): si cambiano lì.

## La storia

- Nell'intro, mentre Luiginov apre il cancello, qualcuno gli spara. BANG, cade, il colbacco vola via.
- Appena entri arriva la **Detective Terry** (Squadra Omicidi) e ti interroga: scegli la risposta, lei commenta e se ne va. Poi arriva Donna Carmela.
- In fondo a destra, dalla fossa del "Posto libero" esce una luce: se la tocchi ti chiede se vuoi entrare e scendi nel **Caffè dal Re dei Corvi**, ancora in costruzione.
- I testi di Terry sono in `public/storie.js` (`terry`).

## Struttura

```
public/                 il sito (Cloudflare lo pubblica così com'è)
  index.html            il cimitero
  admin/index.html      il pannello admin
  storie.js             le storie di Donna Carmela
  og.png                anteprima per WhatsApp
  _headers              noindex e sicurezza
functions/api/[[path]].js   le API (lapidi, foto, login)
```

## Provarlo sul PC

**Solo per guardarlo** (senza pannello admin): apri `public/index.html` con doppio clic. Il sito non trova il database e mostra le 6 lapidi di partenza.

**Tutto completo, pannello compreso**:

1. Installa Node.js (versione LTS) da nodejs.org.
2. Apri il terminale dentro la cartella `cimitero-giuleppe`.
3. Copia `dev.vars.esempio` in un file chiamato `.dev.vars` (dentro c'è la password `prova`).
4. Lancia:
   ```
   npx wrangler pages dev public --d1 DB=cimitero-locale
   ```
   La prima volta chiede di installare wrangler: rispondi `y`.
5. Apri http://localhost:8788 per il cimitero e http://localhost:8788/admin/ per il pannello (password `prova`).

Il database locale vive nella cartella `.wrangler/` ed è separato da quello online.

## Messa online (10 minuti, tutto dalla dashboard)

1. **GitHub**: crea un repo (`MauroEspo02/gliamicidigiuleppe`) e carica tutta la cartella così com'è.
2. **Cloudflare → Workers & Pages → Create → Pages → Connect to Git** e scegli il repo.
   - Framework preset: *None*
   - Build command: lascia vuoto
   - Build output directory: `public`
   - Salva e fai il primo deploy.
3. **Database**: Cloudflare → *Storage & Databases → D1 → Create database*, nome `cimitero-giuleppe`.
   Non serve creare tabelle: le crea il sito al primo accesso, già con le 6 lapidi.
4. **Collega il database**: progetto Pages → *Settings → Bindings → Add → D1 database*
   - Variable name: `DB` (proprio così, maiuscolo)
   - Database: `cimitero-giuleppe`
5. **Password del pannello**: progetto Pages → *Settings → Variables and Secrets → Add*
   - Nome: `ADMIN_PASSWORD`, tipo *Secret*
   - Valore: una password, oppure tre separate da virgola (una per ogni becchino), es. `corvo123,lapide456,forca789`
6. **Rideploy**: *Deployments → ultimo deploy → Retry deployment*, così prende database e password.
7. **Sottodominio**: progetto Pages → *Custom domains → Set up a custom domain* → es. `giuleppe.mauroesposito19.com`.
   Se il dominio è già su Cloudflare, il record DNS lo crea da solo.

Fatto: apri `https://tuo-sottodominio/admin/`, entra con la password e aggiungi le foto.

## Anteprima WhatsApp

In `public/index.html` il tag `og:image` punta a `/og.png`. WhatsApp a volte vuole l'indirizzo completo:
se l'anteprima non mostra l'immagine, sostituisci con `https://tuo-sottodominio/og.png`.

## Note

- Le foto vengono ritagliate nell'ovale e, se lasci la spunta, trasformate in pixel art. Peso massimo 1,5 MB (il pannello le rimpicciolisce da solo).
- "Lui / Lei" cambia le scritte: IMPICCATO/IMPICCATA, SUICIDATO/SUICIDATA.
- Il pulsante "Inventa un motivo" pesca una frase ironica a caso; poi la puoi modificare.
- Il sito chiede a Google di non indicizzarlo (`noindex`): lo vede solo chi ha il link.
- L'audio di pioggia e tuoni è generato dal browser, nessun file da caricare. Sul telefono parte quando tocchi "Tocca per entrare" (se il telefono è in silenzioso, su iPhone non si sente).
