// R04 — Consulta, busca e geração de estatísticas

import type { Patient, Priority } from '../models/types.js';

export class StatisticsService {
    constructor(private patientsHistory: Patient[]) {}

    /**
     * Retorna pacientes por prioridade específica
     * Array.prototype.filter()
     */
    public getPatientsByPriority(priority: Priority): Patient[] {
        return this.patientsHistory.filter(p => p.priority === priority);
    }

    /**
     * Extrai apenas os nomes e idades dos pacientes
     * Array.prototype.map()
     */
    public getPatientsNamesAndAges(): { name: string, age: number }[] {
        return this.patientsHistory.map(p => ({ name: p.name, age: p.age }));
    }

    /**
     * Busca um paciente pelo CPF
     * Array.prototype.find()
     */
    public findPatientByCpf(cpf: string): Patient | undefined {
        return this.patientsHistory.find(p => p.cpf === cpf);
    }

    /**
     * Verifica se existe algum paciente na fila de EMERGENCIA
     * Array.prototype.some()
     */
    public hasEmergency(): boolean {
        return this.patientsHistory.some(p => p.priority === 'EMERGENCIA');
    }

    /**
     * Calcula a média de idade dos pacientes
     * Array.prototype.reduce()
     */
    public getAverageAge(): number {
        if (this.patientsHistory.length === 0) return 0;
        
        const totalAge = this.patientsHistory.reduce((acc, current) => acc + current.age, 0);
        return totalAge / this.patientsHistory.length;
    }

    /**
     * Gera um relatório formatado de todos os sintomas relatados
     * Array.prototype.map, reduce, join
     */
    public getSymptomsReport(): string {
        const allSymptoms = this.patientsHistory.reduce((acc: string[], patient) => {
            return acc.concat(patient.symptoms);
        }, []);

        const uniqueSymptoms = [...new Set(allSymptoms)];
        return uniqueSymptoms.join(', ');
    }
}
