import { ApiSimulation } from './data/ApiSimulation.js';
import { PatientService } from './services/PatientService.js';
import { QueueService } from './services/QueueService.js';
import { StatisticsService } from './services/StatisticsService.js';

async function main() {
    console.log('=== Iniciando Sistema de Triagem da UPA ===\n');

    const patientService = new PatientService();
    const queueService = new QueueService();

    // R06: Simulação de comunicação com API assíncrona
    console.log('>> Carregando dados da API externa...');
    try {
        const batch = await ApiSimulation.fetchInitialPatients();
        console.log(`>> Dados carregados com sucesso! (${batch.length} pacientes)\n`);
        patientService.loadBatch(batch);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return;
    }

    // Listando pacientes cadastrados
    const allPatients = patientService.getAllPatients();
    console.log('=== Pacientes Cadastrados ===');
    allPatients.forEach(p => console.log(`- ${p.name} (Prioridade: ${p.priority})`));
    console.log();

    // R03: Classificação e gerenciamento da fila
    console.log('>> Inserindo pacientes na fila de atendimento...');
    allPatients.forEach(p => queueService.addToQueue(p));

    console.log('\n=== Fila de Atendimento (Ordenada por Prioridade) ===');
    queueService.getQueue().forEach((p, index) => {
        // RA03: ts-pattern usage
        const waitTime = queueService.getEstimatedWaitTime(p.priority);
        console.log(`${index + 1}º - ${p.name} | ${p.priority} | Espera Estimada: ${waitTime}`);
    });


    // R04: Consulta e estatísticas
    const statsService = new StatisticsService([...allPatients]);

    console.log('=== Estatísticas Gerais ===');
    console.log(`- Total de Pacientes: ${allPatients.length}`);
    console.log(`- Existe alguma emergência? ${statsService.hasEmergency() ? 'Sim' : 'Não'}`);
    console.log(`- Média de Idade: ${statsService.getAverageAge().toFixed(1)} anos`);
    console.log(`- Todos os Sintomas relatados: ${statsService.getSymptomsReport()}`);
    console.log(`- Nomes e Idades mapeados:`, statsService.getPatientsNamesAndAges());

    console.log('\n>> Atendendo o primeiro paciente da fila...');
    const nextPatient = queueService.getNextPatient();
    if (nextPatient) {
        console.log(`Atendendo: ${nextPatient.name} (${nextPatient.priority})`);
    }

    console.log('\n=== Fila Atualizada ===');
    console.log(`Pacientes restantes na fila: ${queueService.getQueue().length}`);
}

main().catch(console.error);
