document.addEventListener("DOMContentLoaded", () => {
  // 1. EFECTO REVELADO AL HACER SCROLL (Corregido sin textos rotos)
  const elementosAnimados = document.querySelectorAll(
    ".skill-card, .project-card, .skills-section, .contact-container",
  );

  elementosAnimados.forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(20px)";
    elemento.style.transition =
      "opacity 0.4s ease-out, transform 0.4s ease-out";
  });

  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }, // <-- Limpio y corregido
  );

  elementosAnimados.forEach((el) => scrollObserver.observe(el));

  // 2. MENÚ DE NAVEGACIÓN INTELIGENTE
  const seccionesPagina = document.querySelectorAll(
    "header, section, main, footer",
  );
  const enlacesMenu = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let seccionActualId = "";
    seccionesPagina.forEach((seccion) => {
      const seccionTop = seccion.offsetTop;
      const seccionHeight = seccion.clientHeight;
      if (window.scrollY >= seccionTop - seccionHeight / 3) {
        seccionActualId = seccion.getAttribute("id");
      }
    });

    enlacesMenu.forEach((enlace) => {
      enlace.style.color = "";
      if (enlace.getAttribute("href") === `#${seccionActualId}`) {
        enlace.style.color = "var(--accent)";
      }
    });
  });

  // 3. LOGICA MODAL CALCULADORA
  const modalCalc = document.getElementById("calc-modal");
  const openCalcBtn = document.getElementById("open-calc-btn");
  const closeCalcBtn = document.getElementById("close-calc-btn");

  if (modalCalc && openCalcBtn && closeCalcBtn) {
    openCalcBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modalCalc.classList.add("modal-active");
      document.body.style.overflow = "hidden";

      const iframe = modalCalc.querySelector("iframe");
      if (iframe) iframe.focus();
    });

    const cerrarCalc = () => {
      modalCalc.classList.remove("modal-active");
      document.body.style.overflow = "";
    };

    closeCalcBtn.addEventListener("click", cerrarCalc);
    modalCalc.addEventListener("click", (e) => {
      if (e.target === modalCalc) cerrarCalc();
    });
  }

  // 4. LOGICA MODAL SOPA DE LETRAS
  const modalSopa = document.getElementById("sopa-modal");
  const openSopaBtn = document.getElementById("open-sopa-btn");
  const closeSopaBtn = document.getElementById("close-sopa-btn");

  if (modalSopa && openSopaBtn && closeSopaBtn) {
    openSopaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modalSopa.classList.add("modal-active");
      document.body.style.overflow = "hidden";

      const iframe = modalSopa.querySelector("iframe");
      if (iframe) iframe.focus();
    });

    const cerrarSopa = () => {
      modalSopa.classList.remove("modal-active");
      document.body.style.overflow = "";
    };

    closeSopaBtn.addEventListener("click", cerrarSopa);
    modalSopa.addEventListener("click", (e) => {
      if (e.target === modalSopa) cerrarSopa();
    });
  }

  // 5. FORMULARIO CONTACTO
  const formularioContacto = document.getElementById("portfolio-form");
  const botonSubmit = document.querySelector(".btn-submit");

  if (formularioContacto && botonSubmit) {
    formularioContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      const textoOriginal = botonSubmit.innerHTML;
      botonSubmit.disabled = true;
      botonSubmit.innerHTML = "Enviando... ⏳";

      fetch(formularioContacto.action, {
        method: "POST",
        body: new FormData(formularioContacto),
        headers: { Accept: "application/json" },
      })
        .then((respuesta) => {
          if (respuesta.ok) {
            botonSubmit.innerHTML = "¡Mensaje Enviado! ✅";
            botonSubmit.style.backgroundColor = "#539855";
            formularioContacto.reset();
            setTimeout(() => {
              botonSubmit.disabled = false;
              botonSubmit.innerHTML = textoOriginal;
              botonSubmit.style.backgroundColor = "";
            }, 4000);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          botonSubmit.innerHTML = "Error ❌";
          botonSubmit.style.backgroundColor = "#ff5c5c";
          setTimeout(() => {
            botonSubmit.disabled = false;
            botonSubmit.innerHTML = textoOriginal;
            botonSubmit.style.backgroundColor = "";
          }, 3000);
        });
    });
  }
});

