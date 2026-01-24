// === CONFIGURAÇÃO DA API ===
const API_URL = 'https://javisgames.onrender.com';

// URL do ambiente (Trinket) para cursos de programação
const TRINKET_URL = "https://trinket.io/embed/pygame/b96aa43355e3";

// Metadados (só para UI). A estrutura (módulos/aulas) vem do Supabase via backend.
const courseData = {
  'game-pro': {
    title: 'GAME PRO',
    icon: 'fas fa-headset',
    description: 'Formação completa para ProPlayers e atletas digitais.',
    duration: '160h',
    level: 'Avançado',
  },
  'designer-start': {
    title: 'DESIGNER START',
    icon: 'fas fa-paint-brush',
    description: 'Aprenda design do zero com foco em identidade gamer e criação visual.',
    duration: '120h',
    level: 'Iniciante',
  },
  'game-dev': {
    title: 'GAME DEV',
    icon: 'fas fa-code',
    description: 'Crie seus primeiros jogos com Python + Pygame do zero.',
    duration: '120h',
    level: 'Iniciante',
  },
};

let userPermissions = [];

/* =========================
   Helpers
========================= */
function getTokenOrRedirect() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = "IndexHome.html";
    return null;
  }
  return token;
}

async function apiGet(path, token) {
  const resp = await fetch(`${API_URL}${path}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`API ${resp.status}: ${txt || resp.statusText}`);
  }
  return resp.json();
}

function escapeHtml(str) {
  return (str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function calcDiasPassados(dataMatriculaIso) {
  try {
    const hoje = new Date();
    const dataInicio = new Date(dataMatriculaIso);
    const diff = hoje - dataInicio;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, dias);
  } catch {
    return 0;
  }
}

/* =========================
   Init
========================= */
document.addEventListener('DOMContentLoaded', async function () {
  const courseItems = document.querySelectorAll('.course-item');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const token = getTokenOrRedirect();
  if (!token) return;

  try {
    const data = await apiGet('/aluno/meus-cursos', token);
    userPermissions = data.cursos || [];
  } catch (error) {
    console.error("Erro de conexão:", error);
    userPermissions = [];
  } finally {
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
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
      item.addEventListener('click', async function () {
        // UI: destaque do selecionado
        courseItems.forEach(i => {
          i.classList.remove('border-[#00FFFF]', 'bg-[#00FFFF]/10');
          i.classList.add('border-transparent');
        });
        this.classList.remove('border-transparent');
        this.classList.add('border-[#00FFFF]', 'bg-[#00FFFF]/10');

        await showCourseDetails(courseId, permission.data_inicio);
      });
    }
  });
});

/* =========================
   Render do curso
========================= */
async function showCourseDetails(courseSlug, dataMatricula) {
  const token = getTokenOrRedirect();
  if (!token) return;

  const meta = courseData[courseSlug] || {
    title: courseSlug,
    icon: 'fas fa-book',
    description: '',
    duration: '--',
    level: '--'
  };

  // Atualiza área de detalhes (sem módulos ainda)
  document.getElementById('noSelection').classList.add('hidden');
  document.getElementById('detailsContent').classList.remove('hidden');
  document.getElementById('detailsIcon').innerHTML = `<i class="${meta.icon}"></i>`;
  document.getElementById('detailsTitle').textContent = meta.title;
  document.getElementById('detailsDescription').textContent = meta.description;
  document.getElementById('statDuration').textContent = meta.duration;
  document.getElementById('statLevel').textContent = meta.level;

  // Carrega estrutura do curso do backend
  const modulesList = document.getElementById('modulesList');
  modulesList.innerHTML = `<div class="p-4 text-gray-400 animate-pulse">Carregando módulos...</div>`;

  let curso;
  try {
    curso = await apiGet(`/aluno/curso/${encodeURIComponent(courseSlug)}/estrutura`, token);
  } catch (e) {
    modulesList.innerHTML = `<div class="p-4 text-red-400">Erro ao carregar curso: ${escapeHtml(e.message)}</div>`;
    return;
  }

  // Progresso automático (1 aula a cada 7 dias)
  const diasPassados = calcDiasPassados(dataMatricula);
  const totalAulas = Number(curso.aulas_total || 0) || countAulas(curso);
  let aulasLiberadas = Math.floor(diasPassados / 7) + 1;
  if (aulasLiberadas > totalAulas) aulasLiberadas = totalAulas;

  const percent = totalAulas ? Math.round((aulasLiberadas / totalAulas) * 100) : 0;
  document.getElementById('detailsProgress').style.width = `${percent}%`;
  document.getElementById('progressText').textContent = `${percent}%`;
  document.getElementById('statModules').textContent = (curso.modulos || []).length;
  document.getElementById('statCompleted').textContent = `${aulasLiberadas}/${totalAulas}`;

  // Render módulos/aulas do banco
  renderModulesFromDB(modulesList, curso, courseSlug, diasPassados, aulasLiberadas);
}

function countAulas(curso) {
  let total = 0;
  (curso.modulos || []).forEach(m => total += (m.aulas || []).length);
  return total;
}

function renderModulesFromDB(container, curso, courseSlug, diasPassados, aulasLiberadas) {
  container.innerHTML = '';

  // flatten para ordem global (modulo.ordem, aula.ordem)
  const aulasOrdenadas = [];
  (curso.modulos || [])
    .slice()
    .sort((a,b) => (a.ordem||0) - (b.ordem||0))
    .forEach(m => {
      (m.aulas || []).slice().sort((a,b) => (a.ordem||0) - (b.ordem||0)).forEach(a => {
        aulasOrdenadas.push({ moduloId: m.id, aulaId: a.id });
      });
    });

  const ordemGlobalPorAula = new Map();
  aulasOrdenadas.forEach((x, idx) => ordemGlobalPorAula.set(x.aulaId, idx + 1));

  (curso.modulos || [])
    .slice()
    .sort((a,b) => (a.ordem||0) - (b.ordem||0))
    .forEach((mod, index) => {
      const moduleId = `module-${index}`;

      const submodulesHTML = (mod.aulas || [])
        .slice()
        .sort((a,b) => (a.ordem||0) - (b.ordem||0))
        .map(aula => {
          const ordemGlobal = ordemGlobalPorAula.get(aula.id) || 9999;
          const estaBloqueada = ordemGlobal > aulasLiberadas;
          const diasNecessarios = (ordemGlobal - 1) * 7;
          const diasFaltantes = Math.max(0, diasNecessarios - diasPassados);

          if (estaBloqueada) {
            return `
              <div class="flex items-center justify-between p-3 pl-6 border-b border-[#222] bg-[#1a1a1a] opacity-50 cursor-not-allowed">
                <div class="flex items-center gap-3">
                  <i class="fas fa-lock text-gray-500"></i>
                  <div class="flex flex-col">
                    <span class="text-sm text-gray-400">${escapeHtml(aula.titulo)}</span>
                    <span class="text-[11px] text-gray-600">Libera em ${diasFaltantes} dia(s)</span>
                  </div>
                </div>
              </div>`;
          }

          return `
            <button
              onclick="abrirConteudoGeral(${aula.id}, '${escapeHtml(aula.titulo).replaceAll("'", "\'")}', '${courseSlug}')"
              class="group flex items-center justify-between w-full p-3 pl-6 border-b border-[#222] bg-[#151515] hover:bg-[#00FFFF]/10 transition text-left">
              <div class="flex items-center gap-3">
                <i class="far fa-play-circle text-[#00FFFF]"></i>
                <span class="text-sm text-gray-300 group-hover:text-[#00FFFF]">${escapeHtml(aula.titulo)}</span>
              </div>
              <span class="text-[10px] text-gray-600">Aula ${ordemGlobal}</span>
            </button>`;
        }).join('');

      const moduleItem = document.createElement('div');
      moduleItem.className = 'module-item border border-[#333] rounded-lg overflow-hidden bg-[#161616] mb-3';

      moduleItem.innerHTML = `
        <div class="module-header p-4 cursor-pointer flex justify-between items-center hover:bg-[#222]" onclick="toggleSubmodules('${moduleId}')">
          <span class="text-gray-300 font-semibold">${escapeHtml(mod.titulo || `Módulo ${index+1}`)}</span>
          <i class="fas fa-chevron-down text-[#00FFFF]" id="icon-${moduleId}"></i>
        </div>
        <div class="submodules-list hidden bg-[#1a1a1a] border-t border-[#333]" id="${moduleId}">
          ${submodulesHTML}
        </div>
      `;

      container.appendChild(moduleItem);
    });
}

/* =========================
   UI helpers
========================= */
function toggleSubmodules(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById(`icon-${id}`);
  if (!content || !icon) return;
  content.classList.toggle('hidden');
  icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

function closeReplit() {
  document.getElementById('replitModal').classList.add('hidden');
  document.getElementById('iframeContainer').innerHTML = '';
  // Restaura sidebar (caso tenha sido escondida)
  const modal = document.getElementById('replitModal');
  const sidebar = modal.querySelector('.w-1\/3');
  const mainArea = modal.querySelector('.w-2\/3') || modal.querySelector('.w-full');
  if (sidebar) sidebar.classList.remove('hidden');
  if (mainArea && mainArea.classList.contains('w-full')) {
    mainArea.classList.replace('w-full', 'w-2/3');
  }
}

/* =========================
   Conteúdo (modal)
========================= */
function parseTaggedContent(conteudo) {
  const get = (tag) => {
    const r = new RegExp(`\[${tag}\]([\s\S]*?)\[\/${tag}\]`, 'i');
    const m = (conteudo || '').match(r);
    return (m && m[1]) ? m[1].trim() : '';
  };
  return {
    script: get('SCRIPT'),
    codigo: get('CODIGO'),
    desafio: get('DESAFIO')
  };
}

function renderGameDevSidebar(conteudo) {
  const contentElement = document.getElementById('lessonContent');
  const challengeElement = document.getElementById('lessonChallenge');

  const { script, codigo, desafio } = parseTaggedContent(conteudo);

  const scriptHtml = escapeHtml(script).replaceAll('\n', '<br>').replaceAll('\r', '');
  const codigoText = (codigo || '').replaceAll('\r', '');

  contentElement.innerHTML = `
    <p class="mb-4 text-gray-300">${scriptHtml || 'Sem instruções.'}</p>
    ${codigoText ? `
      <div class="bg-[#111] p-3 rounded border border-[#333]">
        <pre class="text-xs text-green-400 font-mono whitespace-pre"></pre>
      </div>
    ` : ''}
  `;

  const pre = contentElement.querySelector('pre');
  if (pre) pre.textContent = codigoText;

  challengeElement.textContent = (desafio || '').replaceAll('\r','');
}

async function abrirConteudoGeral(aulaId, titulo, courseSlug) {
  const token = getTokenOrRedirect();
  if (!token) return;

  const modal = document.getElementById('replitModal');
  const iframeContainer = document.getElementById('iframeContainer');
  const sidebar = modal.querySelector('.w-1\/3');
  const mainArea = modal.querySelector('.w-2\/3') || modal.querySelector('.w-full');

  document.getElementById('modalTitle').textContent = titulo;
  iframeContainer.innerHTML = '<p class="text-white p-10 animate-pulse">Carregando...</p>';
  modal.classList.remove('hidden');

  try {
    const aula = await apiGet(`/aluno/aula/${aulaId}`, token);

    // GAME DEV: mostra painel lateral e abre Trinket
if (courseSlug === 'game-dev') {
  if (sidebar) sidebar.classList.remove('hidden');
  if (mainArea && mainArea.classList.contains('w-full')) {
    mainArea.classList.replace('w-full', 'w-2/3');
  }

  renderGameDevSidebar(aula.conteudo || "");
  iframeContainer.innerHTML = `<iframe src="${TRINKET_URL}" width="100%" height="100%" frameborder="0"></iframe>`;
  return;
}

// Outros cursos (Designer Start, Game Pro, etc): abre HTML em tela cheia, com sandbox (mais seguro)
if (sidebar) sidebar.classList.add('hidden');
if (mainArea && mainArea.classList.contains('w-2/3')) {
  mainArea.classList.replace('w-2/3', 'w-full');
}

const html = aula.conteudo || "<h3 style='color:#fff;padding:20px'>Conteúdo não disponível.</h3>";
iframeContainer.innerHTML = `
  <iframe
    sandbox="allow-scripts"
    referrerpolicy="no-referrer"
    style="width:100%;height:100%;border:0;"
    srcdoc="${html.replaceAll('"', '&quot;')}"></iframe>
`;} catch (e) {
    iframeContainer.innerHTML = `<p class="text-red-500 p-10">Erro ao carregar: ${escapeHtml(e.message)}</p>`;
  }
}
