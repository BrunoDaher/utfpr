//necessario ativar o verbatimModuleSyntax (setar como true) no tsconfig.json 

export function validarEmail(email: string): boolean {
    console.log(`[Validando Email]: ${email}`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 
export function validarCpf(cpf: string): boolean {
    console.log(`[Validando CPF]: ${cpf}`);
    // Validação simplificada apenas para fins didáticos de fluxo
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11;
}

export interface ResultadoValidacao {
    valido: boolean;
    mensagem: string;
}
