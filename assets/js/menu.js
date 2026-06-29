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
        updateHeader();
    }

    function toggleMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        dropdown.classList.toggle('active');
        updateHeader();
    }

    if (!isMobileOrTouch) {
        toggle.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
            updateHeader();
        });

        megaMenu.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
            updateHeader();
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

    document.querySelectorAll('.header-nav > a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function updateHeader() {
    const header = document.querySelector('.header-container');
    const topBar = document.querySelector('.header-contact');
    const dropdown = document.querySelector('.nav-dropdown');

    if (!header) return;

    const isMegaMenuOpen = dropdown && dropdown.classList.contains('active');

    if (window.scrollY > 80 || isMegaMenuOpen) {
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

function setupHeaderScroll() {
    updateHeader();

    window.removeEventListener('scroll', updateHeader);
    window.addEventListener('scroll', updateHeader);
}

function setupMegaMenuTabs() {
    const servicesData = {
        internacional: {
            page: "internacional",
            title: "Mudança Internacional",
            description: "Transporte internacional porta a porta com suporte documental, planejamento logístico e acompanhamento em todas as etapas.",
            image: "assets/imagens/servicos/mudancaInter.png",
            alt: "Mudança Internacional"
        },

        nacional: {
            page: "nacional",
            title: "Mudança Nacional",
            description: "Mudanças nacionais com segurança, planejamento e cuidado em todo o transporte.",
            image: "assets/imagens/servicos/mudancaResid.png",
            alt: "Mudança Nacional"
        },

        comercial: {
            page: "comercial",
            title: "Mudança Comercial",
            description: "Mudanças comerciais e corporativas com organização, agilidade e mínima interrupção.",
            image: "assets/imagens/servicos/mudancaComercial.png",
            alt: "Mudança Comercial"
        },

        paraBrasil: {
            page: "paraBrasil",
            title: "Mudança para o Brasil",
            description: "Suporte completo para mudanças com destino ao Brasil, documentação e transporte internacional.",
            image: "assets/imagens/servicos/mudancaParaBrasil.png",
            alt: "Mudança para o Brasil"
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
            const data = servicesData[service];

            if (!data) return;

            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            image.src = `${ROOT}/${data.image}`;
            image.alt = data.alt;

            title.textContent = data.title;
            description.textContent = data.description;

            link.setAttribute("data-page", data.page);
            link.href = `${ROOT}/${getCurrentLang()}/${pages[data.page]}`;
        });
    });
}

function updateHeader() {

    const header = document.querySelector('.header-container');
    const topBar = document.querySelector('.header-contact');
    const dropdown = document.querySelector('.nav-dropdown');

    if (!header) return;

    const isMegaMenuOpen =
        dropdown && dropdown.classList.contains('active');

    if (window.scrollY > 80 || isMegaMenuOpen) {

        header.classList.remove('transparent');
        header.classList.add('scrolled');

        if (topBar) {
            topBar.classList.add('hidden');
        }

    } else {

        header.classList.add('transparent');
        header.classList.remove('scrolled');

        if (topBar) {
            topBar.classList.remove('hidden');
        }

    }
}

function setupHeaderScroll() {
    updateHeader();

    window.removeEventListener('scroll', updateHeader);
    window.addEventListener('scroll', updateHeader);
}