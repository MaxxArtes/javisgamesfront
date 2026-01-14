document.addEventListener('DOMContentLoaded', function() {
    carregarNavbar();
});

function carregarNavbar() {
    // 1. Definição do HTML da Navbar
    const navbarHTML = `
    <header class="navbar">
        <div class="logo">
            <a href="IndexHome.html">
                <img src="assets/img/JAVIS - LOGO COM REGISTRO (BRANCO) (2).png" width="320" height="100" alt="Logo Javis Game Academy">
            </a>
        </div>
    
        <ul class="nav-menu">
            <li class="nav-item">
                <a href="CursosIndex.html" class="nav-link" data-page="CursosIndex.html">
                    <i class="fas fa-book"></i> Meus Cursos
                </a>
            </li>
            <li class="nav-item">
                <a href="FinanceiroIndex.html" class="nav-link" data-page="FinanceiroIndex.html">
                    <i class="fas fa-chalkboard-teacher"></i> Financeiro
                </a>
            </li>
            <li class="nav-item">
                <a href="CertificadosIndex.html" class="nav-link" data-page="CertificadosIndex.html">
                    <i class="fas fa-graduation-cap"></i> Certificados
                </a>
            </li>
            <li class="nav-item">
                <a href="SuporteIndex.html" class="nav-link" data-page="SuporteIndex.html">
                    <i class="fas fa-headset"></i> Suporte
                </a>
            </li>
        </ul>

        <div class="user-menu flex items-center gap-4">
            <div class="search-box hidden lg:flex items-center bg-[#2c2c2c] px-3 py-1 rounded-full border border-gray-700">
                <input type="text" placeholder="Buscar..." class="bg-transparent border-none outline-none text-sm text-white w-40 placeholder-gray-500">
                <button class="text-gray-400 hover:text-[#00FFFF]">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            
            <div class="user-actions flex items-center gap-4">
                <button class="notification-btn relative text-gray-400 hover:text-[#00FFFF] transition">
                    <i class="fas fa-bell text-lg"></i>
                    <span class="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </button>
                
                <div class="user-profile relative flex items-center gap-2 cursor-pointer">
                    <img src="https://ui-avatars.com/api/?name=Anderson+Soares&background=00FFFF&color=000" alt="Avatar" class="w-8 h-8 rounded-full border border-[#00FFFF]">
                    <span class="user-name text-sm font-semibold text-gray-200 hidden md:block">Anderson Soares</span>
                    <i class="fas fa-chevron-down text-xs text-[#00FFFF] hidden md:block"></i>
                    
                    <div class="user-dropdown">
                        <div class="p-4 border-b border-gray-700 flex items-center gap-3">
                            <img src="https://ui-avatars.com/api/?name=Anderson+Soares&background=00FFFF&color=000" alt="Avatar" class="w-10 h-10 rounded-full">
                            <div class="overflow-hidden">
                                <h4 class="font-bold text-sm text-[#00FFFF]">Anderson Soares</h4>
                                <p class="text-xs text-gray-400 truncate">anderson@gmail.com</p>
                            </div>
                        </div>
                        <div class="py-1">
                            <a href="#" class="dropdown-item flex items-center gap-3 px-4 py-3">
                                <i class="fas fa-user w-5"></i> Meu Perfil
                            </a>
                            <a href="#" class="dropdown-item flex items-center gap-3 px-4 py-3">
                                <i class="fas fa-cog w-5"></i> Configurações
                            </a>
                            <div class="h-px bg-gray-700 my-1"></div>
                            <a href="#" id="btn-sair-global" class="dropdown-item flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300">
                                <i class="fas fa-sign-out-alt w-5"></i> Sair
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>
    `;

    // Inserir o HTML no topo do body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 2. Lógica para destacar o link da página atual (Active State)
    const currentPage = window.location.pathname.split("/").pop(); // Pega apenas 'CursosIndex.html' da URL
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        if(link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });

    // 3. Inicializar eventos (Mobile Menu e Dropdown)
    inicializarEventosNavbar();
}

function inicializarEventosNavbar() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const userProfile = document.querySelector('.user-profile');
    const userDropdown = document.querySelector('.user-dropdown');
    const btnSair = document.getElementById('btn-sair-global');
    
    // Menu Mobile
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown de Usuário
    if(userProfile) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
    }

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', () => {
        if(userDropdown) userDropdown.classList.remove('active');
    });

    // Botão Sair (Lógica Global)
    if(btnSair){
        btnSair.addEventListener('click', (e) => {
            e.preventDefault();
            // Adicione aqui sua lógica de logout, ex: limpar token
            localStorage.removeItem('access_token'); 
            window.location.href = "IndexHome.html";
        });
    }
}