// R03 — Classificação e gerenciamento da fila de atendimento
// RA03 — Aplicação de recurso avançado (ts-pattern)

import { match } from 'ts-pattern';
import type { Patient, Priority } from '../models/types.js';

export class QueueService {
    //array de pacientes
    private queue: Patient[] = [];

    // Tabela de pesos para ordenação
    private readonly priorityWeights: Record<Priority, number> = {
        'EMERGENCIA': 5,
        'MUITO_URGENTE': 4,
        'URGENTE': 3,
        'POUCO_URGENTE': 2,
        'NAO_URGENTE': 1
    };

    /**
     * Adiciona um paciente à fila de atendimento e o reordena conforme a prioridade.
     * R03: Estruturas de controle para fluxo e ordenação
     */
    public addToQueue(patient: Patient): void {
        this.queue.push(patient);
        this.sortQueue();
    }

    /**
     * Ordena a fila usando a tabela de pesos de prioridade e data de chegada (desempate).
     */
    private sortQueue(): void {
        this.queue.sort((a, b) => {
            const weightA = this.priorityWeights[a.priority];
            const weightB = this.priorityWeights[b.priority];

            // R03: If/else para controle
            if (weightA !== weightB) {
                return weightB - weightA; // Maior peso primeiro
            } else {
                return a.arrivalDate.getTime() - b.arrivalDate.getTime(); // Mais antigo primeiro
            }
        });
    }

    /**
     * Remove e retorna o próximo paciente a ser atendido.
     */
    public getNextPatient(): Patient | undefined {
        return this.queue.shift(); // Remove o primeiro da fila
    }

    /**
     * Retorna a fila atual
     */
    public getQueue(): ReadonlyArray<Patient> {
        return this.queue;
    }

    /**
     * RA03: Pattern Matching utilizando ts-pattern
     * Retorna o tempo estimado máximo de espera baseado na prioridade.
     */
    public getEstimatedWaitTime(priority: Priority): string {
        return match(priority)
            .with('EMERGENCIA', () => 'Atendimento imediato (0 min)')
            .with('MUITO_URGENTE', () => 'Até 10 minutos')
            .with('URGENTE', () => 'Até 60 minutos')
            .with('POUCO_URGENTE', () => 'Até 120 minutos')
            .with('NAO_URGENTE', () => 'Até 240 minutos')
            .exhaustive();
    }
}
