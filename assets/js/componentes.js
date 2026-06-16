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
    }
};

function getCurrentPage() {
    const filename = window.location.pathname.split('/').pop() || 'index.html';

    if (filename === 'index.html' || filename === '') return 'home';
    if (filename === 'sobre.html') return 'about';
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
            setupMegaMenuTabs();
            setupMobileMenu();
            setupHeaderScroll();
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

    const links = document.querySelectorAll('[data-page]');

    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const pageInfo = pagesMap[page];

        if (!pageInfo) return;

        const href = basePath + pageInfo.path;

        if (link.tagName.toLowerCase() === 'a') {
            link.setAttribute('href', href);
        }

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

function setupMegaMenu() {
    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = document.querySelector('.dropdown-toggle');
    const megaMenu = document.querySelector('.mega-menu');

    if (!dropdown || !toggle || !megaMenu) return;

    const isTouchDevice =
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches;

    const isMobileOrTouch = window.innerWidth <= 768 || isTouchDevice;

    function closeMenu() {
        dropdown.classList.remove('active');
    }

    function toggleMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        dropdown.classList.toggle('active');
    }

    if (!isMobileOrTouch) {
        toggle.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
        });

        megaMenu.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
        });

        megaMenu.addEventListener('mouseleave', closeMenu);

        document.querySelectorAll('.header-nav > a').forEach(link => {
            link.addEventListener('mouseenter', closeMenu);
        });
    }

    if (isMobileOrTouch) {
        toggle.addEventListener('click', toggleMenu);

        document.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target)) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('.mega-menu a, .header-nav > a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function setupMegaMenuTabs() {
    const serviceData = {
        internacional: {
            title: 'Mudança Internacional',
            description: 'Transporte internacional porta a porta com suporte documental, planejamento logístico e acompanhamento em todas as etapas.',
            image: 'assets/imagens/servicos/mudancaInter.png',
            page: 'internacional'
        },

        nacional: {
            title: 'Mudança Nacional',
            description: 'Mudanças residenciais para qualquer região do Brasil com embalagem, transporte seguro e equipe especializada.',
            image: 'assets/imagens/servicos/mudancaResidP.png',
            page: 'nacional'
        },

        comercial: {
            title: 'Mudança Comercial',
            description: 'Planejamento e execução para empresas, escritórios e operações comerciais com organização e agilidade.',
            image: 'assets/imagens/servicos/mudancaComercialPp.png',
            page: 'comercial'
        },

        paraBrasil: {
            title: 'Mudança para o Brasil',
            description: 'Suporte completo para retorno ao Brasil, transporte internacional, documentação e acompanhamento logístico.',
            image: 'assets/imagens/servicos/mudancaParaBrasilP.png',
            page: 'paraBrasil'
        }
    };

    const tabs = document.querySelectorAll('.mega-tab');
    const image = document.getElementById('mega-menu-image');
    const title = document.getElementById('mega-menu-title');
    const description = document.getElementById('mega-menu-description');
    const link = document.getElementById('mega-menu-link');

    if (!tabs.length || !image || !title || !description || !link) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const service = tab.getAttribute('data-service');
            const data = serviceData[service];

            if (!data) return;

            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            const basePath = getBasePath();

            image.src = basePath + data.image;
            image.alt = data.title;
            title.textContent = data.title;
            description.textContent = data.description;

            link.setAttribute('data-page', data.page);

            const pageInfo = pagesMap[data.page];

            if (pageInfo) {
                link.href = basePath + pageInfo.path;
            }
        });
    });
}

function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.header-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.header-nav a').forEach(link => {
        link.addEventListener('click', function () {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

function setupHeaderScroll() {
    const header = document.querySelector('.header-container');
    const topBar = document.querySelector('.header-contact');

    if (!header) return;

    function updateHeader() {
        if (window.scrollY > 80) {
            header.classList.remove('transparent');
            header.classList.add('scrolled');

            if (topBar) {
                topBar.classList.add('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.add('transparent');

            if (topBar) {
                topBar.classList.remove('hidden');
            }
        }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader);
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', 'componentes/header.html');
    loadComponent('footer-container', 'componentes/footer.html');
});
