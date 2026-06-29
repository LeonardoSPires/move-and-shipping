// Caminho base do projeto

const ROOT = "";

// Páginas do site
const pages = {
    home: "index.html",

    services: "paginas/servicos/servicos.html",

    about: "paginas/sobre/sobre.html",

    blog: "paginas/blog/blog.html",

    contato: "paginas/contato/contato.html",

    internacional: "paginas/servicos/internacional.html",

    nacional: "paginas/servicos/nacional.html",

    comercial: "paginas/servicos/comercial.html",

    paraBrasil: "paginas/servicos/paraBrasil.html"
};

function getCurrentLang() {
    const path = window.location.pathname;

    if (path.includes('/pt/')) return 'pt';
    if (path.includes('/en/')) return 'en';
    if (path.includes('/es/')) return 'es';
    if (path.includes('/de/')) return 'de';

    return 'pt';
}

function getCurrentPage() {
    const filename = window.location.pathname.split('/').pop() || 'index.html';

    if (filename === 'index.html' || filename === '') return 'home';

    if (
        filename === 'servicos.html' ||
        filename === 'services.html'
    ) return 'services';

    if (
        filename === 'sobre.html' ||
        filename === 'about.html' ||
        filename === 'sobre-nosotros.html' ||
        filename === 'ueber-uns.html'
    ) return 'about';

    if (filename === 'blog.html') return 'blog';

    if (
        filename === 'contato.html' ||
        filename === 'contact.html' ||
        filename === 'contacto.html' ||
        filename === 'kontakt.html'
    ) return 'contato';

    if (
        filename === 'internacional.html' ||
        filename === 'international.html'
    ) return 'internacional';

    if (
        filename === 'nacional.html' ||
        filename === 'domestic.html' ||
        filename === 'national.html'
    ) return 'nacional';

    if (
        filename === 'comercial.html' ||
        filename === 'commercial.html'
    ) return 'comercial';

    if (
        filename === 'paraBrasil.html' ||
        filename === 'to-brazil.html' ||
        filename === 'a-brasil.html' ||
        filename === 'nach-brasilien.html'
    ) return 'paraBrasil';

    return 'home';
}

async function loadComponent(containerId, componentPath) {
    try {
        const fullPath = `${ROOT}/${getCurrentLang()}/${componentPath}`;
        const response = await fetch(fullPath);

        if (!response.ok) {
            console.error(`Erro ao carregar ${fullPath}:`, response.status);
            return;
        }

        const html = await response.text();
        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = html;

        if (containerId === 'header-container') {
    adjustHeaderLinks();
    setupLanguageSwitcher();
    adjustImagePaths(container);

    if (typeof setupMegaMenu === 'function') setupMegaMenu();
    if (typeof setupMegaMenuTabs === 'function') setupMegaMenuTabs();
    if (typeof setupMobileMenu === 'function') setupMobileMenu();

    // deixe esse por último
    if (typeof setupHeaderScroll === 'function') setupHeaderScroll();

    if (typeof setupWhatsappMessages === 'function') setupWhatsappMessages();
    }

        adjustImagePaths(container);

    } catch (error) {
        console.error(`Erro ao carregar ${componentPath}:`, error);
    }
}

function adjustHeaderLinks() {

    const currentPage = getCurrentPage();

    document.querySelectorAll('[data-page]').forEach(link => {

        const page = link.dataset.page;

        if (!pages[page]) return;

        link.href = `${ROOT}/${getCurrentLang()}/${pages[page]}`;

        link.classList.toggle('active', page === currentPage);

    });

}

function adjustFooterLinks() {

    document.querySelectorAll('.footer-links-container [data-page]').forEach(link => {

        const page = link.dataset.page;

        if (!pages[page]) return;

        link.href = `${ROOT}/${getCurrentLang()}/${pages[page]}`;

    });
}

function setupLanguageSwitcher() {

    const currentPage = getCurrentPage();

    document.querySelectorAll('[data-lang]').forEach(link => {

        const lang = link.dataset.lang;

        if (!pages[currentPage]) return;

        link.href = `${ROOT}/${lang}/${pages[currentPage]}`;

        link.classList.toggle('active', lang === getCurrentLang());

    });

}

function adjustImagePaths(scope = document) {

    scope.querySelectorAll('[data-src]').forEach(img => {

        img.src = `${ROOT}/${img.dataset.src}`;

    });

    scope.querySelectorAll('img[src^="assets/"]').forEach(img => {

        img.src = `${ROOT}/${img.getAttribute('src')}`;

    });
}
document.addEventListener('DOMContentLoaded', () => {
    console.log("Idioma atual:", getCurrentLang());

    loadComponent('header-container', 'componentes/header.html');
    loadComponent('footer-container', 'componentes/footer.html');
});