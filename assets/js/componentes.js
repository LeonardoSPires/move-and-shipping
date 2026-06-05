// Carregamento centralizado de Header e Footer

const pagesMap = {
    home: { path: 'index.html', name: 'home' },
    services: { path: 'paginas/servicos/servicos.html', name: 'services' },
    about: { path: 'paginas/sobre/sobre.html', name: 'about' },
    cotacao: { path: 'paginas/cotacao/cotacao.html', name: 'cotacao' },
    blog: { path: 'paginas/blog/blog.html', name: 'blog' },
    contato: { path: 'paginas/contato/contato.html', name: 'contato' }
};

function getCurrentPage() {
    const filename = window.location.pathname.split('/').pop() || 'index.html';

    if (filename === 'index.html' || filename === '') return 'home';
    if (filename === 'servicos.html') return 'services';
    if (filename === 'sobre.html') return 'about';
    if (filename === 'cotacao.html') return 'cotacao';
    if (filename === 'blog.html') return 'blog';
    if (filename === 'contato.html') return 'contato';

    return 'home';
}

function getBasePath() {
    const path = window.location.pathname;

    if (path.includes('/paginas/')) {
        return '../../';
    }

    return '';
}

async function loadComponent(containerId, componentPath) {
    try {
        const basePath = getBasePath();
        const fullPath = basePath + componentPath;

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
        }

        if (containerId === 'footer-container') {
            adjustFooterLinks();
        }

        adjustImagePaths(container);

    } catch (error) {
        console.error(`Erro ao carregar ${componentPath}:`, error);
    }
}

function adjustHeaderLinks() {
    const currentPage = getCurrentPage();
    const basePath = getBasePath();

    document.querySelectorAll('.header-nav [data-page]').forEach(link => {
        const page = link.getAttribute('data-page');
        const pageInfo = pagesMap[page];

        if (!pageInfo) return;

        link.setAttribute('href', basePath + pageInfo.path);
        link.classList.toggle('active', page === currentPage);
    });
}

function adjustFooterLinks() {
    const basePath = getBasePath();

    document.querySelectorAll('.footer-links-container [data-page]').forEach(link => {
        const page = link.getAttribute('data-page');
        const pageInfo = pagesMap[page];

        if (!pageInfo) return;

        link.setAttribute('href', basePath + pageInfo.path);
    });
}

function adjustImagePaths(scope = document) {
    const basePath = getBasePath();

    scope.querySelectorAll('[data-src]').forEach(img => {
        const src = img.getAttribute('data-src');
        img.setAttribute('src', basePath + src);
    });

    scope.querySelectorAll('img[src^="assets/"]').forEach(img => {
        const src = img.getAttribute('src');
        img.setAttribute('src', basePath + src);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', 'componentes/header.html');
    loadComponent('footer-container', 'componentes/footer.html');
});
