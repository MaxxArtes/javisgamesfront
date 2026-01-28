document.addEventListener('DOMContentLoaded', function() {
    carregarNavbar();
});

async function carregarNavbar() {
    const token = localStorage.getItem('access_token');
    
    // 1. Define um layout inicial básico (Placeholder)
    const navbarHTML = `
    <header class="navbar">
        <div class="logo">
            <a href="IndexHome.html">
                <img src="assets/img/JAVIS - LOGO COM REGISTRO (BRANCO) (2).webp" width="320" height="100" alt="Logo Javis Game Academy">
            </a>
        </div>
        <ul class="nav-menu">
            <li class="nav-item"><a href="CursosIndex.html" class="nav-link" data-page="CursosIndex.html"><i class="fas fa-book"></i> Meus Cursos</a></li>
            <li class="nav-item"><a href="FinanceiroIndex.html" class="nav-link" data-page="FinanceiroIndex.html"><i class="fas fa-chalkboard-teacher"></i> Financeiro</a></li>
            <li class="nav-item"><a href="CertificadosIndex.html" class="nav-link" data-page="CertificadosIndex.html"><i class="fas fa-graduation-cap"></i> Certificados</a></li>
            <li class="nav-item"><a href="SuporteIndex.html" class="nav-link" data-page="SuporteIndex.html"><i class="fas fa-headset"></i> Suporte</a></li>
        </ul>
        <button class="mobile-menu-btn" type="button" aria-label="Abrir menu">
            <i class="fas fa-bars"></i>
        </button>
        <div class="user-menu flex items-center gap-4">
            <div class="user-profile relative flex items-center gap-2 cursor-pointer">
                <img id="nav-avatar-img" src="https://ui-avatars.com/api/?name=Aluno&background=00FFFF&color=000" alt="Avatar" class="w-8 h-8 rounded-full border border-[#00FFFF]">
                <span id="nav-user-name" class="user-name text-sm font-semibold text-gray-200 hidden md:block">Carregando...</span>
                <i class="fas fa-chevron-down text-xs text-[#00FFFF] hidden md:block"></i>
                <div class="user-dropdown">
                    <div class="p-4 border-b border-gray-700 flex items-center gap-3">
                        <div class="overflow-hidden">
                            <h4 id="nav-dropdown-name" class="font-bold text-sm text-[#00FFFF]">Aluno</h4>
                        </div>
                    </div>
                    <div class="py-1">
                        <a href="#" id="btn-sair-global" class="dropdown-item flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300">
                            <i class="fas fa-sign-out-alt w-5"></i> Sair
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>`;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 2. Busca o nome real do Backend
    if (token) {
        try {
            const resp = await fetch('https://javisgames.onrender.com/aluno/meus-cursos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (resp.ok) {
                const data = await resp.json();
                // O nome vem da chave 'nome' que adicionamos em rotas_aluno.py
                const nomeReal = data.nome || "Aluno"; 

                // Atualiza os elementos na tela
                document.getElementById('nav-user-name').textContent = nomeReal;
                document.getElementById('nav-dropdown-name').textContent = nomeReal;
                
                // Atualiza o Avatar com as iniciais do nome real
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeReal)}&background=00FFFF&color=000`;
                document.getElementById('nav-avatar-img').src = avatarUrl;
            }
        } catch (err) {
            console.error("Erro ao buscar nome do aluno:", err);
            document.getElementById('nav-user-name').textContent = "Aluno";
        }
    }

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
