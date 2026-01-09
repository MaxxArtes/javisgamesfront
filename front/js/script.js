// Configurações Globais
// As credenciais do Supabase agora estão em config.js
// Verifica se o Supabase foi carregado antes de inicializar
const supabaseClient = typeof supabase !== 'undefined' ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// --- LÓGICA DE INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Setup Modal Handlers
    setupModalHandlers();
    
    // 2. Botão Voltar ao Topo
    setupBackToTop();
    
    // 3. Menu Hamburger
    setupHamburgerMenu();
    
    // 4. Fechar modal ao clicar fora
    setupModalCloseOnOutsideClick();
});

// --- SETUP DE MODAIS ---
function setupModalHandlers() {
    const modalLinks = document.querySelectorAll('[data-modal-url]');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const modalUrl = this.getAttribute('data-modal-url');
            openModal(modalUrl);
        });
    });
}

function openModal(url) {
    const modalContainer = document.getElementById('studentPortalModal');
    
    console.log("Abrindo modal:", url);

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Erro HTTP: ' + response.status);
            return response.text();
        })
        .then(html => {
            modalContainer.innerHTML = html;
            modalContainer.style.display = 'block';
            
            setupCloseEvents(modalContainer);
            
            // LÓGICA DE SELEÇÃO: FUNCIONÁRIO OU ALUNO
            if(url.indexOf('funcionario') !== -1) {
                setupLoginFuncionario();
            } else {
                setupLoginAluno();
            }
            
            setupRecuperarEvent();
        })
        .catch(error => console.error('Erro ao carregar modal:', error));
}

function setupCloseEvents(modalContainer) {
    const closeBtn = modalContainer.querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => modalContainer.style.display = 'none');
}

// --- SETUP BOTÃO VOLTAR AO TOPO ---
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopButton.classList.add('visible');
            else backToTopButton.classList.remove('visible');
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// --- SETUP MENU HAMBURGER ---
function setupHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.replace(isOpen ? 'fa-bars' : 'fa-times', isOpen ? 'fa-times' : 'fa-bars');
        });
    }
}

// --- SETUP FECHAR MODAL AO CLICAR FORA ---
function setupModalCloseOnOutsideClick() {
    const modalContainer = document.getElementById('studentPortalModal');
    if (modalContainer) {
        window.addEventListener('click', (event) => {
            if (event.target == modalContainer) modalContainer.style.display = 'none';
        });
    }
}

// --- FUNÇÕES DE LOGIN ---

// A. LOGIN ALUNO
function setupLoginAluno() {
    const formLogin = document.getElementById('form-login-aluno');
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const btnSubmit = document.getElementById('btn-login');
            const originalText = btnSubmit.innerText;
            btnSubmit.innerText = 'Conectando...'; btnSubmit.disabled = true;

            try {
                const email = document.getElementById('email-aluno').value;
                const password = document.getElementById('senha-aluno').value;
                
                const response = await fetch('https://javisgames.onrender.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) throw new Error('Email ou senha inválidos');
                const data = await response.json();

                localStorage.removeItem('access_token');
                localStorage.setItem('access_token', data.token);
                window.location.href = 'CursosIndex.html';

            } catch (error) {
                alert(error.message);
                btnSubmit.innerText = originalText; btnSubmit.disabled = false;
            }
        });
    }
}

// B. LOGIN FUNCIONÁRIO
function setupLoginFuncionario() {
    const formLogin = document.getElementById('form-login-func');
    
    if (!formLogin) return; // Evita erro se o modal não carregou direito

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const btnSubmit = document.getElementById('btn-login-func');
        const originalText = btnSubmit.innerText;
        btnSubmit.innerText = 'Verificando...'; btnSubmit.disabled = true;

        try {
            const email = document.getElementById('email-func').value;
            const password = document.getElementById('senha-func').value;

            const response = await fetch('https://javisgames.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error('Credenciais inválidas.');

            const data = await response.json();
            
            localStorage.removeItem('access_token');
            localStorage.setItem('access_token', data.token);
            
            window.location.href = 'portal-funcionario.html'; 

        } catch (error) {
            alert("Erro: " + error.message);
            btnSubmit.innerText = originalText; btnSubmit.disabled = false;
        }
    });
}

// C. RECUPERAR SENHA
function setupRecuperarEvent() {
    const formRecuperar = document.getElementById('form-recuperar');
    if (formRecuperar) {
        formRecuperar.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Link de recuperação enviado (simulação).');
        });
    }
}
