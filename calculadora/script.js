const display = document.getElementById("display"),
  copyBtn = document.getElementById("copy-btn");
const themeToggle = document.getElementById("theme-toggle"),
  historyList = document.getElementById("history");
const buttons = document.querySelectorAll(".cuadricula button:not(#copy-btn)"),
  operadores = "+-*/^";
let currentInput = "",
  historial = [];

// Paneles y Controladores
const tSci = document.getElementById("toggle-scientific"),
  pSci = document.getElementById("scientific-panel");
const tConv = document.getElementById("toggle-converter"),
  pConv = document.getElementById("converter-panel");
const clearBtn = document.getElementById("clear");

if (tSci)
  tSci.addEventListener("click", () => pSci.classList.toggle("panel-hidden"));
if (tConv)
  tConv.addEventListener("click", () => pConv.classList.toggle("panel-hidden"));

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeToggle.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Corrección definitiva del formateador Latam (punto para miles, coma para decimales)
function formatearParaLatam(cadena) {
  return cadena.replace(/(\d+(?:\.\d+)?)/g, (m) => {
    if (m.includes(".")) {
      const partes = m.split(".");
      const parteEntera = parseFloat(partes[0]).toLocaleString("de-DE");
      return parteEntera + "," + partes[1];
    }
    return parseFloat(m).toLocaleString("de-DE");
  });
}

function actualizarDisplay() {
  const len = currentInput.length;
  display.style.fontSize = len > 20 ? '12px' : len > 14 ? '16px' : '22px';
  
  if (clearBtn) clearBtn.textContent = currentInput ? 'C' : 'AC';

  if (!currentInput) {
    display.value = '0';
    return;
  }

  // Separamos la ecuación por operadores para formatear los números de forma individual
  let partes = currentInput.split(/([\+\-\*\/^()])/g);
  
  // Procesamos cada fragmento: si es un número le ponemos puntos y comas, si es operador lo dejamos igual
  let resultadoVisual = partes.map(part => {
    if (!part || isNaN(part) || part === ' ') {
      // Si es un operador aritmético (+, -, *, /) o paréntesis, le inyectamos los espacios prolijos
      if (/[\+\-\*\/^]/.test(part)) return ` ${part} `;
      return part;
    }
    // Si es un número limpio, aplicamos el formato Latam (. para miles, , para decimales)
    if (part.includes('.')) {
      const subPartes = part.split('.');
      const entera = parseFloat(subPartes[0]).toLocaleString('de-DE');
      return entera + ',' + subPartes[1];
    }
    return parseFloat(part).toLocaleString('de-DE');
  }).join('');

  // Limpiamos posibles dobles espacios accidentales para que quede perfecto
  display.value = resultadoVisual.replace(/\s+/g, ' ').trim();
}


copyBtn.addEventListener("click", () => {
  if (!currentInput || currentInput === "Error") return;
  navigator.clipboard.writeText(formatearParaLatam(currentInput)).then(() => {
    copyBtn.textContent = "✅";
    setTimeout(() => (copyBtn.textContent = "📋"), 1200);
  });
});

function animarPantalla() {
  display.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 100 });
}

document.getElementById("clear-history").addEventListener("click", () => {
  historial = [];
  guardar();
  render();
});

function guardar() {
  localStorage.setItem("histPro", JSON.stringify(historial));
}

function render() {
  historyList.innerHTML = "";
  historial.forEach((h, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="hist-text"><span class="hist-cuenta">${formatearParaLatam(h.cuenta)}</span><span class="hist-resultado">= ${formatearParaLatam(h.resultado)}</span></div><button class="delete-item-btn">🗑️</button>`;
    const txt = li.querySelector(".hist-text");
    txt.addEventListener("click", () => {
      currentInput = h.resultado;
      actualizarDisplay();
      animarPantalla();
    });
    txt.addEventListener("dblclick", () => {
      currentInput = h.cuenta;
      actualizarDisplay();
      animarPantalla();
    });
    li.querySelector(".delete-item-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      historial.splice(i, 1);
      guardar();
      render();
    });
    historyList.appendChild(li);
  });
}

// Conversor Básico
const cType = document.getElementById("converter-type"),
  cIn = document.getElementById("converter-input"),
  cOut = document.getElementById("converter-output");
function conv() {
  if (!cIn || !cOut || !cType) return;
  const v = parseFloat(cIn.value);
  if (isNaN(v)) {
    cOut.value = "";
    return;
  }
  const r =
    cType.value === "temp"
      ? (v * 9) / 5 + 32
      : cType.value === "length"
        ? v / 2.54
        : v * 2.20462;
  cOut.value = `${r.toFixed(2).replace(".", ",")} ${cType.value === "temp" ? "°F" : cType.value === "length" ? "in" : "lbs"}`;
}
if (cIn) {
  cIn.addEventListener("input", conv);
  cType.addEventListener("change", conv);
}

// Motor Aritmético
function evalPlano(cad) {
  let tok = cad.replace(/\s+/g, "").match(/(\d+(?:\.\d+)?|[\+\-\*\/^])/g);
  if (!tok) return NaN;
  let proc = [];
  for (let i = 0; i < tok.length; i++) {
    if (
      (tok[i] === "-" || tok[i] === "+") &&
      (i === 0 || operadores.includes(proc[proc.length - 1]))
    )
      proc.push(parseFloat(tok[i] + tok[++i]));
    else proc.push(isNaN(tok[i]) ? tok[i] : parseFloat(tok[i]));
  }
  const fP = [];
  for (let i = 0; i < proc.length; i++) {
    if (proc[i] === "^") {
      const e = fP.pop(),
        b = fP.pop();
      fP.push(Math.pow(b, e));
    } else fP.push(proc[i]);
  }
  const fMD = [];
  for (let i = 0; i < fP.length; i++) {
    if (fP[i] === "*" || fP[i] === "/") {
      const op = fP[i],
        s = fP[++i],
        p = fMD.pop();
      if (op === "/" && s === 0) return NaN;
      fMD.push(op === "*" ? p * s : p / s);
    } else fMD.push(fP[i]);
  }
  let res = fMD[0] || 0;
  for (let i = 1; i < fMD.length; i += 2)
    res = fMD[i] === "+" ? res + fMD[i + 1] : res - fMD[i + 1];
  return Math.round(res * 1e12) / 1e12;
}

function calcular(cad) {
  if (cad.startsWith("sin(") && cad.endsWith(")"))
    return Math.sin((parseFloat(cad.slice(4, -1)) * Math.PI) / 180).toString();
  if (cad.startsWith("cos(") && cad.endsWith(")"))
    return Math.cos((parseFloat(cad.slice(4, -1)) * Math.PI) / 180).toString();
  if (cad.startsWith("√(") && cad.endsWith(")"))
    return Math.sqrt(parseFloat(cad.slice(2, -1))).toString();
  let expr = cad;
  while (expr.includes("(")) {
    const ci = expr.indexOf(")"),
      ap = expr.lastIndexOf("(", ci);
    if (ap === -1 || ci === -1) return NaN;
    expr =
      expr.slice(0, ap) +
      evalPlano(expr.slice(ap + 1, ci)) +
      expr.slice(ci + 1);
  }
  return evalPlano(expr);
}

// Lógica de Entradas
function manejarEntrada(id, val) {
  if (navigator.vibrate) navigator.vibrate(12);
  const ult = currentInput.slice(-1);
  if (id === "clear") {
    currentInput = "";
  } else if (id === "backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (id === "equals") {
    if (
      !currentInput ||
      operadores.includes(ult) ||
      (currentInput.match(/\(/g) || []).length !==
        (currentInput.match(/\)/g) || []).length
    ) {
      display.value = "Error";
      currentInput = "";
      return;
    }
    try {
      let r = calcular(currentInput);
      if (!isFinite(r) || isNaN(r)) {
        display.value = "Error";
        currentInput = "";
        return;
      }
      if (
        /[\+\-\*\/^]/.test(currentInput.slice(1)) ||
        /[sin|cos|√]/.test(currentInput)
      ) {
        historial.unshift({ cuenta: currentInput, resultado: r.toString() });
        if (historial.length > 8) historial.pop();
        guardar();
        render();
      }
      currentInput = r.toString();
      animarPantalla();
    } catch {
      display.value = "Error";
      currentInput = "";
      return;
    }
  } else if (id === "percent") {
    let idx = currentInput.search(/[\+\-\*\/^]/);
    if (idx === -1) currentInput = (parseFloat(currentInput) / 100).toString();
    else {
      const p1 = currentInput.slice(0, idx),
        op = currentInput.slice(idx, idx + 1),
        p2 = currentInput.slice(idx + 1);
      if (p2)
        currentInput =
          p1 +
          op +
          (op === "+" || op === "-" ? (p1 * p2) / 100 : p2 / 100).toString();
    }
  } else if (id === "decimal") {
    const p = currentInput.split(/[\+\-\*\/^]/),
      n = p[p.length - 1];
    if (!n.includes(".")) currentInput += n === "" || n === "(" ? "0." : ".";
  } else if (operadores.includes(val)) {
    if (!currentInput) {
      if (val === "-") currentInput += val;
    } else if (operadores.includes(ult))
      currentInput = currentInput.slice(0, -1) + val;
    else if (ult !== "(") currentInput += val;
  } else if (id === "close-parenthesis") {
    if (
      (currentInput.match(/\)/g) || []).length <
        (currentInput.match(/\(/g) || []).length &&
      !operadores.includes(ult)
    )
      currentInput += ")";
  } else if (id === "math-sin") currentInput += "sin(";
  else if (id === "math-cos") currentInput += "cos(";
  else if (id === "math-sqrt") currentInput += "√(";
  else if (id === "math-pi") currentInput += Math.PI.toFixed(6);
  else currentInput += val;
  actualizarDisplay();
}

buttons.forEach((b) =>
  b.addEventListener("click", () => {
    b.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.92)" },
        { transform: "scale(1)" },
      ],
      { duration: 100 },
    );
    manejarEntrada(b.id, b.textContent);
  }),
);

document.addEventListener("keydown", (e) => {
  const t = e.key;
  e.preventDefault();
  if (t === "Enter") manejarEntrada("equals", "=");
  else if (t === "Backspace") manejarEntrada("backspace", "⌫");
  else if (t === "Escape") manejarEntrada("clear", "AC");
  else if (t === "." || t === ",") manejarEntrada("decimal", ".");
  else if (t === "%") manejarEntrada("percent", "%");
  else if (t === ")") manejarEntrada("close-parenthesis", ")");
  else if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "("].includes(t)
  ) {
    currentInput += t;
    actualizarDisplay();
  } else if (operadores.includes(t)) manejarEntrada("", t);
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  themeToggle.textContent = "☀️ Modo Claro";
}
const hG = localStorage.getItem("histPro");
if (hG) historial = JSON.parse(hG);
render();
// --- FUNCIONALIDAD NATIVA DE EXPORTACIÓN EN LA CALCULADORA ---
const exportBtn = document.getElementById("export-history");
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    if (!historial || historial.length === 0) {
      alert("El historial de operaciones está vacío actualmente.");
      return;
    }

    const contenidoTexto = historial
      .map((h) => `${h.cuenta} = ${h.resultado}`)
      .join("\n");
    const blob = new Blob([contenidoTexto], { type: "text/plain" });
    const elementoDescarga = document.createElement("a");
    elementoDescarga.href = URL.createObjectURL(blob);
    elementoDescarga.download = "historial_calculadora.txt";
    elementoDescarga.click();
  });
}
