export const projects = [
  {
    id: 'fixbot',
    titleKey: 'pf-titulo',
    descKey: 'pf-desc',
    roleKey: 'pf-rol',
    tech: ['React Native', 'Gemini API', 'MongoDB'],
    inDevelopment: true,
    carousel: [
      { src: '/assets/prototipo-fixbot-menu-principal.png', alt: 'Fixbot - Menú Principal' },
      { src: '/assets/prototipo-fixbot-chatbot.png', alt: 'Fixbot - Chatbot IA' },
      { src: '/assets/prototipo-fixbot-informacion-vehiculo.png', alt: 'Fixbot - Información del Vehículo' },
      { src: '/assets/prototipo-fixbot-mapa-talleres.png', alt: 'Fixbot - Mapa de Talleres' },
    ],
    links: [],
  },
  {
    id: 'astrocast',
    titleKey: 'p2-titulo',
    descKey: 'p2-desc',
    roleKey: 'p2-rol',
    tech: ['React', 'NPM', 'Vite', 'Postman', 'MongoDB'],
    inDevelopment: false,
    responsive: {
      mobile: '/assets/prototipo-astrocast-movil.png',
      tablet: '/assets/prototipo-astrocast-tablet.png',
      desktop: '/assets/prototipo-astrocast-escritorio.png',
      alt: 'Vista previa del proyecto AstroCast',
    },
    links: [
      { type: 'demo', url: 'https://astrocast.onrender.com/', icon: '/assets/icono-internet.svg', labelKey: 'p-enlace-demo' },
      { type: 'code', url: 'https://github.com/SoyMaoza/AstroCast', icon: '/assets/logo-github.svg', labelKey: 'p-enlace-codigo' },
    ],
  },
  {
    id: 'maria-de-letras',
    titleKey: 'pm-titulo',
    descKey: 'pm-desc',
    roleKey: 'pm-rol',
    tech: ['PHP', 'MySQL', 'AJAX'],
    inDevelopment: false,
    image: { src: '/assets/prototipo-maria-de-letras-inicio.png', alt: 'Vista previa del proyecto María de Letras' },
    links: [
      { type: 'code', url: 'https://github.com/carlosmedina03/appweb_libreria/', icon: '/assets/logo-github.svg', labelKey: 'p-enlace-codigo' },
    ],
  },
  {
    id: 'mycecu',
    titleKey: 'p3-titulo',
    descKey: 'p3-desc',
    roleKey: 'p3-rol',
    tech: ['Java', 'MySQL'],
    inDevelopment: false,
    responsive: {
      mobile: '/assets/prototipo-mycecu-movil.png',
      tablet: '/assets/prototipo-mycecu-tablet.png',
      desktop: '/assets/prototipo-mycecu-escritorio.png',
      alt: 'Vista previa del proyecto MyCECU',
    },
    links: [
      { type: 'code', url: 'https://gitlab.com/01my-cecu/mycecu', icon: '/assets/logo-gitlab.svg', labelKey: 'p-enlace-codigo' },
    ],
  },
];
