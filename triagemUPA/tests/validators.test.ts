import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidCPF, isValidPhone } from '../src/utils/validators.js';

test('Validar formatos de CPF corretos e incorretos', () => {
    assert.strictEqual(isValidCPF('111.222.333-44'), true);
    assert.strictEqual(isValidCPF('12345678901'), true);
    assert.strictEqual(isValidCPF('111222333'), false); // Curto
    assert.strictEqual(isValidCPF('111.222.333-4a'), false); // Letra
});

test('Validar formatos de telefone corretos e incorretos', () => {
    assert.strictEqual(isValidPhone('(11) 98888-7777'), true);
    assert.strictEqual(isValidPhone('41987654321'), true);
    assert.strictEqual(isValidPhone('11 988887777'), true);
    assert.strictEqual(isValidPhone('1234'), false); // Curto
});
