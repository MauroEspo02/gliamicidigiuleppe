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

## I risorti

- Chi rientra nel gruppo si segna come **Risorto** dal pannello (casella nella sua scheda). Andrea Iannello viene segnato in automatico.
- Al posto della lapide c'è la fossa vuota con la lapide rotta. Dopo che la Detective se n'è andata, quando scorri fino alla fossa scende una luce, arriva un angelo con l'omino che ha come testa la foto della lapide, lo lascia cadere e l'omino resta lì. Toccandolo parla.
- L'animazione si vede una volta per telefono; dopo l'omino è già lì. Le frasi sono in `public/storie.js` (`angelo`, `risorto`).

## Il chiosco degli hot dog carditesi

- Tra la seconda e la terza tomba c'è il carretto di **Prof Narciso**. Il cartello "Piglt stu hot dog, mannacc e can canciell" è il pulsante: una volta su 10 ti dà l'hot dog, le altre ti dice "No, mi dispiace. Non te lo do perché mi scoccio."
- Frasi e probabilità sono in `public/storie.js` (`narciso`, `probabilita: 0.1`).

## Il teatro e il video

- Dopo la quinta tomba c'è il **teatro comunale**: il fuoco ora è spento (`teatro.inFiamme`) e davanti c'è **Umberto il pompiere** con i nuovi indizi trovati tra la cenere. Prima era in fiamme: davanti c'è **Vigile Umberto** (biondino) che non fa entrare nessuno e racconta della ragazza con il caschetto, la sigaretta o forse una canna. Dopo il suo discorso, mentre lui si gira, dal retro spunta **L'Ombra**, un personaggio incappucciato che dice "stai attento a chi è... e a cosa balla". Se scegli "Entro" ti ritrovi nella **sala cinema** (poltrone rosse, pubblico in ombra, un corvo, schermo) e parte il video. Il tasto freccia in alto a sinistra (o Esc) riporta fuori.
- Il video è `public/video/indizio.mp4` (con `indizio.webm` di riserva e `indizio.jpg` come locandina). Per **cambiarlo** sostituisci questi file tenendo lo stesso nome: meglio mp4 H.264 sotto i 24 MB (limite di Cloudflare Pages: 25 MB a file). Per ridurlo: `ffmpeg -i originale.mov -c:v libx264 -crf 26 -vf scale=720:-2 -pix_fmt yuv420p -movflags +faststart indizio.mp4`.
- Le frasi del vigile, dell'Ombra e le scritte sono in `public/storie.js` (`teatro`).

## Personaggi che camminano e volano

- **Detective Terry** non fa più animazioni: passeggia per il cimitero e, se la tocchi, dice una frase (`terryPasseggio`). Il **custode** è ora un **fantasma** che ogni tanto attraversa il cielo (`fantasma`).
- **Angioletto**, tifoso del Napoli con la maglia di Maradona e l'aureola, arriva da destra dopo un po' e ti racconta la storia assurda di Donna Carmela e della bara (`angioletto`).
- **Visco Visconti**, motociclista, è in fondo a tutto, accanto alla lapide del custode lasciata a metà, accasciato sulla moto. Per terra ci sono un libro di Marx e un bigliettino: toccali per leggerli (`visco.libro`, `visco.biglietto`).
- **Ragnetto**, il ragno detective, appena entri scende dal filo, entra ed esce dall'inquadratura, saluta e poi tocca terra e diventa **Guido Men**: metà ragazzo col codino e metà ragno. Cammina per il cimitero e ogni tanto lancia una ragnatela e vola (`ragnetto`).
- **Gigio il veggente**, chiamato da Milano, ha il suo banchetto con la sfera di cristallo tra le tombe (dopo l'ottava, o in fondo se sono meno). Parla metà napoletano e metà milanese e ti legge il futuro (`gigio`, le profezie sono in `gigio.profezie`).
- Accanto a Gigio c'è **Carmine**, che parla solo tedesco e non serve a niente: toccalo e dice una frase a caso (`carmine`).
- Nello sfondo, lontano, c'è la **stazione di Afragola**: la grande rampa bianca, l'edificio con le finestre accese e ogni tanto passa un treno.

## Il caffè finito e le carte

- Il **Caffè dal Re dei Corvi** (dalla fossa con la luce) ora è finito: bancone, macchina del caffè, cornetti, lavagna del menu, insegna APERTO. Dentro c'è **Matteofino**, il muratore che ha finito dopo 4 anni (`matteofino`). Ti dà **una carta al giorno** e ti chiede se sai chi è il Re dei Corvi.
- Le carte sono 12 mostriciattoli **inventati** (non sono Pokémon veri), disegnati dal codice a partire dal `seed` di ciascuna (`carte` in `storie.js`: nome, tipo, rarità, PV, attacchi, frase). Il pulsante in alto a destra nel caffè apre l'album. Le carte restano nel browser di chi gioca (`giuleppe-carte`).
- Al bar c'è anche **Gaia Pappaia**, che ha avuto una storia con il custode Luigi, finita male. Parla in corsivo, stile generazione Z, e il suo testo è proprio in corsivo (`gaia`).
- Al tavolino del bar sono seduti **Massimino e Cristina**: parlano del caffè del Re dei Corvi, buonissimo ma amaro, "caffè e sangue di traditori". Cristina inizia a dare un indizio (un biglietto del treno) ma impazzisce e ripete solo AFRAGOLA (`tavolino`; ogni passo ha `chi: "m"` o `chi: "c"` per dire chi parla).
- **Minnie**, barboncino toy nero col collare rosso, gira per il bar: toccala, fa "bau bau" e ti porta nel retrobottega davanti a un armadietto con le iniziali L.M. Aprilo: dentro ci sono delle armi, e un gancio vuoto (`minni`).
- Accanto al bar c'è la porta della **palestra**: si apre con 3 carte diverse (`palestra.carteRichieste`). Le prime 3 carte che regala Matteofino sono sempre nuove, e la terza è sempre una rara. Dentro sembra un campo da pallavolo, ma è una palestra pokemon: **Vincenzo Artenzo**, il capopalestra, ti sfida a una lotta a turni (LOTTA, CARTE, BORSA, FUGA) con le tue 3 carte migliori contro il suo Artenzone. Con le carte normali vince sempre lui. L'unica arma è la carta leggendaria di **Minnie**: la trovi aprendo l'armadietto nel retrobottega, e con lei Vincenzo si può battere (`vincenzo`). Vittorie e sconfitte vanno sul tabellone. In palestra c'è anche **il Vellone**, gradasso con le massime di vita, che ti sfida e perde sempre (`vellone`).
- **Gaia** ti regala due carte rare e ti manda a sfidare Vincenzo. **Matteofino** esce piangendo dalla palestra: Vincenzo l'ha distrutto.

## Cimitero chiuso

Per ora il cancello è chiuso per lo sciopero di pullman e trasportatori: arriva Kira, shiba inu bianca, cala le sbarre con catena e lucchetto e annuncia lo sciopero. Per riaprire metti `attivo: false` in `chiusura` dentro `public/storie.js`.

## Struttura

```
public/                 il sito (Cloudflare lo pubblica così com'è)
  index.html            il cimitero
  admin/index.html      il pannello admin
  storie.js             le storie di Donna Carmela
  video/                il video del teatro (mp4, webm, locandina)
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
