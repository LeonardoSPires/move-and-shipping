// Inicializar funcionalidades da Home e páginas internas

function initializeScripts() {
    setupContactForm();
    setupQuoteForm();
    setupHeaderActiveLinks();
    setupHeroWaveText();
    setupScrollAnimations();
    animateHeroIntro();
}

/* FORMULÁRIO DO HERO */

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Orçamento enviado com sucesso!');
        contactForm.reset();
    });
}

/* FORMULÁRIO DE COTAÇÃO */

function setupQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    const quoteSuccess = document.getElementById('quoteSuccess');

    if (!quoteForm || !quoteSuccess) return;

    quoteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        quoteSuccess.classList.add('show');
        quoteForm.reset();

        setTimeout(function () {
            quoteSuccess.classList.remove('show');
        }, 6000);
    });
}

/* LINK ATIVO NO HEADER */

function setupHeaderActiveLinks() {
    const headerNav = document.querySelector('.header-nav');

    if (!headerNav) return;

    headerNav.addEventListener('click', function (e) {
        const link = e.target.closest('.nav-link');

        if (!link) return;

        const href = link.getAttribute('href');
        const isAnchor = href && href.startsWith('#');

        if (!isAnchor) return;

        e.preventDefault();

        document.querySelectorAll('.header-nav .nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });

        link.classList.add('active');
    });
}

/* EFEITO DE ONDULAÇÃO NO H1 DO HERO */

function setupHeroWaveText() {
    const heroH1 = document.querySelector('.hero-container h1');

    if (!heroH1) return;

    // Evita aplicar o efeito duas vezes
    if (heroH1.dataset.waveApplied === 'true') return;

    const originalHTML = heroH1.innerHTML;
    let letterIndex = 0;

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
    heroH1.dataset.waveApplied = 'true';
}

/* ANIMAÇÃO INICIAL DO HERO */

function animateHeroIntro() {
    const heroContainer = document.querySelector('.hero-container');
    const heroForm = document.querySelector('.hero-form-container');

    if (!heroContainer || !heroForm) return;

    requestAnimationFrame(() => {
        heroContainer.classList.add('in-view');
        heroForm.classList.add('in-view');
    });
}

/* ANIMAÇÕES AO ROLAR A PÁGINA */

function setupScrollAnimations() {
    const upSelectors = [
        '.hero-container',
        '.advantages-card',
        '.blog-card',
        '.testimonials-card',
        '.cotacao-form',
        '.about-container',
        '.footer-container-principal',

        // Home
        '.infoCardBottom',
        '.destaques-grid',
        '.recentes-grid',

        // Páginas internas
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
        '.review-card'
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

async function loadHome() {
    const container = document.getElementById('home-container');

    if (!container) return;

    try {
        const response = await fetch('paginas/home/home.html');

        if (!response.ok) {
            console.error('Erro ao carregar home.html:', response.status);
            return;
        }

        const html = await response.text();

        container.innerHTML = html;

        if (typeof adjustImagePaths === 'function') {
            adjustImagePaths(container);
        }

        initializeScripts();

    } catch (error) {
        console.error('Erro ao carregar home.html:', error);
    }
}

/* INICIALIZAÇÃO */

document.addEventListener('DOMContentLoaded', () => {
    const homeContainer = document.getElementById('home-container');

    if (homeContainer) {
        loadHome();
    } else {
        initializeScripts();
    }
});