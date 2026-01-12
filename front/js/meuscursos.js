// === CONFIGURAÇÃO DA API ===
const API_BASE_URL = 'https://javisgames.onrender.com/admin';
const CONTENT_BASE_PATH = 'designer_start'; // Nome da pasta onde você vai subir os arquivos .html no seu servidor

// === DADOS DOS CURSOS ===
const resourceLinks = { 'default': 'javascript:void(0)' };

const courseData = {
    'game-pro': {
        title: 'GAME PRO', icon: 'fas fa-headset', description: 'Formação completa para ProPlayers e atletas digitais.',
        progress: 0, duration: '160h', level: 'Avançado', modules: 4, completed: '0/4',
        modulesList: [
            { name: 'Módulo 1: Fundamentos', submodules: ['Aula 1: Introdução', 'Aula 2: Mecânicas'] },
            { name: 'Módulo 2: Estratégia', submodules: ['Aula 3: Mapas', 'Aula 4: Economia'] }
        ]
    },
    // === DESIGNER START (Atualizado com sua estrutura de pastas) ===
    'designer-start': {
        title: 'DESIGNER START', 
        icon: 'fas fa-paint-brush', 
        description: 'Domine Canva, Photoshop, Illustrator, InDesign, Premiere, Animate, After Effects, Blender e C4D.', 
        progress: 0, 
        duration: '120h',
        level: 'Iniciante ao Intermed.',
        modules: 9,
        completed: '0/9',
        modulesList: [
            { 
                name: 'Módulo 1: Canva (10h)',
                folder: 'modulo_01_-_canva', 
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Introdução ao Canva', desc: 'Criação de conta e visão geral.' },
                    { file: 'aula-2.html', title: 'Aula 2: Tipografia', desc: 'Hierarquia e escolha de fontes.' },
                    { file: 'aula-3.html', title: 'Aula 3: Cores e Composição', desc: 'Paletas e contraste.' },
                    { file: 'aula-4.html', title: 'Aula 4: Formatos Gráficos', desc: 'Posts, banners e apresentações.' },
                    { file: 'aula-5.html', title: 'Aula 5: Projeto Final', desc: 'Identidade visual simples.' }
                ] 
            },
            { 
                name: 'Módulo 2: Photoshop (15h)', 
                folder: 'modulo_02_-_photoshop',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Interface e Ferramentas', desc: 'Ferramentas essenciais e PSD.' },
                    { file: 'aula-2.html', title: 'Aula 2: Camadas', desc: 'Organização e hierarquia.' },
                    { file: 'aula-3.html', title: 'Aula 3: Seleções e Recortes', desc: 'Remoção de fundo.' },
                    { file: 'aula-4.html', title: 'Aula 4: Ajustes de Imagem', desc: 'Cor, brilho e contraste.' },
                    { file: 'aula-5.html', title: 'Aula 5: Filtros e Efeitos', desc: 'Efeitos artísticos.' },
                    { file: 'aula-6.html', title: 'Aula 6: Projeto Final', desc: 'Cartaz de filme ou campanha.' }
                ] 
            },
            { 
                name: 'Módulo 3: Illustrator (15h)', 
                folder: 'modulo_03_-_illustrator',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Design Vetorial', desc: 'Interface e vetores básicos.' },
                    { file: 'aula-2.html', title: 'Aula 2: Formas e Preenchimentos', desc: 'Criação de ícones.' },
                    { file: 'aula-3.html', title: 'Aula 3: Ferramenta Caneta', desc: 'Curvas e formas complexas.' },
                    { file: 'aula-4.html', title: 'Aula 4: Criação de Logotipo', desc: 'Do esboço ao vetor.' },
                    { file: 'aula-5.html', title: 'Aula 5: Vetorização', desc: 'Transformando imagens em vetores.' },
                    { file: 'aula-6.html', title: 'Aula 6: Projeto Final', desc: 'Identidade Visual completa.' }
                ] 
            },
            { 
                name: 'Módulo 4: InDesign (10h)', 
                folder: 'modulo_04_-_indesign',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Interface e Diagramação', desc: 'Ferramentas de layout.' },
                    { file: 'aula-2.html', title: 'Aula 2: Margens e Grid', desc: 'Estruturação de páginas.' },
                    { file: 'aula-3.html', title: 'Aula 3: Tipografia Editorial', desc: 'Estilos de parágrafo.' },
                    { file: 'aula-4.html', title: 'Aula 4: Diagramação Visual', desc: 'Imagens e equilíbrio.' },
                    { file: 'aula-5.html', title: 'Aula 5: Projeto Final', desc: 'Mini-revista ou Portfólio.' }
                ] 
            },
            { 
                name: 'Módulo 5: Premiere Pro (15h)', 
                folder: 'modulo_05_-_premiere_pro',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Interface e Importação', desc: 'Timeline e mídia.' },
                    { file: 'aula-2.html', title: 'Aula 2: Cortes e Organização', desc: 'Sequenciamento.' },
                    { file: 'aula-3.html', title: 'Aula 3: Áudio e Trilhas', desc: 'Mixagem básica.' },
                    { file: 'aula-4.html', title: 'Aula 4: Textos e Legendas', desc: 'Títulos dinâmicos.' },
                    { file: 'aula-5.html', title: 'Aula 5: Correção de Cor', desc: 'Lumetri Color.' },
                    { file: 'aula-6.html', title: 'Aula 6: Projeto Final', desc: 'Vídeo Institucional.' }
                ] 
            },
            { 
                name: 'Módulo 6: Animate (10h)', 
                folder: 'modulo_06_-_animate',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Princípios da Animação', desc: 'Conceitos básicos.' },
                    { file: 'aula-2.html', title: 'Aula 2: Quadro a Quadro', desc: 'Animação frame-a-frame.' },
                    { file: 'aula-3.html', title: 'Aula 3: Personagens', desc: 'Criação de bonecos.' },
                    { file: 'aula-4.html', title: 'Aula 4: Interatividade', desc: 'Botões e ações.' },
                    { file: 'aula-5.html', title: 'Aula 5: Projeto Final', desc: 'Animação Curta.' }
                ] 
            },
            { 
                name: 'Módulo 7: After Effects (15h)', 
                folder: 'modulo_07_-_after_effects',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Interface e Composição', desc: 'Layers e timeline.' },
                    { file: 'aula-2.html', title: 'Aula 2: Keyframes', desc: 'Animação básica.' },
                    { file: 'aula-3.html', title: 'Aula 3: Motion Typography', desc: 'Texto animado.' },
                    { file: 'aula-4.html', title: 'Aula 4: Máscaras e Efeitos', desc: 'VFX simples.' },
                    { file: 'aula-5.html', title: 'Aula 5: Integração com Premiere', desc: 'Fluxo de trabalho.' },
                    { file: 'aula-6.html', title: 'Aula 6: Projeto Final', desc: 'Vinheta Animada.' }
                ] 
            },
            { 
                name: 'Módulo 8: Blender (15h)', 
                folder: 'modulo_08_-_blender',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Interface 3D', desc: 'Navegação no espaço.' },
                    { file: 'aula-2.html', title: 'Aula 2: Modelagem Básica', desc: 'Vértices e formas.' },
                    { file: 'aula-3.html', title: 'Aula 3: Materiais e Texturas', desc: 'Cores e superfícies.' },
                    { file: 'aula-4.html', title: 'Aula 4: Iluminação e Câmera', desc: 'Renderização.' },
                    { file: 'aula-5.html', title: 'Aula 5: Animação 3D', desc: 'Keyframes 3D.' },
                    { file: 'aula-6.html', title: 'Aula 6: Projeto Final', desc: 'Cena 3D Animada.' }
                ] 
            },
            { 
                name: 'Módulo 9: Cinema 4D (15h)', 
                folder: 'modulo_09_-_cinema_4d',
                submodules: [
                    { file: 'aula-1.html', title: 'Aula 1: Interface e Navegação', desc: 'Workflow C4D.' },
                    { file: 'aula-2.html', title: 'Aula 2: Modelagem', desc: 'Objetos e splines.' },
                    { file: 'aula-3.html', title: 'Aula 3: Materiais e Texturas', desc: 'Shaders.' },
                    { file: 'aula-4.html', title: 'Aula 4: Animação e Câmeras', desc: 'Cinematografia.' },
                    { file: 'aula-5.html', title: 'Aula 5: Integração After Effects', desc: 'Compositing.' },
                    { file: 'aula-6.html', title: 'Aula 6: Projeto Final', desc: 'Animação Publicitária.' }
                ] 
            }
        ]
    },
    'game-dev': {
        title: 'GAME DEV', icon: 'fas fa-code', description: 'Crie jogos do zero com Python e Pygame.',
        progress: 0, duration: '60h', level: 'Do Zero ao Pro', modules: 5, completed: '0/24', 
        modulesList: [
            { name: 'Módulo 1: O Iniciante', submodules: ['Aula 01: O Primeiro Contato', 'Aula 02: Variáveis', 'Aula 03: Controle (IF)', 'Aula 04: Limites', 'Aula 05: Fuga do Quadrado'] },
            { name: 'Módulo 2: O Criador', submodules: ['Aula 06: Sprites', 'Aula 07: Listas', 'Aula 08: Limpeza', 'Aula 09: Tiros', 'Aula 10: Colisões'] },
            { name: 'Módulo 3: O Designer', submodules: ['Aula 11: Som', 'Aula 12: Texto', 'Aula 13: Menus'] },
            { name: 'Módulo 4: O Físico', submodules: ['Aula 14: Grids', 'Aula 15: Gravidade', 'Aula 16: Pulo', 'Aula 17: Câmera'] },
            { name: 'Módulo 5: Profissional', submodules: ['Aula 18: Classes (OOP)', 'Aula 19: Inteligência Artificial', 'Aula 20: Game Juice', 'Aula 21: Save & Highscore', 'Aula 22: Git & GitHub', 'Aula 23: Publicação', 'Aula 24: A Grande Feira'] }
        ]
    },
    'streaming': {
        title: 'STREAMING', icon: 'fas fa-video', description: 'Torne-se um criador de conteúdo profissional.',
        progress: 0, duration: '60h', level: 'Todos', modules: 5, completed: '0/5',
        modulesList: [ { name: 'Módulo 1: OBS Studio', submodules: ['Aula 1: Configuração', 'Aula 2: Cenas'] } ]
    }
};

let userPermissions = [];

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', async function () {
    const courseItems = document.querySelectorAll('.course-item');
    const token = localStorage.getItem('access_token');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (!token) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        window.location.href = "IndexHome.html"; 
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/meus-cursos-permitidos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            userPermissions = data.cursos;
        } else {
            console.error("Erro ao buscar permissões:", response.status);
            userPermissions = [{ id: 'game-dev', data_inicio: '2023-01-01' }]; 
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        userPermissions = [{ id: 'game-dev', data_inicio: '2023-01-01' }];
    } finally {
        loadingOverlay.classList.add('hidden');
    }

    courseItems.forEach(item => {
        const courseId = item.dataset.course;
        const permission = userPermissions.find(p => p.id === courseId);

        if (!permission) {
            item.classList.add('locked');
            item.setAttribute('title', 'Matrícula não encontrada');
            item.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                alert("Você não possui matrícula ativa neste curso.");
            }, true);
        } else {
            item.addEventListener('click', function () {
                courseItems.forEach(i => {
                    if(!i.classList.contains('locked')){
                        i.classList.remove('border-[#00FFFF]', 'bg-[#00FFFF]/10');
                        i.classList.add('border-transparent');
                        const icon = i.querySelector('div:first-child');
                        const title = i.querySelector('h3');
                        if(icon) { icon.classList.remove('bg-[#00FFFF]', 'text-black'); icon.classList.add('bg-[#2c2c2c]', 'text-[#00FFFF]'); }
                        if(title) { title.classList.remove('text-[#00FFFF]'); title.classList.add('text-gray-200'); }
                    }
                });
                
                this.classList.remove('border-transparent');
                this.classList.add('border-[#00FFFF]', 'bg-[#00FFFF]/10');
                const activeIcon = this.querySelector('div:first-child');
                const activeTitle = this.querySelector('h3');
                if(activeIcon) { activeIcon.classList.remove('bg-[#2c2c2c]', 'text-[#00FFFF]'); activeIcon.classList.add('bg-[#00FFFF]', 'text-black'); }
                if(activeTitle) { activeTitle.classList.remove('text-gray-200'); activeTitle.classList.add('text-[#00FFFF]'); }

                showCourseDetails(courseId, permission.data_inicio);
            });
        }
    });

    // Mobile Menu & Logout
    const btnSair = document.getElementById('btn-sair');
    if(btnSair){
        btnSair.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('access_token');
            window.location.href = "IndexHome.html";
        });
    }
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const userProfile = document.querySelector('.user-profile');
    const userDropdown = document.querySelector('.user-dropdown');
    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
    if(userProfile) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
    }
    document.addEventListener('click', () => { if(userDropdown) userDropdown.classList.remove('active'); });
});

// === FUNÇÃO PARA ABRIR CONTEÚDO HTML (DESIGNER) ===
function openContentModal(url, aulaTitulo) {
    const modal = document.getElementById('replitModal'); // Reutilizamos o mesmo modal
    const iframeContainer = document.getElementById('iframeContainer');
    const titleElement = document.getElementById('modalTitle');
    const contentElement = document.getElementById('lessonContent');
    
    // Configuração Visual do Modal para Leitura
    titleElement.textContent = aulaTitulo;
    modal.classList.remove('hidden');

    // Esconde a barra lateral (onde ficava o código do Game Dev) para dar tela cheia ao HTML
    // Se o seu modal for dividido por classes grid/flex, ajustamos aqui:
    const sidebar = modal.querySelector('.w-1\\/3'); // Seleciona a sidebar
    const mainArea = modal.querySelector('.w-2\\/3'); // Seleciona a área principal
    
    if(sidebar && mainArea) {
        sidebar.style.display = 'none'; // Esconde sidebar
        mainArea.classList.remove('w-2/3');
        mainArea.classList.add('w-full'); // Expande iframe
    }

    // Carrega o arquivo HTML no iframe
    iframeContainer.innerHTML = `
        <iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        <div class="absolute inset-0 flex items-center justify-center bg-[#161616] z-[-1]">
            <i class="fas fa-circle-notch fa-spin text-4xl text-[#00FFFF]"></i>
        </div>
    `;
}

// === FUNÇÃO PARA ABRIR REPLIT/TRINKET (GAME DEV) ===
async function openReplit(url, aulaTitulo) {
    const modal = document.getElementById('replitModal');
    const iframeContainer = document.getElementById('iframeContainer');
    const titleElement = document.getElementById('modalTitle');
    const contentElement = document.getElementById('lessonContent');
    const challengeElement = document.getElementById('lessonChallenge');

    // Restaura layout original (Sidebar visível)
    const sidebar = modal.querySelector('.w-1\\/3'); // Seleciona a sidebar
    if(sidebar) {
        sidebar.style.display = 'flex'; // Mostra sidebar
        const mainArea = sidebar.nextElementSibling;
        if(mainArea){
            mainArea.classList.remove('w-full');
            mainArea.classList.add('w-2/3');
        }
    }

    titleElement.textContent = aulaTitulo;
    contentElement.innerHTML = `<p class="text-gray-500 animate-pulse">Carregando conteúdo do banco de dados...</p>`;
    challengeElement.textContent = "...";
    modal.classList.remove('hidden');

    try {
        const encodedTitle = encodeURIComponent(aulaTitulo);
        const response = await fetch(`${API_BASE_URL}/conteudo-aula?titulo=${encodedTitle}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            let codigoLimpo = data.codigo_exemplo || "";
            codigoLimpo = codigoLimpo.replace(/\\n/g, '\n'); 

            contentElement.innerHTML = `
                <p class="mb-4 text-gray-300">${data.script}</p>
                <div class="bg-[#111] border border-[#333] rounded-lg overflow-hidden">
                    <div class="bg-[#222] px-3 py-1 border-b border-[#333] flex justify-between items-center">
                        <span class="text-[10px] text-gray-500 uppercase font-bold">Exemplo de Código</span>
                        <button onclick="navigator.clipboard.writeText(this.dataset.code)" data-code="${codigoLimpo.replace(/"/g, '&quot;')}" class="text-[10px] text-[#00FFFF] hover:text-white transition">
                            <i class="fas fa-copy"></i> Copiar
                        </button>
                    </div>
                    <div class="p-3 overflow-x-auto">
                        <pre class="text-xs text-green-400 font-mono whitespace-pre" style="margin:0;">${codigoLimpo}</pre>
                    </div>
                </div>
            `;
            challengeElement.textContent = data.desafio;
        } else {
            contentElement.innerHTML = `<p class="text-red-400">Conteúdo não encontrado.</p>`;
        }
    } catch (error) {
        console.error("Erro:", error);
        contentElement.innerHTML = `<p class="text-red-400">Erro de conexão.</p>`;
    }

    iframeContainer.innerHTML = `
        <iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        <div class="absolute inset-0 flex items-center justify-center bg-[#161616] z-[-1]">
            <i class="fas fa-circle-notch fa-spin text-4xl text-[#00FFFF]"></i>
        </div>
    `;
}

function closeReplit() {
    const modal = document.getElementById('replitModal');
    const iframeContainer = document.getElementById('iframeContainer');
    modal.classList.add('hidden');
    iframeContainer.innerHTML = ''; 
    
    // Restaura estilo padrão da sidebar para não quebrar na próxima abertura
    const sidebar = modal.querySelector('.w-1\\/3');
    if(sidebar) sidebar.style.display = '';
}

// === RENDERIZAÇÃO ===
function showCourseDetails(courseId, dataMatricula) {
    const course = courseData[courseId];
    if (!course) return;

    const hoje = new Date();
    const dataInicio = new Date(dataMatricula);
    const diferencaTempo = hoje - dataInicio;
    const diasPassados = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24)); 

    document.getElementById('noSelection').classList.add('hidden');
    document.getElementById('detailsContent').classList.remove('hidden');
    document.getElementById('detailsIcon').innerHTML = `<i class="${course.icon}"></i>`;
    document.getElementById('detailsTitle').textContent = course.title;
    document.getElementById('detailsDescription').textContent = course.description;
    
    const progressBar = document.getElementById('detailsProgress');
    progressBar.style.width = '0%';
    setTimeout(() => progressBar.style.width = `${course.progress}%`, 100);
    document.getElementById('progressText').textContent = `${course.progress}%`;
    document.getElementById('statDuration').textContent = course.duration;
    document.getElementById('statLevel').textContent = course.level;
    document.getElementById('statModules').textContent = course.modules;
    document.getElementById('statCompleted').textContent = course.completed;

    const modulesList = document.getElementById('modulesList');
    modulesList.innerHTML = '';

    let contadorAulaGlobal = 0; 

    course.modulesList.forEach((module, index) => {
        const moduleId = `module-${index}`;
        
        const submodulesHTML = module.submodules.map(submodule => {
            const isObject = typeof submodule === 'object';
            const aulaTitulo = isObject ? submodule.title : submodule;
            const aulaDesc = isObject ? submodule.desc : ''; 
            const aulaFile = isObject ? submodule.file : null; // Pega o nome do arquivo

            const diasNecessarios = contadorAulaGlobal * 7; 
            const estaBloqueada = diasPassados < diasNecessarios;
            const diasFaltantes = diasNecessarios - diasPassados;
            
            contadorAulaGlobal++;

            let clickAction = '';
            let iconClass = 'far fa-play-circle';
            let extraBadge = '';

            if (courseId === 'game-dev') {
                // Lógica Antiga (Trinket)
                const trinketUrl = "https://trinket.io/embed/pygame/b96aa43355e3?showInstructions=true&toggleCode=true&runOption=run";
                clickAction = `onclick="openReplit('${trinketUrl}', '${aulaTitulo}')"`; 
                iconClass = 'fas fa-terminal'; 
                extraBadge = '<span class="ml-auto text-[10px] bg-[#2c2c2c] px-2 py-1 rounded text-[#00FFFF] border border-[#00FFFF]/30 uppercase hover:bg-[#00FFFF] hover:text-black transition">Praticar</span>';
            
            } else if (courseId === 'designer-start') {
                // Lógica Nova (HTML local no Iframe)
                iconClass = 'fas fa-desktop';
                // Constrói o caminho: aulas/nome_da_pasta/nome_do_arquivo.html
                if (module.folder && aulaFile) {
                    const fullPath = `${CONTENT_BASE_PATH}/${module.folder}/${aulaFile}`;
                    clickAction = `onclick="openContentModal('${fullPath}', '${aulaTitulo}')"`;
                }
            }
            
            if (estaBloqueada) {
                return `
                    <div class="flex items-center justify-between p-3 pl-6 border-b border-[#222] last:border-0 bg-[#1a1a1a] opacity-50 cursor-not-allowed">
                        <div class="flex flex-col">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-lock text-gray-500"></i>
                                <span class="text-sm text-gray-500">${aulaTitulo}</span>
                            </div>
                            ${aulaDesc ? `<span class="text-[11px] text-gray-600 ml-7 mt-1 text-left">${aulaDesc}</span>` : ''}
                        </div>
                        <span class="text-[10px] text-red-400 border border-red-900 bg-red-900/20 px-2 py-1 rounded whitespace-nowrap">Libera em ${diasFaltantes} dia(s)</span>
                    </div>`;
            } else {
                return `
                    <a href="javascript:void(0)" ${clickAction} class="flex items-start gap-3 p-3 pl-6 hover:bg-[#00FFFF]/10 text-gray-400 hover:text-[#00FFFF] border-b border-[#222] last:border-0 transition duration-200 group">
                        <i class="${iconClass} text-[#00FFFF] opacity-70 group-hover:opacity-100 mt-1"></i>
                        <div class="flex flex-col w-full text-left">
                            <div class="flex justify-between items-center w-full">
                                <span class="text-sm font-medium group-hover:text-[#00FFFF] text-gray-300">${aulaTitulo}</span>
                                ${extraBadge}
                            </div>
                            ${aulaDesc ? `<span class="text-[11px] text-gray-500 group-hover:text-gray-300 transition mt-0.5">${aulaDesc}</span>` : ''}
                        </div>
                    </a>`;
            }
        }).join('');

        const moduleItem = document.createElement('div');
        moduleItem.className = 'module-item border border-[#333] rounded-lg overflow-hidden bg-[#161616] mb-3';
        moduleItem.innerHTML = `
            <div class="module-header p-4 cursor-pointer flex justify-between items-center hover:bg-[#222] transition select-none" onclick="toggleSubmodules('${moduleId}')">
                <div class="flex items-center gap-3 font-semibold text-gray-300">
                    <span class="bg-[#00FFFF]/10 text-[#00FFFF] text-[10px] px-2 py-1 rounded border border-[#00FFFF]/20 uppercase tracking-wider">Módulo ${index + 1}</span>
                    <span class="module-title">${module.name}</span>
                </div>
                <i class="fas fa-chevron-down text-[#00FFFF] transition-transform duration-300" id="icon-${moduleId}"></i>
            </div>
            <div class="submodules-list hidden bg-[#1a1a1a] border-t border-[#333]" id="${moduleId}">
                ${submodulesHTML}
            </div>
        `;
        modulesList.appendChild(moduleItem);
    });
}

function toggleSubmodules(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    content.classList.toggle('hidden');
    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}