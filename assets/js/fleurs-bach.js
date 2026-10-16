/* Questionnaire « Quelle fleur de Bach pour mon compagnon ? » – FR / EN / DE / ES */
(function(){
  var root = document.getElementById('fdb');
  if(!root) return;
  var lang = (document.documentElement.lang || 'fr').slice(0,2);

  var icons = {
    peur:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 2-5 5v4c0 3 2 6 5 8 3-2 5-5 5-8V8c0-3-2-5-5-5z"/><circle cx="9.5" cy="10" r="0.6" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10" r="0.6" fill="currentColor" stroke="none"/></svg>',
    agressivite:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2-4 5-6 8-6s6 2 8 6"/><path d="M6 10 4 6m3 5-1-5m9 5 1-5m3 5 2-4"/></svg>',
    solitude:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v9M8 9l4 4 4-4"/><path d="M6 20c0-3 3-4 6-4s6 1 6 4"/></svg>',
    tristesse:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9 15c1-1.2 2-1.8 3-1.8s2 .6 3 1.8"/><circle cx="9" cy="9.5" r="0.6" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="0.6" fill="currentColor" stroke="none"/></svg>',
    changement:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 5l8 7"/><path d="M6 11v8h12v-8"/><path d="M10 19v-5h4v5"/></svg>',
    manies:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 1 3 6.2"/><path d="M4 12v5H9"/></svg>',
    choc:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 5 14h5l-1 8 9-13h-5l1-7z"/></svg>',
    jalousie:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>',
    energie:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 1 2.6 5.9"/><path d="M4 12l-1-4m1 4 4-1"/></svg>',
    apprentissage:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1V5z"/><path d="M12 6v13"/></svg>',
    soumission:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7l3 3 3-3"/><path d="M8 10c0 4 2 7 4 9 2-2 4-5 4-9"/></svg>',
    rancune:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12H4m0 0 3-3m-3 3 3 3"/><path d="M15 12h5m0 0-3-3m3 3-3 3"/></svg>',
    fatigue:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4a8 8 0 1 0 4 13 7 7 0 0 1-4-13z"/></svg>',
    rigidite:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M12 4v16M18 4v16"/></svg>',
    reperes:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M15 9l-2 5-5 2 2-5z"/></svg>',
    facade:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9 14c1 1 2 1.5 3 1.5s2-.5 3-1.5"/><circle cx="9" cy="9.5" r="0.6" fill="currentColor" stroke="none"/><circle cx="15" cy="9.5" r="0.6" fill="currentColor" stroke="none"/></svg>'
  };

  /* Structure commune : quelles fleurs pour quelle réponse (identique dans toutes les langues) */
  var CATS = [
    {id:'peur', o:[["Rock Rose","Mimulus"],["Mimulus","Larch"],["Aspen"],["Rescue"]]},
    {id:'agressivite', o:[["Vine","Water Violet"],["Vine","Chicory"],["Mimulus","Rock Rose"],["Red Chestnut","Cherry Plum"],["Beech"]]},
    {id:'solitude', o:[["Chicory","Heather"],["Chicory","Honeysuckle"],["Honeysuckle","Impatiens"]]},
    {id:'tristesse', o:[["Sweet Chestnut","Star of Bethlehem"],["Wild Rose","Gorse"],["Star of Bethlehem","Walnut"],["Mustard"],["Gentian"]]},
    {id:'changement', o:[["Walnut","Scleranthus"],["Walnut","Star of Bethlehem"],["Scleranthus","Star of Bethlehem"],["Star of Bethlehem","Walnut"],["Elm"]]},
    {id:'manies', o:[["Crab Apple","Chestnut Bud"],["Chestnut Bud","White Chestnut"],["White Chestnut","Chestnut Bud"]]},
    {id:'jalousie', o:[["Holly","Chicory"],["Holly"],["Holly","Cherry Plum"]]},
    {id:'energie', o:[["Vervain"],["Vervain","Impatiens"]]},
    {id:'apprentissage', o:[["Clematis","Chestnut Bud"],["Clematis"],["Chestnut Bud"]]},
    {id:'soumission', o:[["Centaury"],["Centaury","Larch"],["Cerato"],["Pine"]]},
    {id:'rancune', o:[["Willow"],["Willow","Holly"]]},
    {id:'fatigue', o:[["Hornbeam"],["Oak"],["Olive"]]},
    {id:'rigidite', o:[["Rock Water"]]},
    {id:'reperes', o:[["Wild Oat"]]},
    {id:'facade', o:[["Agrimony"]]},
    {id:'choc', direct:true}
  ];

  var T = {
  fr:{
    ui:{title:"Quelle fleur de Bach pour mon compagnon ?",
        sub:"Cochez tout ce qui correspond à votre chien ou votre chat, répondez aux quelques questions qui suivent, et découvrez les fleurs de Bach les plus en lien avec sa situation.",
        step1:"Étape 1", q1:"Quels comportements observez-vous chez votre animal ?", multi:"(plusieurs choix possibles)",
        cont:"Voir les questions", back:"← Revenir en arrière", res:"Résultat", restart:"Recommencer",
        qof:"Question {n} sur {t}", many:"Les fleurs les plus en lien avec la situation de votre animal :", one:"La fleur la plus en lien avec la situation de votre animal :",
        rescue:"Rescue s'utilise seul, sans être mélangé aux autres fleurs proposées ici.",
        note:"<strong>À savoir :</strong> pour la préparation du mélange et la posologie adaptée à votre animal, rapprochez-vous de votre pharmacien. Les fleurs de Bach sont un accompagnement doux et complémentaire ; elles ne remplacent en aucun cas un avis vétérinaire."},
    cats:{
      peur:["Peur, anxiété","Cette peur se manifeste plutôt...",["Face à des bruits forts (orage, feux d'artifice)","Face à une situation précise (vétérinaire, toiletteur, autres animaux)","Une peur diffuse, sans cause identifiable","Une peur si intense qu'il ou elle panique complètement"]],
      agressivite:["Agressivité","Cette agressivité est plutôt liée à...",["Une volonté de dominer, de commander","La défense du territoire ou des ressources (gamelle, jouets)","La peur — il ou elle mord pour se protéger","La protection de ses petits","Une intolérance, un agacement facile envers d'autres animaux"]],
      solitude:["Solitude, séparation","En votre absence — ou même en votre présence — il ou elle...",["Aboie, miaule ou détruit dès que vous partez","Réclame une présence constante, même quand vous êtes là","Semble abattu(e), cherche un repère familier"]],
      tristesse:["Tristesse, deuil","Cette tristesse est apparue...",["Après la perte d'un compagnon animal ou d'un proche","Sans cause identifiée, comme un vide, un manque d'entrain","Après un choc ou un événement marquant récent","Par épisodes, sans cause apparente, alternant avec des moments normaux","Après un échec ou un contretemps précis, mais passager"]],
      changement:["Changement de vie","Le changement concerné est...",["Un déménagement","L'arrivée d'un nouvel animal ou d'un bébé","Un transport, des vacances, un rendez-vous vétérinaire","Une adoption récente (refuge, ancien abandon)","De nouvelles responsabilités ou tâches qui le ou la dépassent"]],
      manies:["Comportements répétitifs","Le comportement observé est plutôt...",["Un léchage ou toilettage excessif","Une destruction répétée ou un comportement compulsif","Des gestes répétitifs, sans raison apparente"]],
      jalousie:["Jalousie","Cette jalousie se manifeste plutôt...",["Envers un nouvel animal ou un bébé arrivé récemment","Dès qu'un autre reçoit de l'attention","Par des réactions vives, voire agressives, envers le rival"]],
      energie:["Excès d'énergie, hyperactivité","Cet excès d'énergie se traduit par...",["Une agitation permanente, difficile à canaliser","De l'impatience et de la nervosité au quotidien"]],
      apprentissage:["Difficulté à apprendre, à se concentrer","Cette difficulté touche surtout...",["Le dressage ou l'apprentissage de nouvelles règles","La concentration, l'attention se disperse facilement","La répétition des mêmes erreurs malgré les rappels"]],
      soumission:["Soumission excessive","Face aux autres, votre animal...",["Se laisse dominer, n'ose jamais s'imposer","Cède facilement sa nourriture, ses jouets, sa place","Doute de son propre instinct, imite ou suit un autre animal ou une personne","Semble s'attendre à être grondé(e), comme s'il ou elle culpabilisait"]],
      rancune:["Bouderie, rancune","Après un conflit ou une punition, il ou elle...",["Boude, se montre distant pendant un moment","Semble garder rancune, réagit encore après coup"]],
      fatigue:["Fatigue, épuisement","Cette fatigue ou cet épuisement est plutôt...",["Un épuisement mental, un manque d'entrain à repartir après une maladie ou un effort","Une persévérance jusqu'à l'épuisement total, sans jamais lâcher","Un épuisement complet, sans force, besoin de repos"]],
      rigidite:["Rigidité, manque de souplesse","Cette rigidité se traduit par...",["Une grande discipline, du mal à se détendre, une certaine raideur physique"]],
      reperes:["Manque de repère, désorientation","Ce manque de repère se traduit par...",["Un animal qui semble chercher sa place, sans direction claire"]],
      facade:["Semble aller bien, mais quelque chose ne va pas","Cette façade enjouée se traduit par...",["Un animal qui paraît de bonne humeur alors qu'il souffre ou est mal à l'aise"]],
      choc:["Choc, urgence"]
    },
    fl:{
      "Rock Rose":"Pour la terreur, la panique intense face à un danger ressenti comme extrême.",
      "Mimulus":"Pour les peurs précises et identifiables (bruit, vétérinaire, personne, situation connue).",
      "Larch":"Pour le manque de confiance en soi, la passivité face à la dominance.",
      "Aspen":"Pour les peurs vagues, diffuses, sans cause identifiable.",
      "Vine":"Pour le besoin de dominer, de commander, d'imposer son autorité.",
      "Water Violet":"Pour la fierté et la tendance à se tenir à distance, en retrait.",
      "Chicory":"Pour le besoin excessif de présence et d'attention.",
      "Red Chestnut":"Pour l'inquiétude excessive à l'égard d'un proche (maître ou congénère).",
      "Cherry Plum":"Pour la perte de contrôle, les réactions soudaines et incontrôlées.",
      "Heather":"Pour la difficulté à rester seul, le besoin constant de compagnie.",
      "Honeysuckle":"Pour la nostalgie, l'attachement à un repère ou un moment passé.",
      "Impatiens":"Pour l'impatience, la nervosité, l'agitation.",
      "Sweet Chestnut":"Pour la détresse profonde, le sentiment d'être à bout.",
      "Star of Bethlehem":"Pour le choc et le traumatisme, digéré ou non, physique ou psychique.",
      "Wild Rose":"Pour la résignation, l'apathie, le manque d'entrain.",
      "Gorse":"Pour le découragement profond, la perte d'espoir.",
      "Walnut":"Pour accompagner l'adaptation à un changement de vie.",
      "Scleranthus":"Pour l'instabilité, l'indécision, l'humeur changeante.",
      "Crab Apple":"Pour le besoin de « nettoyage », un dégoût de soi ou d'une situation.",
      "Chestnut Bud":"Pour la difficulté à apprendre de ses erreurs, la répétition des mêmes schémas.",
      "White Chestnut":"Pour les pensées ou comportements qui tournent en boucle.",
      "Rescue":"Le mélange d'urgence, pour les chocs et les situations de stress intense. Ne se combine pas avec d'autres fleurs.",
      "Holly":"Pour la jalousie, la rivalité, l'esprit vindicatif envers un rival.",
      "Vervain":"Pour l'excès d'énergie, l'agitation permanente, la difficulté à se canaliser.",
      "Clematis":"Pour le manque de concentration, l'esprit qui se disperse facilement.",
      "Centaury":"Pour la soumission excessive, la difficulté à s'affirmer face aux autres.",
      "Willow":"Pour la rancune, le ressentiment, la tendance à bouder.",
      "Beech":"Pour l'intolérance, l'agacement facile envers le comportement des autres.",
      "Cerato":"Pour le doute envers son propre instinct, la tendance à imiter ou suivre autrui.",
      "Elm":"Pour le sentiment d'être débordé(e) par de nouvelles responsabilités ou tâches.",
      "Gentian":"Pour le découragement passager après un échec ou un contretemps précis.",
      "Mustard":"Pour une tristesse qui s'abat par épisodes, sans cause apparente.",
      "Hornbeam":"Pour la fatigue mentale, le manque d'entrain à repartir après une maladie ou un effort.",
      "Oak":"Pour la persévérance jusqu'à l'épuisement, sans jamais lâcher devant l'obstacle.",
      "Olive":"Pour l'épuisement complet, physique et mental, le grand besoin de repos.",
      "Pine":"Pour la culpabilité, la soumission, l'attente d'être grondé ou puni.",
      "Rock Water":"Pour la rigidité, le manque de souplesse, une discipline excessive.",
      "Wild Oat":"Pour le manque de repère ou de but clair, une forme de désorientation.",
      "Agrimony":"Pour l'animal qui semble aller bien en apparence, alors qu'il dissimule une souffrance ou un mal-être."
    }
  },
  en:{
    ui:{title:"Which Bach flower for my companion?",
        sub:"Tick everything that applies to your dog or cat, answer a few short questions, and discover the Bach flowers most closely linked to their situation.",
        step1:"Step 1", q1:"Which behaviors do you notice in your pet?", multi:"(several answers possible)",
        cont:"See the questions", back:"← Go back", res:"Result", restart:"Start again",
        qof:"Question {n} of {t}", many:"The flowers most closely linked to your pet's situation:", one:"The flower most closely linked to your pet's situation:",
        rescue:"Rescue is used on its own, without being mixed with the other flowers suggested here.",
        note:"<strong>Good to know:</strong> ask your pharmacist about preparing the mix and the right dosage for your pet. Bach flowers are a gentle, complementary support; they never replace veterinary advice."},
    cats:{
      peur:["Fear, anxiety","This fear shows up mainly...",["With loud noises (thunderstorms, fireworks)","In a specific situation (vet, groomer, other animals)","As a vague fear, with no identifiable cause","As a fear so intense that your pet panics completely"]],
      agressivite:["Aggression","This aggression is mainly linked to...",["A need to dominate, to be in charge","Guarding territory or resources (food bowl, toys)","Fear — your pet bites to protect itself","Protecting its young","Intolerance, being easily irritated by other animals"]],
      solitude:["Loneliness, separation","When you're away — or even when you're there — your pet...",["Barks, meows or destroys things as soon as you leave","Demands constant company, even when you're home","Seems down and looks for something familiar"]],
      tristesse:["Sadness, grief","This sadness appeared...",["After losing an animal companion or a loved one","For no identified reason, like an emptiness, a lack of enthusiasm","After a shock or a recent significant event","In episodes, for no apparent reason, alternating with normal periods","After a specific setback, but only temporarily"]],
      changement:["Life change","The change in question is...",["A house move","The arrival of a new animal or a baby","A journey, holidays, a vet appointment","A recent adoption (shelter, previously abandoned)","New responsibilities or tasks that overwhelm your pet"]],
      manies:["Repetitive behaviors","The behavior you notice is mainly...",["Excessive licking or grooming","Repeated destruction or compulsive behavior","Repetitive movements for no apparent reason"]],
      jalousie:["Jealousy","This jealousy shows up mainly...",["Toward a new animal or a baby who has recently arrived","As soon as someone else gets attention","Through strong, even aggressive, reactions toward the rival"]],
      energie:["Excess energy, hyperactivity","This excess energy shows as...",["Constant restlessness that is hard to channel","Everyday impatience and nervousness"]],
      apprentissage:["Difficulty learning or concentrating","This difficulty mainly concerns...",["Training or learning new rules","Concentration — attention wanders easily","Repeating the same mistakes despite reminders"]],
      soumission:["Excessive submissiveness","Around others, your pet...",["Lets others dominate and never dares to stand its ground","Easily gives up its food, toys or place","Doubts its own instinct, copies or follows another animal or person","Seems to expect to be scolded, as if it felt guilty"]],
      rancune:["Sulking, resentment","After a conflict or a reprimand, your pet...",["Sulks and keeps its distance for a while","Seems to hold a grudge and still reacts afterwards"]],
      fatigue:["Tiredness, exhaustion","This tiredness or exhaustion is mainly...",["Mental fatigue, a lack of energy to get going again after an illness or effort","Persevering to the point of total exhaustion, never giving up","Complete exhaustion, no strength left, a great need for rest"]],
      rigidite:["Rigidity, lack of flexibility","This rigidity shows as...",["Great self-discipline, difficulty relaxing, a certain physical stiffness"]],
      reperes:["Lack of bearings, disorientation","This lack of bearings shows as...",["A pet that seems to be looking for its place, with no clear direction"]],
      facade:["Seems fine, but something is wrong","This cheerful front shows as...",["A pet that seems in good spirits while actually suffering or feeling uneasy"]],
      choc:["Shock, emergency"]
    },
    fl:{
      "Rock Rose":"For terror, intense panic in the face of a danger felt as extreme.",
      "Mimulus":"For specific, identifiable fears (a noise, the vet, a person, a known situation).",
      "Larch":"For a lack of self-confidence, passivity when faced with dominance.",
      "Aspen":"For vague, diffuse fears with no identifiable cause.",
      "Vine":"For the need to dominate, to command, to impose authority.",
      "Water Violet":"For pride and a tendency to keep a distance, to stay aloof.",
      "Chicory":"For an excessive need for company and attention.",
      "Red Chestnut":"For excessive worry about someone close (owner or fellow animal).",
      "Cherry Plum":"For loss of control, sudden and uncontrolled reactions.",
      "Heather":"For difficulty being alone, a constant need for company.",
      "Honeysuckle":"For nostalgia, attachment to a familiar landmark or a past moment.",
      "Impatiens":"For impatience, nervousness, restlessness.",
      "Sweet Chestnut":"For deep distress, the feeling of being at the end of one's tether.",
      "Star of Bethlehem":"For shock and trauma, processed or not, physical or emotional.",
      "Wild Rose":"For resignation, apathy, lack of enthusiasm.",
      "Gorse":"For deep discouragement, loss of hope.",
      "Walnut":"To support adjustment to a life change.",
      "Scleranthus":"For instability, indecision, changeable mood.",
      "Crab Apple":"For a need to “cleanse”, a feeling of disgust toward oneself or a situation.",
      "Chestnut Bud":"For difficulty learning from mistakes, repeating the same patterns.",
      "White Chestnut":"For thoughts or behaviors that go round in circles.",
      "Rescue":"The emergency blend, for shocks and situations of intense stress. Not combined with other flowers.",
      "Holly":"For jealousy, rivalry, a vindictive attitude toward a rival.",
      "Vervain":"For excess energy, constant restlessness, difficulty settling down.",
      "Clematis":"For a lack of concentration, a mind that wanders easily.",
      "Centaury":"For excessive submissiveness, difficulty standing up for oneself.",
      "Willow":"For resentment, bearing grudges, a tendency to sulk.",
      "Beech":"For intolerance, being easily irritated by others' behavior.",
      "Cerato":"For doubting one's own instinct, a tendency to copy or follow others.",
      "Elm":"For feeling overwhelmed by new responsibilities or tasks.",
      "Gentian":"For temporary discouragement after a specific setback.",
      "Mustard":"For sadness that comes in episodes, for no apparent reason.",
      "Hornbeam":"For mental fatigue, lack of energy to get going again after an illness or effort.",
      "Oak":"For persevering to the point of exhaustion, never giving up in the face of obstacles.",
      "Olive":"For complete physical and mental exhaustion, a great need for rest.",
      "Pine":"For guilt, submissiveness, expecting to be scolded or punished.",
      "Rock Water":"For rigidity, lack of flexibility, excessive self-discipline.",
      "Wild Oat":"For a lack of bearings or clear purpose, a form of disorientation.",
      "Agrimony":"For an animal that seems fine on the surface while hiding pain or unease."
    }
  },
  de:{
    ui:{title:"Welche Bachblüte für meinen Begleiter?",
        sub:"Kreuzen Sie alles an, was auf Ihren Hund oder Ihre Katze zutrifft, beantworten Sie ein paar kurze Fragen und entdecken Sie die Bachblüten, die am besten zu seiner Situation passen.",
        step1:"Schritt 1", q1:"Welche Verhaltensweisen beobachten Sie bei Ihrem Tier?", multi:"(Mehrfachauswahl möglich)",
        cont:"Zu den Fragen", back:"← Zurück", res:"Ergebnis", restart:"Neu starten",
        qof:"Frage {n} von {t}", many:"Die Blüten, die am besten zur Situation Ihres Tieres passen:", one:"Die Blüte, die am besten zur Situation Ihres Tieres passt:",
        rescue:"Rescue wird allein verwendet und nicht mit den anderen hier vorgeschlagenen Blüten gemischt.",
        note:"<strong>Gut zu wissen:</strong> Für die Zubereitung der Mischung und die passende Dosierung für Ihr Tier wenden Sie sich bitte an Ihre Apotheke. Bachblüten sind eine sanfte, ergänzende Begleitung; sie ersetzen niemals den Rat einer Tierärztin oder eines Tierarztes."},
    cats:{
      peur:["Angst, Unruhe","Diese Angst zeigt sich vor allem ...",["Bei lauten Geräuschen (Gewitter, Feuerwerk)","In einer bestimmten Situation (Tierarzt, Hundefriseur, andere Tiere)","Als diffuse Angst ohne erkennbare Ursache","Als so starke Angst, dass das Tier völlig in Panik gerät"]],
      agressivite:["Aggression","Diese Aggression hängt vor allem zusammen mit ...",["Dem Wunsch zu dominieren, zu bestimmen","Der Verteidigung von Revier oder Ressourcen (Napf, Spielzeug)","Angst – das Tier beißt, um sich zu schützen","Dem Schutz seiner Jungen","Unverträglichkeit, schneller Gereiztheit gegenüber anderen Tieren"]],
      solitude:["Alleinsein, Trennung","Wenn Sie weg sind – oder sogar wenn Sie da sind – ...",["bellt, miaut oder zerstört es etwas, sobald Sie gehen","fordert es ständig Nähe, auch wenn Sie zu Hause sind","wirkt es niedergeschlagen und sucht etwas Vertrautes"]],
      tristesse:["Traurigkeit, Trauer","Diese Traurigkeit ist aufgetreten ...",["Nach dem Verlust eines tierischen Gefährten oder eines Menschen","Ohne erkennbaren Grund, wie eine Leere, ein Mangel an Antrieb","Nach einem Schock oder einem einschneidenden Ereignis","Phasenweise, ohne erkennbaren Grund, im Wechsel mit normalen Phasen","Nach einem bestimmten Rückschlag, aber nur vorübergehend"]],
      changement:["Veränderung im Leben","Die Veränderung ist ...",["Ein Umzug","Die Ankunft eines neuen Tieres oder eines Babys","Eine Reise, Urlaub, ein Tierarzttermin","Eine kürzliche Adoption (Tierheim, früher ausgesetzt)","Neue Aufgaben oder Anforderungen, die das Tier überfordern"]],
      manies:["Wiederholtes Verhalten","Das beobachtete Verhalten ist vor allem ...",["Übermäßiges Lecken oder Putzen","Wiederholtes Zerstören oder zwanghaftes Verhalten","Wiederholte Bewegungen ohne erkennbaren Grund"]],
      jalousie:["Eifersucht","Diese Eifersucht zeigt sich vor allem ...",["Gegenüber einem neuen Tier oder einem Baby, das kürzlich dazugekommen ist","Sobald jemand anderes Aufmerksamkeit bekommt","Durch heftige, sogar aggressive Reaktionen gegenüber dem Rivalen"]],
      energie:["Zu viel Energie, Hyperaktivität","Diese überschüssige Energie zeigt sich durch ...",["Ständige Unruhe, die schwer zu lenken ist","Ungeduld und Nervosität im Alltag"]],
      apprentissage:["Lern- und Konzentrationsschwierigkeiten","Diese Schwierigkeit betrifft vor allem ...",["Die Erziehung oder das Erlernen neuer Regeln","Die Konzentration – die Aufmerksamkeit schweift leicht ab","Das Wiederholen derselben Fehler trotz Erinnerungen"]],
      soumission:["Übermäßige Unterwürfigkeit","Gegenüber anderen ...",["lässt sich Ihr Tier dominieren und traut sich nie, sich durchzusetzen","gibt es sein Futter, sein Spielzeug oder seinen Platz leicht ab","zweifelt es an seinem eigenen Instinkt und ahmt ein anderes Tier oder einen Menschen nach","scheint es Schimpfe zu erwarten, als hätte es ein schlechtes Gewissen"]],
      rancune:["Schmollen, Groll","Nach einem Konflikt oder einer Zurechtweisung ...",["schmollt es und hält eine Weile Abstand","scheint es nachtragend zu sein und reagiert noch im Nachhinein"]],
      fatigue:["Müdigkeit, Erschöpfung","Diese Müdigkeit oder Erschöpfung ist vor allem ...",["Geistige Erschöpfung, fehlender Antrieb nach einer Krankheit oder Anstrengung","Durchhalten bis zur völligen Erschöpfung, ohne jemals aufzugeben","Völlige Erschöpfung, keine Kraft mehr, großes Ruhebedürfnis"]],
      rigidite:["Starrheit, fehlende Flexibilität","Diese Starrheit zeigt sich durch ...",["Große Selbstdisziplin, Mühe sich zu entspannen, eine gewisse körperliche Steifheit"]],
      reperes:["Orientierungslosigkeit","Diese fehlende Orientierung zeigt sich durch ...",["Ein Tier, das seinen Platz zu suchen scheint, ohne klare Richtung"]],
      facade:["Wirkt gut gelaunt, aber etwas stimmt nicht","Diese fröhliche Fassade zeigt sich durch ...",["Ein Tier, das gut gelaunt wirkt, obwohl es leidet oder sich unwohl fühlt"]],
      choc:["Schock, Notfall"]
    },
    fl:{
      "Rock Rose":"Bei Entsetzen, heftiger Panik angesichts einer als extrem empfundenen Gefahr.",
      "Mimulus":"Bei konkreten, benennbaren Ängsten (Geräusch, Tierarzt, Person, bekannte Situation).",
      "Larch":"Bei mangelndem Selbstvertrauen, Passivität gegenüber Dominanz.",
      "Aspen":"Bei unbestimmten, diffusen Ängsten ohne erkennbare Ursache.",
      "Vine":"Bei dem Bedürfnis zu dominieren, zu bestimmen, seine Autorität durchzusetzen.",
      "Water Violet":"Bei Stolz und der Neigung, auf Abstand zu bleiben und sich zurückzuziehen.",
      "Chicory":"Bei einem übermäßigen Bedürfnis nach Nähe und Aufmerksamkeit.",
      "Red Chestnut":"Bei übermäßiger Sorge um eine nahestehende Person oder ein anderes Tier.",
      "Cherry Plum":"Bei Kontrollverlust, plötzlichen und unkontrollierten Reaktionen.",
      "Heather":"Bei Schwierigkeiten, allein zu sein, dem ständigen Bedürfnis nach Gesellschaft.",
      "Honeysuckle":"Bei Heimweh, der Bindung an etwas Vertrautes oder an Vergangenes.",
      "Impatiens":"Bei Ungeduld, Nervosität, Unruhe.",
      "Sweet Chestnut":"Bei tiefer Verzweiflung, dem Gefühl, am Ende zu sein.",
      "Star of Bethlehem":"Bei Schock und Trauma, verarbeitet oder nicht, körperlich oder seelisch.",
      "Wild Rose":"Bei Resignation, Apathie, fehlender Lebensfreude.",
      "Gorse":"Bei tiefer Mutlosigkeit, Hoffnungslosigkeit.",
      "Walnut":"Zur Unterstützung bei der Anpassung an eine Veränderung im Leben.",
      "Scleranthus":"Bei Unausgeglichenheit, Unentschlossenheit, wechselnder Stimmung.",
      "Crab Apple":"Bei dem Bedürfnis nach „Reinigung“, Ekel vor sich selbst oder einer Situation.",
      "Chestnut Bud":"Bei der Schwierigkeit, aus Fehlern zu lernen, und der Wiederholung derselben Muster.",
      "White Chestnut":"Bei Gedanken oder Verhaltensweisen, die sich im Kreis drehen.",
      "Rescue":"Die Notfallmischung bei Schock und Situationen mit starkem Stress. Wird nicht mit anderen Blüten kombiniert.",
      "Holly":"Bei Eifersucht, Rivalität, Rachsucht gegenüber einem Rivalen.",
      "Vervain":"Bei überschüssiger Energie, ständiger Unruhe, der Schwierigkeit, zur Ruhe zu kommen.",
      "Clematis":"Bei mangelnder Konzentration, leicht abschweifender Aufmerksamkeit.",
      "Centaury":"Bei übermäßiger Unterwürfigkeit, der Schwierigkeit, sich gegenüber anderen zu behaupten.",
      "Willow":"Bei Groll, Verbitterung, der Neigung zu schmollen.",
      "Beech":"Bei Intoleranz, schneller Gereiztheit über das Verhalten anderer.",
      "Cerato":"Bei Zweifeln am eigenen Instinkt, der Neigung, andere nachzuahmen oder ihnen zu folgen.",
      "Elm":"Bei dem Gefühl, von neuen Aufgaben oder Anforderungen überfordert zu sein.",
      "Gentian":"Bei vorübergehender Entmutigung nach einem bestimmten Rückschlag.",
      "Mustard":"Bei Traurigkeit, die phasenweise und ohne erkennbaren Grund auftritt.",
      "Hornbeam":"Bei geistiger Müdigkeit, fehlendem Antrieb nach einer Krankheit oder Anstrengung.",
      "Oak":"Bei Durchhalten bis zur Erschöpfung, ohne vor Hindernissen jemals aufzugeben.",
      "Olive":"Bei völliger körperlicher und geistiger Erschöpfung, großem Ruhebedürfnis.",
      "Pine":"Bei Schuldgefühlen, Unterwürfigkeit, der Erwartung, geschimpft oder bestraft zu werden.",
      "Rock Water":"Bei Starrheit, fehlender Flexibilität, übertriebener Selbstdisziplin.",
      "Wild Oat":"Bei fehlender Orientierung oder fehlendem klaren Ziel, einer Form von Ziellosigkeit.",
      "Agrimony":"Für das Tier, das nach außen gut gelaunt wirkt, aber Schmerzen oder Unbehagen verbirgt."
    }
  },
  es:{
    ui:{title:"¿Qué flor de Bach para mi compañero?",
        sub:"Marca todo lo que se aplique a tu perro o a tu gato, responde a unas pocas preguntas y descubre las flores de Bach más relacionadas con su situación.",
        step1:"Paso 1", q1:"¿Qué comportamientos observas en tu animal?", multi:"(puedes elegir varias opciones)",
        cont:"Ver las preguntas", back:"← Volver atrás", res:"Resultado", restart:"Empezar de nuevo",
        qof:"Pregunta {n} de {t}", many:"Las flores más relacionadas con la situación de tu animal:", one:"La flor más relacionada con la situación de tu animal:",
        rescue:"Rescue se utiliza sola, sin mezclarla con las demás flores propuestas aquí.",
        note:"<strong>Ten en cuenta:</strong> para preparar la mezcla y la dosis adecuada para tu animal, consulta con tu farmacéutico. Las flores de Bach son un acompañamiento suave y complementario; en ningún caso sustituyen la opinión de un veterinario."},
    cats:{
      peur:["Miedo, ansiedad","Este miedo aparece sobre todo...",["Ante ruidos fuertes (tormentas, fuegos artificiales)","Ante una situación concreta (veterinario, peluquería, otros animales)","Como un miedo difuso, sin causa identificable","Como un miedo tan intenso que entra en pánico total"]],
      agressivite:["Agresividad","Esta agresividad está relacionada sobre todo con...",["Querer dominar, mandar","La defensa del territorio o de sus recursos (comedero, juguetes)","El miedo: muerde para protegerse","La protección de sus crías","La intolerancia, irritarse con facilidad ante otros animales"]],
      solitude:["Soledad, separación","Cuando no estás —o incluso cuando estás—, tu animal...",["Ladra, maúlla o destroza cosas en cuanto te vas","Reclama tu presencia constantemente, incluso cuando estás en casa","Parece decaído y busca algo familiar"]],
      tristesse:["Tristeza, duelo","Esta tristeza apareció...",["Tras la pérdida de un compañero animal o de un ser querido","Sin causa identificada, como un vacío, una falta de ánimo","Tras un susto o un acontecimiento importante reciente","Por episodios, sin causa aparente, alternando con momentos normales","Tras un fracaso o un contratiempo concreto, pero pasajero"]],
      changement:["Cambio de vida","El cambio en cuestión es...",["Una mudanza","La llegada de un nuevo animal o de un bebé","Un viaje, unas vacaciones, una cita en el veterinario","Una adopción reciente (protectora, abandono anterior)","Nuevas responsabilidades o tareas que lo superan"]],
      manies:["Comportamientos repetitivos","El comportamiento observado es sobre todo...",["Un lamido o aseo excesivo","Destrozos repetidos o un comportamiento compulsivo","Gestos repetitivos, sin motivo aparente"]],
      jalousie:["Celos","Estos celos aparecen sobre todo...",["Hacia un nuevo animal o un bebé que ha llegado hace poco","En cuanto otro recibe atención","Con reacciones intensas, incluso agresivas, hacia el rival"]],
      energie:["Exceso de energía, hiperactividad","Este exceso de energía se traduce en...",["Una agitación constante, difícil de canalizar","Impaciencia y nerviosismo en el día a día"]],
      apprentissage:["Dificultad para aprender o concentrarse","Esta dificultad afecta sobre todo a...",["La educación o el aprendizaje de nuevas normas","La concentración: la atención se dispersa fácilmente","Repetir los mismos errores a pesar de los recordatorios"]],
      soumission:["Sumisión excesiva","Frente a los demás, tu animal...",["Se deja dominar y nunca se atreve a imponerse","Cede fácilmente su comida, sus juguetes o su sitio","Duda de su propio instinto, imita o sigue a otro animal o a una persona","Parece esperar una regañina, como si se sintiera culpable"]],
      rancune:["Enfurruñarse, rencor","Tras un conflicto o un castigo, tu animal...",["Se enfurruña y se mantiene distante un rato","Parece guardar rencor y sigue reaccionando después"]],
      fatigue:["Cansancio, agotamiento","Este cansancio o agotamiento es sobre todo...",["Un cansancio mental, falta de ánimo para recuperarse tras una enfermedad o un esfuerzo","Una perseverancia hasta el agotamiento total, sin rendirse nunca","Un agotamiento completo, sin fuerzas, con gran necesidad de descanso"]],
      rigidite:["Rigidez, falta de flexibilidad","Esta rigidez se traduce en...",["Mucha disciplina, dificultad para relajarse, cierta rigidez física"]],
      reperes:["Falta de referencias, desorientación","Esta falta de referencias se traduce en...",["Un animal que parece buscar su sitio, sin una dirección clara"]],
      facade:["Parece estar bien, pero algo no va bien","Esta fachada alegre se traduce en...",["Un animal que parece de buen humor aunque sufre o está incómodo"]],
      choc:["Susto, urgencia"]
    },
    fl:{
      "Rock Rose":"Para el terror, el pánico intenso ante un peligro sentido como extremo.",
      "Mimulus":"Para los miedos concretos e identificables (un ruido, el veterinario, una persona, una situación conocida).",
      "Larch":"Para la falta de confianza en sí mismo, la pasividad ante la dominancia.",
      "Aspen":"Para los miedos vagos, difusos, sin causa identificable.",
      "Vine":"Para la necesidad de dominar, de mandar, de imponer su autoridad.",
      "Water Violet":"Para el orgullo y la tendencia a mantenerse a distancia, apartado.",
      "Chicory":"Para la necesidad excesiva de compañía y de atención.",
      "Red Chestnut":"Para la preocupación excesiva por alguien cercano (su persona u otro animal).",
      "Cherry Plum":"Para la pérdida de control, las reacciones repentinas e incontroladas.",
      "Heather":"Para la dificultad de quedarse solo, la necesidad constante de compañía.",
      "Honeysuckle":"Para la nostalgia, el apego a una referencia o a un momento pasado.",
      "Impatiens":"Para la impaciencia, el nerviosismo, la agitación.",
      "Sweet Chestnut":"Para la angustia profunda, la sensación de no poder más.",
      "Star of Bethlehem":"Para el susto y el trauma, superado o no, físico o emocional.",
      "Wild Rose":"Para la resignación, la apatía, la falta de ánimo.",
      "Gorse":"Para el desánimo profundo, la pérdida de esperanza.",
      "Walnut":"Para acompañar la adaptación a un cambio de vida.",
      "Scleranthus":"Para la inestabilidad, la indecisión, el humor cambiante.",
      "Crab Apple":"Para la necesidad de «limpieza», el rechazo hacia sí mismo o hacia una situación.",
      "Chestnut Bud":"Para la dificultad de aprender de los errores, la repetición de los mismos patrones.",
      "White Chestnut":"Para los pensamientos o comportamientos que se repiten en bucle.",
      "Rescue":"La mezcla de urgencia, para los sustos y las situaciones de estrés intenso. No se combina con otras flores.",
      "Holly":"Para los celos, la rivalidad, el espíritu vengativo hacia un rival.",
      "Vervain":"Para el exceso de energía, la agitación constante, la dificultad para calmarse.",
      "Clematis":"Para la falta de concentración, la mente que se dispersa con facilidad.",
      "Centaury":"Para la sumisión excesiva, la dificultad para imponerse ante los demás.",
      "Willow":"Para el rencor, el resentimiento, la tendencia a enfurruñarse.",
      "Beech":"Para la intolerancia, la irritación fácil ante el comportamiento de los demás.",
      "Cerato":"Para la duda sobre su propio instinto, la tendencia a imitar o seguir a otros.",
      "Elm":"Para la sensación de verse desbordado por nuevas responsabilidades o tareas.",
      "Gentian":"Para el desánimo pasajero tras un fracaso o un contratiempo concreto.",
      "Mustard":"Para una tristeza que llega por episodios, sin causa aparente.",
      "Hornbeam":"Para el cansancio mental, la falta de ánimo para recuperarse tras una enfermedad o un esfuerzo.",
      "Oak":"Para la perseverancia hasta el agotamiento, sin rendirse nunca ante los obstáculos.",
      "Olive":"Para el agotamiento total, físico y mental, la gran necesidad de descanso.",
      "Pine":"Para la culpa, la sumisión, la espera de una regañina o un castigo.",
      "Rock Water":"Para la rigidez, la falta de flexibilidad, una disciplina excesiva.",
      "Wild Oat":"Para la falta de referencias o de un objetivo claro, una forma de desorientación.",
      "Agrimony":"Para el animal que parece estar bien en apariencia, mientras oculta un sufrimiento o un malestar."
    }
  }
  };

  var t = T[lang] || T.fr;
  var ui = t.ui;

  root.innerHTML =
    '<div class="fdb-wrap">'+
      '<div class="fdb-masthead"><h2 class="fdb-title">'+ui.title+'</h2><p class="fdb-sub">'+ui.sub+'</p></div>'+
      '<div class="fdb-trail"><div class="fdb-trail-dot active" data-dot="1"></div><div class="fdb-trail-dot" data-dot="2"></div><div class="fdb-trail-dot" data-dot="3"></div></div>'+
      '<div class="fdb-card">'+
        '<div class="fdb-screen active" id="fdbStep1"><div class="fdb-step-label">'+ui.step1+'</div>'+
          '<p class="fdb-question">'+ui.q1+' <span style="font-weight:400;font-size:13px;color:#8a7a6a;">'+ui.multi+'</span></p>'+
          '<div class="fdb-grid" id="fdbCategoryGrid"></div>'+
          '<div class="fdb-nav"><span></span><button class="fdb-restart-btn" id="fdbContinueBtn" disabled>'+ui.cont+'</button></div></div>'+
        '<div class="fdb-screen" id="fdbStep2"><div class="fdb-step-label" id="fdbStep2Label"></div><p class="fdb-question" id="fdbRefineQuestion"></p>'+
          '<div class="fdb-list" id="fdbRefineList"></div><div class="fdb-nav"><button class="fdb-back" id="fdbBackBtn">'+ui.back+'</button></div></div>'+
        '<div class="fdb-screen" id="fdbStep3"><div class="fdb-step-label">'+ui.res+'</div><p class="fdb-question" id="fdbResultTitle"></p>'+
          '<div class="fdb-result-flowers" id="fdbResultFlowers"></div><p class="fdb-note">'+ui.note+'</p>'+
          '<div class="fdb-nav"><span></span><button class="fdb-restart-btn" id="fdbRestartBtn">'+ui.restart+'</button></div></div>'+
      '</div>'+
    '</div>';

  var selected = [], queue = [], qi = 0, answers = [], rescueTriggered = false;
  var step1 = document.getElementById('fdbStep1'), step2 = document.getElementById('fdbStep2'), step3 = document.getElementById('fdbStep3');
  var grid = document.getElementById('fdbCategoryGrid'), refineQ = document.getElementById('fdbRefineQuestion');
  var refineList = document.getElementById('fdbRefineList'), step2Label = document.getElementById('fdbStep2Label');
  var resultTitle = document.getElementById('fdbResultTitle'), resultFlowers = document.getElementById('fdbResultFlowers');
  var continueBtn = document.getElementById('fdbContinueBtn'), dots = root.querySelectorAll('.fdb-trail-dot');

  function setDot(n){ dots.forEach(function(d){ var i=+d.dataset.dot; d.classList.remove('active','done'); if(i<n)d.classList.add('done'); if(i===n)d.classList.add('active'); }); }
  function show(el){ [step1,step2,step3].forEach(function(s){s.classList.remove('active')}); el.classList.add('active'); root.scrollIntoView({behavior:'smooth',block:'start'}); }
  function catById(id){ for(var i=0;i<CATS.length;i++) if(CATS[i].id===id) return CATS[i]; }

  CATS.forEach(function(cat){
    var b = document.createElement('button');
    b.type='button'; b.className='fdb-option';
    b.innerHTML = '<span class="fdb-option-icon">'+icons[cat.id]+'</span><span>'+t.cats[cat.id][0]+'</span>';
    b.addEventListener('click', function(){
      b.classList.toggle('checked');
      var idx = selected.indexOf(cat.id);
      if(b.classList.contains('checked') && idx===-1) selected.push(cat.id);
      else if(!b.classList.contains('checked') && idx!==-1) selected.splice(idx,1);
      continueBtn.disabled = selected.length===0;
    });
    grid.appendChild(b);
  });

  continueBtn.addEventListener('click', function(){
    if(!selected.length) return;
    queue = selected.map(catById).filter(function(c){return !c.direct});
    rescueTriggered = selected.some(function(id){return catById(id).direct});
    qi = 0; answers = new Array(queue.length).fill(null);
    if(!queue.length) showResult(); else { setDot(2); ask(); }
  });

  function ask(){
    var cat = queue[qi], tx = t.cats[cat.id];
    step2Label.textContent = ui.qof.replace('{n}', qi+1).replace('{t}', queue.length);
    refineQ.textContent = tx[1];
    refineList.innerHTML = '';
    cat.o.forEach(function(flowers, i){
      var b = document.createElement('button');
      b.type='button'; b.className='fdb-option'; b.textContent = tx[2][i];
      if(answers[qi]===flowers) b.classList.add('checked');
      b.addEventListener('click', function(){ answers[qi]=flowers; qi++; if(qi<queue.length) ask(); else showResult(); });
      refineList.appendChild(b);
    });
    show(step2);
  }

  document.getElementById('fdbBackBtn').addEventListener('click', function(){
    if(qi>0){ answers[qi]=null; qi--; ask(); } else { setDot(1); show(step1); }
  });

  function top(list, max){
    var freq={}, order=[];
    list.forEach(function(n){ if(!(n in freq)){freq[n]=0;order.push(n);} freq[n]++; });
    order.sort(function(a,b){ return freq[b]-freq[a] || list.indexOf(a)-list.indexOf(b); });
    return order.slice(0,max);
  }

  function showResult(){
    var all = answers.reduce(function(acc,f){ return f ? acc.concat(f) : acc; }, []);
    /* correction : Rescue choisi dans une réponse (ex. panique) doit aussi apparaître */
    var rescue = rescueTriggered || all.indexOf('Rescue') !== -1;
    var others = top(all.filter(function(f){return f!=='Rescue'}), 3);
    var list = rescue ? ['Rescue'].concat(others) : others;
    resultTitle.textContent = list.length>1 ? ui.many : ui.one;
    resultFlowers.innerHTML = '';
    list.forEach(function(name){
      var row = document.createElement('div'); row.className='fdb-flower';
      row.innerHTML = '<span class="fdb-flower-badge">'+name.charAt(0)+'</span><div><p class="fdb-flower-name">'+name+'</p><p class="fdb-flower-desc">'+(t.fl[name]||'')+'</p></div>';
      resultFlowers.appendChild(row);
    });
    if(rescue && others.length){
      var n=document.createElement('p'); n.style.cssText='font-size:12.5px;color:#8a7a6a;margin:-6px 0 4px'; n.textContent=ui.rescue; resultFlowers.appendChild(n);
    }
    setDot(3); show(step3);
  }

  document.getElementById('fdbRestartBtn').addEventListener('click', function(){
    selected=[]; queue=[]; qi=0; answers=[]; rescueTriggered=false;
    grid.querySelectorAll('.fdb-option').forEach(function(b){b.classList.remove('checked')});
    continueBtn.disabled=true; setDot(1); show(step1);
  });
})();
