// R01 — Cadastro e gerenciamento de pacientes
// R02 — Organização das funcionalidades (Exportação e Modularização)

import type { Patient, CreatePatientData, UpdatePatientData, ReadonlyPatient } from '../models/types.js';
import { isValidCPF, isValidPhone } from '../utils/validators.js';

export class PatientService {
    // R02: Escopo de variáveis
    private patients: Patient[] = [];

    // R02: Parâmetros default e Arrow Functions
    // R01: Cadastro de pacientes
    public registerPatient = (data: CreatePatientData, validate: boolean = true): ReadonlyPatient => {
        if (validate) {
            if (!isValidCPF(data.cpf)) {
                throw new Error(`CPF inválido: ${data.cpf}`);
            }

            if (!isValidPhone(data.phone)) {
                throw new Error(`Telefone inválido: ${data.phone}`);
            }

            //durante o submit do form
            const patientExists = this.patients.some(p => p.cpf === data.cpf);
            if (patientExists) {
                throw new Error(`CPF já cadastrado: ${data.cpf}`);
            }
        }

        const newPatient: Patient = {
            id: crypto.randomUUID(),
            ...data // R05: Spread Operator
        };

        this.patients.push(newPatient);
        return newPatient as ReadonlyPatient;
    };

    public isRegistered = (cpf: string): false | ReadonlyPatient => {
        const patient = this.patients.find(p => p.cpf === cpf);
        return patient || false;
    }

    // R01: Consultar pacientes
    public getPatientById = (id: string): ReadonlyPatient | undefined => {
        return this.patients.find(p => p.id === id);
    };


    public getAllPatients = (): ReadonlyPatient[] => {
        return [...this.patients];
    };

    // R01: Atualizar paciente
    public updatePatient = (id: string, updateData: UpdatePatientData): ReadonlyPatient | undefined => {
        const patientIndex = this.patients.findIndex(p => p.id === id);
        if (patientIndex === -1) return undefined;

        const patient = this.patients[patientIndex];
        if (!patient) return undefined;

        const updatedPatient: Patient = Object.assign({}, patient, updateData);
        this.patients[patientIndex] = updatedPatient;

        return updatedPatient as ReadonlyPatient;
    };

    // Carregar em lote (para a simulação da API - R06)
    public loadBatch = (batch: CreatePatientData[]): void => {
        batch.forEach(data => this.registerPatient(data, false));
    }
}
