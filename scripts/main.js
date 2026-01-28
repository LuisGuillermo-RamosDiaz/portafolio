document.addEventListener('DOMContentLoaded', () => {

    async function inicializarPortfolio() {
        try {
            const response = await fetch('data/traduccion.json');
            if (!response.ok) {
                throw new Error(`Error al cargar las traducciones: ${response.statusText}`);
            }
            const traducciones = await response.json();

            ejecutarLogicaPrincipal(traducciones);

        } catch (error) {
            console.error("No se pudo inicializar el portfolio:", error);
        }
    }

    function ejecutarLogicaPrincipal(traducciones) {
        const canvas = document.getElementById('fondo-animado');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;
            let particles = [];
            const particleCount = Math.floor((width * height) / 15000);
            const particleColor = 'rgba(66, 165, 245, 0.5)';

            class Particle {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = (Math.random() - 0.5) * 0.5;
                    this.radius = Math.random() * 1.5 + 0.5;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particleColor;
                    ctx.fill();
                }
            }

            function initParticles() {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            function animateParticles() {
                ctx.clearRect(0, 0, width, height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(66, 165, 245, ${1 - dist / 120})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
                requestAnimationFrame(animateParticles);
            }

            let resizeTimeout;
            function debounceResize() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                    const newParticleCount = Math.floor((width * height) / 15000);
                    if (Math.abs(newParticleCount - particles.length) > 10) {
                        initParticles();
                    }
                }, 250);
            }

            window.addEventListener('resize', debounceResize);

            initParticles();
            animateParticles();
        }

        const botonesIdioma = document.querySelectorAll('.boton-idioma');
        const gruposIdiomas = document.querySelectorAll('.grupo-idiomas');
        const elementosTraducibles = document.querySelectorAll('[data-lang-key]');
        const elementosPlaceholder = document.querySelectorAll('[data-lang-key-placeholder]');
        let idiomaActual = 'es';

        function cambiarIdioma(lang) {
            if (!traducciones[lang]) return;
            idiomaActual = lang;
            document.documentElement.lang = lang;

            const anioActual = new Date().getFullYear();

            elementosTraducibles.forEach(el => {
                const key = el.dataset.langKey;
                if (traducciones[lang][key]) {
                    el.innerHTML = traducciones[lang][key].replace('{year}', anioActual);
                }
            });

            elementosPlaceholder.forEach(el => {
                const key = el.dataset.langKeyPlaceholder;
                if (traducciones[lang][key]) {
                    el.placeholder = traducciones[lang][key];
                }
            });

            gruposIdiomas.forEach(grupo => {
                grupo.classList.remove('pos-en', 'pos-fr');
                if (lang !== 'es') {
                    grupo.classList.add(`pos-${lang}`);
                }
                grupo.querySelectorAll('.boton-idioma').forEach(btn => {
                    btn.classList.toggle('activo', btn.dataset.lang === lang);
                });
            });
        }

        botonesIdioma.forEach(boton => {
            boton.addEventListener('click', () => cambiarIdioma(boton.dataset.lang));
        });

        cambiarIdioma(idiomaActual);

        const botonMenuMovil = document.querySelector('.boton-menu-movil');
        const menuMovil = document.getElementById('menu-movil');
        const superposicionMenu = document.querySelector('.superposicion-menu');
        const botonCerrarMenu = document.querySelector('.boton-cerrar-menu');
        const enlacesMenuMovil = document.querySelectorAll('.enlace-navegacion-movil');

        function toggleMenu() {
            const estaAbierto = botonMenuMovil.classList.toggle('abierto');
            menuMovil.classList.toggle('abierto', estaAbierto);
            superposicionMenu.classList.toggle('abierto', estaAbierto);
            document.body.style.overflow = estaAbierto ? 'hidden' : '';
        }

        botonMenuMovil.addEventListener('click', toggleMenu);
        superposicionMenu.addEventListener('click', toggleMenu);
        botonCerrarMenu.addEventListener('click', toggleMenu);
        enlacesMenuMovil.forEach(enlace => enlace.addEventListener('click', toggleMenu));

        const secciones = document.querySelectorAll('section[id]');
        const navLinksDesktop = document.querySelectorAll('#navegacionPrincipal a');

        const observerActivo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinksDesktop.forEach(link => {
                        link.classList.toggle('activo', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px', threshold: 0.1 });

        secciones.forEach(seccion => observerActivo.observe(seccion));

        const contenedorCategorias = document.getElementById('contenedorCategorias');
        if (contenedorCategorias) {
            contenedorCategorias.addEventListener('click', (e) => {
                const categoriaClickeada = e.target.closest('.categoria-habilidad');
                if (!categoriaClickeada) return;

                contenedorCategorias.querySelectorAll('.categoria-habilidad').forEach(p => p.classList.remove('activo'));
                categoriaClickeada.classList.add('activo');

                const targetPanelId = categoriaClickeada.dataset.target;
                document.querySelectorAll('.panel-habilidad').forEach(p => {
                    p.classList.toggle('activo', p.id === targetPanelId);
                });
            });
        }

        const observerAnimacion = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animar-entrada').forEach(el => observerAnimacion.observe(el));

        const botonCopiarCorreo = document.getElementById('botonCopiarCorreo');
        if (botonCopiarCorreo) {
            const notificacionCopiado = document.getElementById('notificacionCopiado');
            botonCopiarCorreo.addEventListener('click', () => {
                navigator.clipboard.writeText('contact@guillermoramos.dev').then(() => {
                    notificacionCopiado.classList.add('visible');
                    setTimeout(() => notificacionCopiado.classList.remove('visible'), 2000);
                }).catch(err => console.error('Error al copiar correo:', err));
            });
        }
        
        const modal = document.getElementById('modalCertificado');
        if (modal) {
            const botonesPrevisualizar = document.querySelectorAll('.boton-accion-cert[data-src]');
            const visor = document.getElementById('visorCertificado');
            const botonCerrarModal = document.getElementById('modalCerrar');
            const superposicionModal = modal.querySelector('.modal-superposicion');

            function abrirModal(src) {
                visor.setAttribute('src', src);
                modal.classList.add('abierto');
                document.body.style.overflow = 'hidden';
            }

            function cerrarModal() {
                modal.classList.remove('abierto');
                visor.setAttribute('src', '');
                document.body.style.overflow = '';
            }

            botonesPrevisualizar.forEach(boton => {
                boton.addEventListener('click', (event) => {
                    abrirModal(boton.dataset.src);
                });
            });

            botonCerrarModal.addEventListener('click', cerrarModal);
            superposicionModal.addEventListener('click', cerrarModal);

            window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && modal.classList.contains('abierto')) {
                    cerrarModal();
                }
            });
        }
    }

    inicializarPortfolio();
});