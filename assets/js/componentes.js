// Carregamento centralizado de Header e Footer

const pagesMap = {
    home: {
        path: 'index.html',
        name: 'home'
    },

    services: {
        path: 'paginas/servicos/servicos.html',
        name: 'services'
    },

    about: {
        path: 'paginas/sobre/sobre.html',
        name: 'about'
    },

    cotacao: {
        path: 'paginas/cotacao/cotacao.html',
        name: 'cotacao'
    },

    blog: {
        path: 'paginas/blog/blog.html',
        name: 'blog'
    },

    contato: {
        path: 'paginas/contato/contato.html',
        name: 'contato'
    },

    internacional: { 
        path: 'paginas/servicos/internacional.html', 
        name: 'internacional' 
    },

    nacional: { 
        path: 'paginas/servicos/nacional.html', 
        name: 'nacional' 
    },

    comercial: { 
        path: 'paginas/servicos/comercial.html', 
        name: 'comercial' 
    },

    paraBrasil: { 
        path: 'paginas/servicos/paraBrasil.html', 
        name: 'paraBrasil' 
    },

};

function getCurrentPage() {
    const filename =
        window.location.pathname.split('/').pop() ||
        'index.html';

    if (filename === 'index.html') return 'home';

    if (filename === 'sobre.html') return 'about';

    if (filename === 'cotacao.html') return 'cotacao';

    if (filename === 'blog.html') return 'blog';

    if (filename === 'contato.html') return 'contato';

    if (filename === 'internacional.html') return 'internacional';

    if (filename === 'nacional.html') return 'nacional';

    if (filename === 'comercial.html') return 'comercial';

    if (filename === 'paraBrasil.html') return 'paraBrasil';

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
        setupMegaMenu();
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

    // Busca qualquer elemento com data-page
    const links = document.querySelectorAll('[data-page]');

    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const pageInfo = pagesMap[page];

        if (!pageInfo) return;

        const href = basePath
            ? basePath + pageInfo.path
            : pageInfo.path;

        // Se for um <a>
        if (link.tagName.toLowerCase() === 'a') {
            link.setAttribute('href', href);
        }

        // Página ativa
        if (page === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
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

function setupMegaMenu() {
    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = document.querySelector('.dropdown-toggle');

    if (!dropdown || !toggle) return;

    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        dropdown.classList.toggle('active');
    });

    document.querySelectorAll('.header-nav a').forEach(link => {
        link.addEventListener('click', function () {
            dropdown.classList.remove('active');
        });
    });
}