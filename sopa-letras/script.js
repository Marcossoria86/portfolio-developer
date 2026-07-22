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

const categoriasJuego = {
  web: [
    "JAVASCRIPT", "FRONTEND", "BACKEND", "REACT", "ANGULAR", "NODEJS", "HTML",
    "CSS", "API", "JSON", "DOM", "SERVER", "DATABASE", "HOSTING", "FRAMEWORK",
    "DEPLOY", "GIT", "GITHUB", "URL", "BROWSER", "COOKIE", "SCRIPT", "FLEXBOX",
    "GRID", "RESPONSIVE",
    "TYPESCRIPT", "WEBPACK", "VUEJS", "SASS", "BOOTSTRAP", "ROUTING",
    "COMPONENTE", "RENDER", "NAVEGADOR", "LOCALSTORAGE", "FETCH", "ASYNC",
    "PROMESA", "MODULO", "COMPILADOR",
  ],
  datos: [
    "MYSQL", "POSTGRES", "MONGODB", "ORACLE", "QUERY", "INDEX", "SCHEMA",
    "BACKUP", "TABLE", "COLUMN", "KEY", "JOIN", "SELECT", "INSERT", "UPDATE",
    "DELETE", "DATABASE", "CLUSTER", "REDIS", "SQLITE", "PROCEDURE",
    "TRIGGER", "NOSQL", "BIGDATA", "STORAGE",
    "CACHE", "REPLICA", "SHARDING", "NORMALIZACION", "TRANSACCION",
    "CONSULTA", "VISTA", "MODELO", "RELACIONAL", "PARTICION", "LATENCIA",
    "ESCALABILIDAD", "MIGRACION", "RESPALDO", "SENTENCIA",
  ],
  seguridad: [
    "CIPHER", "TOKEN", "FIREWALL", "MALWARE", "PHISHING", "HTTPS", "SSL",
    "CRYPTO", "HASH", "PASSWORD", "AUTH", "DECRYPT", "ENCRYPT", "PROXY",
    "HACKER", "COOKIES", "ROUTER", "VPN", "SALTING", "CAPTCHA", "JWT",
    "SECURITY", "EXPLOIT", "CYBER", "BACKDOOR",
    "RANSOMWARE", "KEYLOGGER", "SPYWARE", "INTRUSION", "VULNERABILIDAD",
    "PENTEST", "BIOMETRIA", "ANTIVIRUS", "INCOGNITO", "SANDBOX",
    "CERTIFICADO", "AUTENTICACION", "PROTOCOLO", "INGENIERIA", "SPOOFING",
  ],
  ia: [
    "ALGORITMO", "NEURONAL", "DATASET", "MODELO", "PYTHON", "TENSORFLOW",
    "PYTORCH", "CHATBOT", "PROMPT", "INFERENCIA", "CLASIFICADOR",
    "REGRESION", "CLUSTERING", "OVERFITTING", "GRADIENTE", "EMBEDDING",
    "TRANSFORMER", "TOKEN", "VISION", "NEURONA", "ENTRENAMIENTO",
    "ROBOTICA", "AUTOMATIZACION",
    "REDES", "PERCEPTRON", "RECURRENTE", "SUPERVISADO", "APRENDIZAJE",
    "PREDICCION", "GENERATIVA", "DEEPLEARNING", "CHATGPT", "BIAS",
    "FEATURE", "ETIQUETA", "PRECISION",
  ],
  cloud: [
    "DOCKER", "KUBERNETES", "CONTAINER", "PIPELINE", "JENKINS", "TERRAFORM",
    "AWS", "AZURE", "SERVERLESS", "MICROSERVICIO", "DEVOPS", "CICD", "NUBE",
    "ESCALABILIDAD", "LOADBALANCER", "MONITOREO", "LATENCIA",
    "VIRTUALIZACION", "ORQUESTACION", "BACKUP", "CLUSTER", "NODO",
    "DEPLOYMENT", "INFRAESTRUCTURA",
    "HELM", "ANSIBLE", "VAGRANT", "GITOPS", "OBSERVABILIDAD", "TOLERANCIA",
    "REPLICACION", "ESCALADO", "REGISTRO", "IMAGEN", "YAML", "SECRETO",
    "NAMESPACE", "HIBRIDA",
  ],
  diseno: [
    "WIREFRAME", "PROTOTIPO", "USABILIDAD", "TIPOGRAFIA", "PALETA", "FIGMA",
    "LAYOUT", "RESPONSIVE", "ACCESIBILIDAD", "INTERFAZ", "EXPERIENCIA",
    "COMPONENTE", "GRILLA", "CONTRASTE", "JERARQUIA", "MOCKUP",
    "ICONOGRAFIA", "BRANDING", "MINIMALISMO", "INTERACCION", "NAVEGACION",
    "COLORIMETRIA", "ESPACIADO",
    "MOODBOARD", "SKETCH", "TENDENCIA", "ESTILO", "PLANTILLA", "BREAKPOINT",
    "VIEWPORT", "PIXEL", "VECTORIAL", "ANIMACION", "TRANSICION", "USUARIO",
    "PERSONA", "CONSISTENCIA",
  ],
  historia: [
    "EGIPTO", "ROMA", "GRECIA", "IMPERIO", "GUERRA", "REVOLUCION",
    "CIVILIZACION", "FARAON", "PIRAMIDE", "VIKINGO", "CONQUISTA", "COLONIA",
    "MONARQUIA", "REPUBLICA", "INDEPENDENCIA", "RENACIMIENTO",
    "ARQUEOLOGIA", "GLADIADOR", "CASTILLO", "DINASTIA", "MEDIEVAL",
    "ANTIGUEDAD", "ESCLAVITUD", "TRATADO", "BATALLA", "EJERCITO",
    "MONUMENTO", "MOMIA", "JEROGLIFICO", "ESPARTA", "ATENAS", "BIZANTINO",
    "FEUDALISMO", "CRUZADAS", "EMPERADOR",
  ],
  astronomia: [
    "GALAXIA", "PLANETA", "ESTRELLA", "COMETA", "ASTEROIDE", "NEBULOSA",
    "SATELITE", "TELESCOPIO", "ORBITA", "GRAVEDAD", "UNIVERSO", "ECLIPSE",
    "METEORITO", "SUPERNOVA", "MARTE", "VENUS", "JUPITER", "SATURNO",
    "MERCURIO", "URANO", "NEPTUNO", "PLUTON", "LUNA", "ASTRONAUTA",
    "COHETE", "CONSTELACION", "ROTACION", "TRASLACION", "ATMOSFERA",
    "CRATER", "ASTRONOMO", "OBSERVATORIO",
  ],
  arte: [
    "PINTURA", "ESCULTURA", "MUSICA", "LITERATURA", "CINE", "TEATRO",
    "POESIA", "NOVELA", "MELODIA", "ARMONIA", "ORQUESTA", "SINFONIA",
    "PINTOR", "ESCRITOR", "ACTOR", "DIRECTOR", "GUION", "RETRATO", "MURAL",
    "FRESCO", "BALLET", "OPERA", "JAZZ", "FOLKLORE", "PATRIMONIO", "MUSEO",
    "GALERIA", "EXPOSICION", "COMPOSITOR", "DRAMATURGO", "ACUARELA",
  ],
  geografia: [
    "CONTINENTE", "OCEANO", "CORDILLERA", "RIO", "DESIERTO", "VOLCAN",
    "ISLA", "PENINSULA", "GLACIAR", "SABANA", "SELVA", "BOSQUE", "LAGO",
    "VALLE", "METEOROLOGIA", "CLIMA", "LATITUD", "LONGITUD", "ECUADOR",
    "HEMISFERIO", "CAPITAL", "FRONTERA", "POBLACION", "ARCHIPIELAGO",
    "ATLAS", "CARTOGRAFIA", "TERRITORIO", "PAISAJE", "ALTIPLANO", "ESTEPA",
    "TUNDRA",
  ],
  ciencia: [
    "BIOLOGIA", "FISICA", "QUIMICA", "CELULA", "GENETICA", "EVOLUCION",
    "ECOSISTEMA", "FOTOSINTESIS", "MOLECULA", "ATOMO", "ELEMENTO",
    "ENERGIA", "MAGNETISMO", "ELECTRICIDAD", "BACTERIA", "VIRUS",
    "MAMIFERO", "REPTIL", "ANFIBIO", "INVERTEBRADO", "HABITAT",
    "BIODIVERSIDAD", "OXIGENO", "HIDROGENO", "PROTEINA", "ENZIMA",
    "CROMOSOMA", "METABOLISMO", "ORGANISMO",
  ],
  mitologia: [
    "ZEUS", "HERCULES", "ATENEA", "POSEIDON", "HADES", "APOLO", "ARTEMISA",
    "AFRODITA", "ARES", "HERMES", "DIONISO", "OLIMPO", "TITAN", "CICLOPE",
    "MINOTAURO", "ESFINGE", "PEGASO", "ODISEA", "TROYA", "MEDUSA",
    "CENTAURO", "ORACULO", "NINFA", "SIRENA", "DRAGON", "VALHALLA", "ODIN",
    "THOR", "LOKI", "MITOLOGIA",
  ],
};

const nombresCategorias = {
  web: "Desarrollo Web",
  datos: "Bases de Datos",
  seguridad: "Seguridad",
  ia: "Inteligencia Artificial",
  cloud: "Cloud & DevOps",
  diseno: "Diseño UI/UX",
  historia: "Historia",
  astronomia: "Astronomía",
  arte: "Arte y Cultura",
  geografia: "Geografía",
  ciencia: "Ciencia y Naturaleza",
  mitologia: "Mitología",
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

// La barra de botones (música / modo oscuro) es un único elemento del DOM
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
  if (categoriasJuego[catId]) {
    lanzarJuegoConCategoria(
      nombresCategorias[catId] || catId,
      categoriasJuego[catId],
    );
  } else if (categoriasPersonalizadas[catId]) {
    lanzarJuegoConCategoria(
      categoriasPersonalizadas[catId].nombre,
      categoriasPersonalizadas[catId].palabras,
    );
  }
}

// --- TAMAÑO DE CELDA 100% RESPONSIVE ---
// Calculamos cuánto espacio horizontal hay realmente disponible (celular,
// tablet o escritorio) y ajustamos --cell-size para que el tablero SIEMPRE
// entre completo en la pantalla, sin cortarse ni necesitar scroll lateral.
function actualizarTamanoCelda() {
  if (!panelTablero) return;
  const estilos = getComputedStyle(panelTablero);
  const paddingH =
    parseFloat(estilos.paddingLeft || 0) + parseFloat(estilos.paddingRight || 0);
  const anchoDisponible = panelTablero.clientWidth - paddingH - 4;
  let tamano = Math.floor(anchoDisponible / columnas);
  tamano = Math.max(16, Math.min(38, tamano));
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
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

  // Cambiamos el cartel feo por una transición limpia de regreso al menú tras 4 segundos de fiesta
  setTimeout(() => {
    volverAlMenu();
  }, 4000);
}

function cargarRecordsMenu() {
  const lista = document.getElementById("lista-records");
  const records = JSON.parse(localStorage.getItem("sopa_apple_records")) || [];
  lista.innerHTML =
    records.length === 0 ? "<li>No hay partidas registradas</li>" : "";
  records.forEach((r, i) => {
    lista.innerHTML += `<li><span>#${i + 1} Record Global</span> <span>${r.texto}</span></li>`;
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
};

// --- ÍCONOS SVG DIBUJADOS A MANO (nada de emojis en los botones) ---
const ICONO_LUNA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7z"/></svg>';
const ICONO_SOL =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.3M12 19.2v2.3M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.4 19.6L6 18M18 6l1.6-1.6"/></svg>';
const ICONO_ETIQUETA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v6.5c0 .4.16.78.44 1.06l8.5 8.5a1.5 1.5 0 0 0 2.12 0l6.5-6.5a1.5 1.5 0 0 0 0-2.12l-8.5-8.5a1.5 1.5 0 0 0-1.06-.44z"/><circle cx="8" cy="8" r="1.3"/></svg>';

// --- MODO OSCURO ---
const btnOscuro = document.getElementById("btn-oscuro");
function aplicarIconoOscuro() {
  const activo = document.documentElement.dataset.modo === "oscuro";
  btnOscuro.innerHTML = activo ? ICONO_SOL : ICONO_LUNA;
  btnOscuro.title = activo ? "Modo claro" : "Modo oscuro";
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
// para el tablero: mayúsculas, sin acentos ni espacios ni símbolos.
function normalizarPalabra(texto) {
  return texto
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca tildes (á->A, ñ->N, etc.)
    .replace(/[^A-Z]/g, ""); // saca todo lo que no sea letra
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
        <button type="button" class="accion-mini" data-accion="editar" title="Editar">✎</button>
        <button type="button" class="accion-mini" data-accion="borrar" title="Borrar">✕</button>
      </div>
      <div class="icono-cat">${cat.icono ? `<span class="icono-emoji">${cat.icono}</span>` : ICONO_ETIQUETA}</div>
      <h3>${cat.nombre}</h3>
      <p>${cat.palabras.length} palabras personalizadas</p>
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
        if (confirm(`¿Borrar la categoría "${cat.nombre}"?`)) {
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
    msgEditor.textContent = "Ponele un nombre a la categoría.";
    msgEditor.classList.remove("exito");
    return;
  }
  if (palabras.length < 3) {
    msgEditor.textContent =
      "Cargá al menos 3 palabras válidas (2 a 18 letras, sin espacios ni números).";
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
