/**
 * ============================================================================
 * PORTFOLIO INTERACTIVO — DISEÑADOR INDUSTRIAL / UXUI
 * Lógica de Navegación, Drawer Lateral, Galería Dinámica (Fotos HD + Video)
 * y Visualización 3D Interactiva en el Hero
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. GENERADOR DE LÁMINAS TÉCNICAS SVG EN ALTA RESOLUCIÓN (PLANOS, RENDERS, UI)
// Garantiza gráficos vectoriales nítidos a cualquier zoom además de soporte
// para imágenes externas (.jpg / .png / .webp) y videos (.mp4 / .webm).
// ----------------------------------------------------------------------------
function createTechnicalBlueprintSVG({ code, title, subtitle, mode, accent = '#D96B43' }) {
  const isDark = mode === 'render' || mode === 'ux-dark';
  const bg = isDark ? '#141413' : '#FAF8F5';
  const fg = isDark ? '#FAF8F5' : '#141413';
  const gridColor = isDark ? 'rgba(250,248,245,0.08)' : 'rgba(20,20,19,0.09)';
  const subColor = isDark ? 'rgba(250,248,245,0.65)' : '#4A4945';

  let centerGraphic = '';

  if (mode === 'cad-ortho') {
    centerGraphic = `
      <!-- Vista Ortogonal y Corte Seccional A-A en SolidWorks -->
      <g transform="translate(180, 95)" stroke="${fg}" fill="none">
        <!-- Marco de cotas -->
        <rect x="40" y="30" width="320" height="240" rx="18" stroke-width="2.5" fill="rgba(217,107,67,0.06)"/>
        <rect x="70" y="55" width="260" height="190" rx="10" stroke-width="1.5" stroke-dasharray="6 4"/>
        <circle cx="200" cy="150" r="68" stroke="${accent}" stroke-width="2.5"/>
        <circle cx="200" cy="150" r="38" stroke="${fg}" stroke-width="2"/>
        <circle cx="200" cy="150" r="12" fill="${accent}"/>
        <!-- Líneas de eje -->
        <line x1="20" y1="150" x2="380" y2="150" stroke="${accent}" stroke-width="1" stroke-dasharray="12 4 2 4"/>
        <line x1="200" y1="10" x2="200" y2="290" stroke="${accent}" stroke-width="1" stroke-dasharray="12 4 2 4"/>
        <!-- Cotas técnicas -->
        <line x1="40" y1="300" x2="360" y2="300" stroke="${fg}" stroke-width="1.2"/>
        <line x1="40" y1="275" x2="40" y2="310" stroke="${fg}" stroke-width="1.2"/>
        <line x1="360" y1="275" x2="360" y2="310" stroke="${fg}" stroke-width="1.2"/>
        <text x="200" y="318" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="${fg}" stroke="none">Ø 184.50 ±0.05 mm [TOL. ISO 2768-m]</text>
      </g>
      <!-- Vista lateral derecha -->
      <g transform="translate(620, 95)" stroke="${fg}" fill="none">
        <rect x="30" y="30" width="130" height="240" rx="12" stroke-width="2.2"/>
        <line x1="30" y1="90" x2="160" y2="90" stroke-width="1.5"/>
        <line x1="30" y1="210" x2="160" y2="210" stroke-width="1.5"/>
        <path d="M55,90 L135,210 M135,90 L55,210" stroke="${accent}" stroke-width="1.3"/>
        <text x="95" y="318" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="${fg}" stroke="none">SECCIÓN A-A (ESC 1:2)</text>
      </g>
    `;
  } else if (mode === 'cad-exploded') {
    centerGraphic = `
      <!-- Despiece Explosivo Isométrico (BOM) -->
      <g transform="translate(480, 255)" stroke="${fg}" fill="none">
        <line x1="-260" y1="-110" x2="260" y2="110" stroke="${accent}" stroke-width="1.5" stroke-dasharray="8 6"/>
        <!-- Capa 1 Trasera -->
        <polygon points="-210,-120 -110,-170 -30,-120 -130,-70" fill="#EFECE6" stroke="${fg}" stroke-width="2"/>
        <!-- Capa 2 Núcleo -->
        <polygon points="-50,-45 60,-100 150,-45 40,10" fill="rgba(217,107,67,0.22)" stroke="${accent}" stroke-width="2.5"/>
        <circle cx="50" cy="-45" r="24" stroke="${fg}" stroke-width="2"/>
        <!-- Capa 3 Carcasa Frontal -->
        <polygon points="100,30 210,-25 290,30 180,85" fill="#FFFFFF" stroke="${fg}" stroke-width="2.2"/>
        <!-- Globos de numeración BOM -->
        <g transform="translate(-160, -165)">
          <circle cx="0" cy="0" r="14" fill="${fg}" stroke="none"/>
          <text x="0" y="4" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#FAF8F5" stroke="none">01</text>
        </g>
        <g transform="translate(55, -125)">
          <circle cx="0" cy="0" r="14" fill="${accent}" stroke="none"/>
          <text x="0" y="4" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#FFFFFF" stroke="none">02</text>
        </g>
        <g transform="translate(220, -45)">
          <circle cx="0" cy="0" r="14" fill="${fg}" stroke="none"/>
          <text x="0" y="4" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#FAF8F5" stroke="none">03</text>
        </g>
      </g>
    `;
  } else if (mode === 'render') {
    centerGraphic = `
      <defs>
        <radialGradient id="studioGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.55"/>
          <stop offset="55%" stop-color="${accent}" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#141413" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3A3937"/>
          <stop offset="50%" stop-color="#1E1E1C"/>
          <stop offset="100%" stop-color="#0E0E0D"/>
        </linearGradient>
      </defs>
      <circle cx="480" cy="250" r="230" fill="url(#studioGlow)"/>
      <!-- Cuerpo de producto renderizado -->
      <g transform="translate(310, 105)">
        <rect x="20" y="20" width="300" height="230" rx="36" fill="url(#metalBody)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
        <rect x="48" y="46" width="244" height="140" rx="18" fill="#0B0B0A" stroke="${accent}" stroke-width="1.5"/>
        <circle cx="170" cy="116" r="44" fill="none" stroke="${accent}" stroke-width="3"/>
        <circle cx="170" cy="116" r="18" fill="${accent}"/>
        <!-- Diales anodizados -->
        <circle cx="86" cy="216" r="14" fill="#292826" stroke="rgba(255,255,255,0.35)"/>
        <circle cx="132" cy="216" r="14" fill="${accent}"/>
        <rect x="176" y="206" width="108" height="20" rx="10" fill="#252422"/>
      </g>
    `;
  } else {
    centerGraphic = `
      <!-- Wireframes & Sistema de Diseño UX/UI -->
      <g transform="translate(150, 85)">
        <!-- Pantalla 1 -->
        <rect x="0" y="10" width="190" height="290" rx="22" fill="#FFFFFF" stroke="${fg}" stroke-width="2"/>
        <rect x="18" y="34" width="154" height="75" rx="10" fill="${accent}"/>
        <rect x="18" y="124" width="100" height="12" rx="6" fill="${fg}"/>
        <rect x="18" y="146" width="154" height="50" rx="8" fill="#EFECE6"/>
        <rect x="18" y="208" width="154" height="50" rx="8" fill="#EFECE6"/>
        <!-- Pantalla 2 Central Destacada -->
        <rect x="235" y="-10" width="210" height="320" rx="24" fill="#141413" stroke="${accent}" stroke-width="2.5"/>
        <circle cx="340" cy="95" r="52" fill="none" stroke="${accent}" stroke-width="6"/>
        <text x="340" y="102" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="22" fill="#FAF8F5">94%</text>
        <rect x="260" y="175" width="160" height="38" rx="8" fill="rgba(255,255,255,0.08)"/>
        <rect x="260" y="225" width="160" height="44" rx="22" fill="${accent}"/>
        <!-- Pantalla 3 Componentes -->
        <rect x="490" y="10" width="190" height="290" rx="22" fill="#FFFFFF" stroke="${fg}" stroke-width="2"/>
        <line x1="514" y1="60" x2="656" y2="60" stroke="${fg}" stroke-width="2"/>
        <circle cx="550" cy="130" r="26" fill="rgba(217,107,67,0.2)" stroke="${accent}" stroke-width="2"/>
        <circle cx="620" cy="130" r="26" fill="#EFECE6" stroke="${fg}" stroke-width="2"/>
        <rect x="514" y="185" width="142" height="82" rx="10" fill="#FAF8F5" stroke="${fg}" stroke-width="1.5"/>
      </g>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
    <rect width="960" height="540" fill="${bg}"/>
    <!-- Grilla técnica de fondo -->
    <g stroke="${gridColor}" stroke-width="1">
      <line x1="0" y1="90" x2="960" y2="90"/>
      <line x1="0" y1="180" x2="960" y2="180"/>
      <line x1="0" y1="270" x2="960" y2="270"/>
      <line x1="0" y1="360" x2="960" y2="360"/>
      <line x1="0" y1="450" x2="960" y2="450"/>
      <line x1="160" y1="0" x2="160" y2="540"/>
      <line x1="320" y1="0" x2="320" y2="540"/>
      <line x1="480" y1="0" x2="480" y2="540"/>
      <line x1="640" y1="0" x2="640" y2="540"/>
      <line x1="800" y1="0" x2="800" y2="540"/>
    </g>
    <!-- Marco perimetral ISO -->
    <rect x="24" y="24" width="912" height="492" fill="none" stroke="${fg}" stroke-width="1.5" stroke-opacity="0.4"/>
    <!-- Encabezado de lámina -->
    <text x="48" y="58" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600" fill="${accent}">${code}</text>
    <text x="912" y="58" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="12" fill="${subColor}">${subtitle}</text>
    ${centerGraphic}
    <!-- Rótulo técnico inferior -->
    <g transform="translate(48, 468)">
      <text x="0" y="0" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="700" fill="${fg}">${title}</text>
      <text x="0" y="20" font-family="JetBrains Mono, monospace" font-size="11" fill="${subColor}">PROYECCIÓN ISO-E · TOLERANCIA GENERAL ±0.1mm · REVISIÓN 04</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ----------------------------------------------------------------------------
// 2. BASE DE DATOS DE PROYECTOS POR CATEGORÍA (SOLIDWORKS, RENDERS, UX / UI)
// Incluye soporte mixto de Fotos en Alta Resolución + Reproductor de Video 60fps
// ----------------------------------------------------------------------------
const CATEGORIES_META = {
  solidworks: {
    code: 'CAT // 01',
    title: 'Solidworks',
    breadcrumb: '01 / SOLIDWORKS & INGENIERÍA DE SERIE',
    subtitle: 'Modelado paramétrico 3D de alta precisión, desarrollo de matrices para inyección y mecanizado CNC, despieces explosivos (BOM) y documentación técnica bajo normativa ISO para producción en serie.'
  },
  renders: {
    code: 'CAT // 02',
    title: 'Renders',
    breadcrumb: '02 / RENDERS FOTORREALISTAS DE PRODUCTO',
    subtitle: 'Visualización avanzada de producto, definición de catálogos CMF (Color, Material, Finish), iluminación de estudio HDRI y secuencias animadas para validación estética y lanzamiento comercial.'
  },
  uxui: {
    code: 'CAT // 03',
    title: 'UX / UI',
    breadcrumb: '03 / DISEÑO DE SISTEMAS E INTERFACES UX/UI',
    subtitle: 'Diseño de productos digitales centrados en las personas: investigación de usuarios, arquitectura de información, Design Systems, prototipado interactivo e interfaces conectadas con productos físicos.'
  }
};

const PROJECTS_DATA = {
  solidworks: [
    {
      id: 'sw-dron-submarino',
      code: 'SOLIDWORKS // 01',
      title: 'Dron Submarino',
      year: '2026',
      tags: ['SolidWorks CAD', 'Ensamble .SLDASM', 'Archivo .STEP / .STL', 'Hidrodinámica'],
      lead: 'Diseño y modelado tridimensional en SolidWorks de un vehículo autónomo subacuático (ROV / Dron Submarino) con carenado hidrodinámico, rotor vertical central de inmersión y doble propulsor trasero entubado.',
      process: 'Desarrollo de superficies continuas para reducir el coeficiente de arrastre subacuático, diseño de toberas laterales canalizadas, cabezal estanco frontal para sensores/cámara y ensamble mecánico completo validado en SolidWorks.',
      tools: 'SolidWorks (Modelado de Sólidos, Superficies y Ensambles .SLDASM), exportación para prototipado e ingeniería (.STEP y .STL) y renderizado técnico de conjunto.',
      solution: 'Arquitectura modular con acceso rápido a compartimentos sellados, protección perimetral de hélices y geometría optimizada para estabilidad direccional bajo el agua.',
      media: [
        {
          type: 'image',
          label: 'Dron Submarino — Vista General Isométrica',
          caption: 'Ensamble completo del Dron Submarino con doble propulsor trasero y carenado hidrodinámico',
          src: 'Proyectos/Solidworks/Dron Submarino/Untitled.JPG'
        },
        {
          type: 'image',
          label: 'Dron Submarino — Detalle Superior de Turbina Central',
          caption: 'Vista superior del rotor vertical de control de profundidad y carcasa superior',
          src: 'Proyectos/Solidworks/Dron Submarino/Untitled2.JPG'
        },
        {
          type: 'image',
          label: 'Dron Submarino — Detalle de Tobera Lateral y Fijaciones',
          caption: 'Acercamiento a la canalización lateral, tornillería de cierre y propulsores traseros',
          src: 'Proyectos/Solidworks/Dron Submarino/Untitled5.JPG'
        }
      ]
    },
    {
      id: 'sw-puesto-reciclado-vidrio',
      code: 'SOLIDWORKS // 02',
      title: 'Puesto de reciclado de vidrio',
      year: '2026',
      tags: ['SolidWorks', 'Diseño Sustentable', 'Mobiliario Urbano Móvil', 'Producción'],
      lead: 'Diseño integral de puesto móvil e interactivo ("VIDRIA") para concientización, recepción y reciclado de envases de vidrio en espacios públicos y parques urbanos.',
      process: 'Modelado estructural en caño metálico galvanizado con ruedas giratorias de alta carga, planos de trabajo superiores rebatibles en madera, estanterías internas de acopio y sistema superior desmontable para paneles de comunicación ambiental.',
      tools: 'SolidWorks para estructura metálica, mecanismos rebatibles y despiece productivo; Adobe Illustrator para gráfica ambiental ("Cada botella cuenta" / "Tu vidrio vuelve a tener vida").',
      solution: 'Módulo autoportante y transportable que pasa de posición compacta de traslado a puesto de atención de 360° en minutos, articulando factores ambientales, socioculturales y productivos.',
      media: [
        {
          type: 'image',
          label: 'Puesto de reciclado de vidrio — Vista Principal Desplegada',
          caption: 'Módulo VIDRIA con mesadas laterales desplegadas y cenefa informativa superior',
          src: 'Proyectos/Solidworks/Puesto de reciclado de vidrio/1.1.png'
        },
        {
          type: 'image',
          label: 'Puesto de reciclado de vidrio — Vista de Gráfica y Estructura',
          caption: 'Paneles educativos de economía circular e infografía del ciclo de reciclado del vidrio',
          src: 'Proyectos/Solidworks/Puesto de reciclado de vidrio/1.2.png'
        },
        {
          type: 'image',
          label: 'Puesto de reciclado de vidrio — Configuración Compacta y Despiece',
          caption: 'Sistema con alas rebatidas y paneles superiores desmontados para logística y guardado',
          src: 'Proyectos/Solidworks/Puesto de reciclado de vidrio/1.14.png'
        },
        {
          type: 'image',
          label: 'Puesto de reciclado de vidrio — Implantación en Contexto Urbano',
          caption: 'Puesto en uso real en espacio público articulando la participación ciudadana',
          src: 'Proyectos/Solidworks/Puesto de reciclado de vidrio/unnamed.jpg'
        }
      ]
    },
    {
      id: 'sw-puesto-frutas-verduras',
      code: 'SOLIDWORKS // 03',
      title: 'Puesto de venta de frutas y verduras',
      year: '2026',
      tags: ['SolidWorks', 'Equipamiento Comercial', 'Ergonomía', 'Producción en Serie'],
      lead: 'Desarrollo de equipamiento modular para exhibición, conservación y comercialización de frutas y verduras centrado en la ergonomía del vendedor y la experiencia de compra del usuario.',
      process: 'Articulación de factores higiénicos, estructurales y productivos mediante modelado paramétrico en SolidWorks, optimizando ángulos de exhibición, ventilación de mercadería y facilidad de montaje.',
      tools: 'SolidWorks (Modelado 3D, Chapa Metálica, Estructura Tubular y Planos Técnicos de Fabricación).',
      solution: 'Sistema resistente, apilable y de fácil limpieza adaptable a ferias itinerantes y mercados locales.',
      media: [
        {
          type: 'image',
          label: 'Puesto de venta de frutas y verduras — Lámina Técnica',
          caption: 'Documentación y desarrollo estructural en carpeta Proyectos/Solidworks/Puesto de venta de frutas y verduras',
          src: createTechnicalBlueprintSVG({
            code: 'SOLIDWORKS // PUESTO DE VENTA',
            title: 'PUESTO DE VENTA DE FRUTAS Y VERDURAS',
            subtitle: 'MODELADO 3D & PLANOS DE PRODUCCIÓN',
            mode: 'cad-exploded'
          })
        }
      ]
    }
  ],

  renders: [
    {
      id: 'rn-silla-ch33',
      code: 'RENDER // 01',
      title: 'Silla CH33',
      year: '2026',
      tags: ['Render Fotorrealista', 'Iluminación & Contexto', 'Materialidad PBR', 'Mobiliario'],
      lead: 'Estudio de renderizado fotorrealista, iluminación arquitectónica y detalle matérico para la clásica Silla CH33, explorando su comportamiento visual tanto en escenas conceptuales como en contextos interiores habitables.',
      process: 'Configuración de texturas físicas (PBR) de alta resolución para el veteado orgánico de la madera curvada y la micro-textura del tapizado violeta, acompañado de encuadres fotográficos de detalle 1:1 y composiciones de atmósfera.',
      tools: 'Modelado 3D, Motores de Renderizado Fotorrealista, configuración de cámaras (profundidad de campo / DoF), iluminación HDRI y post-producción gráfica.',
      solution: 'Serie de entregas visuales en formatos 16:9 y 1:1 para presentación editorial, piezas de difusión (flyers representativos) y validación de acabados superficiales.',
      media: [
        {
          type: 'image',
          label: 'Flyer representativo 16.9',
          caption: 'Escena conceptual exterior con pórticos reflectantes y lumínicos en formato 16:9',
          src: 'Proyectos/Render/Silla CH33/Flyer representativo 16.9.jpg'
        },
        {
          type: 'image',
          label: 'Render de Contexto 2 Silla CH33',
          caption: 'Ambientación interior con contraste de luz natural lateral e iluminación cálida suspendida',
          src: 'Proyectos/Render/Silla CH33/Render de Contexto 2 Silla CH33.png'
        },
        {
          type: 'image',
          label: 'Flyer representativo 1.1',
          caption: 'Composición en formato 1:1 sobre pedestal metálico con desenfoque selectivo',
          src: 'Proyectos/Render/Silla CH33/Flyer representativo 1.1.jpg'
        },
        {
          type: 'image',
          label: 'Detalle 1 en 1',
          caption: 'Acercamiento macro 1:1 destacando las uniones en madera maciza y la textura del asiento tapizado',
          src: 'Proyectos/Render/Silla CH33/Detalle 1 en 1.jpg'
        }
      ]
    },
    {
      id: 'rn-inmobiliaria',
      code: 'RENDER // 02',
      title: 'Inmobiliaria',
      year: '2026',
      tags: ['Visualización Arquitectónica', 'Render Interior / Exterior', 'Iluminación Natural', 'Materialidad'],
      lead: 'Desarrollo de visualización fotorrealista aplicada al sector inmobiliario y arquitectónico, enfocada en transmitir espacialidad, calidez lumínica y realismo constructivo.',
      process: 'Simulación de iluminación física solar y artificial, calibración de materiales arquitectónicos (hormigón, maderas, cristales y metales) y composición de cámaras de recorrido visual.',
      tools: 'Modelado 3D, Renderizado Fotorrealista de Espacios y Producto, Post-producción.',
      solution: 'Material visual de alta fidelidad para comercialización, pre-visualización de obra y presentación a clientes.',
      media: [
        {
          type: 'image',
          label: 'Inmobiliaria — Visualización Fotorrealista',
          caption: 'Proyecto alojado en carpeta Proyectos/Render/Inmobiliaria',
          src: createTechnicalBlueprintSVG({
            code: 'RENDER // INMOBILIARIA',
            title: 'INMOBILIARIA — VISUALIZACIÓN ARQUITECTÓNICA & ESPACIAL',
            subtitle: 'ILUMINACIÓN FÍSICA & MATERIALIDAD PBR',
            mode: 'render'
          })
        }
      ]
    }
  ],

  uxui: [
    {
      id: 'ux-01',
      code: 'UX // 01 · ECOSISTEMA IOT & HARDWARE',
      title: 'App & Interfaz Embebida "PULSE HOME" — Gestión Energética Inteligente',
      year: '2026',
      tags: ['UX Research', 'Design System', 'UI Industrial', 'Prototipo Interactivo'],
      lead: 'Diseño convergente entre producto físico (termostato inteligente de pared) y aplicación móvil para monitoreo de consumo energético y huella ambiental del hogar.',
      process: 'Investigación con usuarios, mapeo de arquetipos y pruebas de usabilidad. Diseño de una interfaz de alto contraste inspirada en instrumentación industrial que permite leer métricas complejas en menos de 2 segundos.',
      tools: 'Figma (Variables, Auto-Layout, Prototipado Avanzado), Illustrator para iconografía vectorial a medida, articulación con el equipo de hardware.',
      solution: 'Incremento del 41% en la retención semanal de usuarios y reducción del 18% en el consumo eléctrico promedio de los hogares piloto.',
      media: [
        {
          type: 'video',
          simMode: 'ux-flow',
          label: 'VIDEO · Prototipo Interactivo en Vivo: Flujo de Control y Telemetría (60 FPS)',
          caption: 'Transiciones micro-interactivas entre el dial físico y el dashboard móvil'
        },
        {
          type: 'image',
          label: 'UI 01 · Arquitectura de Pantallas & Design System',
          caption: 'Sistema de componentes modulares, tokens de color y visualización de datos en tiempo real',
          src: createTechnicalBlueprintSVG({
            code: 'UX/UI SYSTEM // UX-01-DS',
            title: 'PULSE HOME — ECOSISTEMA FÍSICO + DIGITAL',
            subtitle: 'FIGMA DESIGN SYSTEM · ACCESIBILIDAD WCAG AA',
            mode: 'ux-screens'
          })
        },
        {
          type: 'image',
          label: 'UI 02 · Dashboard Analítico en Dispositivos Móviles',
          caption: 'Jerarquía tipográfica clara y controles táctiles ergonómicos',
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85'
        }
      ]
    },
    {
      id: 'ux-02',
      code: 'UX // 02 · INDUSTRIA 4.0',
      title: 'Plataforma HMI "FAB-CONTROL" para Líneas de Producción en Serie',
      year: '2025',
      tags: ['HMI Industrial', 'Diseño de Servicios', 'Arquitectura de Información', 'B2B'],
      lead: 'Rediseño integral de la interfaz Hombre-Máquina (HMI) para operarios y supervisores de planta en procesos de inyección plástica y control de calidad.',
      process: 'Observación contextual en planta productiva, detección de puntos críticos de error cognitivo y creación de un sistema visual limpio con alertas codificadas en color terracota/ámbar sobre fondo hueso antirreflejo.',
      tools: 'Investigación etnográfica en planta, Figma, Illustrator, pruebas con pantallas táctiles capacitivas con guantes.',
      solution: 'Disminución del 35% en el tiempo de configuración de lotes (setup) y reducción drástica de errores de lectura en turnos nocturnos.',
      media: [
        {
          type: 'image',
          label: 'UI 01 · Consola de Supervisión de Planta en Tiempo Real',
          caption: 'Grilla técnica 1px con indicadores de OEE, temperatura de matriz y ciclo de inyección',
          src: createTechnicalBlueprintSVG({
            code: 'HMI INTERFACE // UX-02-IND',
            title: 'FAB-CONTROL — TERMINAL TÁCTIL DE PLANTA',
            subtitle: 'DISEÑO CENTRADO EN EL OPERARIO · 1920x1080',
            mode: 'ux-screens'
          })
        },
        {
          type: 'video',
          simMode: 'ux-flow',
          label: 'VIDEO · Simulación de Telemetría HMI y Respuesta de Alertas',
          caption: 'Interfaz reactiva con visualización de parámetros productivos en vivo'
        }
      ]
    },
    {
      id: 'ux-03',
      code: 'UX // 03 · ECONOMÍA CIRCULAR & SERVICIOS',
      title: 'Servicio Digital "CICLO" — Trazabilidad de Materiales y Reparabilidad',
      year: '2025',
      tags: ['Service Design', 'Pasaporte Digital', 'UX/UI Mobile', 'Sustentabilidad'],
      lead: 'Diseño de servicio y aplicación web/móvil que vincula cada producto industrial mediante código QR/NFC con su manual de despiece interactivo, repuestos originales y centros de reciclaje.',
      process: 'Articulación de factores ambientales, socioculturales y productivos en un Blueprint de Servicio completo. Diseño de visores 3D simplificados para que el usuario final pueda reparar su propio producto.',
      tools: 'Service Blueprints, Figma, Illustrator, Modelado 3D optimizado para WebGL.',
      solution: 'Extensión estimada del ciclo de vida útil del producto en +3.5 años y trazabilidad del 92% de componentes recuperables.',
      media: [
        {
          type: 'image',
          label: 'UI 01 · Flujo de Escaneo NFC y Despiece Interactivo',
          caption: 'Experiencia paso a paso para diagnóstico, pedido de piezas y reparación asistida',
          src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1400&q=85'
        },
        {
          type: 'video',
          simMode: 'ux-flow',
          label: 'VIDEO · Navegación del Pasaporte Digital de Producto',
          caption: 'Visualización fluida de impacto ambiental y catálogo de repuestos'
        }
      ]
    }
  ]
};

// ----------------------------------------------------------------------------
// 3. ESTADO DE LA APLICACIÓN Y ELEMENTOS DEL DOM
// ----------------------------------------------------------------------------
const state = {
  currentView: 'hero', // 'hero' | 'solidworks' | 'renders' | 'uxui'
  sidebarCollapsed: false,
  mobileDrawerOpen: false,
  activeVideoLoops: []
};

const dom = {
  appShell: document.getElementById('appShell'),
  drawerToggleBtn: document.getElementById('drawerToggleBtn'),
  sidebarPinBtn: document.getElementById('sidebarPinBtn'),
  expandRailLabel: document.getElementById('expandRailLabel'),
  sidebarBackdrop: document.getElementById('sidebarBackdrop'),
  headerHomeBtn: document.getElementById('headerHomeBtn'),
  backToHeroBtn: document.getElementById('backToHeroBtn'),
  currentBreadcrumb: document.getElementById('currentBreadcrumb'),
  heroView: document.getElementById('heroView'),
  projectsView: document.getElementById('projectsView'),
  exhibitionTitleText: document.getElementById('exhibitionTitleText'),
  exhibitionCodePill: document.getElementById('exhibitionCodePill'),
  exhibitionSubtitleText: document.getElementById('exhibitionSubtitleText'),
  projectsFeedContainer: document.getElementById('projectsFeedContainer'),
  // Modales
  contactModal: document.getElementById('contactModal'),
  openContactBtn: document.getElementById('openContactBtn'),
  bannerContactBtn: document.getElementById('bannerContactBtn'),
  footerContactBtn: document.getElementById('footerContactBtn'),
  closeContactModalBtn: document.getElementById('closeContactModalBtn'),
  contactForm: document.getElementById('contactForm'),
  contactSubmitLabel: document.getElementById('contactSubmitLabel'),
  lightboxModal: document.getElementById('lightboxModal'),
  lightboxImg: document.getElementById('lightboxImg'),
  lightboxTitle: document.getElementById('lightboxTitle'),
  closeLightboxBtn: document.getElementById('closeLightboxBtn')
};

// ----------------------------------------------------------------------------
// 4. CONTROL DEL MENÚ LATERAL DESPLEGABLE (DRAWER / SIDEBAR COLAPSABLE)
// ----------------------------------------------------------------------------
function isMobileViewport() {
  return window.innerWidth <= 820;
}

function toggleSidebar() {
  if (isMobileViewport()) {
    state.mobileDrawerOpen = !state.mobileDrawerOpen;
    dom.appShell.classList.toggle('mobile-drawer-open', state.mobileDrawerOpen);
    dom.drawerToggleBtn.classList.toggle('is-active', state.mobileDrawerOpen);
    dom.drawerToggleBtn.setAttribute('aria-expanded', String(state.mobileDrawerOpen));
  } else {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    dom.appShell.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
    dom.drawerToggleBtn.setAttribute('aria-expanded', String(!state.sidebarCollapsed));
  }
}

function closeMobileDrawerIfNeeded() {
  if (state.mobileDrawerOpen) {
    state.mobileDrawerOpen = false;
    dom.appShell.classList.remove('mobile-drawer-open');
    dom.drawerToggleBtn.classList.remove('is-active');
    dom.drawerToggleBtn.setAttribute('aria-expanded', 'false');
  }
}

// ----------------------------------------------------------------------------
// 5. NAVEGACIÓN SUAVE (300ms) ENTRE HERO Y CATEGORÍAS (SOLIDWORKS, RENDERS, UX/UI)
// ----------------------------------------------------------------------------
function updateActiveButtonsUI(targetView) {
  // Botones de categoría en el sidebar izquierdo, rail compacto y quick switcher
  document.querySelectorAll('[data-category]').forEach((btn) => {
    const cat = btn.getAttribute('data-category');
    const isActive = cat === targetView;
    if (
      btn.classList.contains('category-btn') ||
      btn.classList.contains('rail-btn') ||
      btn.classList.contains('quick-switch-btn')
    ) {
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    }
  });

  // Botón de Inicio / Hero
  document.querySelectorAll('[data-view-target="hero"]').forEach((btn) => {
    btn.classList.toggle('is-active', targetView === 'hero');
  });

  // Actualizar Breadcrumb superior
  if (targetView === 'hero') {
    dom.currentBreadcrumb.textContent = '00 · Presentación';
  } else if (CATEGORIES_META[targetView]) {
    dom.currentBreadcrumb.textContent = CATEGORIES_META[targetView].breadcrumb;
  }
}

function stopActiveProjectVideos() {
  state.activeVideoLoops.forEach((cancelFn) => cancelFn());
  state.activeVideoLoops = [];
}

function navigateToView(targetView) {
  closeMobileDrawerIfNeeded();
  updateActiveButtonsUI(targetView);

  if (targetView === 'hero') {
    if (state.currentView === 'hero') return;
    state.currentView = 'hero';

    dom.projectsView.classList.add('is-entering');
    setTimeout(() => {
      stopActiveProjectVideos();
      dom.projectsView.classList.add('is-hidden');
      dom.projectsView.classList.remove('is-entering');

      dom.heroView.classList.remove('is-hidden');
      dom.heroView.classList.add('is-entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dom.heroView.classList.remove('is-entering');
        });
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
    return;
  }

  // Si es una de las 3 categorías: 'solidworks' | 'renders' | 'uxui'
  const meta = CATEGORIES_META[targetView];
  if (!meta) return;

  const isAlreadyInProjectsView = state.currentView !== 'hero';
  state.currentView = targetView;

  if (!isAlreadyInProjectsView) {
    dom.heroView.classList.add('is-entering');
    setTimeout(() => {
      dom.heroView.classList.add('is-hidden');
      dom.heroView.classList.remove('is-entering');

      renderCategoryProjects(targetView);
      dom.projectsView.classList.remove('is-hidden');
      dom.projectsView.classList.add('is-entering');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dom.projectsView.classList.remove('is-entering');
        });
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
  } else {
    // Transición suave entre categorías dentro de la vista de proyectos
    dom.projectsFeedContainer.style.opacity = '0';
    dom.projectsFeedContainer.style.transform = 'translateY(8px)';
    dom.projectsFeedContainer.style.transition = 'opacity 220ms ease, transform 220ms ease';

    setTimeout(() => {
      renderCategoryProjects(targetView);
      dom.projectsFeedContainer.style.opacity = '1';
      dom.projectsFeedContainer.style.transform = 'translateY(0)';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }
}

// ----------------------------------------------------------------------------
// 6. RENDERIZADO DE LAS FICHAS DE PROYECTO Y CONTENEDOR MULTIMEDIA (FOTOS + VIDEO)
// ----------------------------------------------------------------------------
function renderCategoryProjects(categoryKey) {
  stopActiveProjectVideos();

  const meta = CATEGORIES_META[categoryKey];
  const projects = PROJECTS_DATA[categoryKey] || [];

  dom.exhibitionTitleText.textContent = meta.title;
  dom.exhibitionCodePill.textContent = meta.code;
  dom.exhibitionSubtitleText.textContent = meta.subtitle;

  dom.projectsFeedContainer.innerHTML = '';

  projects.forEach((project, projIdx) => {
    const sheet = document.createElement('article');
    sheet.className = 'project-sheet';
    sheet.id = project.id;

    const tagsHtml = project.tags.map((t) => `<span class="meta-chip">${t}</span>`).join('');
    const toolsPills = project.tags.map((t) => `<span class="tool-pill">${t}</span>`).join('');

    // Construir tira de miniaturas (Fotos HD + Video)
    const thumbsHtml = project.media
      .map((item, idx) => {
        const isVideo = item.type === 'video';
        const thumbPreview = isVideo
          ? createTechnicalBlueprintSVG({
              code: 'MOTION 60FPS',
              title: 'SIMULACIÓN / VIDEO',
              subtitle: 'PLAY',
              mode: categoryKey === 'renders' ? 'render' : 'cad-ortho'
            })
          : item.src;

        return `
          <button
            type="button"
            class="media-thumb-btn ${idx === 0 ? 'is-active' : ''} ${isVideo ? 'is-video-thumb' : ''}"
            data-proj-idx="${projIdx}"
            data-media-idx="${idx}"
            title="${item.label}"
          >
            <img src="${thumbPreview}" alt="${item.label}" loading="lazy" />
            <span class="thumb-tag">${isVideo ? '▶ VIDEO' : `FOTO 0${idx + 1}`}</span>
          </button>
        `;
      })
      .join('');

    sheet.innerHTML = `
      <!-- Barra Técnica Superior de la Ficha -->
      <div class="project-sheet-topbar">
        <div class="project-code-badge">
          <span class="dot"></span>
          <span>${project.code}</span>
          <span style="color: var(--text-muted);">// AÑO ${project.year}</span>
        </div>
        <div class="project-meta-tags">
          ${tagsHtml}
        </div>
      </div>

      <!-- Cuerpo de la Ficha: Contenedor Multimedia + Descripción Técnica y Conceptual -->
      <div class="project-sheet-body">
        <!-- Contenedor Multimedia (Soporte para Fotos en Alta Resolución y Videos fluidos) -->
        <div class="project-media-column">
          <div class="media-stage-frame" id="stage-${project.id}">
            <!-- El contenido multimedia activo se monta aquí dinámicamente -->
          </div>
          <div class="media-thumbnails-strip" role="tablist" aria-label="Galería multimedia del proyecto">
            ${thumbsHtml}
          </div>
        </div>

        <!-- Columna de Descripción Técnica y Conceptual -->
        <div class="project-info-column">
          <div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-summary-lead">${project.lead}</p>

            <div class="project-specs-blocks">
              <div class="spec-block">
                <div class="spec-block-label">
                  <span>01 · PROCESO TÉCNICO &amp; METODOLOGÍA</span>
                </div>
                <p class="spec-block-text">${project.process}</p>
              </div>

              <div class="spec-block">
                <div class="spec-block-label">
                  <span>02 · HERRAMIENTAS &amp; PRODUCCIÓN</span>
                </div>
                <p class="spec-block-text">${project.tools}</p>
              </div>

              <div class="spec-block">
                <div class="spec-block-label">
                  <span>03 · SOLUCIÓN LOGRADA &amp; RESULTADOS</span>
                </div>
                <p class="spec-block-text">${project.solution}</p>
              </div>
            </div>
          </div>

          <div class="project-tools-row">
            ${toolsPills}
          </div>
        </div>
      </div>
    `;

    dom.projectsFeedContainer.appendChild(sheet);

    // Inicializar el primer elemento multimedia de la ficha
    mountProjectMediaItem(project, 0);

    // Eventos de cambio de miniatura dentro de la ficha
    sheet.querySelectorAll('.media-thumb-btn').forEach((thumbBtn) => {
      thumbBtn.addEventListener('click', () => {
        const mediaIdx = Number(thumbBtn.getAttribute('data-media-idx'));
        sheet.querySelectorAll('.media-thumb-btn').forEach((b) => b.classList.remove('is-active'));
        thumbBtn.classList.add('is-active');
        mountProjectMediaItem(project, mediaIdx);
      });
    });
  });
}

// Monta una Foto en Alta Resolución o un Reproductor de Video Fluido en el contenedor del proyecto
function mountProjectMediaItem(project, mediaIndex) {
  const stage = document.getElementById(`stage-${project.id}`);
  if (!stage) return;

  // Si había una animación de video previa en este stage, limpiarla
  if (stage._cancelVideo) {
    stage._cancelVideo();
    stage._cancelVideo = null;
  }

  const item = project.media[mediaIndex];
  if (!item) return;

  if (item.type === 'image') {
    stage.innerHTML = `
      <span class="media-type-badge">
        <span class="live-dot"></span>
        <span>${item.label}</span>
      </span>
      <button type="button" class="media-expand-btn" data-expand-src="${item.src}" data-expand-title="${project.title} — ${item.label}">
        AMPLIAR HD ↗
      </button>
      <img src="${item.src}" alt="${project.title} - ${item.label}" />
      <div class="media-caption-bar">
        <span>${item.caption}</span>
        <span>ALTA RESOLUCIÓN</span>
      </div>
    `;

    const expandBtn = stage.querySelector('.media-expand-btn');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        openLightbox(item.src, `${project.title} · ${item.label}`);
      });
    }
  } else if (item.type === 'video') {
    // Soporte dual: si el usuario define item.videoUrl (.mp4/.webm), usa <video> nativo;
    // por defecto incluye además simulación procedural 60fps interactiva para reproducción fluida garantizada.
    if (item.videoUrl) {
      stage.innerHTML = `
        <span class="media-type-badge">
          <span class="live-dot"></span>
          <span>${item.label}</span>
        </span>
        <video src="${item.videoUrl}" controls autoplay muted loop playsinline></video>
      `;
    } else {
      stage.innerHTML = `
        <span class="media-type-badge">
          <span class="live-dot"></span>
          <span>${item.label}</span>
        </span>
        <button type="button" class="media-expand-btn" id="fullscreenVideo-${project.id}">
          PANTALLA COMPLETA ⛶
        </button>
        <canvas id="videoCanvas-${project.id}" width="860" height="538"></canvas>
        <div class="video-controls-bar">
          <button type="button" class="video-ctrl-btn" id="playPause-${project.id}">❚❚ PAUSA</button>
          <div class="video-progress-track" id="progressTrack-${project.id}" title="Adelantar / retroceder secuencia">
            <div class="video-progress-fill" id="progressFill-${project.id}"></div>
          </div>
          <span id="timecode-${project.id}">00:04 / 00:12 · 60 FPS</span>
        </div>
      `;

      const canvas = document.getElementById(`videoCanvas-${project.id}`);
      const playPauseBtn = document.getElementById(`playPause-${project.id}`);
      const progressTrack = document.getElementById(`progressTrack-${project.id}`);
      const progressFill = document.getElementById(`progressFill-${project.id}`);
      const timecodeEl = document.getElementById(`timecode-${project.id}`);
      const fsBtn = document.getElementById(`fullscreenVideo-${project.id}`);

      if (fsBtn) {
        fsBtn.addEventListener('click', () => {
          if (stage.requestFullscreen) {
            stage.requestFullscreen();
          }
        });
      }

      const cancelFn = startProceduralProjectVideo(
        canvas,
        item.simMode,
        playPauseBtn,
        progressTrack,
        progressFill,
        timecodeEl
      );
      stage._cancelVideo = cancelFn;
      state.activeVideoLoops.push(cancelFn);
    }
  }
}

// ----------------------------------------------------------------------------
// 7. MOTOR DE VIDEO PROCEDURAL EN TIEMPO REAL (60 FPS) PARA LAS 3 CATEGORÍAS
// ----------------------------------------------------------------------------
function startProceduralProjectVideo(
  canvas,
  simMode,
  playPauseBtn,
  progressTrack,
  progressFill,
  timecodeEl
) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  let animId = null;
  let isPlaying = true;
  let t = 0;
  const loopDuration = 12; // 12 segundos por ciclo

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playPauseBtn.textContent = isPlaying ? '❚❚ PAUSA' : '▶ PLAY';
    });
  }

  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      t = ratio * loopDuration * Math.PI;
    });
  }

  function renderFrame() {
    if (isPlaying) {
      t += 0.022;
    }

    const cycleProgress = ((t / Math.PI) % loopDuration) / loopDuration;
    if (progressFill) {
      progressFill.style.width = `${(cycleProgress * 100).toFixed(1)}%`;
    }
    if (timecodeEl) {
      const sec = Math.floor(cycleProgress * loopDuration);
      const secStr = sec < 10 ? `0${sec}` : `${sec}`;
      timecodeEl.textContent = `00:${secStr} / 00:12 · 60 FPS`;
    }

    const w = canvas.width;
    const h = canvas.height;
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.clearRect(0, 0, w, h);

    if (simMode === 'cad-turntable' || simMode === 'cad-mechanism') {
      // Fondo blueprint adaptable a modo claro / oscuro
      ctx.fillStyle = isDarkTheme ? '#171614' : '#FAF8F5';
      ctx.fillRect(0, 0, w, h);

      // Grilla técnica
      ctx.strokeStyle = isDarkTheme ? 'rgba(245, 242, 235, 0.08)' : 'rgba(20, 20, 19, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h / 2;
      const explosion = (Math.sin(t * 1.4) * 0.5 + 0.5) * 85;

      // Eje central de despiece
      ctx.strokeStyle = '#D96B43';
      ctx.setLineDash([8, 6]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 260, cy);
      ctx.lineTo(cx + 260, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dibujar 3 módulos paramétricos en rotación + explosión axial
      const offsets = [-1.2, 0, 1.2];
      offsets.forEach((dir, idx) => {
        const xPos = cx + dir * (70 + explosion);
        ctx.save();
        ctx.translate(xPos, cy);

        // Sombra / volumen isométrico
        const radius = idx === 1 ? 78 : 62;
        ctx.strokeStyle = idx === 1 ? '#D96B43' : (isDarkTheme ? '#F5F2EB' : '#141413');
        ctx.lineWidth = idx === 1 ? 2.6 : 2;
        ctx.fillStyle = idx === 1 ? 'rgba(217, 107, 67, 0.22)' : (isDarkTheme ? '#242320' : '#FFFFFF');

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const ang = t * (idx === 1 ? -1 : 0.8) + (i * Math.PI) / 3;
          const px = Math.cos(ang) * radius * 0.85;
          const py = Math.sin(ang) * radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Diámetro interno y perforaciones técnicas
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.42, 0, Math.PI * 2);
        ctx.stroke();

        // Cota dinámica superior
        ctx.fillStyle = isDarkTheme ? '#F5F2EB' : '#141413';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`MOD-0${idx + 1} [Δ ${(explosion * 0.4).toFixed(1)}mm]`, 0, -radius - 18);

        ctx.restore();
      });
    } else if (simMode === 'render-studio') {
      // Estudio oscuro fotorrealista con barrido de luz HDRI
      ctx.fillStyle = '#121211';
      ctx.fillRect(0, 0, w, h);

      const lightX = w * 0.5 + Math.cos(t * 1.3) * 220;
      const lightY = h * 0.42 + Math.sin(t * 0.9) * 60;

      const grad = ctx.createRadialGradient(lightX, lightY, 10, w / 2, h / 2, 340);
      grad.addColorStop(0, 'rgba(217, 107, 67, 0.48)');
      grad.addColorStop(0.5, 'rgba(217, 107, 67, 0.12)');
      grad.addColorStop(1, 'rgba(18, 18, 17, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Silueta de producto con reflejo especular dinámico
      const cx = w / 2;
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      const bodyGrad = ctx.createLinearGradient(-160, -110, 160, 110);
      bodyGrad.addColorStop(0, '#383734');
      bodyGrad.addColorStop(0.5 + Math.sin(t) * 0.2, '#1E1E1C');
      bodyGrad.addColorStop(1, '#0A0A09');

      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-170, -105, 340, 210, 32);
      ctx.fill();
      ctx.stroke();

      // Dial anular iluminado
      ctx.strokeStyle = '#D96B43';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(-45, 0, 56, 0, Math.PI * 2);
      ctx.stroke();

      // Indicador rotativo del dial
      const dialAngle = t * 1.8;
      ctx.fillStyle = '#D96B43';
      ctx.beginPath();
      ctx.arc(-45 + Math.cos(dialAngle) * 38, Math.sin(dialAngle) * 38, 6, 0, Math.PI * 2);
      ctx.fill();

      // Barras de ecualización / interfaz física derecha
      for (let i = 0; i < 5; i++) {
        const barH = 24 + Math.abs(Math.sin(t * 2 + i * 0.7)) * 75;
        ctx.fillStyle = i === 2 ? '#D96B43' : 'rgba(250,248,245,0.75)';
        ctx.beginPath();
        ctx.roundRect(45 + i * 22, 52 - barH, 12, barH, 6);
        ctx.fill();
      }

      ctx.restore();
    } else {
      // Simulación UX / UI en vivo: Flujo de pantallas y telemetría interactiva
      ctx.fillStyle = '#EFECE6';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Tarjeta central de interfaz
      ctx.save();
      ctx.translate(cx - 190, cy - 135);

      ctx.fillStyle = '#141413';
      ctx.beginPath();
      ctx.roundRect(0, 0, 380, 270, 20);
      ctx.fill();

      // Header UI
      ctx.fillStyle = '#D96B43';
      ctx.beginPath();
      ctx.arc(32, 32, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FAF8F5';
      ctx.font = '600 13px "Space Grotesk", sans-serif';
      ctx.fillText('PULSE TELEMETRY // LIVE UI', 50, 36);

      // Gráfico de onda en vivo
      ctx.strokeStyle = '#D96B43';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 28; x <= 352; x += 6) {
        const y = 135 + Math.sin((x * 0.035) + t * 2.4) * 34 * Math.cos(t * 0.5);
        if (x === 28) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Botón interactivo simulado con pulso
      const pulse = (Math.sin(t * 3) + 1) * 0.5;
      ctx.fillStyle = '#D96B43';
      ctx.beginPath();
      ctx.roundRect(28, 205, 160 + pulse * 14, 38, 19);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('SINCRONIZADO · 98.4%', 46, 228);

      ctx.restore();
    }

    animId = requestAnimationFrame(renderFrame);
  }

  renderFrame();

  return () => {
    if (animId) cancelAnimationFrame(animId);
  };
}

// ----------------------------------------------------------------------------
// 8. VISUALIZACIÓN 3D INTERACTIVA EN EL HERO (INSPIRADA EN MORPH AI)
// Conecta: Cubos Sólidos CAD (Izquierda) -> Malla Render (Centro) -> Nodos UX (Derecha)
// ----------------------------------------------------------------------------
function initHero3DVisualization() {
  const canvas = document.getElementById('hero3dCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let rotY = 0.45;
  let rotX = 0.32;
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let time = 0;

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    rotY += (e.clientX - prevX) * 0.01;
    rotX = Math.max(-0.6, Math.min(0.8, rotX + (e.clientY - prevY) * 0.01));
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // Generar nodos de la red derecha
  const uxNodes = [];
  for (let i = 0; i < 18; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / 18);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    uxNodes.push({
      x: Math.cos(theta) * Math.sin(phi) * 78,
      y: Math.sin(theta) * Math.sin(phi) * 78,
      z: Math.cos(phi) * 78
    });
  }

  function projectIso(x, y, z, cx, cy) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    const scale = 380 / (380 + z2);
    return {
      px: cx + x1 * scale,
      py: cy + y2 * scale,
      z: z2
    };
  }

  function drawCube(cx, cy, ox, oy, oz, size, styleMode) {
    const s = size / 2;
    const verts = [
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
      [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]
    ].map(([vx, vy, vz]) => projectIso(ox + vx, oy + vy, oz + vz, cx, cy));

    const edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

    ctx.save();
    if (styleMode === 'solid') {
      ctx.fillStyle = isDarkTheme ? 'rgba(42, 40, 36, 0.92)' : 'rgba(239, 236, 230, 0.92)';
      ctx.strokeStyle = isDarkTheme ? '#F5F2EB' : '#141413';
      ctx.lineWidth = 1.4;
    } else {
      ctx.fillStyle = 'rgba(217, 107, 67, 0.24)';
      ctx.strokeStyle = '#D96B43';
      ctx.lineWidth = 1.3;
    }

    // Cara frontal aproximada para relleno técnico
    ctx.beginPath();
    ctx.moveTo(verts[4].px, verts[4].py);
    ctx.lineTo(verts[5].px, verts[5].py);
    ctx.lineTo(verts[6].px, verts[6].py);
    ctx.lineTo(verts[7].px, verts[7].py);
    ctx.closePath();
    ctx.fill();

    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(verts[a].px, verts[a].py);
      ctx.lineTo(verts[b].px, verts[b].py);
      ctx.stroke();
    });
    ctx.restore();
  }

  function animateHero() {
    time += 0.016;
    if (!isDragging) {
      rotY = 0.42 + Math.sin(time * 0.55) * 0.24;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // 1. Izquierda: Matriz de Cubos Sólidos CAD (SolidWorks)
    const leftX = w * 0.25;
    const centerY = h * 0.52;
    const offsets = [
      [-22, -22, -22], [22, -22, -22], [-22, 22, -22], [22, 22, -22],
      [-22, -22, 22], [22, -22, 22], [-22, 22, 22], [22, 22, 22]
    ];

    offsets.forEach(([ox, oy, oz], idx) => {
      const spread = idx >= 4 ? 1.25 + Math.sin(time * 1.5 + idx) * 0.12 : 1;
      const mode = idx >= 4 ? 'orange' : 'solid';
      drawCube(leftX + (idx >= 4 ? 46 : 0), centerY, ox * spread, oy * spread, oz * spread, 34, mode);
    });

    // 2. Derecha: Esfera de Nodos Interconectados (UX/UI + Sistemas)
    const rightX = w * 0.74;
    const projectedNodes = uxNodes.map((n) => {
      const pulse = 1 + Math.sin(time * 2 + n.x) * 0.05;
      return projectIso(n.x * pulse, n.y * pulse, n.z * pulse, rightX, centerY);
    });

    // Filamentos curvos que conectan la malla central naranja con la red derecha (estilo MORPH AI)
    for (let i = 0; i < 8; i++) {
      const target = projectedNodes[i];
      const startY = centerY + (i - 3.5) * 16;
      ctx.strokeStyle = 'rgba(217, 107, 67, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(leftX + 55, startY);
      ctx.bezierCurveTo(
        w * 0.48,
        startY - 28 * Math.sin(time + i),
        w * 0.58,
        target.py + 22,
        target.px,
        target.py
      );
      ctx.stroke();
    }

    // Conexiones entre los nodos UX
    for (let i = 0; i < projectedNodes.length; i++) {
      for (let j = i + 1; j < projectedNodes.length; j++) {
        const dx = projectedNodes[i].px - projectedNodes[j].px;
        const dy = projectedNodes[i].py - projectedNodes[j].py;
        const dist = Math.hypot(dx, dy);
        if (dist < 68) {
          ctx.strokeStyle = `rgba(217, 107, 67, ${1 - dist / 68})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(projectedNodes[i].px, projectedNodes[i].py);
          ctx.lineTo(projectedNodes[j].px, projectedNodes[j].py);
          ctx.stroke();
        }
      }
    }

    // Dibujar los puntos de los nodos UX
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    projectedNodes.forEach((pt, idx) => {
      ctx.fillStyle = idx % 3 === 0 ? (isDarkTheme ? '#F5F2EB' : '#141413') : '#D96B43';
      ctx.beginPath();
      ctx.arc(pt.px, pt.py, idx % 3 === 0 ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateHero);
  }

  animateHero();
}

// ----------------------------------------------------------------------------
// 9. MODALES (CONTACTO Y LIGHTBOX DE ALTA RESOLUCIÓN)
// ----------------------------------------------------------------------------
function openContactModal() {
  dom.contactModal.classList.add('is-open');
}

function closeContactModal() {
  dom.contactModal.classList.remove('is-open');
}

function openLightbox(src, title) {
  dom.lightboxImg.src = src;
  dom.lightboxTitle.textContent = title || 'VISTA EN ALTA RESOLUCIÓN';
  dom.lightboxModal.classList.add('is-open');
}

function closeLightbox() {
  dom.lightboxModal.classList.remove('is-open');
  dom.lightboxImg.src = '';
}

// ----------------------------------------------------------------------------
// 10. INICIALIZACIÓN DE EVENTOS GLOBALES
// ----------------------------------------------------------------------------
function initApp() {
  // Selector de Modo Oscuro / Modo Claro (persistido en localStorage)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleLabel = document.getElementById('themeToggleLabel');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Modo Claro';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Modo Oscuro';
    }
  }

  const savedTheme = localStorage.getItem('luca_portfolio_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('luca_portfolio_theme', nextTheme);
    });
  }

  // Alternar Drawer Lateral Izquierdo
  dom.drawerToggleBtn.addEventListener('click', toggleSidebar);
  dom.sidebarPinBtn.addEventListener('click', toggleSidebar);
  dom.expandRailLabel.addEventListener('click', toggleSidebar);
  dom.sidebarBackdrop.addEventListener('click', closeMobileDrawerIfNeeded);

  // Botones que seleccionan cualquiera de las 3 categorías (Solidworks, Renders, UX / UI)
  document.querySelectorAll('[data-category]').forEach((el) => {
    el.addEventListener('click', () => {
      const category = el.getAttribute('data-category');
      navigateToView(category);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const category = el.getAttribute('data-category');
        navigateToView(category);
      }
    });
  });

  // Botones para volver al Hero inicial
  if (dom.headerHomeBtn) {
    dom.headerHomeBtn.addEventListener('click', () => navigateToView('hero'));
  }
  dom.backToHeroBtn.addEventListener('click', () => navigateToView('hero'));
  document.querySelectorAll('[data-view-target="hero"]').forEach((btn) => {
    btn.addEventListener('click', () => navigateToView('hero'));
  });

  // Eventos del Modal de Contacto
  dom.openContactBtn.addEventListener('click', openContactModal);
  dom.bannerContactBtn.addEventListener('click', openContactModal);
  dom.footerContactBtn.addEventListener('click', openContactModal);
  dom.closeContactModalBtn.addEventListener('click', closeContactModal);
  dom.contactModal.addEventListener('click', (e) => {
    if (e.target === dom.contactModal) closeContactModal();
  });

  dom.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('contactName')?.value.trim() || '';
    const areaVal = document.getElementById('contactArea')?.value || '';
    const msgVal = document.getElementById('contactMsg')?.value.trim() || '';

    const fullText = `Hola Luca! Soy ${nameVal}. Te contacto por: ${areaVal}. ${msgVal}`;
    const whatsappUrl = `https://wa.me/542302381166?text=${encodeURIComponent(fullText)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    dom.contactSubmitLabel.textContent = 'Abriendo chat de WhatsApp ✓';
    setTimeout(() => {
      dom.contactForm.reset();
      dom.contactSubmitLabel.textContent = 'Enviar Mensaje por WhatsApp (+54 2302 381166)';
      closeContactModal();
    }, 1200);
  });

  // Eventos del Lightbox HD
  dom.closeLightboxBtn.addEventListener('click', closeLightbox);
  dom.lightboxModal.addEventListener('click', (e) => {
    if (e.target === dom.lightboxModal) closeLightbox();
  });

  // Cerrar modales con tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeLightbox();
      closeMobileDrawerIfNeeded();
    }
  });

  // Iniciar visualización 3D interactiva del Hero
  initHero3DVisualization();
}

document.addEventListener('DOMContentLoaded', initApp);
