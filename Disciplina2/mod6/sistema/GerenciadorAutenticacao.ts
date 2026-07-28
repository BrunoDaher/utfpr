// Coloque um método público de validação que faça uso interno dos validadores do 
//arquivo anterior. 

import {validarCpf, validarEmail, ResultadoValidacao} from './validadores';

export default class GerenciadorAutenticacao {
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

