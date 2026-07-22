import type { CreatePatientData, Priority } from '../../models/types.js';
import { PatientService } from '../../services/PatientService.js';
import { isValidCPF, isValidPhone } from '../../utils/validators.js';


export class PatientForm {

    constructor
        (private containerId: string,
            private patientService: PatientService
        ) {

    }

    public render(): void {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="card">
                <h3 class="card-title">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <path d="M20 8v6M23 11h-6"/>
                    </svg>
                    Cadastro do Paciente
                </h3>
                <form id="triage-form" novalidate>
                    <div class="form-group">
                        <label for="p-cpf">CPF</label>
                        <input type="text" id="p-cpf" class="form-control" placeholder="Ex: 123.456.789-00 ou 12345678900" required>
                        <span class="error-message" id="err-cpf">CPF inválido. Use 11 dígitos ou pontuação correta.</span>
                    </div>

                    <div class="form-group">
                        <label for="p-name">Nome Completo</label>
                        <input type="text" id="p-name" class="form-control" placeholder="Ex: Maria da Silva" required>
                        <span class="error-message" id="err-name">Nome é obrigatório.</span>
                    </div>

                    <div class="form-group">
                        <label for="p-phone">Telefone</label>
                        <input type="text" id="p-phone" class="form-control" placeholder="Ex: (11) 98765-4321" required>
                        <span class="error-message" id="err-phone">Telefone inválido. Ex: (11) 98765-4321.</span>
                    </div>

                    <div class="form-group">
                        <label for="p-age">Idade</label>
                        <input type="number" id="p-age" class="form-control" min="0" max="150" placeholder="Ex: 45" required>
                        <span class="error-message" id="err-age">Por favor, insira uma idade válida (0 a 150).</span>
                    </div>

                    <div class="form-group">
                        <label for="p-priority">Prioridade de Triagem</label>
                        <select id="p-priority" class="form-control" required>
                            <option value="" disabled selected>Selecione a prioridade...</option>
                            <option value="EMERGENCIA">EMERGENCIA (Vermelho)</option>
                            <option value="MUITO_URGENTE">MUITO URGENTE (Laranja)</option>
                            <option value="URGENTE">URGENTE (Amarelo)</option>
                            <option value="POUCO_URGENTE">POUCO URGENTE (Verde)</option>
                            <option value="NAO_URGENTE">NÃO URGENTE (Azul)</option>
                        </select>
                        <span class="error-message" id="err-priority">Selecione uma prioridade.</span>
                    </div>

                    <div class="form-group">
                        <label for="p-symptoms">Sintomas (Separados por vírgula)</label>
                        <textarea id="p-symptoms" class="form-control" placeholder="Ex: Febre alta, Dor de cabeça, Tosse seca" required></textarea>
                        <span class="error-message" id="err-symptoms">Descreva ao menos um sintoma.</span>
                    </div>

                    <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">
                        Realizar Triagem
                    </button>
                </form>

            </div>
        `;
    }

    public toggleError(id: string, show: boolean): void {
        const error = document.getElementById(id) as HTMLElement;
        if (show) {
            error.style.display = 'block';
        } else {
            error.style.display = 'none';
        }
    }

    public bindSubmit(onSubmit: (data: CreatePatientData) => void): void {
        const form = document.getElementById('triage-form') as HTMLFormElement;
        if (!form) return;


        // Clear previous errors
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(el => (el as HTMLElement).style.display = 'none');

        // Collect inputs
        const nameInput = document.getElementById('p-name') as HTMLInputElement;
        const cpfInput = document.getElementById('p-cpf') as HTMLInputElement;
        const phoneInput = document.getElementById('p-phone') as HTMLInputElement;
        const ageInput = document.getElementById('p-age') as HTMLInputElement;
        const prioritySelect = document.getElementById('p-priority') as HTMLSelectElement;
        const symptomsInput = document.getElementById('p-symptoms') as HTMLTextAreaElement;


        nameInput.onchange = () => {
            const errName = document.getElementById('err-name') as HTMLElement;
            errName.style.display = 'none'
        }

        cpfInput.onchange = () => {
            const registered = this.patientService.isRegistered(cpfInput.value)

            if (registered) {
                const patient = registered;
                phoneInput.value = patient.phone;
                nameInput.value = patient.name;
                ageInput.value = patient.age.toString();
                prioritySelect.value = patient.priority;
                //symptomsInput.value = patient.symptoms;
            }
            else {

                const estado = !isValidCPF(cpfInput.value.trim());
                this.toggleError('err-cpf', estado);

                let cpf = cpfInput.value; //aqui o campo zera, então salvamos o cpf em uma variável
                form.reset();
                cpfInput.value = cpf; //retorna o cpf pro input
            }
        }

        cpfInput.oninput = () => {
            //remove tudo q nao for numero
            cpfInput.value = cpfInput.value.replace(/\D/g, '');
        }

        phoneInput.oninput = () => {
            //remove tudo q nao for numero
            phoneInput.value = phoneInput.value.replace(/\D/g, '');;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Simple Validation
            if (!nameInput.value.trim()) {
                this.toggleError('err-name', true);;
                isValid = false;
            }

            if (!isValidCPF(cpfInput.value.trim())) {
                this.toggleError('err-cpf', true)
                isValid = false;
            }

            if (!isValidPhone(phoneInput.value.trim())) {
                this.toggleError('err-phone', true);
                isValid = false;
            }

            const ageValue = parseInt(ageInput.value, 10);
            if (isNaN(ageValue) || ageValue < 0 || ageValue > 150) {
                this.toggleError('err-age', true);
                isValid = false;
            }

            if (!prioritySelect.value) {
                this.toggleError('err-priority', true)
                isValid = false;
            }

            if (!symptomsInput.value.trim()) {
                this.toggleError('err-symptoms', true);
                isValid = false;
            }

            if (!isValid) return;

            // Split symptoms into non-empty strings
            const symptoms = symptomsInput.value
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);

            const patientData: CreatePatientData = {
                name: nameInput.value.trim(),
                cpf: cpfInput.value.trim(),
                phone: phoneInput.value.trim(),
                age: ageValue,
                priority: prioritySelect.value as Priority,
                symptoms,
                arrivalDate: new Date()
            };

            // Call the callback
            onSubmit(patientData);

            // Reset form
            form.reset();
        });


    }
}
