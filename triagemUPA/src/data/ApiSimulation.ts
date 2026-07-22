// R06 — Simulação de comunicação com uma API
// Módulo 6 — Modularização e Assincronismo: Promises, tipagem de retornos e manipulação de JSON.

import type { CreatePatientData } from '../models/types.js';

// String JSON simulando um payload recebido de uma API externa
const jsonPayload = `
[
    {
        "name": "Maria da Silva",
        "cpf": "111.222.333-44",
        "phone": "(11) 98888-7777",
        "age": 65,
        "symptoms": ["Dor forte no peito", "Falta de ar"],
        "arrivalDate": "${new Date().toISOString()}",
        "priority": "EMERGENCIA"
    },
    {
        "name": "João Pereira",
        "cpf": "555.666.777-88",
        "phone": "(21) 99999-0000",
        "age": 30,
        "symptoms": ["Febre leve", "Coriza"],
        "arrivalDate": "${new Date().toISOString()}",
        "priority": "POUCO_URGENTE"
    },
    {
        "name": "Ana Oliveira",
        "cpf": "12345678901",
        "phone": "41987654321",
        "age": 45,
        "symptoms": ["Corte profundo no braço", "Sangramento ativo"],
        "arrivalDate": "${new Date().toISOString()}",
        "priority": "MUITO_URGENTE"
    }
]
`;

export class ApiSimulation {
    /**
     * Simula a busca de pacientes num sistema externo com um delay.
     * Retorna uma Promise.
     */
    public static fetchInitialPatients(): Promise<CreatePatientData[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const parsedData = JSON.parse(jsonPayload);
                    // R06: Convertendo strings de data de volta para objetos Date (JSON parser behavior)
                    const typedData: CreatePatientData[] = parsedData.map((item: any) => ({
                        ...item,
                        arrivalDate: new Date(item.arrivalDate)
                    }));
                    resolve(typedData);
                } catch (error) {
                    reject(new Error("Falha ao parsear os dados da API simulada"));
                }
            }, 1500); // 1.5 segundos de delay
        });
    }
}
