// RA01 — Validação de dados com Expressões Regulares (Regex)

/**
 * Valida o formato de um CPF (com ou sem pontuação).
 * @param cpf string contendo o CPF
 * @returns boolean indicando se o formato é válido
 */
export function isValidCPF(cpf: string): boolean {

    const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    return cpfRegex.test(cpf);
}


/**
 * Valida o formato de um telefone no padrão brasileiro.
 * Aceita formatos como: (XX) 9XXXX-XXXX, (XX) XXXX-XXXX, ou apenas os números.
 * @param phone string contendo o telefone
 * @returns boolean indicando se o formato é válido
 */
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
    return phoneRegex.test(phone);
}
