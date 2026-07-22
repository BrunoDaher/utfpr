import { QueueService } from '../../services/QueueService.js';

export class PatientList {
    constructor(private containerId: string) { }

    public render(queueService: QueueService): void {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const queue = queueService.getQueue();

        let queueHtml = '';

        if (queue.length === 0) {
            queueHtml = `
                <div class="empty-queue">
                    <div class="empty-icon">📭</div>
                    <h4 style="font-family: var(--font-heading); color: var(--text-primary); font-size: 1.1rem; font-weight: 600;">Sem pacientes na fila</h4>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Realize a triagem de um novo paciente para iniciar a fila de atendimento.</p>
                </div>
            `;
        } else {
            queueHtml = queue.map((p, index) => {
                const priorityClass = `priority-${p.priority.toLowerCase().replace('_', '-')}`;
                const badgeClass = `badge-${p.priority.toLowerCase().replace('_', '-')}`;
                const waitTime = queueService.getEstimatedWaitTime(p.priority);
                const symptomsList = p.symptoms.join(', ');

                return `
                    <div class="queue-item ${priorityClass}">
                        <div class="patient-info">
                            <div class="patient-meta-row">
                                <span class="patient-name">${index + 1}º &bull; ${p.name}</span>
                                <span class="badge ${badgeClass}">${p.priority.replace('_', ' ')}</span>
                            </div>
                            <div class="patient-details" style="margin-top: 0.25rem;">
                                <span>Idade: <strong>${p.age} anos</strong></span> &bull; 
                                <span>CPF: <strong>${p.cpf}</strong></span> &bull; 
                                <span>Tel: <strong>${p.phone}</strong></span>
                            </div>
                            <div class="patient-symptoms">
                                <strong>Sintomas:</strong> ${symptomsList}
                            </div>
                        </div>
                        <div class="patient-time">
                            <span class="wait-time-label">Tempo Limite</span>
                            <span class="wait-time-value">${waitTime}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        container.innerHTML = `
            <div>
                <div class="queue-header">
                    <h3 class="queue-title">Fila de Atendimento</h3>
                    <div class="queue-actions">
                        <span class="queue-count">${queue.length} Paciente(s)</span>
                        <button id="call-next-btn" class="btn btn-danger" style="width: auto; padding: 0.5rem 1rem;" ${queue.length === 0 ? 'disabled' : ''}>
                            🔔 Chamar Próximo
                        </button>
                    </div>
                </div>
                <div class="queue-list">
                    ${queueHtml}
                </div>
            </div>
        `;
    }

    public bindCallNext(onCallNext: () => void): void {
        const btn = document.getElementById('call-next-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            onCallNext();
        });
    }
}
