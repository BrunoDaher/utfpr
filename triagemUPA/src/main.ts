import './index.css';
import { PatientService } from './services/PatientService.js';
import { QueueService } from './services/QueueService.js';
import { StatisticsService } from './services/StatisticsService.js';
import { PatientForm } from './views/components/PatientForm.js';
import { PatientList } from './views/components/PatientList.js';
import { StatisticsPanel } from './views/components/StatisticsPanel.js';
import { ApiSimulation } from './data/ApiSimulation.js';
import type { Patient } from './models/types.js';

// ── Serviços ─────────────────────────────────────────────────────────────────
const patientService = new PatientService();
const queueService = new QueueService();

// ── Componentes ───────────────────────────────────────────────────────────────
const patientForm = new PatientForm('form-container', patientService);
const patientList = new PatientList('queue-container');
const statsPanel = new StatisticsPanel('stats-container');

// ── Render inicial ─────────────────────────────────────────────────────────────
function refreshUI(): void {

    console.log('refreshing ui')

    const allPatients = patientService.getAllPatients() as Patient[];
    const statsService = new StatisticsService([...allPatients]);


    //garantir q a lista em que aparece são os mesmo do get all patients

    patientList.render(queueService);

    statsPanel.render(statsService);

    // Reanexa o botão "Chamar Próximo" após cada re-render
    patientList.bindCallNext(() => {
        const next = queueService.getNextPatient();
        if (next) {
            showCalledModal(next);
        }
        refreshUI();
    });
}

async function loadInitialData() {
    const batch = await ApiSimulation.fetchInitialPatients();
    patientService.loadBatch(batch);

    batch.forEach(element => {
        queueService.addToQueue(element as Patient)
    });

}

// ── Modal de chamada ───────────────────────────────────────────────────────────
function showCalledModal(patient: Patient): void {
    const overlay = document.getElementById('modal-overlay') as HTMLElement;
    const nameEl = document.getElementById('modal-patient-name') as HTMLElement;
    const priorityEl = document.getElementById('modal-patient-priority') as HTMLElement;
    const detailsEl = document.getElementById('modal-patient-details') as HTMLElement;

    nameEl.textContent = patient.name;

    const priorityMap: Record<string, string> = {
        EMERGENCIA: 'EMERGÊNCIA',
        MUITO_URGENTE: 'MUITO URGENTE',
        URGENTE: 'URGENTE',
        POUCO_URGENTE: 'POUCO URGENTE',
        NAO_URGENTE: 'NÃO URGENTE',
    };
    priorityEl.textContent = priorityMap[patient.priority] ?? patient.priority;

    detailsEl.innerHTML = `
        <span>🪪 CPF: <strong>${patient.cpf}</strong></span>
        <span>📞 Tel: <strong>${patient.phone}</strong></span>
        <span>🎂 Idade: <strong>${patient.age} anos</strong></span>
        <span>🩺 Sintomas: <strong>${patient.symptoms.join(', ')}</strong></span>
    `;

    overlay.style.display = 'flex';
}

// ── Template HTML da página ─────────────────────────────────────────────────────────────
const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
    <!-- Modal -->
    <div class="modal-overlay" id="modal-overlay">
        <div class="modal-card">
            <p class="modal-header">🔔 Chamando Paciente</p>
            <h2 class="modal-patient-name" id="modal-patient-name"></h2>
            <div class="modal-patient-priority">
                <span class="badge" id="modal-patient-priority" style="font-size: 0.9rem; padding: 0.4rem 1rem;"></span>
            </div>
            <div class="modal-patient-details" id="modal-patient-details"></div>
            <button class="btn btn-primary" id="modal-close-btn" style="max-width: 200px; margin: 0 auto;">
                ✔ Confirmar Atendimento
            </button>
        </div>
    </div>

    <!-- Header -->
    <header class="app-header">
        <div>
            <h1 class="app-title">UPA — Sistema de Triagem</h1>
            <p class="app-subtitle">Unidade de Pronto Atendimento do Paraná &mdash; Gestão de Fila e Classificação de Risco</p>
        </div>
    </header>

    <!-- Grid principal -->
    <div class="app-grid">
        <!-- Sidebar esquerda: formulário + estatísticas -->
        <aside class="sidebar">
            <div id="form-container"></div>
            <div id="stats-container"></div>
        </aside>

        <!-- Conteúdo principal: fila -->
        <main class="main-content">
            <div id="queue-container"></div>
        </main>
    </div>
`;

// ── Inicializa o formulário ────────────────────────────────────────────────────
patientForm.render();
patientForm.bindSubmit((data) => {

    try {
        const newPatient = patientService.registerPatient(data) as Patient;
        queueService.addToQueue(newPatient);
        refreshUI();
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert('Erro desconhecido');
        }
    }
});

// ── Primeira renderização ──────────────────────────────────────────────────────
loadInitialData().then((resultado) => {

    refreshUI();
});

// ── Fechar modal ───────────────────────────────────────────────────────────────
document.getElementById('modal-close-btn')!.addEventListener('click', () => {
    (document.getElementById('modal-overlay') as HTMLElement).style.display = 'none';
});