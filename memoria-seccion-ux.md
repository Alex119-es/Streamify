### 4.1 Diseño de interfaz

Se partió de un wireframe realizado en Figma (figura 1) que definió la estructura de la pantalla Home: barra lateral izquierda, grilla de tarjetas y reproductor fijo inferior.

![Wireframe Home](documentacion/figma-wireframe-home.png)

### 4.2 Resultado final

Tras aplicar la hoja de estilos maquetada con variables CSS, tipografía Inter, sombras suaves y efectos hover, se obtuvo la interfaz responsive mostrada en las figuras 2 y 3.

| Escritorio | Móvil |
| ---------- | ----- |
| ![Home Desktop](documentacion/home-desktop.png) | ![Home Mobile](documentacion/home-mobile.png) |

### 4.3 Estructura CSS

Para facilitar el mantenimiento se dividió el código en cuatro archivos:

- **_tokens.css**: paleta, espaciado y tipografía.  
- **_util.css**: clases de utilidad (flex, grid, truncate).  
- **_components.css**: tarjetas, botones, player.  
- **home.css**: layout específico de la vista.

Ejemplo de variable:
```css
--accent: #1DB954;   /* verde Spotify */
```

### 4.4 Accesibilidad

- Contraste: paleta valida WCAG AA para texto principal y botones (≥ 4.5:1).
- Tipografía: base 16px; escalado fluido entre 14–20px según viewport.
- Focus visible: estilos focus/outline personalizados en enlaces, botones y controles del player.
- Navegación por teclado: orden lógico (sidebar → grid → player); no se bloquea el foco.
- ARIA/roles: role="navigation" (sidebar), role="main" (contenido), role="contentinfo" (player). Etiquetas aria-label en botones del player y búsqueda.

### 4.5 Responsive y layout

- Breakpoints: 480px (móvil), 768px (tablet), 1024px (desktop).
- Grilla: tarjetas responsive con minmax(180px, 1fr); gap dependiente de tokens.
- Sidebar: fija en desktop, colapsable en ≤768px.
- Player: fijo inferior, 100% ancho, controles accesibles y reflow sin solapar contenido.

### 4.6 Sistema de diseño y tokens

- Colores: --bg, --surface, --text, --muted, --accent (#1DB954), --accent-hover.
- Espaciado: --space-1 a --space-6 en escala 4/8 px.
- Radios y sombras: --radius-1/2, --shadow-1/2 para elevación de tarjetas.
- Tipos: Inter; pesos 400/600; tamaños escalados por viewport.
- Convenciones CSS: utilidades en _util.css; componentes en _components.css; BEM para bloques (p.ej., .card, .card__title, .card--compact).

### 4.7 Componentes clave

- Sidebar: navegación primaria; estados activo/hover; iconos con texto.
- Card de contenido: imagen, título truncado, subtítulo; hover eleva y muestra acción rápida.
- Botones: primario (accent), ghost y icon-only; tamaños sm/md/lg; focus visible.
- Player: título pista, progreso, play/pause, anterior/siguiente, volumen; atajos de teclado.
- Header/busqueda (si aplica): campo accesible con label y placeholder.

### 4.8 Estados e interacciones

- Hover: elevar tarjeta (+shadow), animación 150–200ms ease-out.
- Focus: outline 2px con color de acento y offset.
- Active/pressed: reducir escala 0.98 en botones y tarjetas.
- Transiciones solo en transform/opacity para rendimiento.

### 4.9 Navegación y vistas

- index.html: landing/enrutador simple.
- home.html + home.js: grilla de música/podcasts y player.
- podcasts.html + podcasts.js: listado/colecciones.
- Comportamiento: enlaces entre vistas conservan el player persistente (simulado en frontend).

### 4.10 Performance y assets

- Imágenes: tamaños adaptativos, uso de width/height para reservar espacio; lazy-loading en listas largas.
- Fuentes: Inter desde CDN con display=swap; subset latino.
- CSS: dividido por responsabilidad; evitar reglas no usadas; preferir utilidades sobre duplicación.

### 4.11 Pruebas y validación

- Responsive: verificado en 360×640, 768×1024, 1440×900.
- Accesibilidad: navegación teclado manual; Lighthouse a11y ≥ 90.
- Compatibilidad: Chrome/Edge actuales, Firefox; fallback sin blur/filters.

### 4.12 Limitaciones y futuros

- Sin backend real; datos mock.
- Falta cola de reproducción y arrastre de progreso con accesibilidad avanzada.
- Pendiente modo oscuro automático (prefers-color-scheme) si difiere de tema actual.