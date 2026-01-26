document.addEventListener('DOMContentLoaded', function() {
    carregarNavbar();
});

async function carregarNavbar() {
    // 1. Busca os dados do aluno no localStorage ou via API
    const token = localStorage.getItem('access_token');
    let nomeExibicao = "Aluno"; // Valor padrão
    let emailExibicao = "";

    // Tenta carregar dados básicos se existirem para evitar o "pulo" visual
    const savedName = localStorage.getItem('user_name');
    if (savedName) nomeExibicao = savedName;

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

        <div class="user-menu flex items-center gap-4">
            <div class="user-actions flex items-center gap-4">
                <div class="user-profile relative flex items-center gap-2 cursor-pointer">
                    <img id="nav-avatar-small" src="https://ui-avatars.com/api/?name=${encodeURIComponent(nomeExibicao)}&background=00FFFF&color=000" alt="Avatar" class="w-8 h-8 rounded-full border border-[#00FFFF]">
                    <span id="nav-user-name" class="user-name text-sm font-semibold text-gray-200 hidden md:block">${nomeExibicao}</span>
                    <i class="fas fa-chevron-down text-xs text-[#00FFFF] hidden md:block"></i>
                    
                    <div class="user-dropdown">
                        <div class="p-4 border-b border-gray-700 flex items-center gap-3">
                            <img id="nav-avatar-large" src="https://ui-avatars.com/api/?name=${encodeURIComponent(nomeExibicao)}&background=00FFFF&color=000" alt="Avatar" class="w-10 h-10 rounded-full">
                            <div class="overflow-hidden">
                                <h4 id="nav-dropdown-name" class="font-bold text-sm text-[#00FFFF]">${nomeExibicao}</h4>
                                <p id="nav-dropdown-email" class="text-xs text-gray-400 truncate">Carregando...</p>
                            </div>
                        </div>
                        <div class="py-1">
                            <a href="#" class="dropdown-item flex items-center gap-3 px-4 py-3"><i class="fas fa-user w-5"></i> Meu Perfil</a>
                            <a href="#" id="btn-sair-global" class="dropdown-item flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300">
                                <i class="fas fa-sign-out-alt w-5"></i> Sair
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>`;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Destacar link ativo
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('data-page') === currentPage) link.classList.add('active');
    });

    inicializarEventosNavbar();

    // 2. Atualização Assíncrona dos dados reais
    if (token) {
        try {
            const resp = await fetch('https://javisgames.onrender.com/aluno/meus-cursos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resp.ok) {
                // O backend retorna o contexto do aluno que contém o nome real
                // Como não temos um endpoint direto de 'meu-perfil', usamos o campo 'nome' retornado aqui
                // Note: Você precisará ajustar seu backend para retornar o email se desejar exibi-lo
                const data = await resp.json();
                const nomeReal = data.nome_completo || "Aluno";

                // Atualiza o texto na Navbar
                document.getElementById('nav-user-name').textContent = nomeReal;
                document.getElementById('nav-dropdown-name').textContent = nomeReal;

                // Atualiza os Avatares com o nome correto para gerar as iniciais certas
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeReal)}&background=00FFFF&color=000`;
                document.getElementById('nav-avatar-small').src = avatarUrl;
                document.getElementById('nav-avatar-large').src = avatarUrl;
                
                // Simulação: pegamos o nome do primeiro curso ou injetamos via ctx se o backend permitir
                // Idealmente, use o campo 'nome' que o seu backend rotas_aluno.py já calcula
                // Para isso funcionar, seu endpoint /meus-cursos deve retornar o ctx completo ou apenas o nome
                
                // Exemplo de atualização na UI se o backend retornar o campo "nome":
                // const nomeReal = data.nome || "Aluno";
                // document.getElementById('nav-user-name').textContent = nomeReal;
                // document.getElementById('nav-dropdown-name').textContent = nomeReal;
            }
        } catch (err) {
            console.error("Erro ao carregar dados da navbar:", err);
        }
    }
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