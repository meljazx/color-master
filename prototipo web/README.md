# Color Master · Prototipo (IDITEC)

Prototipo jugable de un juego didáctico de teoría del color para estudiantes de ilustración y diseño gráfico, con estética inspirada en Wii U / Wii. Sirve para **explorar y validar las mecánicas** antes de llevarlas a Godot.

## Cómo ejecutarlo

1. Abre `index.html` en un navegador moderno (doble clic). No necesita servidor ni instalación.
2. Requiere internet para dos recursos externos: la tipografía Nunito (Google Fonts) y three.js r128 (laboratorio 3D, desde cdnjs). Sin conexión todo funciona salvo el modo 3D; si quieres usarlo sin internet, descarga `three.min.js` a una carpeta `js/vendor/` y cambia la etiqueta `<script>` en `index.html`.
3. El progreso (puntos, mejores puntajes y galería) se guarda en el `localStorage` del navegador. Para reiniciar, borra los datos del sitio.

## Estructura

```
color-master/
├── index.html            Marcado de las pantallas y carga ordenada de CSS y JS
├── css/
│   ├── base.css          Variables, fondo, burbujas, tipografía, canvas
│   ├── components.css    Fichas de vidrio, botones, menús, carrusel, HUD, avisos, galería, demos
│   └── editor.css        Editor 2D, selector de color, diseño responsive
└── js/                   (se cargan en este orden)
    ├── core.js           Helpers, estado guardado, matemática de color
    ├── ui.js             Mensajes, sonido, confeti, burbujas, avisos, puntos, sliders
    ├── lightlab.js       Esfera de luz 2D y mini laboratorio de luz
    ├── wheel.js          Mecánica de la rueda cromática (estilo color.method.ac)
    ├── exercises.js      Ejercicios sueltos (mezcla de luz, valor, sombra, mood, relatividad, paletas)
    ├── demos.js          Demos interactivas de teoría
    ├── colorpicker.js    Selector de color (rueda + valor + hex + recientes)
    ├── levels.js         Diálogo de Niveles con histograma
    ├── editor.js         Editor 2D estilo Photoshop sencillo
    ├── practice.js       Práctica en lienzo con imagen de referencia y puntaje de parecido
    ├── lab3d.js          Laboratorio 3D (three.js)
    ├── content.js        Definición de módulos y catálogo del arcade
    └── app.js            Navegación, flujo de módulos, rondas, arranque
```

Los archivos son scripts clásicos que comparten el ámbito global (sin build ni módulos ES), así que funcionan al abrirse desde el disco. **El orden de carga importa**: `content.js` usa funciones definidas en los anteriores.

## Pantallas y flujo

- **Título**: logo, Start y Credits. El botón **⌂ Título** (arriba a la derecha) vuelve aquí desde cualquier parte.
- **HUD** (arriba a la derecha): puntos acumulados, reloj y botón de título.
- **Menú superior**: 🏠 Inicio (módulos), 🧪 Laboratorio, 🖼️ Galería y 🕹️ Arcade.
- **Barra inferior**: mensajes, ronda, puntaje y retroalimentación.
- **Avisos** estilo Wii U que bajan desde arriba (desbloqueos, guardados, bienvenida).

## Módulos (Inicio)

Cuatro módulos en un carrusel de 2 fichas por página. Cada uno sigue el mismo flujo: **carga → 1 Teoría → 2 Práctica → 3 Tu lienzo**.

| Módulo | Tema | Teoría (demo) | Práctica (juego) |
|---|---|---|---|
| 1 | Luz y modelos de color | Luces R, G, B que se suman | Igualar un color mezclando luz con sliders RGB |
| 2 | Propiedades del color | Sliders de matiz, saturación y brillo | Rueda: igualar matiz y saturación |
| 3 | Valor y contraste | Colores del mismo brillo con botón "Ver en grises" | Igualar el valor (claro/oscuro percibido) de un gris |
| 4 | Círculo y armonías | Generador de armonías | Rueda: complementarios, análogos, tríadas y tétradas |

**Práctica (paso 2)**: 5 rondas, en modo *Reto de 15 s* (cuenta regresiva 3-2-1, arco de tiempo que se pone rojo) o *Práctica sin tiempo*. Cada ronda da un puntaje de 0 a 100 con cinco grados (Perfecto ≥95, Muy bien ≥85, Bien ≥70, Regular ≥50, Flojo) y una "brújula" que indica si tu color quedó más claro/oscuro o más vivo/apagado.

**Lienzo (paso 3)**: el juego muestra una imagen o figura de referencia (luces RGB, círculos del mismo matiz, esfera en 3 valores, composición en tríada o complementaria). El usuario la reproduce en el editor 2D y pulsa **Comprobar parecido**. No hay límite de tiempo; puede repetir o pedir una imagen nueva. El puntaje compara ambas imágenes reducidas a 32×18 celdas usando distancia OKLab (con tolerancia).

## Rueda cromática (estilo color.method.ac)

- Aro de matiz (ángulo) y saturación (radio) con el valor fijo de la ronda.
- Niveles: **matiz**, **saturación**, **complementario** (1 punto), **análogos** (2, ±30°), **tríada** (2, 120°) y **tétrada** (3, 90°).
- En el centro se ve el color objetivo y tu respuesta; en las armonías el centro es una paleta en gajos y una línea punteada une los puntos formando la figura.
- Al confirmar, aros negros marcan la respuesta correcta.

## Modo Arcade

Doce ejercicios sueltos, sin teoría. Se **desbloquean con los puntos** acumulados (cada ronda suma hasta 10; cada comprobación del lienzo suma por mejorar tu parecido). Umbrales: Matiz y Saturación (0), Complementarios (25), Mezcla de luz (35), Análogos (50), Valor (65), Tríadas (80), Relatividad (95), Tétradas (110), Asocia la paleta (130), Predice la sombra (160), Mood de escena (200). Incluye:

- **Relatividad**: hacer que dos colores se *vean* iguales sobre fondos distintos (el ajuste ideal es una estimación sencilla).
- **Asocia la paleta**: elegir la paleta que comunica un encargo (acogedor, terror, alegre).
- **Predice la sombra**: dado un Kelvin, elegir si la sombra es más fría, neutra o más cálida.
- **Mood de escena**: mover temperatura, valor y saturación hasta lograr el ambiente pedido.

## Laboratorio

- **2D**: editor estilo Photoshop sencillo.
  - Herramientas: pincel, goma, relleno, cuentagotas, línea, rectángulo, elipse (con relleno opcional).
  - Tamaño y opacidad, deshacer (12 pasos), limpiar capa, 3 capas con visibilidad, guardar en galería.
  - **Selector de color**: rueda cromática (matiz y saturación) + deslizador de **valor** con degradado, código hex y colores recientes (reemplaza los colores predeterminados).
  - **Niveles**: diálogo con histograma de la capa activa, punto negro, medios (gamma) y punto blanco, con vista previa en vivo, Aplicar y Cancelar.
- **3D** (three.js): vista en tiempo real con esfera, cubo, pirámide, cilindro y toroide; carga de modelos propios en `.obj`; temperatura de luz en Kelvin, temperatura del ambiente, intensidad, ángulo de la luz, suavidad de la sombra, brillo y color del material (con el mismo selector de color); giro con arrastre, zoom con la rueda y captura a la galería.

## Galería

Hasta 12 trabajos (lienzos y capturas 3D) en marcos de vidrio estilo Wii U, con huecos vacíos. Al tocar uno se abre ampliado, con opción de borrarlo.

## Datos guardados (localStorage)

- `cm3`: puntos totales (`pt`) y mejores puntajes por módulo (`m1`…`m4`) y ejercicio de arcade (`a0`…`a11`).
- `cm3w`: lista de trabajos de la galería (imágenes JPEG en base64).

## Cómo ampliar

- **Nuevo ejercicio**: crea en `exercises.js` una función `miEjercicio(r, c)` que pinte en `r` (zona de fichas) y `c` (controles) y devuelva `() => ({s: 0..100, m: "mensaje"})`. Agrégala a `ARC` en `content.js` con su umbral de puntos.
- **Nuevo módulo**: añade un objeto a `MODS` en `content.js` (`id`, `t`, `d`, `th`, `demo`, `mk`, `q`, `cv`) y una referencia en `REF` de `practice.js`.
- **Nueva herramienta del editor**: agrega un botón en la lista `TL` de `editor.js` y su caso en los eventos de puntero.

## Equivalencias sugeridas para Godot

| Prototipo | Godot |
|---|---|
| `core.js` (color, OKLab, puntaje) | Script autoload `ColorMath.gd` |
| `wheel.js`, `exercises.js` | Escenas de ejercicio con un método `comprobar() -> Dictionary` |
| `content.js` | Recursos (`Resource`) o JSON con módulos y arcade |
| `app.js` | Escena principal y gestor de pantallas |
| `editor.js` + `practice.js` | Escena de lienzo con `SubViewport` y capas |
| `lab3d.js` | `Node3D` con `DirectionalLight3D`, `MeshInstance3D` y carga de `.obj` |
| `localStorage` | `ConfigFile` / `FileAccess` |

## Limitaciones conocidas

- La estimación de relatividad del color y el puntaje de parecido son heurísticas sencillas, no modelos perceptuales completos.
- No incluye calibración de pantalla ni modo daltonismo (sí lo tiene color.method.ac).
- Módulos de temperatura y mezcla, relatividad como módulo propio y aplicación de paletas: pendientes de la siguiente etapa.
- Probado solo por revisión de sintaxis; conviene probar cada pantalla en el navegador.
