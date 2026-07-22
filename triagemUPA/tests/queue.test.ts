import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QueueService } from '../src/services/QueueService.js';
import type { Patient } from '../src/models/types.js';

test('Testando ordenação da fila por prioridade', () => {
    const queueService = new QueueService();

    const p1: Patient = {
        id: '1', name: 'Paciente POUCO URGENTE', cpf: '11111111111', phone: '11111111111', age: 30, symptoms: [], arrivalDate: new Date(), priority: 'POUCO_URGENTE'
    };
    
    const p2: Patient = {
        id: '2', name: 'Paciente EMERGENCIA', cpf: '22222222222', phone: '22222222222', age: 30, symptoms: [], arrivalDate: new Date(), priority: 'EMERGENCIA'
    };

    queueService.addToQueue(p1);
    queueService.addToQueue(p2);

    const queue = queueService.getQueue();
    assert.strictEqual(queue[0]?.name, 'Paciente EMERGENCIA'); // Emergência deve ir para o topo
    assert.strictEqual(queue[1]?.name, 'Paciente POUCO URGENTE');
});

test('Pattern Matching: Estimativa de espera', () => {
    const queueService = new QueueService();
    assert.strictEqual(queueService.getEstimatedWaitTime('EMERGENCIA'), 'Atendimento imediato (0 min)');
    assert.strictEqual(queueService.getEstimatedWaitTime('NAO_URGENTE'), 'Até 240 minutos');
});
