import { StatisticsService } from '../../services/StatisticsService.js';

export class StatisticsPanel {
    constructor(private containerId: string) {}

    public render(stats: StatisticsService): void {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const totalPatients = stats.getPatientsNamesAndAges().length;
        const hasEmergency = stats.hasEmergency();
        const averageAge = stats.getAverageAge();
        const symptomsReport = stats.getSymptomsReport();

        // Convert symptoms comma-separated list into HTML tags
        const symptomsTags = symptomsReport
            ? symptomsReport.split(', ').map(s => `<span class="symptom-tag">${s.trim()}</span>`).join('')
            : '<span style="font-size: 0.85rem; color: var(--text-muted);">Nenhum sintoma relatado</span>';

        container.innerHTML = `
            <div class="card">
                <h3 class="card-title">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 20V10M12 20V4M6 20v-6"/>
                    </svg>
                    Estatísticas em Tempo Real
                </h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-label">Total Pacientes</span>
                        <span class="stat-value">${totalPatients}</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Média de Idade</span>
                        <span class="stat-value">${averageAge.toFixed(1)} <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-secondary)">anos</span></span>
                    </div>
                    <div class="stat-card" style="grid-column: span 2;">
                        <span class="stat-label">Presença de Emergência</span>
                        <span class="stat-value ${hasEmergency ? 'emergencia-sim' : 'emergencia-nao'}">
                            ${hasEmergency ? '⚠️ SIM' : '✅ NÃO'}
                        </span>
                    </div>
                </div>
                <div style="margin-top: 1.5rem;">
                    <span class="stat-label" style="display: block; margin-bottom: 0.5rem;">Sintomas Ativos</span>
                    <div class="symptoms-tags">
                        ${symptomsTags}
                    </div>
                </div>
            </div>
        `;
    }
}
