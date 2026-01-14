// === CONFIGURAÇÃO DA API ===
const API_BASE_URL = 'https://javisgames.onrender.com/admin';
const CONTENT_BASE_PATH = 'designer_start'; 

// === DADOS DOS CURSOS ===
// Adicionada a propriedade 'totalAulas' para o cálculo automático de progresso
const courseData = {
    'game-pro': {
        title: 'GAME PRO', 
        icon: 'fas fa-headset', 
        description: 'Formação completa para ProPlayers e atletas digitais.',
        totalAulas: 16,
        duration: '160h', 
        level: 'Avançado', 
        modules: 4,
        modulesList: [
            { name: 'Módulo 1: Fundamentos', submodules: ['Aula 1: Introdução', 'Aula 2: Mecânicas'] },
            { name: 'Módulo 2: Estratégia', submodules: ['Aula 3: Mapas', 'Aula 4: Economia'] }
        ]
    },
    'designer-start': {
        title: 'DESIGNER START', 
        icon: 'fas fa-paint-brush', 
        description: 'Domine Canva, Photoshop, Illustrator, InDesign, Premiere, Animate, After Effects, Blender e C4D.', 
        totalAulas: 53, 
        duration: '120h',
        level: 'Iniciante ao Intermed.',
        modules: 9,
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
            }
            // ... outros módulos de designer-start seguem o mesmo padrão
        ]
    },
    'game-dev': {
        title: 'GAME DEV', 
        icon: 'fas fa-code', 
        description: 'Crie jogos do zero com Python e Pygame.',
        totalAulas: 24, // Total de aulas conforme a apostila
        duration: '60h', 
        level: 'Do Zero ao Pro', 
        modules: 5,
        modulesList: [
            { name: 'Módulo 1: O Iniciante', submodules: ['Aula 01: O Primeiro Contato', 'Aula 02: Variáveis', 'Aula 03: Controle (IF)', 'Aula 04: Limites', 'Aula 05: Fuga do Quadrado'] },
            { name: 'Módulo 2: O Criador', submodules: ['Aula 06: Sprites', 'Aula 07: Listas', 'Aula 08: Limpeza', 'Aula 09: Tiros', 'Aula 10: Colisões'] },
            { name: 'Módulo 3: O Designer', submodules: ['Aula 11: Som', 'Aula 12: Texto', 'Aula 13: Menus'] },
            { name: 'Módulo 4: O Físico', submodules: ['Aula 14: Grids', 'Aula 15: Gravidade', 'Aula 16: Pulo', 'Aula 17: Câmera'] },
            { name: 'Módulo 5: Profissional', submodules: ['Aula 18: Classes (OOP)', 'Aula 19: Inteligência Artificial', 'Aula 20: Game Juice', 'Aula 21: Save & Highscore', 'Aula 22: Git & GitHub', 'Aula 23: Publicação', 'Aula 24: A Grande Feira'] }
        ]
    },
    'streaming': {
        title: 'STREAMING', 
        icon: 'fas fa-video', 
        description: 'Torne-se um criador de conteúdo profissional.',
        totalAulas: 10,
        duration: '60h', 
        level: 'Todos', 
        modules: 5,
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
            userPermissions = []; 
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    } finally {
        if(loadingOverlay) loadingOverlay.classList.add('hidden');
    }

    courseItems.forEach(item => {
        const courseId = item.dataset.course;
        const permission = userPermissions.find(p => p.id === courseId);

        if (!permission) {
            item.classList.add('locked');
            item.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                alert("Matrícula não encontrada para este curso.");
            }, true);
        } else {
            item.addEventListener('click', function () {
                // Remove destaque de todos
                courseItems.forEach(i => {
                    i.classList.remove('border-[#00FFFF]', 'bg-[#00FFFF]/10');
                    i.classList.add('border-transparent');
                });
                // Adiciona destaque ao selecionado
                this.classList.remove('border-transparent');
                this.classList.add('border-[#00FFFF]', 'bg-[#00FFFF]/10');

                showCourseDetails(courseId, permission.data_inicio);
            });
        }
    });
});

// === RENDERIZAÇÃO E CÁLCULO DE PROGRESSO AUTOMÁTICO ===
// Chamada quando o aluno clica em um curso
async function abrirCurso(cursoId) {
    const token = localStorage.getItem('access_token');
    
    // Busca a estrutura completa do banco
    const response = await fetch(`${API_BASE}/admin/conteudo-didatico/cursos`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const cursos = await response.json();

    // Encontra o curso selecionado dentro do que veio do banco
    const cursoData = cursos.find(c => c.id == cursoId);

    if (cursoData) {
        renderizarInterfaceModulos(cursoData);
    }
}

function renderizarInterfaceModulos(curso) {
    const container = document.getElementById('modulesContainer'); // ajuste o ID conforme seu HTML
    container.innerHTML = '';

    // Agora iteramos sobre os MÓDULOS que vieram do banco
    curso.modulos.forEach(mod => {
        let moduloHtml = `
            <div class="modulo-item mb-4">
                <h3 class="text-[#00FFFF] font-bold mb-2">${mod.titulo}</h3>
                <div class="grid grid-cols-1 gap-2">
        `;

        // Iteramos sobre as AULAS dentro de cada módulo
        mod.aulas.sort((a, b) => a.ordem - b.ordem).forEach(aula => {
            moduloHtml += `
                <button onclick="openContentModal(${aula.id}, '${aula.titulo}')" 
                        class="bg-[#222] p-3 rounded border border-[#333] hover:border-[#00FFFF] text-left transition">
                    <i class="fas fa-play-circle mr-2 text-gray-500"></i>
                    ${aula.titulo}
                </button>
            `;
        });

        moduloHtml += `</div></div>`;
        container.innerHTML += moduloHtml;
    });
}
function showCourseDetails(courseId, dataMatricula) {
    const course = courseData[courseId];
    if (!course) return;

    // Lógica de tempo: 1 aula libertada a cada 7 dias
    const hoje = new Date();
    const dataInicio = new Date(dataMatricula);
    const diferencaTempo = hoje - dataInicio;
    const diasPassados = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24)); 

    // Calcula aulas libertadas (sempre pelo menos a aula 1)
    let aulasLiberadas = Math.floor(diasPassados / 7) + 1;
    if (aulasLiberadas > course.totalAulas) aulasLiberadas = course.totalAulas;

    // Calcula a percentagem real
    const percentagem = Math.round((aulasLiberadas / course.totalAulas) * 100);

    // Atualiza interface
    document.getElementById('noSelection').classList.add('hidden');
    document.getElementById('detailsContent').classList.remove('hidden');
    document.getElementById('detailsIcon').innerHTML = `<i class="${course.icon}"></i>`;
    document.getElementById('detailsTitle').textContent = course.title;
    document.getElementById('detailsDescription').textContent = course.description;
    
    const progressBar = document.getElementById('detailsProgress');
    progressBar.style.width = `${percentagem}%`;
    document.getElementById('progressText').textContent = `${percentagem}%`;
    
    document.getElementById('statDuration').textContent = course.duration;
    document.getElementById('statLevel').textContent = course.level;
    document.getElementById('statModules').textContent = course.modules;
    document.getElementById('statCompleted').textContent = `${aulasLiberadas}/${course.totalAulas}`;

    const modulesList = document.getElementById('modulesList');
    modulesList.innerHTML = '';

    let contadorAulaGlobal = 0; 

    course.modulesList.forEach((module, index) => {
        const moduleId = `module-${index}`;
        
        const submodulesHTML = module.submodules.map(submodule => {
            const isObject = typeof submodule === 'object';
            const aulaTitulo = isObject ? submodule.title : submodule;
            const aulaDesc = isObject ? submodule.desc : ''; 
            const aulaFile = isObject ? submodule.file : null;

            const diasNecessarios = contadorAulaGlobal * 7; 
            const estaBloqueada = diasPassados < diasNecessarios;
            const diasFaltantes = diasNecessarios - diasPassados;
            
            contadorAulaGlobal++;

            let clickAction = '';
            let iconClass = 'far fa-play-circle';

            if (courseId === 'game-dev') {
                const trinketUrl = "https://trinket.io/embed/pygame/b96aa43355e3?showInstructions=true&toggleCode=true&runOption=run";
                clickAction = `onclick="openReplit('${trinketUrl}', '${aulaTitulo}')"`; 
                iconClass = 'fas fa-terminal'; 
            } else if (courseId === 'designer-start' && module.folder && aulaFile) {
                const fullPath = `${CONTENT_BASE_PATH}/${module.folder}/${aulaFile}`;
                clickAction = `onclick="openContentModal('${fullPath}', '${aulaTitulo}')"`;
                iconClass = 'fas fa-desktop';
            }
            
            if (estaBloqueada) {
                return `
                    <div class="flex items-center justify-between p-3 pl-6 border-b border-[#222] bg-[#1a1a1a] opacity-50 cursor-not-allowed">
                        <div class="flex flex-col">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-lock text-gray-500"></i>
                                <span class="text-sm text-gray-500">${aulaTitulo}</span>
                            </div>
                        </div>
                        <span class="text-[10px] text-red-400 border border-red-900 bg-red-900/20 px-2 py-1 rounded">Liberta em ${diasFaltantes} dia(s)</span>
                    </div>`;
            } else {
                return `
                    <a href="javascript:void(0)" ${clickAction} class="flex items-start gap-3 p-3 pl-6 hover:bg-[#00FFFF]/10 text-gray-400 hover:text-[#00FFFF] border-b border-[#222] transition duration-200 group">
                        <i class="${iconClass} text-[#00FFFF] opacity-70 group-hover:opacity-100 mt-1"></i>
                        <div class="flex flex-col w-full text-left">
                            <span class="text-sm font-medium text-gray-300 group-hover:text-[#00FFFF]">${aulaTitulo}</span>
                            ${aulaDesc ? `<span class="text-[11px] text-gray-500 mt-0.5">${aulaDesc}</span>` : ''}
                        </div>
                    </a>`;
            }
        }).join('');

        const moduleItem = document.createElement('div');
        moduleItem.className = 'module-item border border-[#333] rounded-lg overflow-hidden bg-[#161616] mb-3';
        moduleItem.innerHTML = `
            <div class="module-header p-4 cursor-pointer flex justify-between items-center hover:bg-[#222]" onclick="toggleSubmodules('${moduleId}')">
                <span class="text-gray-300 font-semibold">${module.name}</span>
                <i class="fas fa-chevron-down text-[#00FFFF]" id="icon-${moduleId}"></i>
            </div>
            <div class="submodules-list hidden bg-[#1a1a1a] border-t border-[#333]" id="${moduleId}">
                ${submodulesHTML}
            </div>
        `;
        modulesList.appendChild(moduleItem);
    });
}

// Funções de Modal e UI permanecem as mesmas
function toggleSubmodules(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    content.classList.toggle('hidden');
    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

async function openReplit(url, aulaTitulo) {
    const modal = document.getElementById('replitModal');
    const iframeContainer = document.getElementById('iframeContainer');
    const contentElement = document.getElementById('lessonContent');
    const challengeElement = document.getElementById('lessonChallenge');

    document.getElementById('modalTitle').textContent = aulaTitulo;
    contentElement.innerHTML = `<p class="animate-pulse">Carregando...</p>`;
    modal.classList.remove('hidden');

    try {
        const response = await fetch(`${API_BASE_URL}/conteudo-aula?titulo=${encodeURIComponent(aulaTitulo)}`);
        if (response.ok) {
            const data = await response.json();
            
            // Limpa o script e o código de caracteres de escape
            const scriptLimpo = data.script.replace(/\\n/g, '<br>');
            const codigoLimpo = data.codigo_exemplo.replace(/\\n/g, '\n');

            contentElement.innerHTML = `
                <p class="mb-4 text-gray-300">${scriptLimpo}</p>
                <div class="bg-[#111] p-3 rounded border border-[#333]">
                    <pre class="text-xs text-green-400 font-mono whitespace-pre">${codigoLimpo}</pre>
                </div>`;
            challengeElement.textContent = data.desafio.replace(/\\n/g, '\n');
        }
    } catch (e) {
        contentElement.innerHTML = "Erro ao carregar aula.";
    }

    iframeContainer.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`;
}

function closeReplit() {
    document.getElementById('replitModal').classList.add('hidden');
    document.getElementById('iframeContainer').innerHTML = '';
}

// === FUNÇÃO PARA ABRIR CONTEÚDO HTML (DESIGNER) ===
function openContentModal(url, aulaTitulo) {
    const modal = document.getElementById('replitModal'); 
    const iframeContainer = document.getElementById('iframeContainer');
    const titleElement = document.getElementById('modalTitle');
    const sidebar = modal.querySelector('.w-1\\/3'); 
    const mainArea = modal.querySelector('.w-2\\/3'); 

    titleElement.textContent = aulaTitulo;
    modal.classList.remove('hidden');

    // Ajusta para tela cheia (esconde a barra lateral de código do Game Dev)
    if(sidebar && mainArea) {
        sidebar.style.display = 'none';
        mainArea.classList.replace('w-2/3', 'w-full');
    }

    // Carrega o arquivo .html que está na pasta do seu servidor
    iframeContainer.innerHTML = `
        <iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
    `;
}

async function abrirConteudoGeral(aulaId, titulo, cursoId) {
    const modal = document.getElementById('replitModal');
    const iframeContainer = document.getElementById('iframeContainer');
    const sidebar = modal.querySelector('.w-1\\/3'); // Painel lateral de código
    const mainArea = modal.querySelector('.w-2\\/3'); // Área principal
    const token = localStorage.getItem('access_token');

    document.getElementById('modalTitle').textContent = titulo;
    iframeContainer.innerHTML = '<p class="text-white p-10 animate-pulse">Carregando...</p>';
    modal.classList.remove('hidden');

    try {
        const resp = await fetch(`${API_BASE_URL}/aula/${aulaId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const aula = await resp.json();

        // === CASO 1: CURSOS DE DESIGN (Designer Start, Streaming) ===
        // Esses cursos abrem o HTML puro em TELA CHEIA
        if (cursoId === 1 || cursoId === 4) { 
            if (sidebar) sidebar.classList.add('hidden'); // Esconde o painel de código
            if (mainArea) {
                mainArea.classList.replace('w-2/3', 'w-full'); // Expande para tela cheia
            }
            
            const blob = new Blob([aula.conteudo || "<h3>Conteúdo não disponível.</h3>"], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            iframeContainer.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
        } 
        
        // === CASO 2: CURSOS DE PROGRAMAÇÃO (Game Dev, Game Pro) ===
        // Esses cursos abrem o Trinket + Painel de Código Lateral
        else {
            if (sidebar) sidebar.classList.remove('hidden'); // Mostra o painel de código
            if (mainArea) {
                mainArea.classList.replace('w-full', 'w-2/3'); // Divide a tela
            }
            
            // Processa as tags [SCRIPT] e [CODIGO] no painel lateral
            processarConteudoGameDev(aula.conteudo);

            const trinketUrl = "https://trinket.io/embed/pygame/b96aa43355e3";
            iframeContainer.innerHTML = `<iframe src="${trinketUrl}" width="100%" height="100%" frameborder="0"></iframe>`;
        }
    } catch (e) {
        iframeContainer.innerHTML = `<p class="text-red-500 p-10">Erro ao carregar: ${e.message}</p>`;
    }
}