// ==========================================
// 1. GERENCIAMENTO DE ESTADO (State)
// ==========================================
// Aqui a gente guarda as variáveis que o app todo precisa saber.
const AppState = {
    conectado: false,
    portaCOM: null,
    eixoX: 512, // 512 é o centro de um potenciômetro de 10 bits (0-1023)
};

// ==========================================
// 2. MAPEAMENTO DE ELEMENTOS (DOM)
// ==========================================
// Pega tudo que a gente vai precisar manipular na tela
const UI = {
    // Menu e Telas
    navBtns: document.querySelectorAll('.nav-btn'),
    views: document.querySelectorAll('.view'),
    
    // Status
    badgeStatus: document.getElementById('status-conexao'),
    
    // Inputs (Sliders e Botões)
    btnSetarCentro: document.getElementById('btn-setar-centro'),
    sliderDeadzone: document.getElementById('slider-deadzone'),
    valorDeadzone: document.getElementById('valor-deadzone'),
    sliderAngulo: document.getElementById('slider-angulo'),
    valorAngulo: document.getElementById('valor-angulo'),
    
    // Monitor
    barraVolante: document.getElementById('barra-volante'),
    textoEixoX: document.getElementById('valor-eixo-x')
};

// ==========================================
// 3. LÓGICA DE NAVEGAÇÃO (As Abas)
// ==========================================
function setupNavegacao() {
    UI.navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove a classe 'active' de todos os botões e views
            UI.navBtns.forEach(b => b.classList.remove('active'));
            UI.views.forEach(v => v.classList.remove('active'));
            
            // Adiciona 'active' no botão clicado
            const targetId = e.currentTarget.getAttribute('data-target');
            e.currentTarget.classList.add('active');
            
            // Mostra a tela correspondente
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// ==========================================
// 4. ATUALIZAÇÃO DE INTERFACE (Feedback Visual)
// ==========================================
function atualizarSliders() {
    // Atualiza os textos do lado dos sliders em tempo real
    UI.sliderDeadzone.addEventListener('input', (e) => {
        UI.valorDeadzone.textContent = `${e.target.value}%`;
    });

    UI.sliderAngulo.addEventListener('input', (e) => {
        UI.valorAngulo.textContent = `${e.target.value}°`;
    });
}

// Função para travar ou destravar os botões dependendo da conexão
function setarEstadoConexao(isConectado, porta = '') {
    AppState.conectado = isConectado;
    AppState.portaCOM = porta;

    if (isConectado) {
        UI.badgeStatus.textContent = `🟢 Conectado (${porta})`;
        UI.badgeStatus.className = 'badge status-conectado';
        
        // Libera os controles
        UI.btnSetarCentro.disabled = false;
        UI.sliderDeadzone.disabled = false;
        UI.sliderAngulo.disabled = false;
    } else {
        UI.badgeStatus.textContent = '🔴 Aguardando Hardware...';
        UI.badgeStatus.className = 'badge status-desconectado';
        
        // Trava os controles
        UI.btnSetarCentro.disabled = true;
        UI.sliderDeadzone.disabled = true;
        UI.sliderAngulo.disabled = true;
    }
}

// ==========================================
// 5. INICIALIZAÇÃO (O "Main")
// ==========================================
function init() {
    setupNavegacao();
    atualizarSliders();
    
    // Estado inicial: Desconectado. O usuário não mexe em nada até o cabo entrar.
    setarEstadoConexao(false);
    
    console.log("Clutchub UI Inicializada com sucesso.");
    console.log("Aguardando ponte com o backend...");
}

// Roda o app quando a tela carregar
document.addEventListener('DOMContentLoaded', init);