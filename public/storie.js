/* Donna Carmela: ogni giorno una notizia, e c'entra sempre Afragola.
   {nome} viene sostituito con il nome di un morto del cimitero, scelto in base al giorno.
   Per aggiungere storie basta aggiungere righe a questo elenco. */
(function () {
  'use strict';

  const storie = [
    "Ieri in Norvegia hanno trovato una balena che canta \"Malafemmena\". Gli scienziati non sanno spiegarlo. Io sì: quella balena ha passato l'estate del '98 nel golfo, e il fidanzato suo era un capodoglio di Afragola.",
    "Strage al supermercato a Bergamo: duecento cornetti alla crema spariti in una notte. Le telecamere hanno ripreso solo un'ombra con le pantofole. Quelle pantofole io le conosco: le vendevano al mercato di Afragola. Non dico altro.",
    "In Giappone hanno fatto un treno così veloce che arriva prima di partire. Tutto copiato, figlio mio. La stazione di Afragola, quella che pare n'astronave, l'hanno costruita apposta per lui. Solo che il treno ancora si deve decidere a passare.",
    "Stanotte ho visto il fantasma di {nome} girare tra le tombe con un cartoccio di friarielli in mano. Gli ho chiesto dove andava e mi ha risposto: \"Afragola\". A fare che, alle tre di notte? Non me l'ha voluto dire.",
    "Un uomo in Francia ha vinto la lotteria per la terza volta con gli stessi numeri: 8, 0, 0, 2 e 1. Andate a vedere il codice postale di Afragola e poi venite a dirmi che è un caso.",
    "Strage di calzini in una lavanderia di Milano: ne sono entrati quattrocento, ne sono usciti trecentonovantanove. Quello mancante l'hanno trovato tre giorni dopo ad Afragola, nel cassetto di mia cognata. Lei giura che non sa niente. Io le credo poco.",
    "Mio nipote dice che su internet c'è un'intelligenza artificiale che sa tutto. Gli ho chiesto: e dov'è nata? Lui ha riso. Ma io lo so: i primi computer li aggiustava un elettricista di Afragola, e qualcosa dentro ce l'ha lasciato.",
    "In Australia sono piovute sardine. Sardine vere. La gente scappava, io avrei preso la padella. Il meteorologo dice che è stata una tromba d'aria. Io dico che è stato un pescivendolo di Afragola che si è fatto prendere la mano.",
    "In Svizzera hanno fatto la pizza più lunga del mondo, due chilometri. Con l'ananas. Quando l'hanno saputo, ad Afragola hanno suonato le campane a morto per tre ore. Pure il parroco piangeva.",
    "Strage di panettoni a ottobre: li hanno già messi al supermercato e la gente se li mangia prima di Natale. Mia figlia ne ha fatti fuori quattro. È un'usanza partita da Afragola: là il Natale comincia a settembre e finisce quando finisce il panettone.",
    "In Inghilterra un uomo ha starnutito così forte che è saltata la luce in tutto il quartiere. Tredici case al buio. Mio zio Salvatore, ad Afragola, una volta starnutì e la corrente ritornò. Ognuno ha il dono suo.",
    "Hanno scoperto un pianeta nuovo, figlio mio. Dicono che c'è l'acqua, c'è l'aria e fanno sempre ventisei gradi. L'ho guardato col binocolo di mio marito: c'è pure una bancarella di fragole. Secondo me ci stanno già quelli di Afragola.",
    "L'anima di {nome} mi è venuta in sogno. Mi ha detto di dire a tutti che non era colpa sua. Poi mi ha chiesto il numero di una pizzeria di Afragola che consegna fino in paradiso. Io non ce l'ho. Se qualcuno ce l'ha, glielo porti.",
    "In America una signora di novant'anni si è laureata in ingegneria. Brava. Io a novant'anni mi voglio laureare in pettegolezzo. La facoltà c'è già: è il bar della piazza di Afragola, aperto dalle sei di mattina. Lezioni gratis.",
    "Strage di zanzare a Ferragosto in Puglia: un uomo ne ha ammazzate trecento con una ciabatta sola. Record del mondo. La ciabatta però era di Afragola. Me l'hanno detto i parenti suoi: \"senza quella ciabatta non era niente\".",
    "Notizia brutta: in Germania hanno chiuso una fabbrica di cucchiaini. E adesso il caffè come lo giriamo? Ad Afragola si sono già organizzati: lo girano con le chiavi della macchina. Funziona uguale, ve lo giuro.",
    "Un ragazzo in Spagna ha buttato in mare un messaggio d'amore nella bottiglia. Dopo vent'anni gli hanno risposto. Indovinate da dove? Da Afragola. Afragola il mare non ce l'ha, figlio mio. Questo è il vero mistero.",
    "Stanotte un fulmine ha preso il campanile di un paese in Toscana e le campane hanno suonato da sole \"O sole mio\". I giornali dicono che è un guasto. Io dico che il campanaro aveva fatto il militare con uno di Afragola.",
    "Avete saputo? L'anima di {nome} l'hanno vista all'IKEA di Afragola. Girava in tondo da sei ore e non trovava più l'uscita. Secondo me sta ancora là dentro. Tra i divani.",
    "In Cina hanno inventato una macchina che fa il caffè e ti dice pure se il fidanzato ti tradisce. Costa tremila euro. Ad Afragola c'è la signora Concetta che fa le stesse cose, il caffè lo fa meglio e si accontenta di due sfogliatelle.",
    "Strage di piante grasse sul balcone della mia vicina: tutte morte in una settimana. Lei dice che è stato il sole. Io dico che è stato il malocchio di una che sta ad Afragola, e lei lo sa bene chi è. Le ho portato il sale. Vediamo.",
    "Alla televisione dicono che i pinguini dell'Antartide si stanno spostando verso nord, un passo al giorno. Ho fatto i conti con mio nipote: tra trecento anni arrivano ad Afragola. Io non ci sarò, ma voi preparate il ghiaccio.",
    "Un signore in Olanda si è fatto la casa tutta di formaggio. Poi è venuto l'inverno e se la sono mangiata i topi. Morale: le case si fanno di tufo, come ad Afragola. Il tufo non se lo mangia nessuno. Ci hanno provato, ma niente.",
    "Hanno ripescato in mare una cassaforte del 1800. Dentro c'era solo un biglietto: \"Torno subito. Gennaro\". Il mio Gennaro, buonanima, diceva la stessa cosa prima di andare al bar di Afragola. Tornava dopo tre giorni.",
    "Strage di uova di Pasqua a Torino: sono cadute dallo scaffale millecinquecento uova tutte insieme. Le sorprese sono finite per terra. Nessuna era un anello. Ad Afragola, nel '79, ne uscì uno d'oro. Ancora se ne parla.",
    "In un paese dell'Abruzzo un gatto è diventato sindaco. Ha vinto col settanta per cento. Il programma era dormire e mangiare. Ad Afragola volevano fare uguale, ma il gatto candidato si è ritirato. Diceva che era troppo stressante.",
    "{nome}? L'anima sua passa ogni notte vicino al cancello. Una volta l'ho seguita: ha preso il treno per Afragola, quello delle quattro e dieci. Il controllore non le ha fatto il biglietto. Pure i morti hanno le raccomandazioni.",
    "Sul giornale c'è scritto che dormire coi calzini fa campare di più. Mio marito Gennaro dormiva coi calzini, il cappello e la giacca. È campato novantasei anni. Era di Afragola. Non c'è altro da aggiungere.",
    "Una nave da crociera si è persa nel Mediterraneo per due giorni con duemila persone sopra. Il capitano dice che si era rotto il navigatore. Io dico che cercava il porto di Afragola. Non c'è, figlio mio. Ma la gente lo cerca lo stesso.",
    "Strage di fragole in Spagna: una gelata ne ha distrutte tre tonnellate. Dicono che Afragola si chiama così proprio per le fragole. Quel giorno, ve lo giuro, ad Afragola si è sentito un brivido. Tutti quanti. Pure i bambini.",
    "Un uomo in Brasile ha dormito diciotto anni. Si è svegliato e ha chiesto: \"Hanno sistemato le pensioni?\". No, figlio mio. Manco ad Afragola. Là dormono uguale, ma almeno la domenica si svegliano per il ragù.",
    "Al telegiornale: un pappagallo in Inghilterra ha chiamato la polizia da solo, gridava \"aiuto, aiuto\". Voleva solo compagnia. Il pappagallo di mia sorella, ad Afragola, invece chiama il salumiere. E il salumiere viene.",
    "In Egitto hanno trovato una mummia con gli occhiali da sole. Gli scienziati non capiscono. Io sì: è la stessa montatura che vendeva l'ottico sotto casa mia ad Afragola. Non passano mai di moda. Ne ho ancora un paio nel cassetto.",
    "Strage di sedie a un matrimonio a Caserta: si sono rotte tutte e centoventi durante la tarantella. Gli sposi non si sono fatti niente. I parenti di lei erano di Afragola. I parenti di lui ancora chiedono i danni.",
    "Notizia scientifica: il cervello ricorda meglio le cose mentre si mangia. Per questo io di Afragola mi ricordo tutto: la mozzarella, i babà, la pastiera di donna Assunta. Di mio marito invece mi ricordo poco. Mangiava con la bocca aperta.",
    "La NASA ha mandato un messaggio nello spazio per cercare gli alieni. Nessuno ha risposto. Hanno sbagliato lingua. Se lo mandavano in afragolese, a quest'ora gli alieni stavano già a tavola con noi, con la sedia in più apposta.",
    "Sulla tomba di {nome} ho trovato un biglietto con la grafia storta: \"Salutatemi tutti tranne uno\". Non dice chi. Ho chiesto in giro ad Afragola. Là tutti pensano che parlasse di loro.",
    "In Canada è nevicato a luglio e tutti si sono meravigliati. Ad Afragola nevicò una volta sola, nel '56. Io avevo sei anni. Facemmo un pupazzo di neve così bello che il sindaco se lo voleva sposare. Poi uscì il sole. Fu lutto cittadino.",
    "Strage di telefonini a Napoli: trecento cellulari caduti in mare in un giorno solo, tutti mentre la gente si faceva i selfie. Adesso i pesci tengono internet. Ad Afragola, che il mare non ce l'ha, i telefoni cadono nel ragù. Là il segnale è fortissimo.",
    "Un vecchio in Grecia ha fatto centoventi anni. Dice che il segreto è un bicchiere di vino rosso al giorno. Bugia. Il vero segreto è farsi i fatti degli altri: ti tiene sveglio. Ad Afragola campiamo tutti centocinquant'anni per questo.",
    "A Roma hanno arrestato un ladro che rubava solo telecomandi. Ne teneva quattromila a casa. All'interrogatorio ha detto una parola sola: \"Afragola\". Gli investigatori ancora ci stanno pensando. Io ho capito subito, ma non lo dico.",
    "Dal Vaticano: hanno benedetto un robot. Il robot ha ringraziato e si è fatto il segno della croce al contrario. Panico. L'hanno portato subito da Sant'Antonio, ad Afragola. Adesso funziona benissimo e la domenica serve messa.",
    "Strage di cravatte all'ufficio delle tasse: un impiegato ha deciso che da domani si va in maglietta, e duecento cravatte sono volate dalla finestra. Una è caduta in testa a un signore di Afragola che passava. Se l'è messa. Si è sposato il giorno dopo.",
    "Questa me l'ha detta mia cugina: in un paese della Sicilia una mucca ha imparato ad aprire il frigorifero. Prende il latte e lo rimette a posto. Gli scienziati dicono che non è possibile. La mucca è nata ad Afragola. Questo gli scienziati non lo sanno.",
    "Stanotte la luna era rossa. Dicono eclissi. Io dico che era arrabbiata. L'ultima volta che si arrabbiò così fu quando chiusero la salumeria di Peppe ad Afragola. Riaprì dopo una settimana e la luna tornò bianca. Ditemi voi se è un caso.",
    "{nome}, buonanima, ha lasciato al bar un debito di tre caffè. Stamattina il barista mi ha fermato e io ho pagato, che dovevo fare. Ma il barista è di Afragola: da domani lo scrive sul muro, con nome e cognome. Là le cose si fanno così.",
    "Notizia sportiva: una squadra inglese ha perso quindici a zero, dicono il risultato più brutto della storia. Non hanno mai visto la partita scapoli contro ammogliati ad Afragola, nel '71. Finì trentuno a due. Gli ammogliati non si sono mai ripresi.",
    "Hanno scoperto che i polpi sognano: cambiano colore mentre dormono. Pure io cambio colore quando sogno, ma solo se sogno mia suocera. Era di Afragola. Una santa donna, dicevano gli altri. Il polpo lo cucinavo meglio io.",
    "In Svezia un signore vende la casa a un euro, ma a una condizione: ti devi tenere la suocera. Non l'ha comprata nessuno. Se la metteva in vendita ad Afragola, andava a ruba in un'ora. Là le suocere sono un investimento.",
    "Ho letto che un uomo è andato a piedi da Milano a Napoli per amore. Settecentosettanta chilometri. Arrivato, lei gli ha detto che si era fidanzata con uno di Afragola. Lui si è girato ed è tornato a piedi. Pure questo è amore."
  ];

  const saluti = [
    "Uè, guagliù! Venite qua.",
    "Psst! Tengo una notizia.",
    "Madonna mia, che è successo oggi…",
    "Sedetevi, che vi devo dire una cosa.",
    "Avete letto il giornale stamattina?",
    "Figli miei, venite a sentire."
  ];

  const risposte = [
    "C'entra sempre, figlio mio. Sempre.",
    "Tu sei giovane. Un giorno capirai.",
    "Chi non conosce Afragola non conosce il mondo.",
    "E io che ti devo dire? Le cose stanno così.",
    "Fatti una passeggiata ad Afragola e poi ne riparliamo.",
    "Madonna mia, ma a scuola che vi insegnano?",
    "Tutte le strade portano a Roma. E da Roma parte il treno per Afragola.",
    "Mio marito diceva la stessa cosa. Poi è andato ad Afragola ed è tornato un altro uomo."
  ];

  // Il custode dell'intro
  const custode = {
    nome: 'Luiginov Marinovskij',
    saluto: "Privet, tovarišč! Io sono Luiginov Marinovskij, custode di cimitero. Porte io apro solo per te. Tu clicca pulsante… e poi veditela tu.",
    apre: "Prego, tovarišč. Da qui in poi… vedi—"
  };

  // Detective Terry: ti interroga appena entri, dopo lo sparo al custode
  const terry = {
    arrivo: "Un momento. Polizia.",
    domanda: "Detective Terry, Omicidi. Hanno appena sparato al custode, proprio mentre lei entrava. Coincidenza? Mi dica: ha visto qualcosa di strano in questi giorni?",
    risposte: [
      ["Una vecchietta che collega tutto ad Afragola.", "Donna Carmela. La conosco. Ha un alibi di ferro: era ad Afragola. Come sempre."],
      ["Un biondo che si nasconde dietro le tombe.", "Gigirish. Sta già nel mio taccuino. Pagina tre, quattro e cinque."],
      ["Uno incappucciato che piange con una spada laser.", "Jediego. Piange da settimane. Sospetto, ma troppo triste per sparare a qualcuno."],
      ["No, niente di strano.", "Niente di strano. In un cimitero dove la gente muore uscendo da un gruppo WhatsApp. Certo, come no."]
    ],
    chiusura: "Un'ultima cosa. Se sente parlare del Re dei Corvi, mi chiami. E non lasci la città.",
    congedo: "Posso andare?",
    saluto: "Ci rivedremo."
  };

  // Jediego, che piange su una tomba a caso. {nome} = la tomba dove piange.
  const jediego = [
    "Sniff… {nome} era il più forte di tutti noi.",
    "Ho sentito un grande turbamento nel gruppo. Come se qualcuno fosse stato rimosso all'improvviso.",
    "Che la forza sia con te, {nome}. Pure fuori dal gruppo.",
    "Non sto piangendo. È la sabbia del deserto. Pure qua ce n'è tanta.",
    "Avevo insegnato tutto a {nome}. Pure a non uscire dal gruppo. Niente.",
    "{nome} era la persona prescelta. E ha scelto di andarsene.",
    "Pure la mia spada laser sta piangendo. Guardate come trema.",
    "Domani torno su Afragola-7. Qua il dolore è troppo.",
    "Donna Carmela dice che pure questo è colpa di Afragola. Sniff.",
    "Lasciatemi solo con {nome}. Due minuti. Poi vi raggiungo.",
    "Aiutami, {nome}. Sei la mia unica speranza… e hai lasciato il gruppo.",
    "Ogni volta che vengo, mi tocca una tomba diversa. Il dolore non finisce mai."
  ];

  // Gigirish, nascosto dietro una tomba a caso. {nome} = la tomba dove si nasconde.
  const gigirish = [
    "Psst… fra. Vuoi?",
    "Roba buona, coltivata qua dietro. Il terreno è… nutriente.",
    "Non ho visto niente. Non so niente. Sto solo qua.",
    "La tomba di {nome}? È il mio ufficio. Affitto zero.",
    "Il custode russo è cliente fisso. Dice che è per il freddo.",
    "Jediego piange perché gli ho finito la scorta.",
    "Shh! Se passa Donna Carmela, io sono di Afragola.",
    "Ti faccio prezzo amico, perché sei ancora vivo.",
    "Zio, hai visto un fantasma? No? Allora non hai preso niente.",
    "Che ore sono? Che giorno è? In che cimitero stiamo?",
    "Oh… le lapidi si muovono o sono io?",
    "{nome} non si lamenta mai. Miglior socio che ho avuto."
  ];

  // Generatore pseudo-casuale fisso: l'ordine delle storie è lo stesso per tutti.
  function mulberry(a) {
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const ordine = (() => {
    const r = mulberry(19011949), a = storie.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  })();

  function giorni(oggi) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(oggi || '');
    if (!m) return 0;
    return Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 864e5);
  }
  const mod = (a, b) => ((a % b) + b) % b;

  function riempi(testo, oggi, nomi) {
    const g = giorni(oggi);
    const nome = nomi && nomi.length ? nomi[mod(g * 7 + 3, nomi.length)] : 'uno che conoscevo';
    return String(testo).replace(/\{nome\}/g, nome);
  }
  function storiaDelGiorno(oggi, nomi) {
    const g = giorni(oggi);
    return riempi(storie[ordine[mod(g, storie.length)]], oggi, nomi);
  }
  function oggiRoma() {
    try {
      return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    } catch (e) {
      const d = new Date(); return d.toISOString().slice(0, 10);
    }
  }
  const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  function dataBella(oggi) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(oggi || '');
    if (!m) return '';
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return `${GIORNI[d.getUTCDay()]} ${+m[3]} ${MESI[+m[2] - 1]}`;
  }
  const scegli = (lista, oggi, sale) => lista[mod(giorni(oggi) * 31 + (sale || 0), lista.length)];

  window.NONNA = { storie, saluti, risposte, custode, terry, jediego, gigirish, storiaDelGiorno, riempi, oggiRoma, dataBella, scegli, giorni };
})();
