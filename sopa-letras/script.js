<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Sopa de Letras - Apple Edition</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <script>
      // Aplicamos el modo oscuro ANTES de pintar la página, para que no haya
      // un parpadeo de claro->oscuro al cargar.
      if (localStorage.getItem("sopa_modo_oscuro") === "1") {
        document.documentElement.dataset.modo = "oscuro";
      }
    </script>
    <div class="barra-flotante">
      <button id="btn-oscuro" class="btn-flotante" title="Modo oscuro">🌙</button>
      <button id="btn-musica" class="btn-flotante" title="Música de fondo">🔊</button>
    </div>
    <canvas
      id="lienzo-confeti"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 999;
      "
    ></canvas>
    <!-- Pantalla de Selección de Temas (Inspirada en Apple Arcade) -->
    <div id="pantalla-inicio" class="contenedor-apple">
      <h1>Sopa de Letras</h1>
      <p class="subtitulo">Selecciona una categoría de juego</p>
      <div class="grid-categorias">
        <button class="tarjeta-categoria" data-tema="web">
          <div class="icono-cat">🌐</div>
          <h3>Desarrollo Web</h3>
          <p>Frontend, Frameworks y navegadores</p>
        </button>
        <button class="tarjeta-categoria" data-tema="datos">
          <div class="icono-cat">💾</div>
          <h3>Bases de Datos</h3>
          <p>SQL, almacenamiento y servidores</p>
        </button>
        <button class="tarjeta-categoria" data-tema="seguridad">
          <div class="icono-cat">🔒</div>
          <h3>Seguridad</h3>
          <p>Cifrado, tokens y protocolos web</p>
        </button>
        <button class="tarjeta-categoria" data-tema="ia">
          <div class="icono-cat">🤖</div>
          <h3>Inteligencia Artificial</h3>
          <p>Algoritmos, modelos y machine learning</p>
        </button>
        <button class="tarjeta-categoria" data-tema="cloud">
          <div class="icono-cat">☁️</div>
          <h3>Cloud &amp; DevOps</h3>
          <p>Contenedores, despliegues e infraestructura</p>
        </button>
        <button class="tarjeta-categoria" data-tema="diseno">
          <div class="icono-cat">🎨</div>
          <h3>Diseño UI/UX</h3>
          <p>Interfaces, usabilidad y herramientas de diseño</p>
        </button>
        <button class="tarjeta-categoria" data-tema="historia">
          <div class="icono-cat">🏛️</div>
          <h3>Historia</h3>
          <p>Civilizaciones, imperios y grandes eventos</p>
        </button>
        <button class="tarjeta-categoria" data-tema="astronomia">
          <div class="icono-cat">🔭</div>
          <h3>Astronomía</h3>
          <p>Planetas, estrellas y el universo</p>
        </button>
        <button class="tarjeta-categoria" data-tema="arte">
          <div class="icono-cat">🎭</div>
          <h3>Arte y Cultura</h3>
          <p>Pintura, música, cine y literatura</p>
        </button>
        <button class="tarjeta-categoria" data-tema="geografia">
          <div class="icono-cat">🌍</div>
          <h3>Geografía</h3>
          <p>Países, montañas, ríos y océanos</p>
        </button>
        <button class="tarjeta-categoria" data-tema="ciencia">
          <div class="icono-cat">🧬</div>
          <h3>Ciencia y Naturaleza</h3>
          <p>Biología, física y el mundo natural</p>
        </button>
        <button class="tarjeta-categoria" data-tema="mitologia">
          <div class="icono-cat">⚡</div>
          <h3>Mitología</h3>
          <p>Dioses, héroes y leyendas antiguas</p>
        </button>
      </div>
      <div id="grid-personalizadas" class="grid-categorias grid-personalizadas"></div>
      <button id="btn-abrir-editor" class="tarjeta-categoria tarjeta-agregar">
        <div class="icono-cat">➕</div>
        <h3>Crear categoría</h3>
        <p>Agregá tus propios temas y palabras</p>
      </button>
      <div class="seccion-records">
        <h3>🏆 Mejores Tiempos</h3>
        <ul id="lista-records"></ul>
      </div>
    </div>
    <!-- Pantalla del Editor de Categorías -->
    <div id="pantalla-editor" class="contenedor-apple contenedor-editor" style="display: none">
      <h1>Crear categoría</h1>
      <p class="subtitulo">
        Elegí un nombre, un ícono y las palabras que quieras. No hace falta
        que tengan el mismo largo, el juego las acomoda solo.
      </p>
      <label class="etiqueta-campo" for="input-nombre-cat">Nombre de la categoría</label>
      <input
        type="text"
        id="input-nombre-cat"
        class="campo-editor"
        maxlength="30"
        placeholder="Ej: Deportes, Cocina, Series..."
      />
      <label class="etiqueta-campo" for="input-icono-cat">Ícono (un emoji, opcional)</label>
      <input
        type="text"
        id="input-icono-cat"
        class="campo-editor"
        maxlength="4"
        placeholder="⚽"
      />
      <label class="etiqueta-campo" for="input-palabras-cat"
        >Palabras (una por línea o separadas por coma)</label
      >
      <textarea
        id="input-palabras-cat"
        class="campo-editor area-editor"
        rows="8"
        placeholder="FUTBOL, BASQUET, TENIS, NATACION, MARATON..."
      ></textarea>
      <p id="msg-editor" class="msg-editor"></p>
      <div class="botones-editor">
        <button id="btn-guardar-cat" class="btn-primario">Guardar categoría</button>
        <button id="btn-cancelar-editor" class="btn-secundario">Cancelar</button>
      </div>
    </div>
    <!-- Pantalla del Juego Real -->
    <div id="pantalla-juego" class="contenedor-principal" style="display: none">
      <div class="panel-lateral">
        <h2 id="titulo-categoria">Sopa de Letras</h2>
        <div class="seccion-estado">
          <div class="cronometro">
            Tiempo: <span id="tiempo-reloj">00:00</span>
          </div>
          <div class="contador-texto">
            Progreso: <span id="num-progreso">0/0</span>
          </div>
          <div class="barra-contenedor">
            <div id="barra-progreso"></div>
          </div>
        </div>
        <div id="contenedor-palabras"></div>
        <div class="botones-control">
          <button id="btn-pista" class="btn-secundario">💡 Pista</button>
          <button id="btn-volver" class="btn-rojo">Menu</button>
        </div>
      </div>
      <div class="panel-tablero">
        <div class="contenedor-tablero-relativo">
          <div id="capa-resaltadores"></div>
          <div id="tablero-sopa"></div>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>

