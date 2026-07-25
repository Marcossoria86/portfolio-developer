# Sopa de Letras — Apple Edition

Sopa de letras web, sin dependencias externas (HTML + CSS + JavaScript puro,
ni un solo archivo de imagen o audio empaquetado). Pensado para venderse
como plantilla / script listo para personalizar.

## ✨ Características

- **12 categorías incluidas**: Desarrollo Web, Bases de Datos, Seguridad,
  Inteligencia Artificial, Cloud & DevOps, Diseño UI/UX, Historia,
  Astronomía, Arte y Cultura, Geografía, Ciencia y Naturaleza, Mitología.
- **Editor de categorías sin código**: cualquier usuario puede crear sus
  propios temas desde la interfaz (botón "➕ Crear categoría"), con nombre,
  ícono y una lista libre de palabras. No hace falta que tengan el mismo
  largo: el algoritmo de colocación acomoda cualquier combinación.
- **100% responsive**: el tamaño de las celdas se calcula en tiempo real
  según el espacio disponible, así que el tablero entra completo en
  celular, tablet y escritorio, sin scroll lateral.
- **Modo oscuro** con botón dedicado, recuerda la preferencia del usuario.
- **Sonidos de clic, acierto y victoria**, todos generados por código
  (Web Audio API, sin archivos de audio externos).
- **Confeti de celebración** al completar el tablero.
- **Pista** (resalta una celda de una palabra al azar) y **cronómetro con
  ranking de mejores tiempos** guardado en el navegador (localStorage).
- Selección por mouse (arrastrar) y por touch (celular/tablet), con
  detección de las 8 direcciones (horizontal, vertical y diagonales).

## 📁 Estructura

```
sopa-letras/
├── index.html      → estructura y pantallas (menú, juego, editor)
├── style.css       → estilos + variables de modo claro/oscuro
├── script.js       → lógica del juego, audio, editor y responsive
└── README.md
```

No hay build ni dependencias de npm. Es abrir `index.html` y listo.

## 🚀 Instalación / uso

1. Descomprimí la carpeta.
2. Abrí `index.html` en cualquier navegador, o subí los 3 archivos a
   cualquier hosting estático (GitHub Pages, Netlify, Vercel, Hostinger,
   cPanel, etc.). No necesita servidor con backend.

## 🎨 Cómo personalizar

### Sin tocar código (recomendado para revender)
Cualquier persona que use el juego puede tocar **"➕ Crear categoría"**,
poner un nombre, un emoji y pegar sus palabras (separadas por coma o una
por línea). Se guardan en su navegador (localStorage) y quedan disponibles
como una tarjeta más en el menú, con opción de editar (✎) o borrar (✕).

### Editando el código (para vos, como dueño de la plantilla)
Las categorías fijas están en `script.js`, en el objeto `categoriasJuego`
(cerca de la línea 160) y sus nombres/emoji en `nombresCategorias` y en
`index.html`. Para agregar una categoría fija nueva:

1. Sumá un array de palabras en `categoriasJuego` con una nueva clave.
2. Agregá esa clave con su nombre en `nombresCategorias`.
3. Agregá la tarjeta correspondiente (`<button class="tarjeta-categoria" data-tema="tu-clave">...`)
   en `index.html`.

El tamaño del tablero (18×18 celdas) se controla con las constantes
`filas` y `columnas` al principio de `script.js`.

## 💰 Cómo venderlo

Algunas formas realistas de monetizar este proyecto:

1. **Vender el código fuente en marketplaces de scripts**
   - [CodeCanyon (Envato Market)](https://codecanyon.net): la plaza más
     usada para vender scripts/juegos HTML5. Juegos de este tipo suelen
     cotizar entre 10 y 30 USD. Envato se queda con una comisión (varía
     según tu plan de autor).
   - **itch.io**: podés publicarlo jugable directamente, con precio fijo o
     "paga lo que quieras", y elegir vos el % que se queda la plataforma
     (podés poner 0%).

2. **Venderlo como plantilla / white-label**
   Gracias al editor de categorías, se puede ofrecer como una plantilla
   de sopa de letras personalizable para negocios, escuelas o eventos
   (por ejemplo: una tienda que quiera su propia sopa de letras con
   productos, o un profesor con vocabulario de su materia). Esto se vende
   bien como trabajo freelance o en Envato como "template".

3. **Monetizarlo vos mismo en vez de venderlo**
   - Publicarlo en tu propio dominio con anuncios (Google AdSense).
   - Modelo freemium: gratis con las categorías base, y un pago único
     (Stripe / Gumroad) para desbloquear todas las categorías o el editor.
   - Subirlo a portales de juegos HTML5 (Poki, CrazyGames, Y8), que suelen
     pagar por tráfico/anuncios si aceptan el juego en su catálogo.

### Antes de publicarlo
- Este README y el código son tuyos para vender: no dependen de librerías
  con licencias restrictivas ni de archivos de audio/imagen de terceros
  (todo el sonido se genera con Web Audio API).
- Si vas a venderlo como script/plantilla, sumale capturas de pantalla
  (menú, juego en celular, modo oscuro, editor) — sube mucho el valor
  percibido en marketplaces como CodeCanyon.
- Si lo autoalojás con anuncios, revisá los términos de la red publicitaria
  que elijas (contenido apto para todo público, tráfico mínimo, etc.).

## 🛠️ Stack técnico

HTML5, CSS3 (variables CSS, Grid, `backdrop-filter`), JavaScript vanilla
(sin frameworks), Web Audio API para todo el sonido, `localStorage` para
guardar récords, preferencia de modo oscuro y categorías
personalizadas.
