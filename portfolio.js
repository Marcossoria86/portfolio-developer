document.addEventListener("DOMContentLoaded", () => {
  // 1. EFECTO REVELADO AL HACER SCROLL (Intersection Observer)
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
    { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
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

  // 3. LÓGICA DE CONTROL DEL MODAL DE LA CALCULADORA
  const modal = document.getElementById("calc-modal");
  const openModalBtn = document.getElementById("open-calc-btn");
  const closeModalBtn = document.getElementById("close-calc-btn");

  if (modal && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("modal-active");
      document.body.style.overflow = "hidden";
    });

    const cerrarModal = () => {
      modal.classList.remove("modal-active");
      document.body.style.overflow = "";
    };

    closeModalBtn.addEventListener("click", cerrarModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("modal-active"))
        cerrarModal();
    });
  }

  // 4. PROCESADOR ASÍNCRONO CORREGIDO (FormData Oficial para FormSubmit)
  const formularioContacto = document.getElementById("portfolio-form");
  const botonSubmit = document.querySelector(".btn-submit");

  if (formularioContacto && botonSubmit) {
    formularioContacto.addEventListener("submit", (e) => {
      e.preventDefault(); // Frena la recarga de Chrome

      const textoOriginal = botonSubmit.innerHTML;
      botonSubmit.disabled = true;
      botonSubmit.innerHTML = "Enviando... ⏳";

      // Corrección Clave: Usamos FormData para enviar el formulario completo (incluyendo el campo _captcha)
      const datosFormulario = new FormData(formularioContacto);

      fetch(formularioContacto.action, {
        method: "POST",
        body: datosFormulario,
        headers: {
          Accept: "application/json", // Le avisa al servidor que responda en segundo plano sin redirigir
        },
      })
        .then((respuesta) => {
          if (respuesta.ok) {
            botonSubmit.innerHTML = "¡Mensaje Enviado! ✅";
            botonSubmit.style.backgroundColor = "#539855";
            formularioContacto.reset(); // Limpia las cajas de texto automáticamente

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
          botonSubmit.innerHTML = "Error al enviar ❌";
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

