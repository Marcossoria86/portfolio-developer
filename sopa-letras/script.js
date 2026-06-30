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
    "JAVASCRIPT",
    "FRONTEND",
    "BACKEND",
    "REACT",
    "ANGULAR",
    "NODEJS",
    "HTML",
    "CSS",
    "API",
    "JSON",
    "DOM",
    "SERVER",
    "DATABASE",
    "HOSTING",
    "FRAMEWORK",
    "DEPLOY",
    "GIT",
    "GITHUB",
    "URL",
    "BROWSER",
    "COOKIE",
    "SCRIPT",
    "FLEXBOX",
    "GRID",
    "RESPONSIVE",
  ],
  datos: [
    "MYSQL",
    "POSTGRES",
    "MONGODB",
    "ORACLE",
    "QUERY",
    "INDEX",
    "SCHEMA",
    "BACKUP",
    "TABLE",
    "COLUMN",
    "KEY",
    "JOIN",
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "DATABASE",
    "CLUSTER",
    "REDIS",
    "SQLITE",
    "PROCEDURE",
    "TRIGGER",
    "NOSQL",
    "BIGDATA",
    "STORAGE",
  ],
  seguridad: [
    "CIPHER",
    "TOKEN",
    "FIREWALL",
    "MALWARE",
    "PHISHING",
    "HTTPS",
    "SSL",
    "CRYPTO",
    "HASH",
    "PASSWORD",
    "AUTH",
    "DECRYPT",
    "ENCRYPT",
    "PROXY",
    "HACKER",
    "COOKIES",
    "ROUTER",
    "VPN",
    "SALTING",
    "CAPTCHA",
    "JWT",
    "SECURITY",
    "EXPLOIT",
    "CYBER",
    "BACKDOOR",
  ],
  ia: [
    "ALGORITMO",
    "NEURONAL",
    "DATASET",
    "MODELO",
    "PYTHON",
    "TENSORFLOW",
    "PYTORCH",
    "CHATBOT",
    "PROMPT",
    "INFERENCIA",
    "CLASIFICADOR",
    "REGRESION",
    "CLUSTERING",
    "OVERFITTING",
    "GRADIENTE",
    "EMBEDDING",
    "TRANSFORMER",
    "TOKEN",
    "VISION",
    "NEURONA",
    "ENTRENAMIENTO",
    "ROBOTICA",
    "AUTOMATIZACION",
  ],
  cloud: [
    "DOCKER",
    "KUBERNETES",
    "CONTAINER",
    "PIPELINE",
    "JENKINS",
    "TERRAFORM",
    "AWS",
    "AZURE",
    "SERVERLESS",
    "MICROSERVICIO",
    "DEVOPS",
    "CICD",
    "NUBE",
    "ESCALABILIDAD",
    "LOADBALANCER",
    "MONITOREO",
    "LATENCIA",
    "VIRTUALIZACION",
    "ORQUESTACION",
    "BACKUP",
    "CLUSTER",
    "NODO",
    "DEPLOYMENT",
    "INFRAESTRUCTURA",
  ],
  diseno: [
    "WIREFRAME",
    "PROTOTIPO",
    "USABILIDAD",
    "TIPOGRAFIA",
    "PALETA",
    "FIGMA",
    "LAYOUT",
    "RESPONSIVE",
    "ACCESIBILIDAD",
    "INTERFAZ",
    "EXPERIENCIA",
    "COMPONENTE",
    "GRILLA",
    "CONTRASTE",
    "JERARQUIA",
    "MOCKUP",
    "ICONOGRAFIA",
    "BRANDING",
    "MINIMALISMO",
    "INTERACCION",
    "NAVEGACION",
    "COLORIMETRIA",
    "ESPACIADO",
  ],
};

let bancoPalabras = [];
let palabrasOrdenadas = [];
const filas = 16,
  columnas = 16;
let tablero = [],
  palabrasEnTablero = [],
  palabrasEncontradas = [],
  registroPalabrasInfo = {};
let seleccionando = false,
  celdaInicio = null,
  celdasSeleccionadas = [],
  segundos = 0,
  intervaloTiempo = null;

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
const btnPista = document.getElementById("btn-pista");
const btnVolver = document.getElementById("btn-volver");
const txtTiempo = document.getElementById("tiempo-reloj");
const txtProgreso = document.getElementById("num-progreso");
const barraProgreso = document.getElementById("barra-progreso");

function lanzarJuegoConCategoria(catId, catTxt) {
  AudioJuego.init();
  bancoPalabras = categoriasJuego[catId];
  palabrasOrdenadas = [...bancoPalabras].sort((a, b) => b.length - a.length);
  document.getElementById("titulo-categoria").textContent = catTxt;
  document.getElementById("pantalla-inicio").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "flex";
  inicializarJuego();
}

function inicializarJuego() {
  tablero = Array(filas)
    .fill(null)
    .map(() => Array(columnas).fill(""));
  palabrasEncontradas = [];
  palabrasEnTablero = [];
  celdasSeleccionadas = [];
  registroPalabrasInfo = {};
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
    const x1 = inicio.offsetLeft + 19,
      y1 = inicio.offsetTop + 19;
    const x2 = fin.offsetLeft + 19,
      y2 = fin.offsetTop + 19;
    const marcador = document.createElement("div");
    marcador.classList.add("trazo-marcador");
    marcador.style.backgroundColor = color;
    marcador.style.width = `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + 34}px`;
    marcador.style.left = `${x1 - 17}px`;
    marcador.style.top = `${y1 - 17}px`;
    marcador.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}deg)`;
    capaResaltadores.appendChild(marcador);
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

function renderizarPalabras() {
  contenedorPalabras.innerHTML = "";
  palabrasEnTablero.forEach((palabra) => {
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
  document.getElementById("pantalla-inicio").style.display = "block";
  cargarRecordsMenu();
}

// Asignar eventos a las tarjetas de categorías fijas
document.querySelectorAll(".tarjeta-categoria").forEach((btn) => {
  btn.addEventListener("click", () => {
    lanzarJuegoConCategoria(
      btn.dataset.tema,
      btn.querySelector("h3").textContent,
    );
  });
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
window.onload = cargarRecordsMenu;

