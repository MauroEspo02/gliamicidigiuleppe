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

  // La resurrezione: l'angelo riporta giù chi è rientrato nel gruppo
  const angelo = {
    luce: "Una luce scende dal cielo sulla tomba di {nome}…",
    dice: "L'angelo: \"Ve lo rimando giù. Lassù non lo sopportava nessuno.\""
  };
  const risorto = [
    "Sono tornato! Mi siete mancati? …No? Vabbè.",
    "Lassù non mi volevano. Dicono che mandavo troppi vocali.",
    "L'angelo mi ha detto: torna giù e chiedi scusa al gruppo.",
    "Morto, sepolto e rientrato nel gruppo. Mica da tutti.",
    "Qualcuno ha visto il mio telefono? L'ho lasciato nella tomba.",
    "La Detective mi ha chiesto l'alibi. Ero morto, che alibi vuoi?",
    "Rimettetemi admin, almeno. Me lo merito.",
    "Donna Carmela dice che in paradiso c'è un bar di Afragola. Confermo.",
    "Non toccate la mia tomba. Non si sa mai."
  ];

  // Il chiosco degli hot dog carditesi di Prof Narciso: una volta su 10 te lo dà
  const narciso = {
    pulsante: "Piglt stu hot dog, mannacc e can canciell",
    no: "No, mi dispiace. Non te lo do perché mi scoccio.",
    si: "Va bene, piglia. Ma nun t'abituà.",
    probabilita: 0.1
  };

  // Il teatro comunale: sta andando a fuoco. Il vigile non fa entrare, ma dal retro si può (il video e' in /video/indizio.mp4).
  // Ogni dialogo e' un albero: b = bottoni [testo, dove vai]. Un numero = passo successivo, null = chiudi, "@nome" = azione speciale.
  const teatro = {
    insegna: ["TEATRO COMUNALE", "MAESTRO GIULEPPE"],
    etichetta: "Il teatro comunale sta andando a fuoco. Davanti alla porta c'è un vigile.",
    fischio: "Indietro! Non si passa!",
    psst: "Psst.",
    vigile: {
      nome: "Vigile Umberto", ruolo: "Polizia locale",
      passi: [
        { t: "Indietro, indietro! Il teatro sta andando a fuoco, non si entra!", b: [["Ma che è successo?", 1], ["E io posso entrare?", 2], ["Vado via", null]] },
        { t: "Io ho visto tutto. Una ragazza con il caschetto, qua davanti, con la sigaretta in mano. O forse era una canna... non ho fatto in tempo a sentire l'odore. Sta di fatto che poi: pof. Fuoco.", b: [["E io posso entrare?", 2], ["Capito, grazie", null]] },
        { t: "NO. Non si entra. Sono pagato per questo. Anzi, non sono pagato. Ma non si entra lo stesso.", b: [["Capito", "@retro"]] }
      ]
    },
    ombra: {
      nome: "L'Ombra", ruolo: "Chi è? Nessuno lo sa",
      passi: [
        { t: "Psst. Qua, tu. Il vigile non guarda.\n\nDal retro si entra. Là dentro c'è un indizio.\n\nStai attento a chi è... e a cosa balla.", b: [["Entro dal retro", "@entra"], ["Chi sei?", 1], ["Meglio di no", "@via"]] },
        { t: "Chi sono io? Uno che sa. Uno che balla pure lui, ma di nascosto.\n\nAdesso vai, prima che il vigile si giri. E guarda bene.", b: [["Entro dal retro", "@entra"], ["Meglio di no", "@via"]] }
      ]
    },
    via: "Fai bene ad avere paura. Ma l'indizio resta lì.",
    uscita: "Esci dal teatro",
    fine: "Hai visto bene chi è? E cosa balla?"
  };

  // Detective Terry non interroga più: ormai si sa tutto. Cammina per il cimitero e ogni tanto borbotta.
  const terryPasseggio = [
    "Qualcuno qui sa qualcosa...",
    "Non ho visto niente. Neanche lei. Giusto?",
    "Un colpo solo. Pulito. Professionista.",
    "Tutti hanno un alibi. Tranne i morti.",
    "Se sente parlare del Re dei Corvi, mi chiami.",
    "Il biondo dietro la tomba. Prima o poi lo prendo.",
    "Afragola... perché sempre Afragola?"
  ];

  // Il fantasma del custode, che ogni tanto vola sopra il cimitero.
  const fantasma = {
    comparsa: "Un fantasma passa sopra il cimitero...",
    frasi: [
      "Uuuuh... tovarišč...",
      "Chi mi ha sparato? Nessuno dice niente...",
      "Il cancello... chi lo apre adesso?",
      "Detective! Sono io! Ti dico chi è stato! ...no, non mi sente.",
      "Uuuh... io volo, tu no. Ah ah ah.",
      "Il mio colbacco... dov'è finito il mio colbacco?"
    ]
  };

  // Angioletto, tifoso del Napoli con la maglia di Maradona: entra dopo Donna Carmela e dice che è pazza.
  const angioletto = {
    nome: "Angioletto", ruolo: "Tifoso del Napoli",
    arrivo: "Psss! Venite qua! Donna Carmela è pazza!",
    passi: [
      { t: "Psss! Vieni qua, non farti sentire da lei. Ti dico una cosa su Donna Carmela: quella è pazza!", b: [["Pazza? In che senso?", 1], ["Ma che dici?", 1]] },
      { t: "Una notte l'ho vista io, con questi occhi che mi devono pure bruciare. Stava qua, in mezzo alle tombe, con la lanterna e una forchetta.", b: [["E poi?", 2], ["Una forchetta?", 2]] },
      { t: "Ha aperto una bara. Ha tolto il corpo. E se l'è mangiato! Così, intero, col sugo che si era portata da Afragola dentro un thermos.", b: [["Impossibile...", 3], ["E poi?", 3]] },
      { t: "Dopo s'è pulita la bocca col fazzoletto e ha detto: \"Questo è meglio 'e chillo 'e ieri\". Io ero dietro quella croce. Mi sono fatto il segno della croce, e pure quello di Maradona.", b: [["Lo dirò a tutti", 4], ["Tu hai bevuto", 4]] },
      { t: "Credimi! E sai chi c'era con lei? Nessuno. Perché lei mangia sola. Sempre. Ricordatelo.\n\nMo' me ne vado prima che mi vede. E non dire che te l'ho detto io!", b: [["Ok, ciao Angioletto", null]] }
    ],
    frasi: [
      "Forza Napoli!",
      "Non mangiare niente da Donna Carmela. Niente!",
      "Donna Carmela mi guarda male. Lo so che lo sa.",
      "Io la bara non la apro manco morto. Lei sì.",
      "Maradona è meglio 'e tutti. Pure 'e chi sta qua sotto."
    ]
  };

  // Matteofino, il muratore del Caffè dal Re dei Corvi. Dà una carta al giorno.
  const matteofino = {
    nome: "Matteofino", ruolo: "Muratore",
    chiamata: "Psst! Vieni qua!",
    carteAlGiorno: 1,
    passi: [
      { t: "Oh, ciao! Sono Matteofino, il muratore. Qua dentro ci sto da 4 anni, eh. Quattro. Anni. Non vedo la mia famiglia bagnolese da troppo tempo.", b: [["E adesso?", 1], ["Che braccia che hai", 2], ["Ciao Matteofino", null]] },
      { t: "E adesso ho finito! M'hanno pure pagato! E sai che mi sono comprato con i soldi? Le carte pokemon! Tieni, una è per te.", b: [["Grazie!", "@carta"]] },
      { t: "Eh, il cemento non si porta da solo. Quattro anni di secchi: i muscoli vengono per forza. I ricci non so perché, ma vengono pure quelli.", b: [["E adesso?", 1]] },
      { t: "Ma dimmi una cosa... tu lo sai chi è il Re dei Corvi?", b: [["Certo che lo so", 4], ["No... chi è?", 5], ["Non mi interessa", null]] },
      { t: "Davvero?! E chi è? Dai, dimmelo piano, che qua i muri hanno le orecchie. E pure le piume.", b: [["Non te lo dico", 6], ["Ancora non lo so", 6]] },
      { t: "Eh, lo chiedevo a te! Io l'ho solo costruito 'sto posto. Il proprietario non l'ho mai visto. Mi pagava in semi di girasole... e in carte.", b: [["Strano", 6]] },
      { t: "Se lo scopri dimmelo. Io intanto mi riposo: 4 anni, capisci?", b: [["Ciao, Matteofino", null]] },
      { t: "Oggi te n'ho già data una! Le carte costano, eh. Torna domani, che devo ricomprarle.", b: [["Va bene", 3]] },
      { t: "Ma hai la collezione completa! Non ho più niente da darti, sei il re delle carte! Anzi: il Re dei Corvi sarai tu?", b: [["Chissà", 3]] }
    ],
    frasi: ["Quattro anni, eh.", "Vuoi una carta? Tieni... domani.", "Che bello non toccare più il cemento."]
  };

  // Visco Visconti, in fondo al cimitero: costruisce la lapide del custode.
  const visco = {
    nome: "Visco Visconti", ruolo: "Motociclista",
    chiamata: "Ehi... vieni.",
    lapide: ["LUIGINOV", "MARINOVSKIJ"],
    // Visco ora è accasciato sulla moto: questi sono i testi della scena.
    accasciato: "Visco Visconti è morto, accasciato sulla moto. Non respira più. Accanto a lui, per terra, un libro e un bigliettino.",
    libro: { titolo: "Il Manifesto del Partito Comunista", autore: "Karl Marx", testo: "Una pagina ha l'angolo piegato. Sottolineato a matita: \"Proletari di tutto il cimitero, unitevi!\"" },
    biglietto: "Fai del mondo il tuo giocattolo, o il mondo farà di te la sua marionetta.",
    passi: [
      { t: "Ciao. Mi chiamo Visco Visconti. Sono venuto in moto da lontano per fare la lapide a Luiginov.", b: [["Il custode?", 1], ["Che bella moto", 4]] },
      { t: "Sì, lui. Mi apriva il cancello a ogni ora, anche alle tre di notte, senza chiedere niente. Se pioveva mi teneva pure l'ombrello. Mi manca.", b: [["Mi dispiace", 3], ["Cosa scrivi sulla lapide?", 2]] },
      { t: "Qui giace Luiginov Marinovskij. Apriva i cancelli. Ora apre quelli del cielo. E sotto: \"Privet, tovarišč\".", b: [["Bellissima", 3]] },
      { t: "Se lo vedi svolazzare di notte, salutalo da parte mia. E se vedi chi gli ha sparato... dimmelo prima di dirlo alla detective.", b: [["Lo farò", null]] },
      { t: "Grazie. Mi accompagna dappertutto, la moto. Ma lui mi apriva il cancello meglio.", b: [["Il custode?", 1]] }
    ],
    frasi: ["Mi manca, il vecchio.", "Scalpello, martello, e un po' di cuore.", "Privet, Luiginov."]
  };

  // Le carte collezionabili che regala Matteofino (mostriciattoli tutti inventati).
  // tipo: Ombra Fango Fulmine Fuoco Lacrima Caffe Corvo Fantasma Treno Celeste
  const carte = [
    { id: "corvaccio", nome: "Corvaccio Re", tipo: "Corvo", rarita: "leggendaria", pv: 120, att: [["Becco Reale", 60], ["Pioggia di Piume", 40]], testo: "Porta la corona. Nessuno sa chi sia davvero.", seed: 7 },
    { id: "giuleppino", nome: "Giuleppino", tipo: "Ombra", rarita: "comune", pv: 40, att: [["Messaggio Letto", 10], ["Gruppo Silenziato", 20]], testo: "È uscito dal gruppo. Ma lo senti ancora.", seed: 21 },
    { id: "lumino", nome: "Lumino Triste", tipo: "Fuoco", rarita: "comune", pv: 30, att: [["Fiammella", 10], ["Singhiozzo", 10]], testo: "Brilla poco, ma ha tanti sentimenti.", seed: 33 },
    { id: "tombalotto", nome: "Tombalotto", tipo: "Fango", rarita: "comune", pv: 60, att: [["Lapidata", 20], ["Riposo Eterno", 30]], testo: "Pesa tre quintali. Dice di no.", seed: 45 },
    { id: "piovasco", nome: "Piovasco", tipo: "Lacrima", rarita: "comune", pv: 50, att: [["Goccia", 10], ["Temporale", 40]], testo: "Dove passa lui, piove. Sempre.", seed: 58 },
    { id: "hotdoggo", nome: "Hot Doggo Carditese", tipo: "Fuoco", rarita: "rara", pv: 70, att: [["Senape", 20], ["Mi Scoccio", 50]], testo: "Te lo dà una volta su dieci.", seed: 64 },
    { id: "caffettiello", nome: "Caffettiello", tipo: "Caffe", rarita: "comune", pv: 45, att: [["Schizzo Bollente", 20], ["Doppia Dose", 30]], testo: "Dal Re dei Corvi lo fanno sempre troppo forte.", seed: 77 },
    { id: "zombiello", nome: "Zombiello Matto", tipo: "Fulmine", rarita: "rara", pv: 80, att: [["Scossa", 30], ["Tuono Putrido", 50]], testo: "Risorto due volte. Tre, se conti la domenica.", seed: 89 },
    { id: "cancelletto", nome: "Cancelletto", tipo: "Ombra", rarita: "comune", pv: 35, att: [["Cigolio", 10], ["Chiusura", 20]], testo: "Si apre da solo. Non è una bella cosa.", seed: 101 },
    { id: "fantasmino", nome: "Fantasmino Russo", tipo: "Fantasma", rarita: "rara", pv: 65, att: [["Uuuh", 20], ["Tovarišč", 45]], testo: "Vola ogni tanto. Gli manca il cancello.", seed: 113 },
    { id: "afragolon", nome: "Afragolon", tipo: "Treno", rarita: "rara", pv: 90, att: [["Alta Velocità", 50], ["Ritardo Cronico", 30]], testo: "Si ferma dove non si ferma nessuno.", seed: 127 },
    { id: "angiolino", nome: "Angiolino Azzurro", tipo: "Celeste", rarita: "comune", pv: 55, att: [["Coro da Stadio", 30], ["Dieci!", 40]], testo: "Tifa anche quando non si deve.", seed: 139 }
  ];

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

  // Ragnetto, il ragno detective che arriva appena entri.
  const ragnetto = {
    nome: "Guido Men", ruolo: "Metà ragazzo, metà ragno",
    saluto: "Ciao! È arrivato Ragnetto al cimitero, a risolvere il delitto insieme alla Detective Terry!",
    trasformazione: "Ragnetto tocca terra e... diventa Guido Men, metà ragazzo e metà ragno!",
    vola: ["Ragnatelaaa!", "Si vola!", "Ci vediamo dall'altra parte!", "Tenetevi forte!"],
    frasi: [
      "Sono Guido Men. Il codino è vero, le zampe pure.",
      "Otto zampe e un codino: il detective più stiloso del cimitero.",
      "Ho tessuto una tela su ogni tomba. Niente mi sfugge.",
      "Terry guarda per terra, io guardo dall'alto. Squadra perfetta.",
      "Otto zampe, otto indizi. Me ne mancano sette.",
      "Il colpevole ha lasciato un'impronta. Una sola. Io ne lascio otto.",
      "Chi ha ucciso il custode? Lo scopro. Prima però mi riposo sul filo.",
      "Il fantasma vola, io penzolo. Ognuno ha i suoi mezzi.",
      "Ho visto tutto da quassù. Tutto. Tranne quello che serviva.",
      "Se piove ancora, la tela si scioglie. Terry, sbrigati."
    ]
  };

  // Gigio, il veggente chiamato da Milano: metà napoletano, metà milanese.
  const gigio = {
    nome: "Gigio", ruolo: "Veggente, chiamato da Milano",
    chiamata: "Uè, guagliò! Vieni che ti leggo il futuro, taac!",
    insegna: ["GIGIO", "VEGGENTE"],
    passi: [
      { t: "Uè uè! Sono Gigio, il veggente. M'hanno chiamato da Milano apposta: ho preso il Frecciarossa, sono sceso ad Afragola e jamme, eccomi qua. Che vuoi sapere, ciccio?", b: [["Leggimi il futuro", "@futuro"], ["Chi ha ucciso il custode?", 2], ["Ma come parli?", 3]] },
      { t: "", b: [["Un'altra!", "@futuro"], ["Grazie, Gigio", null]] },
      { t: "Mamma mia, la sfera s'è fatta tutta nebbiosa, tipo la Bovisa a novembre. Vedo... un caschetto. Vedo... una sigaretta. E vedo uno che balla. Più de chesto nun pozzo dì, se no la Detective mi fa la multa.", b: [["Leggimi il futuro", "@futuro"], ["Ciao Gigio", null]] },
      { t: "Sono nato a Napoli, ma sto a Milano da dieci anni. Mo' dico \"uè\" e \"guagliò\" nella stessa frase, faccio l'apericena col babà e pago il caffè due euro. Non sono più di nessuna parte, ciccio. Sono un veggente internazionale.", b: [["Leggimi il futuro", "@futuro"], ["Ciao Gigio", null]] }
    ],
    profezie: [
      "Vedo un gran sbatti nel tuo futuro... ma poi una sfogliatella. Ne vale la pena, fidati.",
      "Oggi qualcuno ti dirà \"ciao bello\". Tu rispondi \"uè guagliò\" e vedi che succede.",
      "Le carte dicono: non uscire dal gruppo. Se esci, ti fanno la lapide. L'ho visto succedere, ciccio.",
      "Vedo soldi in arrivo. Pochi. Tipo il resto del caffè. Ma sempre soldi sono, taac.",
      "Domani piove. Qua piove sempre, che ci vuole a fare il veggente... però l'ho detto, eh.",
      "Vedo un treno in ritardo ad Afragola. Questa è facile, la vedo tutti i giorni.",
      "Nel tuo futuro c'è un hot dog carditese. Ma Prof Narciso non te lo dà. Destino, guagliò.",
      "Vedo un amore che finisce in palestra. Chiedi a Gaia, al bar del corvo: lei sa.",
      "Ghe pensi mi: la tua fortuna sta dietro la quinta tomba. O la sesta. La sfera è un po' sbattuta.",
      "Le stelle dicono: stasera apericena. Ma con la pizza fritta. Sei un ponte tra due mondi, ciccio.",
      "Vedo un corvo con la corona. Ti guarda. Nun te preoccupà, guarda così a tutti.",
      "Vedo una carta leggendaria nel tuo futuro. O era un biglietto del tram? Boh, comunque fortuna."
    ],
    frasi: ["Uè, taac!", "Jamme, che la sfera si raffredda.", "Ghe pensi mi, guagliò.", "Il futuro costa poco: un caffè. Ma a Milano."]
  };

  // Gaia Pappaia, al bar del corvo. Parla in corsivo, stile generazione Z.
  // {n} = carte che servono per la palestra, {k} = carte che hai.
  const gaia = {
    nome: "Gaia Pappaia", ruolo: "Cliente fissa del bar",
    chiamata: "Amioooo, vieni quaaa",
    passi: [
      { t: "Ciaooo amio! Sono Gaia Pappaia, raga letteralmente la regina di questo bar. Cioè tipo no vabbè, sei nuovo? Slayyy.", b: [["Conoscevi il custode?", 1], ["Cos'è quella porta?", 4], ["Ciao Gaia", null]] },
      { t: "Luigiii... cioè raga, il custode. Abbiamo avuto una storia d'amore pazzescaaa, tipo lui mi apriva il cancello alle tre di notte. Red flag però anche green flag, capito amio?", b: [["E poi?", 2]] },
      { t: "E poi niente, è finita malissimooo. Mi ha ghostata, letteralmente: adesso è un fantasma e passa sopra il cimitero senza manco salutarmi. Io sto benissimo eh. Sto. Benissimooo.", b: [["Mi dispiace", 3], ["Cos'è quella porta?", 4]] },
      { t: "Nono tranqui, sono in fase healing. Infatti mi sono iscritta in palestraaa. Vibe da nuova me, bestie.", b: [["Che palestra?", 4]] },
      { t: "Raga hanno aperto una palestra fitness proprio qua accanto, iconicaaa. Però non si paga: per entrare servono le carte pokemon, almeno {n}. Tu ne hai {k}. Tipo club esclusivo, capito amio? Le regala Matteofino.", b: [["Ok, grazie", null]] }
    ],
    frasi: ["Amiooo", "Luigi chi? Mai sentito. Ok, sì.", "No vabbè, la palestra è troppo slay.", "Letteralmente sto morendooo.", "Cringiooo.", "Bestie, ti voglio bene."]
  };

  // La palestra accanto al bar: si entra solo con le carte.
  const palestra = {
    carteRichieste: 3,
    insegna: "FIT",
    chiusa: "Amiooo, è chiusaaa: servono almeno {n} carte diverse e tu ne hai {k}. Chiedile a Matteofino, bestie.",
    aperta: "Carte controllate. Benvenuto in palestra!",
    insegnaDentro: "PALESTRA POKEMON",
    sacco: ["Pam!", "Bam!", "Ahia!", "Ancora!", "Per Luigi!", "Slay!", "Taac!"],
    traguardi: { 10: "10 colpi! Matteofino sarebbe fiero.", 50: "50 colpi! Gaia ti mette like.", 100: "100 colpi! Sei il Re dei Corvi della palestra." }
  };

  // Massimino e Cristina, seduti al tavolino del caffè. chi: "m" = Massimino, "c" = Cristina.
  const tavolino = {
    massimino: { nome: "Massimino", ruolo: "Al tavolino" },
    cristina: { nome: "Cristina", ruolo: "Al tavolino" },
    passi: [
      { chi: "m", t: "Ah, che caffè. Il caffè del Re dei Corvi è il più buono di tutta la provincia, te lo dico io.", b: [["Davvero?", 1], ["Buon appetito", null]] },
      { chi: "c", t: "Buonissimo, Massimì. Però... non senti un retrogusto amaro? Tipo... ferro?", b: [["Amaro?", 2]] },
      { chi: "m", t: "Eh, sì. Dicono che il Re dei Corvi ci mette un goccio di sangue di traditori. Quelli che escono dal gruppo, hai capito. Caffè e sangue di traditori.", b: [["Ma dai!", 3], ["Che schifo", 3]] },
      { chi: "c", t: "Io però ho visto delle cose, sai? La sera prima del custode... c'era una luce vicino al teatro. E una persona con in mano un biglietto.", b: [["Un biglietto?", 4]] },
      { chi: "c", t: "Un biglietto del treno. Andata e basta, niente ritorno. Per... per...", b: [["Per dove?", 5]] },
      { chi: "c", pazzo: true, t: "AFRAGOLA. AFRAGOLA! AFRAGOLA AFRAGOLA AFRAGOLA AFRAGOLA!!!", b: [["Cristina?!", 6]] },
      { chi: "m", t: "Lasciala stare, le succede sempre al terzo caffè. Domani si ricorda tutto. Forse.", b: [["Ok...", null]] }
    ],
    frasiMassimino: ["Un altro caffè? Sì, grazie.", "Buono, eh. Amaro, ma buono.", "Non guardarla negli occhi quando dice Afragola."],
    frasiCristina: ["AFRAGOLA!", "Afragola... afragola...", "AFRAGOLA AFRAGOLA!", "Il biglietto... AFRAGOLA!"]
  };

  // Minni, barboncino toy nero col collare rosso. Ti porta all'armadietto.
  const minni = {
    nome: "Minni",
    bau: ["Bau bau!", "Bau!", "Bau bau bau!", "Wuf!"],
    porta: "Minni ti tira per i pantaloni verso il retrobottega...",
    chiuso: "Un vecchio armadietto di metallo, con le iniziali L.M. Minni ci abbaia contro. Toccalo per aprirlo.",
    aperto: "Dentro ci sono delle armi: un coltello, una mazza da baseball e una pistola. E un gancio vuoto: ne manca una...",
    etichetta: "L.M."
  };

  // Carmine, accanto a Gigio: parla solo tedesco.
  const carmine = {
    nome: "Carmine",
    chiamata: "Hallo! Guten Abend!",
    frasi: [
      "Guten Abend! Wo ist hier der Bahnhof?",
      "Ich verstehe nur Bahnhof.",
      "Das Wetter ist heute wirklich schrecklich.",
      "Entschuldigung, wo kann man hier einen guten Kaffee trinken?",
      "Ich heiße Carmine. Ich komme aus... ach, egal.",
      "Alles klar? Nein? Gut.",
      "Der Hund heißt Minni? Sehr schön.",
      "Mein Hovercraft ist voller Aale.",
      "Gigio sagt, ich habe eine große Zukunft. Ich glaube ihm nicht.",
      "Kartoffeln. Ich vermisse Kartoffeln."
    ]
  };

  // Vincenzo Artenzo, capopalestra. Nella lotta vince sempre lui.
  const vincenzo = {
    nome: "Vincenzo Artenzo", ruolo: "Capopalestra",
    chiamata: "Ehi tu! Sei qui per lottare?",
    passi: [
      { t: "Benvenuto nella mia palestra! Sembra un campo da pallavolo, eh? Sbagliato: questa è una palestra pokemon. Io sono Vincenzo Artenzo, il capopalestra.", b: [["Ti sfido!", 1], ["Che carte hai?", 2], ["Ciao", null]] },
      { t: "Uno contro uno. Tu hai le tue tre carte, io ne uso una sola. Basta e avanza. Pronto?", b: [["Lottiamo!", "@sfida"], ["Ci ripenso", null]] },
      { t: "Le mie le ho comprate da un tizio alla stazione di Afragola. Non stanno in nessun album. Sono... fortissime.", b: [["Ti sfido lo stesso!", 1], ["Ciao", null]] }
    ],
    carta: { id: "artenzone", nome: "Artenzone", tipo: "Fuoco", seed: 2718, pv: 999, liv: 100,
      att: [["Schiacciata Finale", 140], ["Muro a Tre", 70], ["Bagher Supremo", 100], ["Battuta Float", 55]] },
    testi: {
      sfida: "Il capopalestra Vincenzo Artenzo ti sfida!",
      manda: "Vincenzo manda in campo {n}!",
      vai: "Vai! {n}!",
      usa: "{n} usa {m}!",
      nemicoUsa: "{n} nemico usa {m}!",
      pocoEfficace: "Non è molto efficace...",
      brutto: "Brutto colpo!",
      resiste: "{n} resiste con 1 PV! Vincenzo ride.",
      cura: "Vincenzo usa un Hot Dog Carditese! {n} recupera tutti i PV!",
      esausta: "{n} è esausto!",
      prossima: "Scegli la prossima carta.",
      borsa: "Nella borsa hai solo un cornetto del Re dei Corvi. Non è il momento!",
      fuga: "Non puoi scappare da una sfida col capopalestra!",
      cambio: "Torna qui, {n}!",
      finite: "Non hai più carte in grado di lottare!",
      perso: "Hai perso contro Vincenzo Artenzo!",
      vince: ["Te l'avevo detto. Torna quando sarai più forte. Cioè mai.", "Bella partita. Per me.", "Ritenta. Io intanto mi alleno a schiacciare."]
    }
  };

  window.NONNA = { storie, saluti, risposte, custode, terry, angelo, risorto, narciso, teatro, terryPasseggio, fantasma, angioletto, matteofino, visco, carte, ragnetto, gigio, gaia, palestra, tavolino, minni, carmine, vincenzo, jediego, gigirish, storiaDelGiorno, riempi, oggiRoma, dataBella, scegli, giorni };
})();
