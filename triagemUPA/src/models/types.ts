// RA02 - Utility Types
// R05 - Interfaces, Type Aliases, Union Types

// R05: Union Types e Type Aliases
export type Priority = 'EMERGENCIA' | 'MUITO_URGENTE' | 'URGENTE' | 'POUCO_URGENTE' | 'NAO_URGENTE';

export type Symptom = string;

// R05: Interface da entidade Paciente
export interface Patient {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    age: number;
    symptoms: Symptom[];
    arrivalDate: Date;
    priority: Priority;
}

// RA02: Utility Types
// Cria um paciente (o ID é gerado internamente)
export type CreatePatientData = Omit<Patient, 'id'>;

// Atualiza informações de um paciente
export type UpdatePatientData = Partial<Patient>;

// Garante que o paciente retornado não sofra mutação
export type ReadonlyPatient = Readonly<Patient>;

// RA02: Indexação
export type PatientsMap = Record<string, Patient>;
