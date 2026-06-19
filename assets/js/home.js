
// Carregar seções HTML dinamicamente (exceto header e footer que são carregados pelo componentsLoader)
async function loadSections() {
    const sections = [
        { id: 'hero-container', file: 'paginas/home/hero.html' },
        { id: 'advantages-container', file: 'paginas/home/diferenciais.html' },
        { id: 'services-container', file: 'paginas/home/servicos.html' },
        { id: 'about-container', file: 'paginas/home/sobre.html' },
        { id: 'cotacao-container', file: 'paginas/home/cotacao.html' },
        { id: 'testimonials-container', file: 'paginas/home/depoimentos.html' },
        { id: 'blog-container', file: 'paginas/home/blog.html' }
    ];

    for (const section of sections) {
        try {
            const response = await fetch(section.file);
            if (response.ok) {
                const html = await response.text();
                const container = document.getElementById(section.id);
                if (container) {
                    container.innerHTML = html;
                    if (typeof adjustImagePaths === 'function') {
                        adjustImagePaths(container);
                    }
                }
            }
        } catch (error) {
            console.error(`Erro ao carregar ${section.file}:`, error);
        }
    }

    // Executar scripts após carregar as seções
    initializeScripts();
}

// Inicializar funcionalidades após carregar as seções
function initializeScripts() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Orçamento enviado com sucesso!');
        });
    }

    const quoteForm = document.getElementById('quoteForm');
    const quoteSuccess = document.getElementById('quoteSuccess');

    if (quoteForm && quoteSuccess) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();

            quoteSuccess.classList.add('show');
            quoteForm.reset();

            setTimeout(function () {
                quoteSuccess.classList.remove('show');
            }, 6000);
        });
    }

    // resto do código do initializeScripts continua aqui...


    // Funcionalidade de link ativo na navegação usando event delegation
    const headerNav = document.querySelector('.header-nav');
    if (headerNav) {
        headerNav.addEventListener('click', function (e) {
            const link = e.target.closest('.nav-link');
            if (!link) return;

            const href = link.getAttribute('href');
            const isAnchor = href && href.startsWith('#');
            if (isAnchor) {
                e.preventDefault();

                // Remove a classe active de todos os links
                document.querySelectorAll('.header-nav .nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Adiciona a classe active ao link clicado
                link.classList.add('active');
            }
        });
    }

    // Efeito de ondulação de cores no h1 do hero
    const heroH1 = document.querySelector('.hero-container h1');
    if (heroH1) {
        // Preservar o HTML original com os <br>
        const originalHTML = heroH1.innerHTML;
        let letterIndex = 0;

        // Processar o HTML mantendo os <br>
        const parts = originalHTML.split('<br>');

        const newHTML = parts.map(part => {
            return part.split('').map(char => {
                if (char === ' ') return char;

                const span = `<span class="wave-letter" style="animation-delay:${letterIndex * 0.1}s">${char}</span>`;
                letterIndex++;
                return span;
            }).join('');
        }).join('<br>');

        heroH1.innerHTML = newHTML;
    }

    setupScrollAnimations();
    animateHeroIntro();
}

function animateHeroIntro() {
    const heroContainer = document.querySelector('.hero-container');
    const heroForm = document.querySelector('.hero-form-container');

    if (!heroContainer || !heroForm) {
        return;
    }

    requestAnimationFrame(() => {
        heroContainer.classList.add('in-view');
        heroForm.classList.add('in-view');
    });
}

function setupScrollAnimations() {
    const upSelectors = [
        '.hero-container',
        '.advantages-card',
        '.blog-card',
        '.testimonials-card',
        '.cotacao-form',
        '.about-container',
        '.footer-container-principal',

        // páginas internas
        '.service-intro-text',
        '.features-grid article',
        '.features-grid-link article',
        '.storage-text',
        '.reviews-grid article',
        '.blog-service-grid article',
        '.faq-list details',
        '.address-card',
        '.contact-info',
        '.about-story',
        '.value-card',
        '.infoCardBottom',
        '.review-card',
        '.destaques-grid',
        '.recentes-grid',
    ];

    const rightSelectors = [
        '.hero-form-container',
        '.service-form-box',
        '.infoCardTop',
        '.contact-form-box'
    ];

    const upElements = document.querySelectorAll(upSelectors.join(', '));
    const rightElements = document.querySelectorAll(rightSelectors.join(', '));

    if (!upElements.length && !rightElements.length) return;

    upElements.forEach(element => {
        element.classList.add('animate-up');
    });

    rightElements.forEach(element => {
        element.classList.add('animate-right', 'delay');
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    });

    [...upElements, ...rightElements].forEach(element => {
        observer.observe(element);

        if (isElementVisible(element)) {
            element.classList.add('in-view');
        }
    });
}

function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function isHomePage() {
    const page = window.location.pathname.split('/').pop();
    return page === '' || page === 'index.html';
}

// Carregar as seções quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    if (isHomePage()) {
        loadSections();
    } else {
        initializeScripts();
    }
});

