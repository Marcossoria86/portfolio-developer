document.addEventListener("DOMContentLoaded", () => {
  const prefiereMenosMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ============================================================
     1. MODO OSCURO
     ============================================================ */
  const ICONO_LUNA =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7z"/></svg>';
  const ICONO_SOL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.3M12 19.2v2.3M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.4 19.6L6 18M18 6l1.6-1.6"/></svg>';
  const btnOscuro = document.getElementById("btn-oscuro");

  function aplicarIconoTema() {
    const activo = document.documentElement.dataset.modo === "oscuro";
    btnOscuro.innerHTML = activo ? ICONO_SOL : ICONO_LUNA;
    btnOscuro.title = activo ? "Modo claro" : "Modo oscuro";
  }
  aplicarIconoTema();
  btnOscuro.addEventListener("click", () => {
    const activo = document.documentElement.dataset.modo === "oscuro";
    if (activo) {
      delete document.documentElement.dataset.modo;
      localStorage.setItem("mp_modo_oscuro", "0");
    } else {
      document.documentElement.dataset.modo = "oscuro";
      localStorage.setItem("mp_modo_oscuro", "1");
    }
    aplicarIconoTema();
    refrescarColoresGrafo();
  });

  /* ============================================================
     2. NAVBAR: fondo al scrollear + link activo
     ============================================================ */
  const navbar = document.getElementById("navbar");
  const seccionesPagina = document.querySelectorAll("header, section, footer");
  const enlacesMenu = document.querySelectorAll(".nav-links a[data-link]");

  function actualizarNavbar() {
    navbar.classList.toggle("con-fondo", window.scrollY > 12);

    let seccionActualId = "";
    seccionesPagina.forEach((seccion) => {
      const top = seccion.offsetTop;
      const alto = seccion.clientHeight;
      if (window.scrollY >= top - alto / 3) {
        seccionActualId = seccion.getAttribute("id");
      }
    });
    enlacesMenu.forEach((enlace) => {
      enlace.classList.toggle(
        "activo",
        enlace.getAttribute("href") === `#${seccionActualId}`,
      );
    });
  }
  document.addEventListener("scroll", actualizarNavbar, { passive: true });
  actualizarNavbar();

  /* ============================================================
     3. REVEAL AL SCROLL (con blur-to-focus)
     ============================================================ */
  const elementosRevelables = document.querySelectorAll(
    ".skill-row, .contact-container, .projects-section .section-head, .skills-section .section-head",
  );
  elementosRevelables.forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    el.style.transitionDelay = prefiereMenosMovimiento
      ? "0s"
      : `${(i % 4) * 0.06}s`;
  });

  const observadorReveal = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => observadorReveal.observe(el));

  /* ============================================================
     4. BOTONES MAGNÉTICOS (sutil, solo mouse)
     ============================================================ */
  if (!prefiereMenosMovimiento && matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach((boton) => {
      const radio = 9;
      boton.addEventListener("mousemove", (e) => {
        const rect = boton.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * radio * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * radio * 2;
        boton.style.transform = `translate(${x}px, ${y}px)`;
      });
      boton.addEventListener("mouseleave", () => {
        boton.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ============================================================
     5. GRAFO DE NODOS ANIMADO EN EL HERO
     Una referencia visual sutil a "estructura/lógica" — nodos que
     derivan lentamente y se conectan cuando están cerca, con un
     leve parallax hacia el mouse. Se pausa fuera de pantalla y
     respeta prefers-reduced-motion.
     ============================================================ */
  const canvas = document.getElementById("lienzo-grafo");
  const ctx = canvas.getContext("2d");
  let nodos = [];
  let anchoCanvas = 0,
    altoCanvas = 0,
    dpr = Math.min(window.devicePixelRatio || 1, 2);
  let colorLinea = "#5b6270",
    colorNodoA = "#14665a",
    colorNodoB = "#a9822c";
  let parX = 0,
    parY = 0,
    parObjX = 0,
    parObjY = 0;
  let animando = false;
  let rafId = null;

  function refrescarColoresGrafo() {
    const estilos = getComputedStyle(document.documentElement);
    colorLinea = estilos.getPropertyValue("--ink-soft").trim() || colorLinea;
    colorNodoA = estilos.getPropertyValue("--pine").trim() || colorNodoA;
    colorNodoB = estilos.getPropertyValue("--gold").trim() || colorNodoB;
  }

  function redimensionarGrafo() {
    const rect = canvas.parentElement.getBoundingClientRect();
    anchoCanvas = rect.width;
    altoCanvas = rect.height;
    canvas.width = anchoCanvas * dpr;
    canvas.height = altoCanvas * dpr;
    canvas.style.width = anchoCanvas + "px";
    canvas.style.height = altoCanvas + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cantidad = anchoCanvas < 640 ? 16 : anchoCanvas < 1000 ? 24 : 34;
    nodos = Array.from({ length: cantidad }, () => ({
      x: Math.random() * anchoCanvas,
      y: Math.random() * altoCanvas,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 1.2,
      tono: Math.random() > 0.82,
    }));
  }

  function dibujarGrafo() {
    ctx.clearRect(0, 0, anchoCanvas, altoCanvas);
    parX += (parObjX - parX) * 0.04;
    parY += (parObjY - parY) * 0.04;

    nodos.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -10) n.x = anchoCanvas + 10;
      if (n.x > anchoCanvas + 10) n.x = -10;
      if (n.y < -10) n.y = altoCanvas + 10;
      if (n.y > altoCanvas + 10) n.y = -10;
    });

    const radioConexion = anchoCanvas < 640 ? 110 : 150;
    for (let i = 0; i < nodos.length; i++) {
      for (let j = i + 1; j < nodos.length; j++) {
        const a = nodos[i],
          b = nodos[j];
        const dx = a.x - b.x,
          dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radioConexion) {
          ctx.globalAlpha = (1 - dist / radioConexion) * 0.35;
          ctx.strokeStyle = colorLinea;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x + parX, a.y + parY);
          ctx.lineTo(b.x + parX, b.y + parY);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    nodos.forEach((n) => {
      ctx.beginPath();
      ctx.fillStyle = n.tono ? colorNodoB : colorNodoA;
      ctx.globalAlpha = 0.75;
      ctx.arc(n.x + parX, n.y + parY, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (animando) rafId = requestAnimationFrame(dibujarGrafo);
  }

  function iniciarGrafo() {
    if (animando) return;
    animando = true;
    rafId = requestAnimationFrame(dibujarGrafo);
  }
  function pausarGrafo() {
    animando = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  refrescarColoresGrafo();
  redimensionarGrafo();

  if (!prefiereMenosMovimiento) {
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      parObjX = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
      parObjY = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    });
    const observadorHero = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) =>
        entrada.isIntersecting ? iniciarGrafo() : pausarGrafo(),
      );
    });
    observadorHero.observe(canvas.parentElement);
  } else {
    // Con movimiento reducido dibujamos un único frame estático.
    dibujarGrafo();
  }

  let resizeTimeoutGrafo = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeoutGrafo);
    resizeTimeoutGrafo = setTimeout(() => {
      redimensionarGrafo();
      if (!animando) dibujarGrafo();
    }, 150);
  });

  /* ============================================================
     6. CARRUSEL DE PROYECTOS — mazo apilado (rolodex)
     En vez de un scroll horizontal, las tarjetas están todas
     superpuestas en el mismo lugar. Solo la activa se ve al frente;
     el resto se esconde detrás, inclinada en 3D según cuán lejos
     esté del índice activo. Todo lo mueve JS a través de --offset.
     ============================================================ */
  const viewport = document.querySelector(".carousel-viewport");
  const track = document.getElementById("carousel-track");
  const tarjetas = Array.from(track.querySelectorAll(".project-card"));
  const elActual = document.getElementById("carousel-actual");
  const elTotal = document.getElementById("carousel-total");
  const btnPrev = document.getElementById("carousel-prev");
  const btnNext = document.getElementById("carousel-next");
  const barraProgreso = document.getElementById("carousel-progreso-barra");

  elTotal.textContent = String(tarjetas.length).padStart(2, "0");
  let indiceActivo = 0;

  // Cuántas tarjetas se alcanzan a ver a cada lado de la activa (1 =
  // solo la anterior y la siguiente asoman; el resto queda invisible
  // hasta que les toque el turno).
  const PROFUNDIDAD_VISIBLE = 1;

  function aplicarPosicionesMazo() {
    tarjetas.forEach((tarjeta, i) => {
      const offset = i - indiceActivo;
      const absoffset = Math.min(Math.abs(offset), PROFUNDIDAD_VISIBLE + 1);
      tarjeta.style.setProperty("--offset", offset);
      tarjeta.style.setProperty("--absoffset", absoffset);
      tarjeta.style.zIndex = String(100 - absoffset);
      // Solo la tarjeta al frente es clickeable: así nunca se puede
      // tocar sin querer un "Probar demo" escondido atrás.
      tarjeta.style.pointerEvents = offset === 0 ? "auto" : "none";
      tarjeta.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });

    elActual.textContent = String(indiceActivo + 1).padStart(2, "0");
    btnPrev.disabled = indiceActivo === 0;
    btnNext.disabled = indiceActivo === tarjetas.length - 1;
    const fraccion =
      tarjetas.length > 1 ? indiceActivo / (tarjetas.length - 1) : 0;
    barraProgreso.style.width = `${fraccion * 100}%`;
  }

  function irAIndice(i) {
    const destino = Math.max(0, Math.min(i, tarjetas.length - 1));
    if (destino === indiceActivo) return;
    indiceActivo = destino;
    aplicarPosicionesMazo();
    const tarjetaActiva = tarjetas[indiceActivo];
    tarjetaActiva.classList.remove("asentada");
    void tarjetaActiva.offsetWidth; // reinicia la animación de rebote
    tarjetaActiva.classList.add("asentada");
  }

  btnPrev.addEventListener("click", () => irAIndice(indiceActivo - 1));
  btnNext.addEventListener("click", () => irAIndice(indiceActivo + 1));

  // Arrastre unificado (mouse Y touch) con Pointer Events: todo el mazo
  // sigue al dedo/mouse en vivo, y al soltar se decide si avanza,
  // retrocede o vuelve a acomodarse en su lugar.
  let arrastrando = false,
    inicioX = 0,
    deltaArrastre = 0,
    seMovio = false;
  const UMBRAL_ARRASTRE = 60;

  viewport.addEventListener("pointerdown", (e) => {
    // OJO: seMovio se resetea siempre, ANTES de cualquier return. Si solo
    // se reseteaba dentro de la rama de abajo, quedaba pegado en "true"
    // después del primer arrastre y bloqueaba todos los clicks futuros
    // en los botones (ese era el bug de "Probar demo" / "Ver código").
    seMovio = false;
    // Si el click arrancó sobre un botón, link o iframe, no iniciamos
    // el drag: dejamos que el click llegue normal.
    if (e.target.closest("button, a, iframe")) return;
    arrastrando = true;
    inicioX = e.clientX;
    deltaArrastre = 0;
    viewport.classList.add("arrastrando");
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener("pointermove", (e) => {
    if (!arrastrando) return;
    deltaArrastre = e.clientX - inicioX;
    if (Math.abs(deltaArrastre) > 4) seMovio = true;
    track.style.setProperty("--arrastre-x", `${deltaArrastre}px`);
  });
  function finalizarArrastre() {
    if (!arrastrando) return;
    arrastrando = false;
    viewport.classList.remove("arrastrando");
    track.style.setProperty("--arrastre-x", "0px");
    if (deltaArrastre < -UMBRAL_ARRASTRE) irAIndice(indiceActivo + 1);
    else if (deltaArrastre > UMBRAL_ARRASTRE) irAIndice(indiceActivo - 1);
    deltaArrastre = 0;
  }
  viewport.addEventListener("pointerup", finalizarArrastre);
  viewport.addEventListener("pointercancel", finalizarArrastre);
  // Evita que un arrastre termine disparando el click de un link/botón
  viewport.addEventListener(
    "click",
    (e) => {
      if (seMovio) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    { capture: true },
  );

  // Navegación con flechas del teclado cuando el carrusel tiene foco
  viewport.setAttribute("tabindex", "0");
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") irAIndice(indiceActivo + 1);
    if (e.key === "ArrowLeft") irAIndice(indiceActivo - 1);
  });

  aplicarPosicionesMazo();

  /* ============================================================
     7. MODALES: calculadora y sopa de letras
     ============================================================ */
  function configurarModal(idModal, idBotonAbrir, idBotonCerrar) {
    const modal = document.getElementById(idModal);
    const botonAbrir = document.getElementById(idBotonAbrir);
    const botonCerrar = document.getElementById(idBotonCerrar);
    if (!modal || !botonAbrir || !botonCerrar) return;

    botonAbrir.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("modal-active");
      document.body.style.overflow = "hidden";
      const iframe = modal.querySelector("iframe");
      if (iframe) iframe.focus();
    });
    const cerrar = () => {
      modal.classList.remove("modal-active");
      document.body.style.overflow = "";
    };
    botonCerrar.addEventListener("click", cerrar);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrar();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("modal-active"))
        cerrar();
    });
  }
  configurarModal("calc-modal", "open-calc-btn", "close-calc-btn");
  configurarModal("sopa-modal", "open-sopa-btn", "close-sopa-btn");

  /* ============================================================
     8. FORMULARIO DE CONTACTO
     ============================================================ */
  const formularioContacto = document.getElementById("portfolio-form");
  const botonSubmit = document.querySelector(".btn-submit");

  if (formularioContacto && botonSubmit) {
    formularioContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      const textoOriginal = botonSubmit.innerHTML;
      botonSubmit.disabled = true;
      botonSubmit.innerHTML = "Enviando...";

      fetch(formularioContacto.action, {
        method: "POST",
        body: new FormData(formularioContacto),
        headers: { Accept: "application/json" },
      })
        .then((respuesta) => {
          if (respuesta.ok) {
            botonSubmit.innerHTML = "¡Mensaje enviado!";
            formularioContacto.reset();
            setTimeout(() => {
              botonSubmit.disabled = false;
              botonSubmit.innerHTML = textoOriginal;
            }, 4000);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          botonSubmit.innerHTML = "Hubo un error, probá de nuevo";
          setTimeout(() => {
            botonSubmit.disabled = false;
            botonSubmit.innerHTML = textoOriginal;
          }, 3000);
        });
    });
  }
});
