
interface ResultadoValidacao {
    valido: boolean;
    mensagem: string;
}
 
function validarEmail(email: string): boolean {
    console.log(`[Validando Email]: ${email}`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 
function validarCpf(cpf: string): boolean {
    console.log(`[Validando CPF]: ${cpf}`);
    // Validação simplificada apenas para fins didáticos de fluxo
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11;
}
 
class GerenciadorAutenticacao {
    private usuarioLogado: string | null = null;
 
    public login(email: string, cpf: string): ResultadoValidacao {
        const emailValido = validarEmail(email);
        const cpfValido = validarCpf(cpf);
 
        if (!emailValido) {
            return { valido: false, mensagem: "Formato de e-mail inválido." };
        }
 
        if (!cpfValido) {
            return { valido: false, mensagem: "CPF deve conter exatamente 11 dígitos." };
        }
 
        this.usuarioLogado = email;
        return { valido: true, mensagem: `Usuário ${email} autenticado com sucesso!` };
    }
 
    public logout(): void {
        console.log(`Usuário ${this.usuarioLogado} efetuou logout.`);
        this.usuarioLogado = null;
    }
}
 
// --- FLUXO DE EXECUÇÃO DE TESTE (ORQUESTRADOR MISTURADO COM A LOGICA) ---
 
const auth = new GerenciadorAutenticacao();
 
// Teste 1: Falha na validação
const tentativa1 = auth.login("usuario_errado.com", "123");
console.log(`Resultado 1: ${tentativa1.mensagem}`);
 
// Teste 2: Sucesso na validação
const tentativa2 = auth.login("professor@utfpr.edu.br", "12345678901");
console.log(`Resultado 2: ${tentativa2.mensagem}`);
 
auth.logout();
//—
 