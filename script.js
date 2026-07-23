// --- SISTEMA DE AUDIO PULIDO (WEB AUDIO API) ---
const AudioJuego = {
  ctx: null,
  init() {
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    } catch (e) {
      console.log("AudioContext no soportado");
    }
  },
  playClick() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sine";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        400,
        this.ctx.currentTime + 0.04,
      );

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + 0.04,
      );

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  },
  playExito() {
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      this.crearNotaModerna(523.25, t, 0.12);
      this.crearNotaModerna(659.25, t + 0.04, 0.12);
      this.crearNotaModerna(783.99, t + 0.08, 0.12);
      this.crearNotaModerna(987.77, t + 0.12, 0.25);
    } catch (e) {}
  },
  playVictoria() {
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const notas = [
        523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5,
      ];
      notas.forEach((frec, i) => {
        this.crearNotaModerna(frec, t + i * 0.06, 0.3);
      });
    } catch (e) {}
  },
  crearNotaModerna(frecuencia, inicio, duracion) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = "triangle";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, inicio);
    filter.frequency.exponentialRampToValueAtTime(1000, inicio + duracion);

    osc.frequency.setValueAtTime(frecuencia, inicio);
    gain.gain.setValueAtTime(0.04, inicio);
    gain.gain.exponentialRampToValueAtTime(0.001, inicio + duracion);

    osc.start(inicio);
    osc.stop(inicio + duracion);
  },
};

const IDIOMAS_INFO = {
  es: "Español",
  en: "English",
  pt: "Português",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
};

// Todo el contenido traducible del juego (textos de interfaz, nombres y
// descripciones de categoría, y los bancos de palabras) vive acá, uno por
// idioma. Se generó traduciendo el contenido original en español.
const datosIdiomas = {"es":{"textosUI":{"brand":"Sopa de Letras","subtituloInicio":"Selecciona una categoría de juego","crearCategoriaTitulo":"Crear categoría","crearCategoriaDesc":"Agregá tus propios temas y palabras","mejoresTiempos":"🏆 Mejores Tiempos","sinPartidas":"No hay partidas registradas","recordGlobal":"Record Global","botonPista":"💡 Pista","botonMenu":"Menu","editorDescLarga":"Elegí un nombre, un ícono y las palabras que quieras. No hace falta que tengan el mismo largo, el juego las acomoda solo.","labelNombreCat":"Nombre de la categoría","labelIconoCat":"Ícono (un emoji, opcional)","labelPalabrasCat":"Palabras (una por línea o separadas por coma)","placeholderNombreCat":"Ej: Deportes, Cocina, Series...","placeholderPalabrasCat":"FUTBOL, BASQUET, TENIS, NATACION, MARATON...","botonGuardarCat":"Guardar categoría","botonCancelar":"Cancelar","errNombreVacio":"Ponele un nombre a la categoría.","errPocasPalabras":"Cargá al menos 3 palabras válidas (2 a 18 letras, sin espacios ni números).","palabrasPersonalizadasSufijo":"palabras personalizadas","confirmarBorrar":"¿Borrar la categoría \"{nombre}\"?","ajustesTitulo":"Ajustes","ajustesIdioma":"Idioma","ajustesTipografia":"Tipografía","ajustesNegrita":"Negrita","ajustesAdblock":"Bloqueador de anuncios","ajustesProximamente":"próximamente","tipografiaSistema":"Predeterminada","tipografiaSerif":"Serif","tipografiaMono":"Monoespaciada","tipografiaRedondeada":"Redondeada","modoOscuro":"Modo oscuro","modoClaro":"Modo claro","editarTitle":"Editar","borrarTitle":"Borrar"},"nombresCategorias":{"web":"Desarrollo Web","datos":"Bases de Datos","seguridad":"Seguridad","ia":"Inteligencia Artificial","cloud":"Cloud & DevOps","diseno":"Diseño UI/UX","historia":"Historia","astronomia":"Astronomía","arte":"Arte y Cultura","geografia":"Geografía","ciencia":"Ciencia y Naturaleza","mitologia":"Mitología"},"descripcionesCategorias":{"web":"Frontend, Frameworks y navegadores","datos":"SQL, almacenamiento y servidores","seguridad":"Cifrado, tokens y protocolos web","ia":"Algoritmos, modelos y machine learning","cloud":"Contenedores, despliegues e infraestructura","diseno":"Interfaces, usabilidad y herramientas de diseño","historia":"Civilizaciones, imperios y grandes eventos","astronomia":"Planetas, estrellas y el universo","arte":"Pintura, música, cine y literatura","geografia":"Países, montañas, ríos y océanos","ciencia":"Biología, física y el mundo natural","mitologia":"Dioses, héroes y leyendas antiguas"},"categoriasJuego":{"web":["JAVASCRIPT","FRONTEND","BACKEND","REACT","ANGULAR","NODEJS","HTML","CSS","API","JSON","DOM","SERVER","DATABASE","HOSTING","FRAMEWORK","DEPLOY","GIT","GITHUB","URL","BROWSER","COOKIE","SCRIPT","FLEXBOX","GRID","RESPONSIVE","TYPESCRIPT","WEBPACK","VUEJS","SASS","BOOTSTRAP","ROUTING","COMPONENTE","RENDER","NAVEGADOR","LOCALSTORAGE","FETCH","ASYNC","PROMESA","MODULO","COMPILADOR"],"datos":["MYSQL","POSTGRES","MONGODB","ORACLE","QUERY","INDEX","SCHEMA","BACKUP","TABLE","COLUMN","KEY","JOIN","SELECT","INSERT","UPDATE","DELETE","DATABASE","CLUSTER","REDIS","SQLITE","PROCEDURE","TRIGGER","NOSQL","BIGDATA","STORAGE","CACHE","REPLICA","SHARDING","NORMALIZACION","TRANSACCION","CONSULTA","VISTA","MODELO","RELACIONAL","PARTICION","LATENCIA","ESCALABILIDAD","MIGRACION","RESPALDO","SENTENCIA"],"seguridad":["CIPHER","TOKEN","FIREWALL","MALWARE","PHISHING","HTTPS","SSL","CRYPTO","HASH","PASSWORD","AUTH","DECRYPT","ENCRYPT","PROXY","HACKER","COOKIES","ROUTER","VPN","SALTING","CAPTCHA","JWT","SECURITY","EXPLOIT","CYBER","BACKDOOR","RANSOMWARE","KEYLOGGER","SPYWARE","INTRUSION","VULNERABILIDAD","PENTEST","BIOMETRIA","ANTIVIRUS","INCOGNITO","SANDBOX","CERTIFICADO","AUTENTICACION","PROTOCOLO","INGENIERIA","SPOOFING"],"ia":["ALGORITMO","NEURONAL","DATASET","MODELO","PYTHON","TENSORFLOW","PYTORCH","CHATBOT","PROMPT","INFERENCIA","CLASIFICADOR","REGRESION","CLUSTERING","OVERFITTING","GRADIENTE","EMBEDDING","TRANSFORMER","TOKEN","VISION","NEURONA","ENTRENAMIENTO","ROBOTICA","AUTOMATIZACION","REDES","PERCEPTRON","RECURRENTE","SUPERVISADO","APRENDIZAJE","PREDICCION","GENERATIVA","DEEPLEARNING","CHATGPT","BIAS","FEATURE","ETIQUETA","PRECISION"],"cloud":["DOCKER","KUBERNETES","CONTAINER","PIPELINE","JENKINS","TERRAFORM","AWS","AZURE","SERVERLESS","MICROSERVICIO","DEVOPS","CICD","NUBE","ESCALABILIDAD","LOADBALANCER","MONITOREO","LATENCIA","VIRTUALIZACION","ORQUESTACION","BACKUP","CLUSTER","NODO","DEPLOYMENT","INFRAESTRUCTURA","HELM","ANSIBLE","VAGRANT","GITOPS","OBSERVABILIDAD","TOLERANCIA","REPLICACION","ESCALADO","REGISTRO","IMAGEN","YAML","SECRETO","NAMESPACE","HIBRIDA"],"diseno":["WIREFRAME","PROTOTIPO","USABILIDAD","TIPOGRAFIA","PALETA","FIGMA","LAYOUT","RESPONSIVE","ACCESIBILIDAD","INTERFAZ","EXPERIENCIA","COMPONENTE","GRILLA","CONTRASTE","JERARQUIA","MOCKUP","ICONOGRAFIA","BRANDING","MINIMALISMO","INTERACCION","NAVEGACION","COLORIMETRIA","ESPACIADO","MOODBOARD","SKETCH","TENDENCIA","ESTILO","PLANTILLA","BREAKPOINT","VIEWPORT","PIXEL","VECTORIAL","ANIMACION","TRANSICION","USUARIO","PERSONA","CONSISTENCIA"],"historia":["EGIPTO","ROMA","GRECIA","IMPERIO","GUERRA","REVOLUCION","CIVILIZACION","FARAON","PIRAMIDE","VIKINGO","CONQUISTA","COLONIA","MONARQUIA","REPUBLICA","INDEPENDENCIA","RENACIMIENTO","ARQUEOLOGIA","GLADIADOR","CASTILLO","DINASTIA","MEDIEVAL","ANTIGUEDAD","ESCLAVITUD","TRATADO","BATALLA","EJERCITO","MONUMENTO","MOMIA","JEROGLIFICO","ESPARTA","ATENAS","BIZANTINO","FEUDALISMO","CRUZADAS","EMPERADOR"],"astronomia":["GALAXIA","PLANETA","ESTRELLA","COMETA","ASTEROIDE","NEBULOSA","SATELITE","TELESCOPIO","ORBITA","GRAVEDAD","UNIVERSO","ECLIPSE","METEORITO","SUPERNOVA","MARTE","VENUS","JUPITER","SATURNO","MERCURIO","URANO","NEPTUNO","PLUTON","LUNA","ASTRONAUTA","COHETE","CONSTELACION","ROTACION","TRASLACION","ATMOSFERA","CRATER","ASTRONOMO","OBSERVATORIO"],"arte":["PINTURA","ESCULTURA","MUSICA","LITERATURA","CINE","TEATRO","POESIA","NOVELA","MELODIA","ARMONIA","ORQUESTA","SINFONIA","PINTOR","ESCRITOR","ACTOR","DIRECTOR","GUION","RETRATO","MURAL","FRESCO","BALLET","OPERA","JAZZ","FOLKLORE","PATRIMONIO","MUSEO","GALERIA","EXPOSICION","COMPOSITOR","DRAMATURGO","ACUARELA"],"geografia":["CONTINENTE","OCEANO","CORDILLERA","RIO","DESIERTO","VOLCAN","ISLA","PENINSULA","GLACIAR","SABANA","SELVA","BOSQUE","LAGO","VALLE","METEOROLOGIA","CLIMA","LATITUD","LONGITUD","ECUADOR","HEMISFERIO","CAPITAL","FRONTERA","POBLACION","ARCHIPIELAGO","ATLAS","CARTOGRAFIA","TERRITORIO","PAISAJE","ALTIPLANO","ESTEPA","TUNDRA"],"ciencia":["BIOLOGIA","FISICA","QUIMICA","CELULA","GENETICA","EVOLUCION","ECOSISTEMA","FOTOSINTESIS","MOLECULA","ATOMO","ELEMENTO","ENERGIA","MAGNETISMO","ELECTRICIDAD","BACTERIA","VIRUS","MAMIFERO","REPTIL","ANFIBIO","INVERTEBRADO","HABITAT","BIODIVERSIDAD","OXIGENO","HIDROGENO","PROTEINA","ENZIMA","CROMOSOMA","METABOLISMO","ORGANISMO"],"mitologia":["ZEUS","HERCULES","ATENEA","POSEIDON","HADES","APOLO","ARTEMISA","AFRODITA","ARES","HERMES","DIONISO","OLIMPO","TITAN","CICLOPE","MINOTAURO","ESFINGE","PEGASO","ODISEA","TROYA","MEDUSA","CENTAURO","ORACULO","NINFA","SIRENA","DRAGON","VALHALLA","ODIN","THOR","LOKI","MITOLOGIA"]}},"en":{"textosUI":{"brand":"Word Search","subtituloInicio":"Choose a game category","crearCategoriaTitulo":"Create category","crearCategoriaDesc":"Add your own topics and words","mejoresTiempos":"🏆 Best Times","sinPartidas":"No games recorded yet","recordGlobal":"Global Record","botonPista":"💡 Hint","botonMenu":"Menu","editorDescLarga":"Pick a name, an icon and the words you want. They don't need to be the same length — the game arranges them automatically.","labelNombreCat":"Category name","labelIconoCat":"Icon (an emoji, optional)","labelPalabrasCat":"Words (one per line or comma-separated)","placeholderNombreCat":"E.g: Sports, Cooking, TV Shows...","placeholderPalabrasCat":"SOCCER, BASKETBALL, TENNIS, SWIMMING, MARATHON...","botonGuardarCat":"Save category","botonCancelar":"Cancel","errNombreVacio":"Give the category a name.","errPocasPalabras":"Add at least 3 valid words (2 to 18 letters, no spaces or numbers).","palabrasPersonalizadasSufijo":"custom words","confirmarBorrar":"Delete the category \"{nombre}\"?","ajustesTitulo":"Settings","ajustesIdioma":"Language","ajustesTipografia":"Typography","ajustesNegrita":"Bold","ajustesAdblock":"Ad blocker","ajustesProximamente":"coming soon","tipografiaSistema":"Default","tipografiaSerif":"Serif","tipografiaMono":"Monospace","tipografiaRedondeada":"Rounded","modoOscuro":"Dark mode","modoClaro":"Light mode","editarTitle":"Edit","borrarTitle":"Delete"},"nombresCategorias":{"web":"Web Development","datos":"Databases","seguridad":"Security","ia":"Artificial Intelligence","cloud":"Cloud & DevOps","diseno":"UI/UX Design","historia":"History","astronomia":"Astronomy","arte":"Art & Culture","geografia":"Geography","ciencia":"Science & Nature","mitologia":"Mythology"},"descripcionesCategorias":{"web":"Frontend, frameworks and browsers","datos":"SQL, storage and servers","seguridad":"Encryption, tokens and web protocols","ia":"Algorithms, models and machine learning","cloud":"Containers, deployments and infrastructure","diseno":"Interfaces, usability and design tools","historia":"Civilizations, empires and great events","astronomia":"Planets, stars and the universe","arte":"Painting, music, film and literature","geografia":"Countries, mountains, rivers and oceans","ciencia":"Biology, physics and the natural world","mitologia":"Gods, heroes and ancient legends"},"categoriasJuego":{"web":["JAVASCRIPT","FRONTEND","BACKEND","REACT","ANGULAR","NODEJS","HTML","CSS","API","JSON","DOM","SERVER","DATABASE","HOSTING","FRAMEWORK","DEPLOY","GIT","GITHUB","URL","BROWSER","COOKIE","SCRIPT","FLEXBOX","GRID","RESPONSIVE","TYPESCRIPT","WEBPACK","VUEJS","SASS","BOOTSTRAP","ROUTING","COMPONENT","RENDER","MIDDLEWARE","LOCALSTORAGE","FETCH","ASYNC","PROMISE","MODULE","COMPILER"],"datos":["MYSQL","POSTGRES","MONGODB","ORACLE","QUERY","INDEX","SCHEMA","BACKUP","TABLE","COLUMN","KEY","JOIN","SELECT","INSERT","UPDATE","DELETE","DATABASE","CLUSTER","REDIS","SQLITE","PROCEDURE","TRIGGER","NOSQL","BIGDATA","STORAGE","CACHE","REPLICA","SHARDING","NORMALIZATION","TRANSACTION","VIEW","MODEL","RELATIONAL","PARTITION","LATENCY","SCALABILITY","MIGRATION","STATEMENT"],"seguridad":["CIPHER","TOKEN","FIREWALL","MALWARE","PHISHING","HTTPS","SSL","CRYPTO","HASH","PASSWORD","AUTH","DECRYPT","ENCRYPT","PROXY","HACKER","COOKIES","ROUTER","VPN","SALTING","CAPTCHA","JWT","SECURITY","EXPLOIT","CYBER","BACKDOOR","RANSOMWARE","KEYLOGGER","SPYWARE","INTRUSION","VULNERABILITY","PENTEST","BIOMETRICS","ANTIVIRUS","INCOGNITO","SANDBOX","CERTIFICATE","AUTHENTICATION","PROTOCOL","ENGINEERING","SPOOFING"],"ia":["ALGORITHM","NEURAL","DATASET","MODEL","PYTHON","TENSORFLOW","PYTORCH","CHATBOT","PROMPT","INFERENCE","CLASSIFIER","REGRESSION","CLUSTERING","OVERFITTING","GRADIENT","EMBEDDING","TRANSFORMER","TOKEN","VISION","NEURON","TRAINING","ROBOTICS","AUTOMATION","NETWORKS","PERCEPTRON","RECURRENT","SUPERVISED","LEARNING","PREDICTION","GENERATIVE","DEEPLEARNING","CHATGPT","BIAS","FEATURE","LABEL","ACCURACY"],"cloud":["DOCKER","KUBERNETES","CONTAINER","PIPELINE","JENKINS","TERRAFORM","AWS","AZURE","SERVERLESS","MICROSERVICE","DEVOPS","CICD","CLOUD","SCALABILITY","LOADBALANCER","MONITORING","LATENCY","VIRTUALIZATION","ORCHESTRATION","BACKUP","CLUSTER","NODE","DEPLOYMENT","INFRASTRUCTURE","HELM","ANSIBLE","VAGRANT","GITOPS","OBSERVABILITY","TOLERANCE","REPLICATION","SCALING","REGISTRY","IMAGE","YAML","SECRET","NAMESPACE","HYBRID"],"diseno":["WIREFRAME","PROTOTYPE","USABILITY","TYPOGRAPHY","PALETTE","FIGMA","LAYOUT","RESPONSIVE","ACCESSIBILITY","INTERFACE","EXPERIENCE","COMPONENT","GRID","CONTRAST","HIERARCHY","MOCKUP","ICONOGRAPHY","BRANDING","MINIMALISM","INTERACTION","NAVIGATION","COLORTHEORY","SPACING","MOODBOARD","SKETCH","TREND","STYLE","TEMPLATE","BREAKPOINT","VIEWPORT","PIXEL","VECTOR","ANIMATION","TRANSITION","USER","PERSONA","CONSISTENCY"],"historia":["EGYPT","ROME","GREECE","EMPIRE","WAR","REVOLUTION","CIVILIZATION","PHARAOH","PYRAMID","VIKING","CONQUEST","COLONY","MONARCHY","REPUBLIC","INDEPENDENCE","RENAISSANCE","ARCHAEOLOGY","GLADIATOR","CASTLE","DYNASTY","MEDIEVAL","ANTIQUITY","SLAVERY","TREATY","BATTLE","ARMY","MONUMENT","MUMMY","HIEROGLYPH","SPARTA","ATHENS","BYZANTINE","FEUDALISM","CRUSADES","EMPEROR"],"astronomia":["GALAXY","PLANET","STAR","COMET","ASTEROID","NEBULA","SATELLITE","TELESCOPE","ORBIT","GRAVITY","UNIVERSE","ECLIPSE","METEORITE","SUPERNOVA","MARS","VENUS","JUPITER","SATURN","MERCURY","URANUS","NEPTUNE","PLUTO","MOON","ASTRONAUT","ROCKET","CONSTELLATION","ROTATION","REVOLUTION","ATMOSPHERE","CRATER","ASTRONOMER","OBSERVATORY"],"arte":["PAINTING","SCULPTURE","MUSIC","LITERATURE","CINEMA","THEATER","POETRY","NOVEL","MELODY","HARMONY","ORCHESTRA","SYMPHONY","PAINTER","WRITER","ACTOR","DIRECTOR","SCREENPLAY","PORTRAIT","MURAL","FRESCO","BALLET","OPERA","JAZZ","FOLKLORE","HERITAGE","MUSEUM","GALLERY","EXHIBITION","COMPOSER","PLAYWRIGHT","WATERCOLOR"],"geografia":["CONTINENT","OCEAN","MOUNTAINRANGE","RIVER","DESERT","VOLCANO","ISLAND","PENINSULA","GLACIER","SAVANNA","JUNGLE","FOREST","LAKE","VALLEY","METEOROLOGY","CLIMATE","LATITUDE","LONGITUDE","EQUATOR","HEMISPHERE","CAPITAL","BORDER","POPULATION","ARCHIPELAGO","ATLAS","CARTOGRAPHY","TERRITORY","LANDSCAPE","PLATEAU","STEPPE","TUNDRA"],"ciencia":["BIOLOGY","PHYSICS","CHEMISTRY","CELL","GENETICS","EVOLUTION","ECOSYSTEM","PHOTOSYNTHESIS","MOLECULE","ATOM","ELEMENT","ENERGY","MAGNETISM","ELECTRICITY","BACTERIA","VIRUS","MAMMAL","REPTILE","AMPHIBIAN","INVERTEBRATE","HABITAT","BIODIVERSITY","OXYGEN","HYDROGEN","PROTEIN","ENZYME","CHROMOSOME","METABOLISM","ORGANISM"],"mitologia":["ZEUS","HERCULES","ATHENA","POSEIDON","HADES","APOLLO","ARTEMIS","APHRODITE","ARES","HERMES","DIONYSUS","OLYMPUS","TITAN","CYCLOPS","MINOTAUR","SPHINX","PEGASUS","ODYSSEY","TROY","MEDUSA","CENTAUR","ORACLE","NYMPH","SIREN","DRAGON","VALHALLA","ODIN","THOR","LOKI","MYTHOLOGY"]}},"pt":{"textosUI":{"brand":"Caça-Palavras","subtituloInicio":"Escolha uma categoria do jogo","crearCategoriaTitulo":"Criar categoria","crearCategoriaDesc":"Adicione seus próprios temas e palavras","mejoresTiempos":"🏆 Melhores Tempos","sinPartidas":"Nenhuma partida registrada","recordGlobal":"Recorde Global","botonPista":"💡 Dica","botonMenu":"Menu","editorDescLarga":"Escolha um nome, um ícone e as palavras que quiser. Não precisam ter o mesmo tamanho, o jogo organiza tudo sozinho.","labelNombreCat":"Nome da categoria","labelIconoCat":"Ícone (um emoji, opcional)","labelPalabrasCat":"Palavras (uma por linha ou separadas por vírgula)","placeholderNombreCat":"Ex: Esportes, Culinária, Séries...","placeholderPalabrasCat":"FUTEBOL, BASQUETE, TENIS, NATACAO, MARATONA...","botonGuardarCat":"Salvar categoria","botonCancelar":"Cancelar","errNombreVacio":"Dê um nome à categoria.","errPocasPalabras":"Adicione ao menos 3 palavras válidas (2 a 18 letras, sem espaços nem números).","palabrasPersonalizadasSufijo":"palavras personalizadas","confirmarBorrar":"Excluir a categoria \"{nombre}\"?","ajustesTitulo":"Configurações","ajustesIdioma":"Idioma","ajustesTipografia":"Tipografia","ajustesNegrita":"Negrito","ajustesAdblock":"Bloqueador de anúncios","ajustesProximamente":"em breve","tipografiaSistema":"Padrão","tipografiaSerif":"Serifa","tipografiaMono":"Monoespaçada","tipografiaRedondeada":"Arredondada","modoOscuro":"Modo escuro","modoClaro":"Modo claro","editarTitle":"Editar","borrarTitle":"Excluir"},"nombresCategorias":{"web":"Desenvolvimento Web","datos":"Bancos de Dados","seguridad":"Segurança","ia":"Inteligência Artificial","cloud":"Cloud & DevOps","diseno":"Design UI/UX","historia":"História","astronomia":"Astronomia","arte":"Arte e Cultura","geografia":"Geografia","ciencia":"Ciência e Natureza","mitologia":"Mitologia"},"descripcionesCategorias":{"web":"Frontend, frameworks e navegadores","datos":"SQL, armazenamento e servidores","seguridad":"Criptografia, tokens e protocolos web","ia":"Algoritmos, modelos e machine learning","cloud":"Contêineres, implantações e infraestrutura","diseno":"Interfaces, usabilidade e ferramentas de design","historia":"Civilizações, impérios e grandes eventos","astronomia":"Planetas, estrelas e o universo","arte":"Pintura, música, cinema e literatura","geografia":"Países, montanhas, rios e oceanos","ciencia":"Biologia, física e o mundo natural","mitologia":"Deuses, heróis e lendas antigas"},"categoriasJuego":{"web":["JAVASCRIPT","FRONTEND","BACKEND","REACT","ANGULAR","NODEJS","HTML","CSS","API","JSON","DOM","SERVIDOR","BANCODEDADOS","HOSPEDAGEM","FRAMEWORK","DEPLOY","GIT","GITHUB","URL","NAVEGADOR","COOKIE","SCRIPT","FLEXBOX","GRID","RESPONSIVO","TYPESCRIPT","WEBPACK","VUEJS","SASS","BOOTSTRAP","ROTEAMENTO","COMPONENTE","RENDERIZAÇÃO","ARMAZENAMENTOLOCAL","FETCH","ASSÍNCRONO","PROMESSA","MÓDULO","COMPILADOR"],"datos":["MYSQL","POSTGRES","MONGODB","ORACLE","CONSULTA","ÍNDICE","ESQUEMA","BACKUP","TABELA","COLUNA","CHAVE","JOIN","SELECT","INSERT","UPDATE","DELETE","BANCODEDADOS","CLUSTER","REDIS","SQLITE","PROCEDIMENTO","GATILHO","NOSQL","BIGDATA","ARMAZENAMENTO","CACHE","RÉPLICA","SHARDING","NORMALIZAÇÃO","TRANSAÇÃO","VISÃO","MODELO","RELACIONAL","PARTIÇÃO","LATÊNCIA","ESCALABILIDADE","MIGRAÇÃO","INSTRUÇÃO"],"seguridad":["CIPHER","TOKEN","FIREWALL","MALWARE","PHISHING","HTTPS","SSL","CRYPTO","HASH","SENHA","AUTH","DECRIPTAR","CRIPTOGRAFAR","PROXY","HACKER","COOKIES","ROTEADOR","VPN","SALTING","CAPTCHA","JWT","SEGURANÇA","EXPLOIT","CIBER","BACKDOOR","RANSOMWARE","KEYLOGGER","SPYWARE","INTRUSÃO","VULNERABILIDADE","PENTEST","BIOMETRIA","ANTIVIRUS","INCOGNITO","SANDBOX","CERTIFICADO","AUTENTICAÇÃO","PROTOCOLO","ENGENHARIA","SPOOFING"],"ia":["ALGORITMO","NEURAL","DATASET","MODELO","PYTHON","TENSORFLOW","PYTORCH","CHATBOT","PROMPT","INFERÊNCIA","CLASSIFICADOR","REGRESSÃO","CLUSTERING","OVERFITTING","GRADIENTE","EMBEDDING","TRANSFORMER","TOKEN","VISÃO","NEURÔNIO","TREINAMENTO","ROBÓTICA","AUTOMAÇÃO","REDES","PERCEPTRON","RECORRENTE","SUPERVISIONADO","APRENDIZADO","PREDIÇÃO","GENERATIVA","DEEPLEARNING","CHATGPT","VIÉS","FEATURE","RÓTULO","PRECISÃO"],"cloud":["DOCKER","KUBERNETES","CONTAINER","PIPELINE","JENKINS","TERRAFORM","AWS","AZURE","SERVERLESS","MICROSSERVIÇO","DEVOPS","CICD","NUVEM","ESCALABILIDADE","LOADBALANCER","MONITORAMENTO","LATÊNCIA","VIRTUALIZAÇÃO","ORQUESTRAÇÃO","BACKUP","CLUSTER","NÓ","DEPLOYMENT","INFRAESTRUTURA","HELM","ANSIBLE","VAGRANT","GITOPS","OBSERVABILIDADE","TOLERÂNCIA","REPLICAÇÃO","ESCALONAMENTO","REGISTRO","IMAGEM","YAML","SEGREDO","NAMESPACE","HÍBRIDA"],"diseno":["WIREFRAME","PROTÓTIPO","USABILIDADE","TIPOGRAFIA","PALETA","FIGMA","LAYOUT","RESPONSIVO","ACESSIBILIDADE","INTERFACE","EXPERIÊNCIA","COMPONENTE","GRADE","CONTRASTE","HIERARQUIA","MOCKUP","ICONOGRAFIA","BRANDING","MINIMALISMO","INTERAÇÃO","NAVEGAÇÃO","COLORIMETRIA","ESPAÇAMENTO","MOODBOARD","SKETCH","TENDÊNCIA","ESTILO","MODELO","BREAKPOINT","VIEWPORT","PIXEL","VETORIAL","ANIMAÇÃO","TRANSIÇÃO","USUÁRIO","PERSONA","CONSISTÊNCIA"],"historia":["EGITO","ROMA","GRÉCIA","IMPÉRIO","GUERRA","REVOLUÇÃO","CIVILIZAÇÃO","FARAÓ","PIRÂMIDE","VIKING","CONQUISTA","COLÔNIA","MONARQUIA","REPÚBLICA","INDEPENDÊNCIA","RENASCIMENTO","ARQUEOLOGIA","GLADIADOR","CASTELO","DINASTIA","MEDIEVAL","ANTIGUIDADE","ESCRAVIDÃO","TRATADO","BATALHA","EXÉRCITO","MONUMENTO","MÚMIA","HIERÓGLIFO","ESPARTA","ATENAS","BIZANTINO","FEUDALISMO","CRUZADAS","IMPERADOR"],"astronomia":["GALÁXIA","PLANETA","ESTRELA","COMETA","ASTEROIDE","NEBULOSA","SATÉLITE","TELESCÓPIO","ÓRBITA","GRAVIDADE","UNIVERSO","ECLIPSE","METEORITO","SUPERNOVA","MARTE","VÊNUS","JÚPITER","SATURNO","MERCÚRIO","URANO","NETUNO","PLUTÃO","LUA","ASTRONAUTA","FOGUETE","CONSTELAÇÃO","ROTAÇÃO","TRANSLAÇÃO","ATMOSFERA","CRATERA","ASTRÔNOMO","OBSERVATÓRIO"],"arte":["PINTURA","ESCULTURA","MÚSICA","LITERATURA","CINEMA","TEATRO","POESIA","ROMANCE","MELODIA","HARMONIA","ORQUESTRA","SINFONIA","PINTOR","ESCRITOR","ATOR","DIRETOR","ROTEIRO","RETRATO","MURAL","AFRESCO","BALÉ","ÓPERA","JAZZ","FOLCLORE","PATRIMÔNIO","MUSEU","GALERIA","EXPOSIÇÃO","COMPOSITOR","DRAMATURGO","AQUARELA"],"geografia":["CONTINENTE","OCEANO","CORDILHEIRA","RIO","DESERTO","VULCÃO","ILHA","PENÍNSULA","GLACIAR","SAVANA","SELVA","FLORESTA","LAGO","VALE","METEOROLOGIA","CLIMA","LATITUDE","LONGITUDE","EQUADOR","HEMISFÉRIO","CAPITAL","FRONTEIRA","POPULAÇÃO","ARQUIPÉLAGO","ATLAS","CARTOGRAFIA","TERRITÓRIO","PAISAGEM","ALTIPLANO","ESTEPE","TUNDRA"],"ciencia":["BIOLOGIA","FÍSICA","QUÍMICA","CÉLULA","GENÉTICA","EVOLUÇÃO","ECOSSISTEMA","FOTOSSÍNTESE","MOLÉCULA","ÁTOMO","ELEMENTO","ENERGIA","MAGNETISMO","ELETRICIDADE","BACTÉRIA","VÍRUS","MAMÍFERO","RÉPTIL","ANFÍBIO","INVERTEBRADO","HABITAT","BIODIVERSIDADE","OXIGÊNIO","HIDROGÊNIO","PROTEÍNA","ENZIMA","CROMOSSOMO","METABOLISMO","ORGANISMO"],"mitologia":["ZEUS","HÉRCULES","ATENA","POSEIDON","HADES","APOLO","ÁRTEMIS","AFRODITE","ARES","HERMES","DIONÍSIO","OLIMPO","TITÃ","CÍCLOPE","MINOTAURO","ESFINGE","PÉGASO","ODISSEIA","TROIA","MEDUSA","CENTAURO","ORÁCULO","NINFA","SEREIA","DRAGÃO","VALHALA","ODIN","THOR","LOKI","MITOLOGIA"]}},"fr":{"textosUI":{"brand":"Mots Mêlés","subtituloInicio":"Choisissez une catégorie de jeu","crearCategoriaTitulo":"Créer une catégorie","crearCategoriaDesc":"Ajoutez vos propres thèmes et mots","mejoresTiempos":"🏆 Meilleurs Temps","sinPartidas":"Aucune partie enregistrée","recordGlobal":"Record Mondial","botonPista":"💡 Indice","botonMenu":"Menu","editorDescLarga":"Choisissez un nom, une icône et les mots que vous voulez. Pas besoin qu'ils aient la même longueur, le jeu les ajuste automatiquement.","labelNombreCat":"Nom de la catégorie","labelIconoCat":"Icône (un emoji, facultatif)","labelPalabrasCat":"Mots (un par ligne ou séparés par une virgule)","placeholderNombreCat":"Ex : Sports, Cuisine, Séries...","placeholderPalabrasCat":"FOOTBALL, BASKET, TENNIS, NATATION, MARATHON...","botonGuardarCat":"Enregistrer la catégorie","botonCancelar":"Annuler","errNombreVacio":"Donnez un nom à la catégorie.","errPocasPalabras":"Ajoutez au moins 3 mots valides (2 à 18 lettres, sans espaces ni chiffres).","palabrasPersonalizadasSufijo":"mots personnalisés","confirmarBorrar":"Supprimer la catégorie \"{nombre}\" ?","ajustesTitulo":"Paramètres","ajustesIdioma":"Langue","ajustesTipografia":"Typographie","ajustesNegrita":"Gras","ajustesAdblock":"Bloqueur de publicités","ajustesProximamente":"bientôt disponible","tipografiaSistema":"Par défaut","tipografiaSerif":"Serif","tipografiaMono":"Monospace","tipografiaRedondeada":"Arrondie","modoOscuro":"Mode sombre","modoClaro":"Mode clair","editarTitle":"Modifier","borrarTitle":"Supprimer"},"nombresCategorias":{"web":"Développement Web","datos":"Bases de Données","seguridad":"Sécurité","ia":"Intelligence Artificielle","cloud":"Cloud & DevOps","diseno":"Design UI/UX","historia":"Histoire","astronomia":"Astronomie","arte":"Art et Culture","geografia":"Géographie","ciencia":"Science et Nature","mitologia":"Mythologie"},"descripcionesCategorias":{"web":"Frontend, frameworks et navigateurs","datos":"SQL, stockage et serveurs","seguridad":"Chiffrement, jetons et protocoles web","ia":"Algorithmes, modèles et apprentissage automatique","cloud":"Conteneurs, déploiements et infrastructure","diseno":"Interfaces, ergonomie et outils de conception","historia":"Civilisations, empires et grands événements","astronomia":"Planètes, étoiles et l'univers","arte":"Peinture, musique, cinéma et littérature","geografia":"Pays, montagnes, fleuves et océans","ciencia":"Biologie, physique et le monde naturel","mitologia":"Dieux, héros et légendes anciennes"},"categoriasJuego":{"web":["JAVASCRIPT","FRONTEND","BACKEND","REACT","ANGULAR","NODEJS","HTML","CSS","API","JSON","DOM","SERVEUR","BASEDEDONNEES","HEBERGEMENT","FRAMEWORK","DEPLOIEMENT","GIT","GITHUB","URL","NAVIGATEUR","COOKIE","SCRIPT","FLEXBOX","GRILLE","RESPONSIVE","TYPESCRIPT","WEBPACK","VUEJS","SASS","BOOTSTRAP","ROUTAGE","COMPOSANT","RENDU","RECUPERATION","ASYNCHRONE","PROMESSE","MODULE","COMPILATEUR","STOCKAGELOCAL"],"datos":["MYSQL","POSTGRES","MONGODB","ORACLE","REQUETE","INDEX","SCHEMA","SAUVEGARDE","TABLE","COLONNE","CLE","JOINTURE","SELECTION","INSERTION","MISEAJOUR","SUPPRESSION","BASEDEDONNEES","CLUSTER","REDIS","SQLITE","PROCEDURE","DECLENCHEUR","NOSQL","BIGDATA","STOCKAGE","CACHE","REPLIQUE","PARTITIONNEMENT","NORMALISATION","TRANSACTION","INTERROGATION","VUE","MODELE","RELATIONNEL","PARTITION","LATENCE","EVOLUTIVITE","MIGRATION","REDONDANCE","INSTRUCTION"],"seguridad":["CHIFFRE","JETON","PAREFEU","MALWARE","HAMECONNAGE","HTTPS","SSL","CRYPTO","HACHAGE","MOTDEPASSE","AUTH","DECHIFFRER","CHIFFRER","PROXY","PIRATE","COOKIES","ROUTEUR","VPN","SALAGE","CAPTCHA","JWT","SECURITE","EXPLOIT","CYBER","PORTEDEROBEE","RANCONGICIEL","KEYLOGGER","ESPIOGICIEL","INTRUSION","VULNERABILITE","PENTEST","BIOMETRIE","ANTIVIRUS","INCOGNITO","BACASABLE","CERTIFICAT","AUTHENTIFICATION","PROTOCOLE","INGENIERIE","USURPATION"],"ia":["ALGORITHME","NEURONAL","JEUDEDONNEES","MODELE","PYTHON","TENSORFLOW","PYTORCH","CHATBOT","PROMPT","INFERENCE","CLASSIFICATEUR","REGRESSION","PARTITIONNEMENT","SURAPPRENTISSAGE","GRADIENT","PLONGEMENT","TRANSFORMEUR","JETON","VISION","NEURONE","ENTRAINEMENT","ROBOTIQUE","AUTOMATISATION","RESEAUX","PERCEPTRON","RECURRENT","SUPERVISE","APPRENTISSAGE","PREDICTION","GENERATIVE","DEEPLEARNING","CHATGPT","BIAIS","CARACTERISTIQUE","ETIQUETTE","PRECISION"],"cloud":["DOCKER","KUBERNETES","CONTENEUR","PIPELINE","JENKINS","TERRAFORM","AWS","AZURE","SERVERLESS","MICROSERVICE","DEVOPS","CICD","NUAGE","EVOLUTIVITE","REPARTITEUR","SURVEILLANCE","LATENCE","VIRTUALISATION","ORCHESTRATION","SAUVEGARDE","CLUSTER","NOEUD","DEPLOIEMENT","INFRASTRUCTURE","HELM","ANSIBLE","VAGRANT","GITOPS","OBSERVABILITE","TOLERANCE","REPLICATION","MISEALECHELLE","REGISTRE","IMAGE","YAML","SECRET","ESPACEDENOMS","HYBRIDE"],"diseno":["WIREFRAME","PROTOTYPE","ERGONOMIE","TYPOGRAPHIE","PALETTE","FIGMA","MISEENPAGE","RESPONSIVE","ACCESSIBILITE","INTERFACE","EXPERIENCE","COMPOSANT","GRILLE","CONTRASTE","HIERARCHIE","MAQUETTE","ICONOGRAPHIE","IMAGEDEMARQUE","MINIMALISME","INTERACTION","NAVIGATION","COLORIMETRIE","ESPACEMENT","PLANCHEAMBIANCE","CROQUIS","TENDANCE","STYLE","GABARIT","POINTDERUPTURE","VIEWPORT","PIXEL","VECTORIEL","ANIMATION","TRANSITION","UTILISATEUR","PERSONA","COHERENCE"],"historia":["EGYPTE","ROME","GRECE","EMPIRE","GUERRE","REVOLUTION","CIVILISATION","PHARAON","PYRAMIDE","VIKING","CONQUETE","COLONIE","MONARCHIE","REPUBLIQUE","INDEPENDANCE","RENAISSANCE","ARCHEOLOGIE","GLADIATEUR","CHATEAU","DYNASTIE","MEDIEVAL","ANTIQUITE","ESCLAVAGE","TRAITE","BATAILLE","ARMEE","MONUMENT","MOMIE","HIEROGLYPHE","SPARTE","ATHENES","BYZANTIN","FEODALISME","CROISADES","EMPEREUR"],"astronomia":["GALAXIE","PLANETE","ETOILE","COMETE","ASTEROIDE","NEBULEUSE","SATELLITE","TELESCOPE","ORBITE","GRAVITE","UNIVERS","ECLIPSE","METEORITE","SUPERNOVA","MARS","VENUS","JUPITER","SATURNE","MERCURE","URANUS","NEPTUNE","PLUTON","LUNE","ASTRONAUTE","FUSEE","CONSTELLATION","ROTATION","REVOLUTION","ATMOSPHERE","CRATERE","ASTRONOME","OBSERVATOIRE"],"arte":["PEINTURE","SCULPTURE","MUSIQUE","LITTERATURE","CINEMA","THEATRE","POESIE","ROMAN","MELODIE","HARMONIE","ORCHESTRE","SYMPHONIE","PEINTRE","ECRIVAIN","ACTEUR","REALISATEUR","SCENARIO","PORTRAIT","MURAL","FRESQUE","BALLET","OPERA","JAZZ","FOLKLORE","PATRIMOINE","MUSEE","GALERIE","EXPOSITION","COMPOSITEUR","DRAMATURGE","AQUARELLE"],"geografia":["CONTINENT","OCEAN","CORDILLERE","FLEUVE","DESERT","VOLCAN","ILE","PENINSULE","GLACIER","SAVANE","JUNGLE","FORET","LAC","VALLEE","METEOROLOGIE","CLIMAT","LATITUDE","LONGITUDE","EQUATEUR","HEMISPHERE","CAPITALE","FRONTIERE","POPULATION","ARCHIPEL","ATLAS","CARTOGRAPHIE","TERRITOIRE","PAYSAGE","HAUTPLATEAU","STEPPE","TOUNDRA"],"ciencia":["BIOLOGIE","PHYSIQUE","CHIMIE","CELLULE","GENETIQUE","EVOLUTION","ECOSYSTEME","PHOTOSYNTHESE","MOLECULE","ATOME","ELEMENT","ENERGIE","MAGNETISME","ELECTRICITE","BACTERIE","VIRUS","MAMMIFERE","REPTILE","AMPHIBIEN","INVERTEBRE","HABITAT","BIODIVERSITE","OXYGENE","HYDROGENE","PROTEINE","ENZYME","CHROMOSOME","METABOLISME","ORGANISME"],"mitologia":["ZEUS","HERCULE","ATHENA","POSEIDON","HADES","APOLLON","ARTEMIS","APHRODITE","ARES","HERMES","DIONYSOS","OLYMPE","TITAN","CYCLOPE","MINOTAURE","SPHINX","PEGASE","ODYSSEE","TROIE","MEDUSE","CENTAURE","ORACLE","NYMPHE","SIRENE","DRAGON","VALHALLA","ODIN","THOR","LOKI","MYTHOLOGIE"]}},"it":{"textosUI":{"brand":"Cerca Parole","subtituloInicio":"Scegli una categoria di gioco","crearCategoriaTitulo":"Crea categoria","crearCategoriaDesc":"Aggiungi i tuoi temi e le tue parole","mejoresTiempos":"🏆 Tempi Migliori","sinPartidas":"Nessuna partita registrata","recordGlobal":"Record Globale","botonPista":"💡 Suggerimento","botonMenu":"Menu","editorDescLarga":"Scegli un nome, un'icona e le parole che vuoi. Non serve che abbiano la stessa lunghezza, ci pensa il gioco a sistemarle.","labelNombreCat":"Nome della categoria","labelIconoCat":"Icona (un emoji, facoltativo)","labelPalabrasCat":"Parole (una per riga o separate da virgola)","placeholderNombreCat":"Es: Sport, Cucina, Serie TV...","placeholderPalabrasCat":"CALCIO, BASKET, TENNIS, NUOTO, MARATONA...","botonGuardarCat":"Salva categoria","botonCancelar":"Annulla","errNombreVacio":"Dai un nome alla categoria.","errPocasPalabras":"Inserisci almeno 3 parole valide (da 2 a 18 lettere, senza spazi né numeri).","palabrasPersonalizadasSufijo":"parole personalizzate","confirmarBorrar":"Eliminare la categoria \"{nombre}\"?","ajustesTitulo":"Impostazioni","ajustesIdioma":"Lingua","ajustesTipografia":"Tipografia","ajustesNegrita":"Grassetto","ajustesAdblock":"Blocco annunci","ajustesProximamente":"prossimamente","tipografiaSistema":"Predefinita","tipografiaSerif":"Serif","tipografiaMono":"Monospazio","tipografiaRedondeada":"Arrotondata","modoOscuro":"Modalità scura","modoClaro":"Modalità chiara","editarTitle":"Modifica","borrarTitle":"Elimina"},"nombresCategorias":{"web":"Sviluppo Web","datos":"Basi di Dati","seguridad":"Sicurezza","ia":"Intelligenza Artificiale","cloud":"Cloud & DevOps","diseno":"Design UI/UX","historia":"Storia","astronomia":"Astronomia","arte":"Arte e Cultura","geografia":"Geografia","ciencia":"Scienza e Natura","mitologia":"Mitologia"},"descripcionesCategorias":{"web":"Frontend, framework e browser","datos":"SQL, archiviazione e server","seguridad":"Crittografia, token e protocolli web","ia":"Algoritmi, modelli e apprendimento automatico","cloud":"Container, distribuzioni e infrastruttura","diseno":"Interfacce, usabilità e strumenti di design","historia":"Civiltà, imperi e grandi eventi","astronomia":"Pianeti, stelle e l'universo","arte":"Pittura, musica, cinema e letteratura","geografia":"Paesi, montagne, fiumi e oceani","ciencia":"Biologia, fisica e il mondo naturale","mitologia":"Dei, eroi e leggende antiche"},"categoriasJuego":{"web":["JAVASCRIPT","FRONTEND","BACKEND","REACT","ANGULAR","NODEJS","HTML","CSS","API","JSON","DOM","SERVER","DATABASE","HOSTING","FRAMEWORK","DISTRIBUZIONE","GIT","GITHUB","URL","BROWSER","COOKIE","SCRIPT","FLEXBOX","GRIGLIA","RESPONSIVE","TYPESCRIPT","WEBPACK","VUEJS","SASS","BOOTSTRAP","INSTRADAMENTO","COMPONENTE","RENDERING","NAVIGATORE","MEMORIALOCALE","RECUPERO","ASINCRONO","PROMESSA","MODULO","COMPILATORE"],"datos":["MYSQL","POSTGRES","MONGODB","ORACLE","QUERY","INDICE","SCHEMA","COPIADISICUREZZA","TABELLA","COLONNA","CHIAVE","GIUNZIONE","SELEZIONE","INSERIMENTO","AGGIORNAMENTO","ELIMINAZIONE","BANCADATI","CLUSTER","REDIS","SQLITE","PROCEDURA","ATTIVATORE","NOSQL","BIGDATA","ARCHIVIAZIONE","CACHE","REPLICA","PARTIZIONAMENTO","NORMALIZZAZIONE","TRANSAZIONE","INTERROGAZIONE","VISTA","MODELLO","RELAZIONALE","PARTIZIONE","LATENZA","SCALABILITÀ","MIGRAZIONE","RIDONDANZA","ISTRUZIONE"],"seguridad":["CIFRARIO","TOKEN","FIREWALL","MALWARE","PHISHING","HTTPS","SSL","CRIPTO","HASH","PASSWORD","AUTH","DECIFRARE","CIFRARE","PROXY","HACKER","COOKIE","ROUTER","VPN","SALATURA","CAPTCHA","JWT","SICUREZZA","EXPLOIT","CYBER","BACKDOOR","RANSOMWARE","KEYLOGGER","SPYWARE","INTRUSIONE","VULNERABILITÀ","PENTEST","BIOMETRIA","ANTIVIRUS","INCOGNITO","SANDBOX","CERTIFICATO","AUTENTICAZIONE","PROTOCOLLO","INGEGNERIA","SPOOFING"],"ia":["ALGORITMO","NEURALE","DATASET","MODELLO","PYTHON","TENSORFLOW","PYTORCH","CHATBOT","PROMPT","INFERENZA","CLASSIFICATORE","REGRESSIONE","RAGGRUPPAMENTO","SOVRADATTAMENTO","GRADIENTE","IMMERSIONE","TRANSFORMER","TOKEN","VISIONE","NEURONE","ADDESTRAMENTO","ROBOTICA","AUTOMAZIONE","RETI","PERCETTRONE","RICORRENTE","SUPERVISIONATO","APPRENDIMENTO","PREVISIONE","GENERATIVA","DEEPLEARNING","CHATGPT","PREGIUDIZIO","CARATTERISTICA","ETICHETTA","PRECISIONE"],"cloud":["DOCKER","KUBERNETES","CONTENITORE","PIPELINE","JENKINS","TERRAFORM","AWS","AZURE","SERVERLESS","MICROSERVIZIO","DEVOPS","CICD","NUVOLA","SCALABILITÀ","BILANCIATORE","MONITORAGGIO","LATENZA","VIRTUALIZZAZIONE","ORCHESTRAZIONE","BACKUP","CLUSTER","NODO","DISTRIBUZIONE","INFRASTRUTTURA","HELM","ANSIBLE","VAGRANT","GITOPS","OSSERVABILITÀ","TOLLERANZA","REPLICAZIONE","SCALATURA","REGISTRO","IMMAGINE","YAML","SEGRETO","SPAZIODEINOMI","IBRIDA"],"diseno":["WIREFRAME","PROTOTIPO","USABILITÀ","TIPOGRAFIA","TAVOLOZZA","FIGMA","IMPAGINAZIONE","RESPONSIVE","ACCESSIBILITÀ","INTERFACCIA","ESPERIENZA","COMPONENTE","GRIGLIA","CONTRASTO","GERARCHIA","MOCKUP","ICONOGRAFIA","BRANDING","MINIMALISMO","INTERAZIONE","NAVIGAZIONE","COLORIMETRIA","SPAZIATURA","MOODBOARD","SCHIZZO","TENDENZA","STILE","MODELLO","BREAKPOINT","VIEWPORT","PIXEL","VETTORIALE","ANIMAZIONE","TRANSIZIONE","UTENTE","PERSONA","COERENZA"],"historia":["EGITTO","ROMA","GRECIA","IMPERO","GUERRA","RIVOLUZIONE","CIVILTÀ","FARAONE","PIRAMIDE","VICHINGO","CONQUISTA","COLONIA","MONARCHIA","REPUBBLICA","INDIPENDENZA","RINASCIMENTO","ARCHEOLOGIA","GLADIATORE","CASTELLO","DINASTIA","MEDIEVALE","ANTICHITÀ","SCHIAVITÙ","TRATTATO","BATTAGLIA","ESERCITO","MONUMENTO","MUMMIA","GEROGLIFICO","SPARTA","ATENE","BIZANTINO","FEUDALESIMO","CROCIATE","IMPERATORE"],"astronomia":["GALASSIA","PIANETA","STELLA","COMETA","ASTEROIDE","NEBULOSA","SATELLITE","TELESCOPIO","ORBITA","GRAVITÀ","UNIVERSO","ECLISSI","METEORITE","SUPERNOVA","MARTE","VENERE","GIOVE","SATURNO","MERCURIO","URANO","NETTUNO","PLUTONE","LUNA","ASTRONAUTA","RAZZO","COSTELLAZIONE","ROTAZIONE","RIVOLUZIONE","ATMOSFERA","CRATERE","ASTRONOMO","OSSERVATORIO"],"arte":["PITTURA","SCULTURA","MUSICA","LETTERATURA","CINEMA","TEATRO","POESIA","ROMANZO","MELODIA","ARMONIA","ORCHESTRA","SINFONIA","PITTORE","SCRITTORE","ATTORE","REGISTA","SCENEGGIATURA","RITRATTO","MURALE","AFFRESCO","BALLETTO","OPERA","JAZZ","FOLCLORE","PATRIMONIO","MUSEO","GALLERIA","ESPOSIZIONE","COMPOSITORE","DRAMMATURGO","ACQUARELLO"],"geografia":["CONTINENTE","OCEANO","CORDIGLIERA","FIUME","DESERTO","VULCANO","ISOLA","PENISOLA","GHIACCIAIO","SAVANA","GIUNGLA","FORESTA","LAGO","VALLE","METEOROLOGIA","CLIMA","LATITUDINE","LONGITUDINE","EQUATORE","EMISFERO","CAPITALE","FRONTIERA","POPOLAZIONE","ARCIPELAGO","ATLANTE","CARTOGRAFIA","TERRITORIO","PAESAGGIO","ALTOPIANO","STEPPA","TUNDRA"],"ciencia":["BIOLOGIA","FISICA","CHIMICA","CELLULA","GENETICA","EVOLUZIONE","ECOSISTEMA","FOTOSINTESI","MOLECOLA","ATOMO","ELEMENTO","ENERGIA","MAGNETISMO","ELETTRICITÀ","BATTERIO","VIRUS","MAMMIFERO","RETTILE","ANFIBIO","INVERTEBRATO","HABITAT","BIODIVERSITÀ","OSSIGENO","IDROGENO","PROTEINA","ENZIMA","CROMOSOMA","METABOLISMO","ORGANISMO"],"mitologia":["ZEUS","ERCOLE","ATENA","POSEIDONE","ADE","APOLLO","ARTEMIDE","AFRODITE","ARES","ERMES","DIONISO","OLIMPO","TITANO","CICLOPE","MINOTAURO","SFINGE","PEGASO","ODISSEA","TROIA","MEDUSA","CENTAURO","ORACOLO","NINFA","SIRENA","DRAGO","VALHALLA","ODINO","THOR","LOKI","MITOLOGIA"]}},"de":{"textosUI":{"brand":"Buchstabensalat","subtituloInicio":"Wähle eine Spielkategorie","crearCategoriaTitulo":"Kategorie erstellen","crearCategoriaDesc":"Füge deine eigenen Themen und Wörter hinzu","mejoresTiempos":"🏆 Bestzeiten","sinPartidas":"Keine Spiele gespeichert","recordGlobal":"Globaler Rekord","botonPista":"💡 Tipp","botonMenu":"Menü","editorDescLarga":"Wähle einen Namen, ein Symbol und die Wörter, die du möchtest. Sie müssen nicht gleich lang sein, das Spiel ordnet sie automatisch an.","labelNombreCat":"Name der Kategorie","labelIconoCat":"Symbol (ein Emoji, optional)","labelPalabrasCat":"Wörter (eines pro Zeile oder durch Komma getrennt)","placeholderNombreCat":"Z. B.: Sport, Kochen, Serien...","placeholderPalabrasCat":"FUSSBALL, BASKETBALL, TENNIS, SCHWIMMEN, MARATHON...","botonGuardarCat":"Kategorie speichern","botonCancelar":"Abbrechen","errNombreVacio":"Gib der Kategorie einen Namen.","errPocasPalabras":"Gib mindestens 3 gültige Wörter ein (2 bis 18 Buchstaben, ohne Leerzeichen oder Zahlen).","palabrasPersonalizadasSufijo":"eigene Wörter","confirmarBorrar":"Kategorie \"{nombre}\" löschen?","ajustesTitulo":"Einstellungen","ajustesIdioma":"Sprache","ajustesTipografia":"Schriftart","ajustesNegrita":"Fett","ajustesAdblock":"Werbeblocker","ajustesProximamente":"demnächst","tipografiaSistema":"Standard","tipografiaSerif":"Serif","tipografiaMono":"Monospace","tipografiaRedondeada":"Abgerundet","modoOscuro":"Dunkler Modus","modoClaro":"Heller Modus","editarTitle":"Bearbeiten","borrarTitle":"Löschen"},"nombresCategorias":{"web":"Webentwicklung","datos":"Datenbanken","seguridad":"Sicherheit","ia":"Künstliche Intelligenz","cloud":"Cloud & DevOps","diseno":"UI/UX-Design","historia":"Geschichte","astronomia":"Astronomie","arte":"Kunst und Kultur","geografia":"Geografie","ciencia":"Wissenschaft und Natur","mitologia":"Mythologie"},"descripcionesCategorias":{"web":"Frontend, Frameworks und Browser","datos":"SQL, Speicherung und Server","seguridad":"Verschlüsselung, Tokens und Webprotokolle","ia":"Algorithmen, Modelle und maschinelles Lernen","cloud":"Container, Deployments und Infrastruktur","diseno":"Oberflächen, Nutzbarkeit und Design-Werkzeuge","historia":"Zivilisationen, Reiche und große Ereignisse","astronomia":"Planeten, Sterne und das Universum","arte":"Malerei, Musik, Film und Literatur","geografia":"Länder, Berge, Flüsse und Ozeane","ciencia":"Biologie, Physik und die Naturwelt","mitologia":"Götter, Helden und antike Legenden"},"categoriasJuego":{"web":["JAVASCRIPT","FRONTEND","BACKEND","REACT","ANGULAR","NODEJS","HTML","CSS","API","JSON","DOM","SERVER","DATENBANK","HOSTING","FRAMEWORK","DEPLOY","GIT","GITHUB","URL","BROWSER","COOKIE","SKRIPT","FLEXBOX","GRID","RESPONSIVE","TYPESCRIPT","WEBPACK","VUEJS","SASS","BOOTSTRAP","ROUTING","KOMPONENTE","RENDERN","NAVIGATOR","LOCALSTORAGE","FETCH","ASYNC","PROMISE","MODUL","COMPILER"],"datos":["MYSQL","POSTGRES","MONGODB","ORACLE","QUERY","INDEX","SCHEMA","BACKUP","TABELLE","SPALTE","SCHLÜSSEL","JOIN","SELECT","INSERT","UPDATE","DELETE","DATENBANK","CLUSTER","REDIS","SQLITE","PROZEDUR","TRIGGER","NOSQL","BIGDATA","SPEICHER","CACHE","REPLIKA","SHARDING","NORMALISIERUNG","TRANSAKTION","ABFRAGE","ANSICHT","MODELL","RELATIONAL","PARTITION","LATENZ","SKALIERBARKEIT","MIGRATION","SICHERUNG","ANWEISUNG"],"seguridad":["CIPHER","TOKEN","FIREWALL","MALWARE","PHISHING","HTTPS","SSL","KRYPTO","HASH","PASSWORT","AUTH","ENTSCHLÜSSELN","VERSCHLÜSSELN","PROXY","HACKER","COOKIES","ROUTER","VPN","SALTING","CAPTCHA","JWT","SICHERHEIT","EXPLOIT","CYBER","BACKDOOR","RANSOMWARE","KEYLOGGER","SPYWARE","EINDRINGLING","SCHWACHSTELLE","PENTEST","BIOMETRIE","ANTIVIRUS","INKOGNITO","SANDBOX","ZERTIFIKAT","AUTHENTIFIZIERUNG","PROTOKOLL","MANIPULATION","SPOOFING"],"ia":["ALGORITHMUS","NEURONAL","DATENSATZ","MODELL","PYTHON","TENSORFLOW","PYTORCH","CHATBOT","PROMPT","INFERENZ","KLASSIFIKATOR","REGRESSION","CLUSTERING","OVERFITTING","GRADIENT","EMBEDDING","TRANSFORMER","TOKEN","VISION","NEURON","TRAINING","ROBOTIK","AUTOMATISIERUNG","NETZWERKE","PERZEPTRON","REKURRENT","ÜBERWACHT","LERNEN","VORHERSAGE","GENERATIV","DEEPLEARNING","CHATGPT","BIAS","MERKMAL","ETIKETT","PRÄZISION"],"cloud":["DOCKER","KUBERNETES","CONTAINER","PIPELINE","JENKINS","TERRAFORM","AWS","AZURE","SERVERLESS","MIKRODIENST","DEVOPS","CICD","WOLKE","SKALIERBARKEIT","LASTVERTEILER","ÜBERWACHUNG","LATENZ","VIRTUALISIERUNG","ORCHESTRIERUNG","BACKUP","CLUSTER","KNOTEN","DEPLOYMENT","INFRASTRUKTUR","HELM","ANSIBLE","VAGRANT","GITOPS","BEOBACHTBARKEIT","TOLERANZ","REPLIKATION","SKALIERUNG","REGISTRIERUNG","ABBILD","YAML","GEHEIMNIS","NAMESPACE","HYBRID"],"diseno":["WIREFRAME","PROTOTYP","NUTZBARKEIT","TYPOGRAFIE","PALETTE","FIGMA","LAYOUT","RESPONSIVE","BARRIEREFREIHEIT","OBERFLÄCHE","ERFAHRUNG","KOMPONENTE","RASTER","KONTRAST","HIERARCHIE","MOCKUP","IKONOGRAFIE","BRANDING","MINIMALISMUS","INTERAKTION","NAVIGATION","FARBLEHRE","ABSTAND","MOODBOARD","SKIZZE","TREND","STIL","VORLAGE","BREAKPOINT","VIEWPORT","PIXEL","VEKTORIELL","ANIMATION","ÜBERGANG","BENUTZER","PERSONA","KONSISTENZ"],"historia":["ÄGYPTEN","ROM","GRIECHENLAND","REICH","KRIEG","REVOLUTION","ZIVILISATION","PHARAO","PYRAMIDE","WIKINGER","EROBERUNG","KOLONIE","MONARCHIE","REPUBLIK","UNABHÄNGIGKEIT","RENAISSANCE","ARCHÄOLOGIE","GLADIATOR","BURG","DYNASTIE","MITTELALTER","ALTERTUM","SKLAVEREI","VERTRAG","SCHLACHT","ARMEE","DENKMAL","MUMIE","HIEROGLYPHE","SPARTA","ATHEN","BYZANTINISCH","FEUDALISMUS","KREUZZÜGE","KAISER"],"astronomia":["GALAXIE","PLANET","STERN","KOMET","ASTEROID","NEBEL","SATELLIT","TELESKOP","ORBIT","SCHWERKRAFT","UNIVERSUM","FINSTERNIS","METEORIT","SUPERNOVA","MARS","VENUS","JUPITER","SATURN","MERKUR","URANUS","NEPTUN","PLUTO","MOND","ASTRONAUT","RAKETE","KONSTELLATION","ROTATION","UMLAUF","ATMOSPHÄRE","KRATER","ASTRONOM","OBSERVATORIUM"],"arte":["MALEREI","SKULPTUR","MUSIK","LITERATUR","KINO","THEATER","POESIE","ROMAN","MELODIE","HARMONIE","ORCHESTER","SINFONIE","MALER","SCHRIFTSTELLER","SCHAUSPIELER","REGISSEUR","DREHBUCH","PORTRAIT","WANDBILD","FRESKO","BALLETT","OPER","JAZZ","FOLKLORE","KULTURERBE","MUSEUM","GALERIE","AUSSTELLUNG","KOMPONIST","DRAMATIKER","AQUARELL"],"geografia":["KONTINENT","OZEAN","GEBIRGE","FLUSS","WÜSTE","VULKAN","INSEL","HALBINSEL","GLETSCHER","SAVANNE","DSCHUNGEL","WALD","SEE","TAL","METEOROLOGIE","KLIMA","BREITE","LÄNGE","ÄQUATOR","HEMISPHÄRE","HAUPTSTADT","GRENZE","BEVÖLKERUNG","ARCHIPEL","ATLAS","KARTOGRAFIE","GEBIET","LANDSCHAFT","HOCHEBENE","STEPPE","TUNDRA"],"ciencia":["BIOLOGIE","PHYSIK","CHEMIE","ZELLE","GENETIK","EVOLUTION","ÖKOSYSTEM","FOTOSYNTHESE","MOLEKÜL","ATOM","ELEMENT","ENERGIE","MAGNETISMUS","ELEKTRIZITÄT","BAKTERIE","VIRUS","SÄUGETIER","REPTIL","AMPHIBIE","WIRBELLOSE","LEBENSRAUM","BIODIVERSITÄT","SAUERSTOFF","WASSERSTOFF","PROTEIN","ENZYM","CHROMOSOM","STOFFWECHSEL","ORGANISMUS"],"mitologia":["ZEUS","HERKULES","ATHENE","POSEIDON","HADES","APOLLO","ARTEMIS","APHRODITE","ARES","HERMES","DIONYSOS","OLYMP","TITAN","ZYKLOP","MINOTAURUS","SPHINX","PEGASUS","ODYSSEE","TROJA","MEDUSA","ZENTAUR","ORAKEL","NYMPHE","SIRENE","DRACHE","WALHALLA","ODIN","THOR","LOKI","MYTHOLOGIE"]}},"ru":{"textosUI":{"brand":"Филворд","subtituloInicio":"Выберите категорию игры","crearCategoriaTitulo":"Создать категорию","crearCategoriaDesc":"Добавьте свои темы и слова","mejoresTiempos":"🏆 Лучшее время","sinPartidas":"Нет сохранённых игр","recordGlobal":"Глобальный рекорд","botonPista":"💡 Подсказка","botonMenu":"Меню","editorDescLarga":"Выберите название, значок и слова, какие захотите. Они не обязательно должны быть одной длины — игра расставит их сама.","labelNombreCat":"Название категории","labelIconoCat":"Значок (эмодзи, необязательно)","labelPalabrasCat":"Слова (по одному в строке или через запятую)","placeholderNombreCat":"Например: Спорт, Кулинария, Сериалы...","placeholderPalabrasCat":"ФУТБОЛ, БАСКЕТБОЛ, ТЕННИС, ПЛАВАНИЕ, МАРАФОН...","botonGuardarCat":"Сохранить категорию","botonCancelar":"Отмена","errNombreVacio":"Введите название категории.","errPocasPalabras":"Добавьте минимум 3 допустимых слова (от 2 до 18 букв, без пробелов и цифр).","palabrasPersonalizadasSufijo":"собственных слов","confirmarBorrar":"Удалить категорию \"{nombre}\"?","ajustesTitulo":"Настройки","ajustesIdioma":"Язык","ajustesTipografia":"Шрифт","ajustesNegrita":"Жирный","ajustesAdblock":"Блокировщик рекламы","ajustesProximamente":"скоро","tipografiaSistema":"По умолчанию","tipografiaSerif":"С засечками","tipografiaMono":"Моноширинный","tipografiaRedondeada":"Скруглённый","modoOscuro":"Тёмная тема","modoClaro":"Светлая тема","editarTitle":"Редактировать","borrarTitle":"Удалить"},"nombresCategorias":{"web":"Веб-разработка","datos":"Базы данных","seguridad":"Безопасность","ia":"Искусственный интеллект","cloud":"Облако и DevOps","diseno":"UI/UX-дизайн","historia":"История","astronomia":"Астрономия","arte":"Искусство и культура","geografia":"География","ciencia":"Наука и природа","mitologia":"Мифология"},"descripcionesCategorias":{"web":"Фронтенд, фреймворки и браузеры","datos":"SQL, хранение данных и серверы","seguridad":"Шифрование, токены и веб-протоколы","ia":"Алгоритмы, модели и машинное обучение","cloud":"Контейнеры, развёртывание и инфраструктура","diseno":"Интерфейсы, юзабилити и инструменты дизайна","historia":"Цивилизации, империи и великие события","astronomia":"Планеты, звёзды и вселенная","arte":"Живопись, музыка, кино и литература","geografia":"Страны, горы, реки и океаны","ciencia":"Биология, физика и мир природы","mitologia":"Боги, герои и древние легенды"},"categoriasJuego":{"web":["ДЖАВАСКРИПТ","ФРОНТЕНД","БЭКЕНД","РЕАКТ","АНГУЛЯР","НОДА","ГИПЕРТЕКСТ","СТИЛИ","АПИ","ДЖЕЙСОН","ДОМ","СЕРВЕР","БАЗАДАННЫХ","ХОСТИНГ","ФРЕЙМВОРК","ДЕПЛОЙ","ГИТ","ГИТХАБ","УРЛ","БРАУЗЕР","КУКИ","СКРИПТ","ФЛЕКСБОКС","ГРИД","АДАПТИВНЫЙ","ТАЙПСКРИПТ","ВЕБПАК","ВЬЮ","САСС","БУТСТРАП","МАРШРУТИЗАЦИЯ","КОМПОНЕНТ","РЕНДЕР","ВЕРСТКА","ЛОКАЛХРАНИЛИЩЕ","ФЕТЧ","АСИНХРОННЫЙ","ПРОМИС","МОДУЛЬ","КОМПИЛЯТОР"],"datos":["МАЙЭСКЬЮЭЛЬ","ПОСТГРЕС","МОНГОДБ","ОРАКЛ","КВЕРИ","ИНДЕКС","СХЕМА","БЭКАП","ТАБЛИЦА","СТОЛБЕЦ","КЛЮЧ","ДЖОЙН","ВЫБРАТЬ","ВСТАВКА","ОБНОВЛЕНИЕ","УДАЛЕНИЕ","БАЗАДАННЫХ","КЛАСТЕР","РЕДИС","СКЛАЙТ","ПРОЦЕДУРА","ТРИГГЕР","НОСКЛ","БИГДАТА","ХРАНИЛИЩЕ","КЭШ","РЕПЛИКА","ШАРДИНГ","НОРМАЛИЗАЦИЯ","ТРАНЗАКЦИЯ","ЗАПРОС","ПРЕДСТАВЛЕНИЕ","МОДЕЛЬ","РЕЛЯЦИОННЫЙ","ПАРТИЦИЯ","ЛАТЕНТНОСТЬ","МАСШТАБИРУЕМОСТЬ","МИГРАЦИЯ","РЕЗЕРВ","ОПЕРАТОР"],"seguridad":["ШИФР","ТОКЕН","БРАНДМАУЭР","ВРЕДОНОС","ФИШИНГ","ХТТПС","ЭСЭСЭЛ","КРИПТО","ХЭШ","ПАРОЛЬ","АВТОРИЗАЦИЯ","РАСШИФРОВАТЬ","ЗАШИФРОВАТЬ","ПРОКСИ","ХАКЕР","КУКИ","РОУТЕР","ВИПИЭН","СОЛЕНИЕ","КАПЧА","ДЖОТ","БЕЗОПАСНОСТЬ","ЭКСПЛОЙТ","КИБЕР","БЭКДОР","ВЫМОГАТЕЛЬ","КЕЙЛОГГЕР","ШПИОН","ВТОРЖЕНИЕ","УЯЗВИМОСТЬ","ПЕНТЕСТ","БИОМЕТРИЯ","АНТИВИРУС","ИНКОГНИТО","ПЕСОЧНИЦА","СЕРТИФИКАТ","АУТЕНТИФИКАЦИЯ","ПРОТОКОЛ","МАНИПУЛЯЦИЯ","СПУФИНГ"],"ia":["АЛГОРИТМ","НЕЙРОННЫЙ","ДАТАСЕТ","МОДЕЛЬ","ПАЙТОН","ТЕНЗОРФЛОУ","ПАЙТОРЧ","ЧАТБОТ","ПРОМПТ","ИНФЕРЕНС","КЛАССИФИКАТОР","РЕГРЕССИЯ","КЛАСТЕРИЗАЦИЯ","ПЕРЕОБУЧЕНИЕ","ГРАДИЕНТ","ЭМБЕДДИНГ","ТРАНСФОРМЕР","ТОКЕН","ЗРЕНИЕ","НЕЙРОН","ТРЕНИРОВКА","РОБОТОТЕХНИКА","АВТОМАТИЗАЦИЯ","СЕТИ","ПЕРСЕПТРОН","РЕКУРРЕНТНЫЙ","КОНТРОЛИРУЕМЫЙ","ОБУЧЕНИЕ","ПРЕДСКАЗАНИЕ","ГЕНЕРАТИВНЫЙ","ДИПЛЕРНИНГ","ЧАТГПТ","СМЕЩЕНИЕ","ПРИЗНАК","МЕТКА","ТОЧНОСТЬ"],"cloud":["ДОКЕР","КУБЕРНЕТЕС","КОНТЕЙНЕР","ПАЙПЛАЙН","ДЖЕНКИНС","ТЕРРАФОРМ","ЭЙДАБЛЮЭС","АЗУРЕ","БЕССЕРВЕРНЫЙ","МИКРОСЕРВИС","ДЕВОПС","СИАЙСИДИ","ОБЛАКО","МАСШТАБИРУЕМОСТЬ","БАЛАНСИРОВЩИК","МОНИТОРИНГ","ЗАДЕРЖКА","ВИРТУАЛИЗАЦИЯ","ОРКЕСТРАЦИЯ","БЭКАП","КЛАСТЕР","УЗЕЛ","ДЕПЛОЙМЕНТ","ИНФРАСТРУКТУРА","ХЕЛМ","АНСИБЛ","ВАГРАНТ","ГИТОПС","НАБЛЮДАЕМОСТЬ","ОТКАЗОУСТОЙЧИВОСТЬ","РЕПЛИКАЦИЯ","МАСШТАБИРОВАНИЕ","РЕЕСТР","ОБРАЗ","ЯМЛ","СЕКРЕТ","НЕЙМСПЕЙС","ГИБРИДНЫЙ"],"diseno":["ВАЙРФРЕЙМ","ПРОТОТИП","ЮЗАБИЛИТИ","ТИПОГРАФИКА","ПАЛИТРА","ФИГМА","МАКЕТ","АДАПТИВНЫЙ","ДОСТУПНОСТЬ","ИНТЕРФЕЙС","ОПЫТ","КОМПОНЕНТ","СЕТКА","КОНТРАСТ","ИЕРАРХИЯ","МОКАП","ИКОНОГРАФИЯ","БРЕНДИНГ","МИНИМАЛИЗМ","ВЗАИМОДЕЙСТВИЕ","НАВИГАЦИЯ","КОЛОРИМЕТРИЯ","ОТСТУП","МУДБОРД","СКЕТЧ","ТРЕНД","СТИЛЬ","ШАБЛОН","БРЕЙКПОИНТ","ВЬЮПОРТ","ПИКСЕЛЬ","ВЕКТОРНЫЙ","АНИМАЦИЯ","ПЕРЕХОД","ПОЛЬЗОВАТЕЛЬ","ПЕРСОНА","СОГЛАСОВАННОСТЬ"],"historia":["ЕГИПЕТ","РИМ","ГРЕЦИЯ","ИМПЕРИЯ","ВОЙНА","РЕВОЛЮЦИЯ","ЦИВИЛИЗАЦИЯ","ФАРАОН","ПИРАМИДА","ВИКИНГ","ЗАВОЕВАНИЕ","КОЛОНИЯ","МОНАРХИЯ","РЕСПУБЛИКА","НЕЗАВИСИМОСТЬ","ВОЗРОЖДЕНИЕ","АРХЕОЛОГИЯ","ГЛАДИАТОР","ЗАМОК","ДИНАСТИЯ","СРЕДНЕВЕКОВЬЕ","ДРЕВНОСТЬ","РАБСТВО","ДОГОВОР","БИТВА","АРМИЯ","ПАМЯТНИК","МУМИЯ","ИЕРОГЛИФ","СПАРТА","АФИНЫ","ВИЗАНТИЯ","ФЕОДАЛИЗМ","КРЕСТОВЫЕПОХОДЫ","ИМПЕРАТОР"],"astronomia":["ГАЛАКТИКА","ПЛАНЕТА","ЗВЕЗДА","КОМЕТА","АСТЕРОИД","ТУМАННОСТЬ","СПУТНИК","ТЕЛЕСКОП","ОРБИТА","ГРАВИТАЦИЯ","ВСЕЛЕННАЯ","ЗАТМЕНИЕ","МЕТЕОРИТ","СВЕРХНОВАЯ","МАРС","ВЕНЕРА","ЮПИТЕР","САТУРН","МЕРКУРИЙ","УРАН","НЕПТУН","ПЛУТОН","ЛУНА","КОСМОНАВТ","РАКЕТА","СОЗВЕЗДИЕ","ВРАЩЕНИЕ","ОБРАЩЕНИЕ","АТМОСФЕРА","КРАТЕР","АСТРОНОМ","ОБСЕРВАТОРИЯ"],"arte":["ЖИВОПИСЬ","СКУЛЬПТУРА","МУЗЫКА","ЛИТЕРАТУРА","КИНО","ТЕАТР","ПОЭЗИЯ","РОМАН","МЕЛОДИЯ","ГАРМОНИЯ","ОРКЕСТР","СИМФОНИЯ","ХУДОЖНИК","ПИСАТЕЛЬ","АКТЁР","РЕЖИССЁР","СЦЕНАРИЙ","ПОРТРЕТ","МУРАЛ","ФРЕСКА","БАЛЕТ","ОПЕРА","ДЖАЗ","ФОЛЬКЛОР","НАСЛЕДИЕ","МУЗЕЙ","ГАЛЕРЕЯ","ВЫСТАВКА","КОМПОЗИТОР","ДРАМАТУРГ","АКВАРЕЛЬ"],"geografia":["КОНТИНЕНТ","ОКЕАН","ХРЕБЕТ","РЕКА","ПУСТЫНЯ","ВУЛКАН","ОСТРОВ","ПОЛУОСТРОВ","ЛЕДНИК","САВАННА","ДЖУНГЛИ","ЛЕС","ОЗЕРО","ДОЛИНА","МЕТЕОРОЛОГИЯ","КЛИМАТ","ШИРОТА","ДОЛГОТА","ЭКВАТОР","ПОЛУШАРИЕ","СТОЛИЦА","ГРАНИЦА","НАСЕЛЕНИЕ","АРХИПЕЛАГ","АТЛАС","КАРТОГРАФИЯ","ТЕРРИТОРИЯ","ПЕЙЗАЖ","ПЛОСКОГОРЬЕ","СТЕПЬ","ТУНДРА"],"ciencia":["БИОЛОГИЯ","ФИЗИКА","ХИМИЯ","КЛЕТКА","ГЕНЕТИКА","ЭВОЛЮЦИЯ","ЭКОСИСТЕМА","ФОТОСИНТЕЗ","МОЛЕКУЛА","АТОМ","ЭЛЕМЕНТ","ЭНЕРГИЯ","МАГНЕТИЗМ","ЭЛЕКТРИЧЕСТВО","БАКТЕРИЯ","ВИРУС","МЛЕКОПИТАЮЩЕЕ","РЕПТИЛИЯ","АМФИБИЯ","БЕСПОЗВОНОЧНОЕ","СРЕДАОБИТАНИЯ","БИОРАЗНООБРАЗИЕ","КИСЛОРОД","ВОДОРОД","БЕЛОК","ФЕРМЕНТ","ХРОМОСОМА","МЕТАБОЛИЗМ","ОРГАНИЗМ"],"mitologia":["ЗЕВС","ГЕРАКЛ","АФИНА","ПОСЕЙДОН","АИД","АПОЛЛОН","АРТЕМИДА","АФРОДИТА","АРЕС","ГЕРМЕС","ДИОНИС","ОЛИМП","ТИТАН","ЦИКЛОП","МИНОТАВР","СФИНКС","ПЕГАС","ОДИССЕЯ","ТРОЯ","МЕДУЗА","КЕНТАВР","ОРАКУЛ","НИМФА","СИРЕНА","ДРАКОН","ВАЛЬХАЛЛА","ОДИН","ТОР","ЛОКИ","МИФОЛОГИЯ"]}},"zh":{"textosUI":{"brand":"字母汤","subtituloInicio":"选择一个游戏分类","crearCategoriaTitulo":"创建分类","crearCategoriaDesc":"添加你自己的主题和单词","mejoresTiempos":"🏆 最佳记录","sinPartidas":"暂无游戏记录","recordGlobal":"全球记录","botonPista":"💡 提示","botonMenu":"菜单","editorDescLarga":"选择一个名称、一个图标和你想要的单词。长度不用一致，游戏会自动排布。","labelNombreCat":"分类名称","labelIconoCat":"图标（一个表情符号，可选）","labelPalabrasCat":"单词（每行一个，或用逗号分隔）","placeholderNombreCat":"例如：运动、美食、剧集...","placeholderPalabrasCat":"足球, 篮球, 网球, 游泳, 马拉松...","botonGuardarCat":"保存分类","botonCancelar":"取消","errNombreVacio":"请给分类起个名字。","errPocasPalabras":"请至少输入3个有效单词（2到18个字符，不含空格或数字）。","palabrasPersonalizadasSufijo":"个自定义单词","confirmarBorrar":"确定要删除分类\"{nombre}\"吗？","ajustesTitulo":"设置","ajustesIdioma":"语言","ajustesTipografia":"字体","ajustesNegrita":"粗体","ajustesAdblock":"广告拦截器","ajustesProximamente":"即将推出","tipografiaSistema":"默认","tipografiaSerif":"衬线体","tipografiaMono":"等宽字体","tipografiaRedondeada":"圆体","modoOscuro":"深色模式","modoClaro":"浅色模式","editarTitle":"编辑","borrarTitle":"删除"},"nombresCategorias":{"web":"网页开发","datos":"数据库","seguridad":"网络安全","ia":"人工智能","cloud":"云计算与运维","diseno":"界面设计","historia":"历史","astronomia":"天文学","arte":"艺术与文化","geografia":"地理","ciencia":"科学与自然","mitologia":"神话"},"descripcionesCategorias":{"web":"前端、框架与浏览器","datos":"SQL、存储与服务器","seguridad":"加密、令牌与网络协议","ia":"算法、模型与机器学习","cloud":"容器、部署与基础设施","diseno":"界面、可用性与设计工具","historia":"文明、帝国与重大事件","astronomia":"行星、恒星与宇宙","arte":"绘画、音乐、电影与文学","geografia":"国家、山脉、河流与海洋","ciencia":"生物、物理与自然世界","mitologia":"神祇、英雄与古老传说"},"categoriasJuego":{"web":["JS","前端","后端","React","HTML","CSS","API","JSON","DOM","服务器","数据库","主机托管","框架","部署","Git","GitHub","网址","浏览器","Cookie","脚本","弹性布局","网格布局","响应式","TypeScript","Vue","路由","组件","渲染","本地存储","异步","承诺","模块","编译器","插件","缓存","请求","接口","语法"],"datos":["MySQL","PostgreSQL","MongoDB","甲骨文","查询","索引","模式","备份","数据表","字段","主键","外键","连接","选择语句","插入语句","更新语句","删除语句","数据库","集群","Redis","SQLite","存储过程","触发器","NoSQL","大数据","存储","缓存","副本","分片","规范化","事务","视图","模型","关系型","分区","延迟","可扩展性","迁移","冗余"],"seguridad":["密码算法","令牌","防火墙","恶意软件","网络钓鱼","HTTPS","SSL","密码学","哈希","密码","认证","解密","加密","代理","黑客","Cookie","路由器","VPN","加盐","验证码","JWT","安全","漏洞利用","网络空间","后门","勒索软件","键盘记录器","间谍软件","入侵","漏洞","渗透测试","生物识别","杀毒软件","隐身模式","沙盒","证书","身份验证","协议","社会工程","伪造攻击"],"ia":["算法","神经元网络","数据集","模型","Python","TensorFlow","PyTorch","聊天机器人","提示词","推理","分类器","回归","聚类","过拟合","梯度","嵌入","变换器","令牌","视觉","神经元","训练","机器人技术","自动化","网络","感知机","循环神经网络","监督学习","学习","预测","生成式","深度学习","ChatGPT","偏差","特征","标签","精确度"],"cloud":["Kubernetes","Docker","容器","流水线","Jenkins","Terraform","AWS","Azure","无服务器","微服务","开发运维","持续集成","云计算","可扩展性","负载均衡","监控","延迟","虚拟化","编排","备份","集群","节点","部署","基础设施","Helm","Ansible","Vagrant","GitOps","可观测性","容错","复制","扩展","镜像仓库","镜像","YAML","密钥","命名空间","混合云"],"diseno":["线框图","原型","可用性","字体","调色板","Figma","布局","响应式","无障碍设计","界面","用户体验","组件","网格","对比度","层级","样机","图标设计","品牌塑造","极简主义","交互","导航","色彩学","间距","情绪板","Sketch","趋势","风格","模板","断点","视口","像素","矢量","动画","过渡","用户","用户画像","一致性"],"historia":["埃及","罗马","希腊","帝国","战争","革命","文明","法老","金字塔","维京人","征服","殖民地","君主制","共和国","独立","文艺复兴","考古学","角斗士","城堡","王朝","中世纪","古代","奴隶制","条约","战役","军队","纪念碑","木乃伊","象形文字","斯巴达","雅典","拜占庭","封建主义","十字军","皇帝"],"astronomia":["星系","行星","恒星","彗星","小行星","星云","卫星","望远镜","轨道","引力","宇宙","日食","陨石","超新星","火星","金星","木星","土星","水星","天王星","海王星","冥王星","月球","宇航员","火箭","星座","自转","公转","大气层","陨石坑","天文学家","天文台"],"arte":["绘画","雕塑","音乐","文学","电影","戏剧","诗歌","小说","旋律","和声","管弦乐队","交响乐","画家","作家","演员","导演","剧本","肖像","壁画","湿壁画","芭蕾","歌剧","爵士乐","民俗","遗产","博物馆","画廊","展览","作曲家","剧作家","水彩画"],"geografia":["大陆","海洋","山脉","河流","沙漠","火山","岛屿","半岛","冰川","稀树草原","丛林","森林","湖泊","山谷","气象学","气候","纬度","经度","赤道","半球","首都","边境","人口","群岛","地图集","制图学","领土","风景","高原","草原","苔原"],"ciencia":["生物学","物理学","化学","细胞","遗传学","进化","生态系统","光合作用","分子","原子","元素","能量","磁性","电力","细菌","病毒","哺乳动物","爬行动物","两栖动物","无脊椎动物","栖息地","生物多样性","氧气","氢气","蛋白质","酵素","染色体","新陈代谢","有机体"],"mitologia":["宙斯","赫拉克勒斯","雅典娜","波塞冬","哈迪斯","阿波罗","阿尔忒弥斯","阿佛洛狄忒","阿瑞斯","赫尔墨斯","狄俄尼索斯","奥林匹斯","泰坦","独眼巨人","弥诺陶洛斯","斯芬克斯","珀伽索斯","奥德赛","特洛伊","美杜莎","半人马","神谕","宁芙","塞壬","巨龙","瓦尔哈拉","奥丁","索尔","洛基","神话学"]}},"ja":{"textosUI":{"brand":"ワードサーチ","subtituloInicio":"ゲームカテゴリーを選んでください","crearCategoriaTitulo":"カテゴリーを作成","crearCategoriaDesc":"自分だけのテーマと単語を追加しよう","mejoresTiempos":"🏆 ベストタイム","sinPartidas":"記録されたゲームはありません","recordGlobal":"世界記録","botonPista":"💡 ヒント","botonMenu":"メニュー","editorDescLarga":"名前、アイコン、好きな単語を選んでください。長さを揃える必要はなく、ゲームが自動で配置します。","labelNombreCat":"カテゴリー名","labelIconoCat":"アイコン（絵文字、任意）","labelPalabrasCat":"単語（1行に1つ、またはカンマ区切り）","placeholderNombreCat":"例：スポーツ、料理、ドラマ...","placeholderPalabrasCat":"サッカー, バスケ, テニス, スイミング, マラソン...","botonGuardarCat":"カテゴリーを保存","botonCancelar":"キャンセル","errNombreVacio":"カテゴリーに名前を付けてください。","errPocasPalabras":"有効な単語を3つ以上入力してください（2〜18文字、空白や数字は不可）。","palabrasPersonalizadasSufijo":"個のカスタム単語","confirmarBorrar":"「{nombre}」カテゴリーを削除しますか？","ajustesTitulo":"設定","ajustesIdioma":"言語","ajustesTipografia":"フォント","ajustesNegrita":"太字","ajustesAdblock":"広告ブロッカー","ajustesProximamente":"近日公開","tipografiaSistema":"デフォルト","tipografiaSerif":"セリフ体","tipografiaMono":"等幅フォント","tipografiaRedondeada":"丸ゴシック","modoOscuro":"ダークモード","modoClaro":"ライトモード","editarTitle":"編集","borrarTitle":"削除"},"nombresCategorias":{"web":"ウェブ開発","datos":"データベース","seguridad":"セキュリティ","ia":"人工知能","cloud":"クラウドとDevOps","diseno":"UI/UXデザイン","historia":"歴史","astronomia":"天文学","arte":"芸術と文化","geografia":"地理","ciencia":"科学と自然","mitologia":"神話"},"descripcionesCategorias":{"web":"フロントエンド、フレームワーク、ブラウザ","datos":"SQL、ストレージ、サーバー","seguridad":"暗号化、トークン、ウェブプロトコル","ia":"アルゴリズム、モデル、機械学習","cloud":"コンテナ、デプロイ、インフラ","diseno":"インターフェース、ユーザビリティ、デザインツール","historia":"文明、帝国、大事件","astronomia":"惑星、恒星、そして宇宙","arte":"絵画、音楽、映画、文学","geografia":"国、山、川、そして海","ciencia":"生物学、物理学、自然の世界","mitologia":"神々、英雄、古代の伝説"},"categoriasJuego":{"web":["ジャバスクリプト","フロントエンド","バックエンド","リアクト","HTML","CSS","API","JSON","DOM","サーバー","データベース","ホスティング","フレームワーク","デプロイ","ギット","ギットハブ","URL","ブラウザ","クッキー","スクリプト","フレックスボックス","グリッド","レスポンシブ","タイプスクリプト","ビュー","ルーティング","コンポーネント","レンダリング","ローカルストレージ","非同期","プロミス","モジュール","コンパイラ","プラグイン","キャッシュ","リクエスト"],"datos":["マイエスキューエル","ポスグレ","モンゴディービー","オラクル","クエリ","インデックス","スキーマ","バックアップ","テーブル","カラム","主キー","外部キー","結合","セレクト文","インサート文","アップデート文","デリート文","データベース","クラスタ","レディス","エスキューライト","ストアドプロシージャ","トリガー","ノーエスキューエル","ビッグデータ","ストレージ","キャッシュ","レプリカ","シャーディング","正規化","トランザクション","ビュー","モデル","リレーショナル","パーティション","レイテンシ","拡張性","移行","冗長化"],"seguridad":["暗号","トークン","ファイアウォール","マルウェア","フィッシング","HTTPS","SSL","暗号学","ハッシュ","パスワード","認証","復号","暗号化","プロキシ","ハッカー","クッキー","ルーター","VPN","ソルト","CAPTCHA","JWT","セキュリティ","エクスプロイト","サイバー","バックドア","ランサムウェア","キーロガー","スパイウェア","侵入","脆弱性","ペンテスト","生体認証","ウイルス対策","シークレットモード","サンドボックス","証明書","本人認証","プロトコル","ソーシャルエンジニアリング","なりすまし"],"ia":["アルゴリズム","ニューラルネット","データセット","モデル","パイソン","テンソルフロー","パイトーチ","チャットボット","プロンプト","推論","分類器","回帰","クラスタリング","過学習","勾配","埋め込み","トランスフォーマー","トークン","視覚","ニューロン","訓練","ロボット工学","自動化","ネットワーク","パーセプトロン","再帰型ネットワーク","教師あり学習","学習","予測","生成的","ディープラーニング","ChatGPT","バイアス","特徴","ラベル","精度"],"cloud":["ドッカー","クバネティス","コンテナ","パイプライン","ジェンキンス","テラフォーム","AWS","アジュール","サーバーレス","マイクロサービス","DevOps","CICD","クラウド","拡張性","ロードバランサー","監視","レイテンシ","仮想化","オーケストレーション","バックアップ","クラスタ","ノード","デプロイメント","インフラ","ヘルム","アンシブル","ベイグラント","ギットオプス","可観測性","耐障害性","複製","スケーリング","レジストリ","イメージ","YAML","シークレット","ネームスペース","ハイブリッドクラウド"],"diseno":["ワイヤーフレーム","プロトタイプ","ユーザビリティ","タイポグラフィ","カラーパレット","フィグマ","レイアウト","レスポンシブ","アクセシビリティ","インターフェース","ユーザーエクスペリエンス","コンポーネント","グリッド","コントラスト","階層","モックアップ","アイコンデザイン","ブランディング","ミニマリズム","インタラクション","ナビゲーション","色彩学","余白","ムードボード","スケッチ","トレンド","スタイル","テンプレート","ブレークポイント","ビューポート","ピクセル","ベクター","アニメーション","トランジション","ユーザー","ペルソナ","一貫性"],"historia":["エジプト","ローマ","ギリシャ","帝国","戦争","革命","文明","ファラオ","ピラミッド","バイキング","征服","植民地","君主制","共和国","独立","ルネサンス","考古学","剣闘士","城郭","王朝","中世","古代","奴隷制","条約","戦い","軍隊","記念碑","ミイラ","ヒエログリフ","スパルタ","アテネ","ビザンチン","封建制","十字軍","皇帝"],"astronomia":["銀河","惑星","恒星","彗星","小惑星","星雲","衛星","望遠鏡","軌道","重力","宇宙","日食","隕石","超新星","火星","金星","木星","土星","水星","天王星","海王星","冥王星","満月","宇宙飛行士","ロケット","星座","自転","公転","大気圏","クレーター","天文学者","天文台"],"arte":["絵画","彫刻","音楽","文学","映画","演劇","詩歌","小説","メロディー","ハーモニー","オーケストラ","交響曲","画家","作家","俳優","監督","脚本","肖像画","壁画","フレスコ画","バレエ","オペラ","ジャズ","フォークロア","遺産","美術館","画廊","展覧会","作曲家","劇作家","水彩画"],"geografia":["大陸","海洋","山脈","河川","砂漠","火山","孤島","半島","氷河","サバンナ","ジャングル","森林","湖沼","渓谷","気象学","気候","緯度","経度","赤道","半球","首都","国境","人口","群島","地図帳","地図学","領土","風景","高原","ステップ","ツンドラ"],"ciencia":["生物学","物理学","化学","細胞","遺伝学","進化","生態系","光合成","分子","原子","元素","エネルギー","磁気","電気","細菌","ウイルス","哺乳類","爬虫類","両生類","無脊椎動物","生息地","生物多様性","酸素","水素","タンパク質","酵素","染色体","代謝","生物"],"mitologia":["ゼウス","ヘラクレス","アテナ","ポセイドン","ハデス","アポロン","アルテミス","アフロディーテ","アレス","ヘルメス","ディオニュソス","オリンポス","ティターン","サイクロプス","ミノタウロス","スフィンクス","ペガサス","オデュッセイア","トロイ","メデューサ","ケンタウロス","神託","ニンフ","セイレーン","飛竜","ヴァルハラ","オーディン","トール","ロキ","神話学"]}}};

const IDIOMAS_DISPONIBLES = Object.keys(IDIOMAS_INFO);
let idiomaActual = localStorage.getItem("sopa_idioma") || "es";
if (!datosIdiomas[idiomaActual]) idiomaActual = "es";

// Devuelve el texto de interfaz de la clave pedida en el idioma actual,
// con fallback a español si falta esa clave en el idioma elegido.
function t(clave) {
  const textos = datosIdiomas[idiomaActual].textosUI;
  return (textos && textos[clave]) || datosIdiomas.es.textosUI[clave] || clave;
}

// Letras de relleno para las celdas que no forman parte de ninguna
// palabra: cada idioma usa su propio alfabeto (incluida la Ñ en español,
// que fue justamente el motivo por el que este sistema de idiomas nació).
const ALFABETOS_RELLENO = {
  es: "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ",
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  pt: "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕ",
  fr: "ABCDEFGHIJKLMNOPQRSTUVWXYZÉÈÇ",
  it: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  de: "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ",
  ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  zh: "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反",
  ja: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん",
};

let bancoPalabras = [];
let palabrasOrdenadas = [];
const filas = 18,
  columnas = 18;
let tablero = [],
  palabrasEnTablero = [],
  palabrasEncontradas = [],
  registroPalabrasInfo = {};
let seleccionando = false,
  celdaInicio = null,
  celdasSeleccionadas = [],
  segundos = 0,
  intervaloTiempo = null;

// Guardamos cada trazo dibujado (coordenadas de celda, no píxeles) para
// poder redibujarlos cuando cambia el tamaño de celda (resize / rotación).
let marcadoresData = [];

const coloresPastel = [
  "rgba(52,211,153,0.4)",
  "rgba(96,165,250,0.4)",
  "rgba(244,114,182,0.4)",
  "rgba(251,191,36,0.4)",
  "rgba(167,139,250,0.4)",
  "rgba(45,212,191,0.4)",
  "rgba(251,146,60,0.4)",
  "rgba(14,165,233,0.4)",
];

const tableroDiv = document.getElementById("tablero-sopa");
const capaResaltadores = document.getElementById("capa-resaltadores");
const contenedorPalabras = document.getElementById("contenedor-palabras");
const panelTablero = document.querySelector(".panel-tablero");
const contenedorRelativo = document.querySelector(
  ".contenedor-tablero-relativo",
);
const btnPista = document.getElementById("btn-pista");
const btnVolver = document.getElementById("btn-volver");
const txtTiempo = document.getElementById("tiempo-reloj");
const txtProgreso = document.getElementById("num-progreso");
const barraProgreso = document.getElementById("barra-progreso");

document.documentElement.style.setProperty("--filas", filas);
document.documentElement.style.setProperty("--columnas", columnas);

function lanzarJuegoConCategoria(catTxt, listaPalabras) {
  AudioJuego.init();
  bancoPalabras = listaPalabras;
  palabrasOrdenadas = [...bancoPalabras].sort((a, b) => b.length - a.length);
  document.getElementById("titulo-categoria").textContent = catTxt;
  document.getElementById("pantalla-inicio").style.display = "none";
  document.getElementById("pantalla-editor").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "flex";
  moverBarraFlotante("anchor-juego");
  inicializarJuego();
}

// La barra de botones (ajustes / modo oscuro) es un único elemento del DOM
// que se muda entre pantallas: así nunca queda flotando encima del
// tablero ni tapando texto, siempre vive dentro del header que corresponda.
function moverBarraFlotante(idAnchor) {
  const barra = document.getElementById("barra-flotante");
  const destino = document.getElementById(idAnchor);
  if (barra && destino) destino.appendChild(barra);
}

// Punto de entrada único: busca la categoría entre las fijas y las
// personalizadas (creadas con el editor) y arranca la partida.
function iniciarPartidaPorId(catId) {
  const datos = datosIdiomas[idiomaActual];
  if (datos.categoriasJuego[catId]) {
    lanzarJuegoConCategoria(
      datos.nombresCategorias[catId] || catId,
      datos.categoriasJuego[catId],
    );
  } else if (categoriasPersonalizadas[catId]) {
    lanzarJuegoConCategoria(
      categoriasPersonalizadas[catId].nombre,
      categoriasPersonalizadas[catId].palabras,
    );
  }
}

// --- TAMAÑO DE CELDA 100% RESPONSIVE ---
// Calculamos cuánto espacio hay realmente disponible y ajustamos
// --cell-size para que el tablero SIEMPRE entre completo en la pantalla,
// sin cortarse ni necesitar scroll.
// En tablet (521-900px) la pantalla de juego queda con altura fija sin
// scroll (ver CSS), así que ahí el tamaño de celda también tiene que
// respetar la altura disponible, no solo el ancho; en el resto de los
// tamaños de pantalla el ancho sigue siendo el único límite, como antes.
const consultaTablet = window.matchMedia(
  "(min-width: 521px) and (max-width: 900px)",
);
function actualizarTamanoCelda() {
  if (!panelTablero || !contenedorRelativo) return;
  let tamano;
  if (consultaTablet.matches) {
    const anchoDisponible = contenedorRelativo.clientWidth - 4;
    const altoDisponible = contenedorRelativo.clientHeight - 4;
    const tamanoAncho = Math.floor(anchoDisponible / columnas);
    const tamanoAlto = Math.floor(altoDisponible / filas);
    tamano = Math.min(tamanoAncho, tamanoAlto > 0 ? tamanoAlto : tamanoAncho);
    tamano = Math.max(13, Math.min(38, tamano));
  } else {
    const estilos = getComputedStyle(panelTablero);
    const paddingH =
      parseFloat(estilos.paddingLeft || 0) +
      parseFloat(estilos.paddingRight || 0);
    const anchoDisponible = panelTablero.clientWidth - paddingH - 4;
    tamano = Math.floor(anchoDisponible / columnas);
    tamano = Math.max(16, Math.min(38, tamano));
  }
  document.documentElement.style.setProperty("--cell-size", `${tamano}px`);
  // Después de cambiar el tamaño, los trazos guardados quedan mal
  // posicionados en píxeles viejos: los recalculamos.
  redibujarMarcadores();
}

let resizeTimeout = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(actualizarTamanoCelda, 80);
});
window.addEventListener("orientationchange", () => {
  setTimeout(actualizarTamanoCelda, 150);
});

function inicializarJuego() {
  tablero = Array(filas)
    .fill(null)
    .map(() => Array(columnas).fill(""));
  palabrasEncontradas = [];
  palabrasEnTablero = [];
  celdasSeleccionadas = [];
  registroPalabrasInfo = {};
  marcadoresData = [];
  seleccionando = false;
  celdaInicio = null;
  if (capaResaltadores) capaResaltadores.innerHTML = "";
  if (btnPista) btnPista.disabled = false;

  clearInterval(intervaloTiempo);
  segundos = 0;
  txtTiempo.textContent = "00:00";
  intervaloTiempo = setInterval(() => {
    segundos++;
    txtTiempo.textContent = `${Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0")}:${(segundos % 60).toString().padStart(2, "0")}`;
  }, 1000);

  tableroDiv.innerHTML = "";
  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < columnas; c++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.dataset.fila = r;
      celda.dataset.columna = c;
      tableroDiv.appendChild(celda);
    }
  }
  colocarPalabras();
  const letras = ALFABETOS_RELLENO[idiomaActual] || ALFABETOS_RELLENO.es;
  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < columnas; c++) {
      if (tablero[r][c] === "")
        tablero[r][c] = letras[Math.floor(Math.random() * letras.length)];
    }
  }
  const celdasDOM = tableroDiv.children;
  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < columnas; c++) {
      const index = r * columnas + c;
      celdasDOM[index].textContent = tablero[r][c];

      // Mouse Listeners
      celdasDOM[index].addEventListener("mousedown", iniciarSeleccion);
      celdasDOM[index].addEventListener("mouseenter", avanzarSeleccion);
    }
  }
  // Touch Listeners unificados en el contenedor principal del Grid
  tableroDiv.addEventListener("touchstart", manejarTouchStart, {
    passive: false,
  });
  tableroDiv.addEventListener("touchmove", manejarTouchMove, {
    passive: false,
  });
  tableroDiv.addEventListener("touchend", manejarTouchEnd);

  window.addEventListener("mouseup", finalizarSeleccion);
  renderizarPalabras();
  actualizarTamanoCelda();
}

function colocarPalabras() {
  // Le damos más "peso" a las diagonales repitiéndolas varias veces en el
  // pool de direcciones posibles: así, al elegir una dirección al azar,
  // es mucho más probable que salga una diagonal que una horizontal o
  // vertical. Mantenemos los dos sentidos de cada diagonal (normal e
  // invertida) repetidos por igual para que ninguno predomine.
  const vectores = [
    { f: 0, c: 1 }, // horizontal →
    { f: 0, c: -1 }, // horizontal ← (invertida)
    { f: 1, c: 0 }, // vertical ↓
    { f: -1, c: 0 }, // vertical ↑ (invertida)
  ];
  const diagonales = [
    { f: 1, c: 1 }, // diagonal ↘
    { f: 1, c: -1 }, // diagonal ↙
    { f: -1, c: 1 }, // diagonal ↗ (invertida)
    { f: -1, c: -1 }, // diagonal ↖ (invertida)
  ];
  const vectors = [...vectores, ...diagonales, ...diagonales];
  palabrasOrdenadas.forEach((palabra) => {
    if (palabra.length > Math.max(filas, columnas)) return;
    let colocada = false,
      intentos = 0;
    while (!colocada && intentos < 1000) {
      intentos++;
      const d = vectors[Math.floor(Math.random() * vectors.length)];
      const longitud = palabra.length;
      let fila = Math.floor(Math.random() * filas),
        col = Math.floor(Math.random() * columnas);
      let finFila = fila + d.f * (longitud - 1),
        finCol = col + d.c * (longitud - 1);
      if (finFila >= filas || finFila < 0 || finCol >= columnas || finCol < 0)
        continue;
      let valido = true,
        tieneCruce = false;
      for (let i = 0; i < longitud; i++) {
        let f = fila + d.f * i,
          c = col + d.c * i;
        if (tablero[f][c] !== "") {
          if (tablero[f][c] === palabra[i]) tieneCruce = true;
          else {
            valido = false;
            break;
          }
        }
      }
      if (
        valido &&
        !tieneCruce &&
        intentos < 500 &&
        palabrasEnTablero.length > 0
      )
        continue;
      if (valido) {
        for (let i = 0; i < longitud; i++) {
          tablero[fila + d.f * i][col + d.c * i] = palabra[i];
        }
        palabrasEnTablero.push(palabra);
        registroPalabrasInfo[palabra] = { f: fila, c: col };
        colocada = true;
      }
    }
  });
}
function avanzarSeleccion(e) {
  if (!seleccionando || !celdaInicio || !e.target.classList.contains("celda"))
    return;
  calcularTrazoLinea(e.target);
}

function calcularTrazoLinea(celdaActual) {
  const fInicio = parseInt(celdaInicio.dataset.fila),
    cInicio = parseInt(celdaInicio.dataset.columna);
  const fActual = parseInt(celdaActual.dataset.fila),
    cActual = parseInt(celdaActual.dataset.columna);
  let diffFila = fActual - fInicio,
    diffCol = cActual - cInicio;
  let dirF = 0,
    dirC = 0,
    pasos = 0;

  if (diffFila === 0 && diffCol !== 0) {
    dirC = diffCol > 0 ? 1 : -1;
    pasos = Math.abs(diffCol);
  } else if (diffCol === 0 && diffFila !== 0) {
    dirF = diffFila > 0 ? 1 : -1;
    pasos = Math.abs(diffFila);
  } else if (Math.abs(diffFila) === Math.abs(diffCol) && diffFila !== 0) {
    dirF = diffFila > 0 ? 1 : -1;
    dirC = diffCol > 0 ? 1 : -1;
    pasos = Math.abs(diffFila);
  } else return;

  const celdasDOM = tableroDiv.children;
  const celdasPrevias = new Set(celdasSeleccionadas);

  for (let i = 0; i < celdasDOM.length; i++)
    celdasDOM[i].classList.remove("seleccionada");
  celdasSeleccionadas = [];
  let huboCambio = false;
  for (let i = 0; i <= pasos; i++) {
    let celdaLinea =
      celdasDOM[(fInicio + dirF * i) * columnas + (cInicio + dirC * i)];
    if (celdaLinea) {
      if (!celdasPrevias.has(celdaLinea)) huboCambio = true;
      celdasSeleccionadas.push(celdaLinea);
      celdaLinea.classList.add("seleccionada");
    }
  }
  if (huboCambio || celdasSeleccionadas.length !== celdasPrevias.size) {
    AudioJuego.playClick();
  }
}

function iniciarSeleccion(e) {
  if (!e.target.classList.contains("celda")) return;
  AudioJuego.init();
  AudioJuego.playClick();
  seleccionando = true;
  celdaInicio = e.target;
  celdasSeleccionadas = [celdaInicio];
  celdaInicio.classList.add("seleccionada");
}

function finalizarSeleccion() {
  if (!seleccionando || celdasSeleccionadas.length === 0) return;
  seleccionando = false;
  let palabraSel = celdasSeleccionadas.map((c) => c.textContent).join("");
  let palabraInv = palabraSel.split("").reverse().join("");
  let encontradaNow = null;
  if (
    palabrasEnTablero.includes(palabraSel) &&
    !palabrasEncontradas.includes(palabraSel)
  )
    encontradaNow = palabraSel;
  else if (
    palabrasEnTablero.includes(palabraInv) &&
    !palabrasEncontradas.includes(palabraInv)
  )
    encontradaNow = palabraInv;

  if (encontradaNow) {
    palabrasEncontradas.push(encontradaNow);
    AudioJuego.playExito();
    const color =
      coloresPastel[palabrasEncontradas.length % coloresPastel.length];
    const inicio = celdasSeleccionadas[0];
    const fin = celdasSeleccionadas[celdasSeleccionadas.length - 1];

    // Guardamos el trazo en coordenadas de celda (no píxeles) para poder
    // recalcularlo si el tamaño de celda cambia (responsive).
    marcadoresData.push({
      fInicio: parseInt(inicio.dataset.fila),
      cInicio: parseInt(inicio.dataset.columna),
      fFin: parseInt(fin.dataset.fila),
      cFin: parseInt(fin.dataset.columna),
      color,
    });
    dibujarMarcador(marcadoresData[marcadoresData.length - 1]);

    celdasSeleccionadas.forEach((c) => c.classList.add("encontrada"));
    renderizarPalabras();
    if (palabrasEncontradas.length === palabrasEnTablero.length) {
      clearInterval(intervaloTiempo);
      btnPista.disabled = true;
      AudioJuego.playVictoria();
      guardarRecord();
    }
  }
  const celdasDOM = tableroDiv.children;
  for (let i = 0; i < celdasDOM.length; i++)
    celdasDOM[i].classList.remove("seleccionada");
  celdaInicio = null;
}

// Dibuja un trazo a partir de coordenadas de celda, usando el tamaño de
// celda REAL medido en el DOM (así siempre queda alineado, sea cual sea
// el --cell-size actual).
function dibujarMarcador(m) {
  const celdasDOM = tableroDiv.children;
  const inicio = celdasDOM[m.fInicio * columnas + m.cInicio];
  const fin = celdasDOM[m.fFin * columnas + m.cFin];
  if (!inicio || !fin) return;

  const cellSize = inicio.offsetWidth;
  const semi = cellSize / 2;
  const grosor = cellSize * 0.9;

  const x1 = inicio.offsetLeft + semi,
    y1 = inicio.offsetTop + semi;
  const x2 = fin.offsetLeft + semi,
    y2 = fin.offsetTop + semi;

  const marcador = document.createElement("div");
  marcador.classList.add("trazo-marcador");
  marcador.style.backgroundColor = m.color;
  marcador.style.height = `${grosor}px`;
  marcador.style.borderRadius = `${grosor / 2}px`;
  marcador.style.transformOrigin = `${grosor / 2}px ${grosor / 2}px`;
  marcador.style.width = `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + grosor}px`;
  marcador.style.left = `${x1 - grosor / 2}px`;
  marcador.style.top = `${y1 - grosor / 2}px`;
  marcador.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}deg)`;
  capaResaltadores.appendChild(marcador);
}

function redibujarMarcadores() {
  if (!capaResaltadores) return;
  capaResaltadores.innerHTML = "";
  marcadoresData.forEach((m) => dibujarMarcador(m));
}

// Controladores Touch de Alto Rendimiento para Celulares
function manejarTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el && el.classList.contains("celda")) {
    AudioJuego.init();
    AudioJuego.playClick();
    seleccionando = true;
    celdaInicio = el;
    celdasSeleccionadas = [celdaInicio];
    celdaInicio.classList.add("seleccionada");
  }
}

function manejarTouchMove(e) {
  if (!seleccionando || !celdaInicio) return;
  e.preventDefault();
  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el && el.classList.contains("celda")) {
    calcularTrazoLinea(el);
  }
}

function manejarTouchEnd(e) {
  if (seleccionando) finalizarSeleccion();
}

// Las palabras NO encontradas mantienen su orden original; las
// encontradas se van agrupando al final, en el orden en que se
// descubrieron, para no tener que estar buscándolas en el medio de la
// lista.
function renderizarPalabras() {
  contenedorPalabras.innerHTML = "";
  const pendientes = palabrasEnTablero.filter(
    (p) => !palabrasEncontradas.includes(p),
  );
  const ordenFinal = [...pendientes, ...palabrasEncontradas];
  ordenFinal.forEach((palabra) => {
    const span = document.createElement("span");
    span.classList.add("palabra-lista");
    span.textContent = palabra;
    if (palabrasEncontradas.includes(palabra)) span.classList.add("tachada");
    contenedorPalabras.appendChild(span);
  });
  txtProgreso.textContent = `${palabrasEncontradas.length}/${palabrasEnTablero.length}`;
  barraProgreso.style.width = `${palabrasEnTablero.length > 0 ? (palabrasEncontradas.length / palabrasEnTablero.length) * 100 : 0}%`;
}

// NUEVO MOTOR DE CELEBRACIÓN DE CONFETI EN EL SCRIPT
function guardarRecord() {
  let records = JSON.parse(localStorage.getItem("sopa_apple_records")) || [];
  records.push({ tiempo: segundos, texto: txtTiempo.textContent });
  records.sort((a, b) => a.tiempo - b.tiempo);
  localStorage.setItem(
    "sopa_apple_records",
    JSON.stringify(records.slice(0, 5)),
  );

  // Disparamos la lluvia de confeti flotante nativa e independiente
  const canvas = document.getElementById("lienzo-confeti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particulas = [];

  for (let i = 0; i < 120; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      speedY: Math.random() * 1.5 + 1,
      osc: Math.random() * 0.03 + 0.01,
      step: Math.random() * 100,
      angle: 0,
      rot: Math.random() * 4 - 2,
      color: `hsl(${Math.random() * 360}, 85%, 60%)`,
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activas = false;
    particulas.forEach((p) => {
      p.y += p.speedY;
      p.step += p.osc;
      p.angle += p.rot;
      let xA = p.x + Math.sin(p.step) * 20;
      if (p.y < canvas.height) activas = true;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(xA, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    });
    if (activas) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  loop();

  // Transición limpia de regreso al menú tras 4 segundos de fiesta
  setTimeout(() => {
    volverAlMenu();
  }, 4000);
}

function cargarRecordsMenu() {
  const lista = document.getElementById("lista-records");
  const records = JSON.parse(localStorage.getItem("sopa_apple_records")) || [];
  lista.innerHTML =
    records.length === 0 ? `<li>${t("sinPartidas")}</li>` : "";
  records.forEach((r, i) => {
    lista.innerHTML += `<li><span>#${i + 1} ${t("recordGlobal")}</span> <span>${r.texto}</span></li>`;
  });
}

function volverAlMenu() {
  clearInterval(intervaloTiempo);
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-editor").style.display = "none";
  document.getElementById("pantalla-inicio").style.display = "block";
  moverBarraFlotante("anchor-inicio");
  cargarRecordsMenu();
}

// Asignar eventos a las tarjetas de categorías fijas
document.querySelectorAll(".tarjeta-categoria").forEach((btn) => {
  btn.addEventListener("click", () => iniciarPartidaPorId(btn.dataset.tema));
});

btnPista.addEventListener("click", () => {
  const noEncontradas = palabrasEnTablero.filter(
    (p) => !palabrasEncontradas.includes(p),
  );
  if (noEncontradas.length === 0) return;
  const coord =
    registroPalabrasInfo[
      noEncontradas[Math.floor(Math.random() * noEncontradas.length)]
    ];
  const celdaDOM = tableroDiv.children[coord.f * columnas + coord.c];
  if (celdaDOM) {
    celdaDOM.classList.add("pista-activa");
    setTimeout(() => celdaDOM.classList.remove("pista-activa"), 2000);
  }
});

btnVolver.addEventListener("click", volverAlMenu);
window.onload = () => {
  cargarRecordsMenu();
  moverBarraFlotante("anchor-inicio");
  aplicarIdioma();
};

// --- ÍCONOS SVG DIBUJADOS A MANO (nada de emojis en los botones) ---
const ICONO_LUNA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7z"/></svg>';
const ICONO_SOL =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.3M12 19.2v2.3M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.4 19.6L6 18M18 6l1.6-1.6"/></svg>';
const ICONO_ETIQUETA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v6.5c0 .4.16.78.44 1.06l8.5 8.5a1.5 1.5 0 0 0 2.12 0l6.5-6.5a1.5 1.5 0 0 0 0-2.12l-8.5-8.5a1.5 1.5 0 0 0-1.06-.44z"/><circle cx="8" cy="8" r="1.3"/></svg>';
const ICONO_ENGRANAJE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.1M12 18.4v2.1M20.5 12h-2.1M5.6 12H3.5M17.8 6.2l-1.5 1.5M7.7 16.3l-1.5 1.5M17.8 17.8l-1.5-1.5M7.7 7.7 6.2 6.2"/></svg>';

// --- MODO OSCURO ---
const btnOscuro = document.getElementById("btn-oscuro");
function aplicarIconoOscuro() {
  const activo = document.documentElement.dataset.modo === "oscuro";
  btnOscuro.innerHTML = activo ? ICONO_SOL : ICONO_LUNA;
  btnOscuro.title = activo ? t("modoClaro") : t("modoOscuro");
}
aplicarIconoOscuro();
btnOscuro.addEventListener("click", () => {
  const activo = document.documentElement.dataset.modo === "oscuro";
  if (activo) {
    delete document.documentElement.dataset.modo;
    localStorage.setItem("sopa_modo_oscuro", "0");
  } else {
    document.documentElement.dataset.modo = "oscuro";
    localStorage.setItem("sopa_modo_oscuro", "1");
  }
  aplicarIconoOscuro();
});

// --- AJUSTES: engranaje con idioma, tipografía, negrita y bloqueador de
// anuncios (este último es un placeholder para cuando se agreguen anuncios,
// hoy no hace nada más que guardarse). ---
const btnAjustes = document.getElementById("btn-ajustes");
const panelAjustes = document.getElementById("panel-ajustes");
const selectIdioma = document.getElementById("select-idioma");
const selectTipografia = document.getElementById("select-tipografia");
const chkNegrita = document.getElementById("chk-negrita");
const chkAdblock = document.getElementById("chk-adblock");

btnAjustes.innerHTML = ICONO_ENGRANAJE;

function cerrarPanelAjustes() {
  panelAjustes.hidden = true;
}
btnAjustes.addEventListener("click", (e) => {
  e.stopPropagation();
  panelAjustes.hidden = !panelAjustes.hidden;
});
document.addEventListener("click", (e) => {
  if (
    !panelAjustes.hidden &&
    !panelAjustes.contains(e.target) &&
    e.target !== btnAjustes
  ) {
    cerrarPanelAjustes();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarPanelAjustes();
});

// Idioma: población del <select> con nombres nativos + wiring
IDIOMAS_DISPONIBLES.forEach((codigo) => {
  const opt = document.createElement("option");
  opt.value = codigo;
  opt.textContent = IDIOMAS_INFO[codigo];
  selectIdioma.appendChild(opt);
});
selectIdioma.value = idiomaActual;
selectIdioma.addEventListener("change", () => {
  idiomaActual = selectIdioma.value;
  localStorage.setItem("sopa_idioma", idiomaActual);
  aplicarIdioma();
});

// Tipografía
const tipografiaGuardada = localStorage.getItem("sopa_tipografia") || "sistema";
if (tipografiaGuardada !== "sistema") {
  document.documentElement.dataset.tipografia = tipografiaGuardada;
}
selectTipografia.value = tipografiaGuardada;
selectTipografia.addEventListener("change", () => {
  const valor = selectTipografia.value;
  if (valor === "sistema") delete document.documentElement.dataset.tipografia;
  else document.documentElement.dataset.tipografia = valor;
  localStorage.setItem("sopa_tipografia", valor);
});

// Negrita
const negritaGuardada = localStorage.getItem("sopa_negrita") === "1";
if (negritaGuardada) document.documentElement.dataset.negrita = "1";
chkNegrita.checked = negritaGuardada;
chkNegrita.addEventListener("change", () => {
  if (chkNegrita.checked) document.documentElement.dataset.negrita = "1";
  else delete document.documentElement.dataset.negrita;
  localStorage.setItem("sopa_negrita", chkNegrita.checked ? "1" : "0");
});

// Bloqueador de anuncios: placeholder, todavía no hay anuncios que bloquear.
chkAdblock.checked = localStorage.getItem("sopa_adblock") === "1";
chkAdblock.addEventListener("change", () => {
  localStorage.setItem("sopa_adblock", chkAdblock.checked ? "1" : "0");
});

// Aplica el idioma actual a todo el texto traducible de las 3 pantallas:
// título de pestaña, textos fijos, categorías fijas, y vuelve a renderizar
// lo que se genera dinámicamente (records y categorías personalizadas).
function aplicarIdioma() {
  const datos = datosIdiomas[idiomaActual];

  document.title = t("brand");
  document.getElementById("titulo-inicio").textContent = t("brand");
  document
    .querySelectorAll(".marca-juego")
    .forEach((el) => (el.textContent = t("brand")));
  document.getElementById("subtitulo-inicio").textContent = t("subtituloInicio");
  document.getElementById("titulo-crear-cat").textContent = t("crearCategoriaTitulo");
  document.getElementById("desc-crear-cat").textContent = t("crearCategoriaDesc");
  document.getElementById("titulo-records").textContent = t("mejoresTiempos");
  document.getElementById("titulo-editor").textContent = t("crearCategoriaTitulo");
  document.getElementById("desc-editor").textContent = t("editorDescLarga");
  document.getElementById("label-nombre-cat").textContent = t("labelNombreCat");
  document.getElementById("label-icono-cat").textContent = t("labelIconoCat");
  document.getElementById("label-palabras-cat").textContent = t("labelPalabrasCat");
  document.getElementById("input-nombre-cat").placeholder = t("placeholderNombreCat");
  document.getElementById("input-palabras-cat").placeholder = t("placeholderPalabrasCat");
  document.getElementById("btn-guardar-cat").textContent = t("botonGuardarCat");
  document.getElementById("btn-cancelar-editor").textContent = t("botonCancelar");
  btnPista.textContent = t("botonPista");
  btnVolver.textContent = t("botonMenu");

  document.getElementById("label-ajuste-idioma").textContent = t("ajustesIdioma");
  document.getElementById("label-ajuste-tipografia").textContent = t("ajustesTipografia");
  document.getElementById("label-ajuste-negrita").textContent = t("ajustesNegrita");
  document.getElementById("label-ajuste-adblock").childNodes[0].textContent =
    t("ajustesAdblock") + " ";
  document.getElementById("etiqueta-proximamente").textContent =
    "(" + t("ajustesProximamente") + ")";
  document.getElementById("opt-tipo-sistema").textContent = t("tipografiaSistema");
  document.getElementById("opt-tipo-serif").textContent = t("tipografiaSerif");
  document.getElementById("opt-tipo-mono").textContent = t("tipografiaMono");
  document.getElementById("opt-tipo-redondeada").textContent = t("tipografiaRedondeada");
  btnAjustes.title = t("ajustesTitulo");
  selectIdioma.value = idiomaActual;
  aplicarIconoOscuro();

  document.querySelectorAll(".tarjeta-categoria[data-tema]").forEach((btn) => {
    const tema = btn.dataset.tema;
    if (!datos.nombresCategorias[tema]) return; // categoría personalizada: no tiene traducción
    const h3 = btn.querySelector("h3");
    const p = btn.querySelector("p");
    if (h3) h3.textContent = datos.nombresCategorias[tema];
    if (p) p.textContent = datos.descripcionesCategorias[tema];
  });

  cargarRecordsMenu();
  renderizarCategoriasPersonalizadas();
}

// --- CATEGORÍAS PERSONALIZADAS (EDITOR SIN CÓDIGO) ---
// Se guardan en localStorage, así que quedan en el navegador de quien las
// crea. Cada una tiene: nombre, ícono y una lista de palabras (largo libre).
const CLAVE_CATEGORIAS_PERSONALIZADAS = "sopa_categorias_personalizadas";
let categoriasPersonalizadas = {};
try {
  categoriasPersonalizadas =
    JSON.parse(localStorage.getItem(CLAVE_CATEGORIAS_PERSONALIZADAS)) || {};
} catch (e) {
  categoriasPersonalizadas = {};
}

function guardarCategoriasPersonalizadas() {
  localStorage.setItem(
    CLAVE_CATEGORIAS_PERSONALIZADAS,
    JSON.stringify(categoriasPersonalizadas),
  );
}

// Convierte cualquier texto ingresado por el usuario en una palabra válida
// para el tablero: mayúsculas, sin espacios ni símbolos ni números, pero
// conservando cualquier letra real del idioma (ñ, á, ü, ç, cirílico, etc.).
// Antes usábamos NFD + strip de diacríticos, pero eso rompía la Ñ (la
// descompone en N + tilde combinante y la deja como N).
function normalizarPalabra(texto) {
  return texto.toUpperCase().replace(/[^\p{L}]/gu, "");
}

const grillaPersonalizadas = document.getElementById("grid-personalizadas");
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaEditor = document.getElementById("pantalla-editor");
const inputNombreCat = document.getElementById("input-nombre-cat");
const inputIconoCat = document.getElementById("input-icono-cat");
const inputPalabrasCat = document.getElementById("input-palabras-cat");
const msgEditor = document.getElementById("msg-editor");
let idEnEdicion = null;

function renderizarCategoriasPersonalizadas() {
  grillaPersonalizadas.innerHTML = "";
  Object.keys(categoriasPersonalizadas).forEach((id) => {
    const cat = categoriasPersonalizadas[id];
    const btn = document.createElement("button");
    btn.className = "tarjeta-categoria personalizada";
    btn.dataset.tema = id;
    btn.innerHTML = `
      <div class="acciones-tarjeta">
        <button type="button" class="accion-mini" data-accion="editar" title="${t("editarTitle")}">✎</button>
        <button type="button" class="accion-mini" data-accion="borrar" title="${t("borrarTitle")}">✕</button>
      </div>
      <div class="icono-cat">${cat.icono ? `<span class="icono-emoji">${cat.icono}</span>` : ICONO_ETIQUETA}</div>
      <h3>${cat.nombre}</h3>
      <p>${cat.palabras.length} ${t("palabrasPersonalizadasSufijo")}</p>
    `;
    btn.addEventListener("click", (e) => {
      if (e.target.closest(".accion-mini")) return; // los botoncitos manejan su propio click
      iniciarPartidaPorId(id);
    });
    btn.querySelector('[data-accion="editar"]').addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        abrirEditor(id);
      },
    );
    btn.querySelector('[data-accion="borrar"]').addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        if (confirm(t("confirmarBorrar").replace("{nombre}", cat.nombre))) {
          delete categoriasPersonalizadas[id];
          guardarCategoriasPersonalizadas();
          renderizarCategoriasPersonalizadas();
        }
      },
    );
    grillaPersonalizadas.appendChild(btn);
  });
}

function abrirEditor(idExistente) {
  idEnEdicion = idExistente || null;
  msgEditor.textContent = "";
  msgEditor.classList.remove("exito");
  if (idExistente && categoriasPersonalizadas[idExistente]) {
    const cat = categoriasPersonalizadas[idExistente];
    inputNombreCat.value = cat.nombre;
    inputIconoCat.value = cat.icono || "";
    inputPalabrasCat.value = cat.palabras.join(", ");
  } else {
    inputNombreCat.value = "";
    inputIconoCat.value = "";
    inputPalabrasCat.value = "";
  }
  pantallaInicio.style.display = "none";
  pantallaEditor.style.display = "block";
  moverBarraFlotante("anchor-editor");
}

function cerrarEditor() {
  pantallaEditor.style.display = "none";
  pantallaInicio.style.display = "block";
  moverBarraFlotante("anchor-inicio");
}

document
  .getElementById("btn-abrir-editor")
  .addEventListener("click", () => abrirEditor(null));
document.getElementById("btn-cancelar-editor").addEventListener("click", cerrarEditor);

document.getElementById("btn-guardar-cat").addEventListener("click", () => {
  const nombre = inputNombreCat.value.trim();
  const icono = inputIconoCat.value.trim();
  const crudas = inputPalabrasCat.value
    .split(/[\n,]/)
    .map((p) => normalizarPalabra(p))
    .filter((p) => p.length >= 2 && p.length <= 18);
  const palabras = [...new Set(crudas)]; // sin duplicados

  if (!nombre) {
    msgEditor.textContent = t("errNombreVacio");
    msgEditor.classList.remove("exito");
    return;
  }
  if (palabras.length < 3) {
    msgEditor.textContent = t("errPocasPalabras");
    msgEditor.classList.remove("exito");
    return;
  }

  const id =
    idEnEdicion ||
    "custom_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  categoriasPersonalizadas[id] = { nombre, icono, palabras };
  guardarCategoriasPersonalizadas();
  renderizarCategoriasPersonalizadas();
  cerrarEditor();
});

renderizarCategoriasPersonalizadas();
