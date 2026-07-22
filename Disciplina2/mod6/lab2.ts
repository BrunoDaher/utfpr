/*
Laboratório 2: Simulação de Processamento Assíncrono Segurado por Tipos

Neste laboratório, você construirá um simulador de processamento de transações que opera de forma assíncrona. O objetivo é criar funções que retornem Promessas devidamente tipadas e consumi-las utilizando o padrão moderno async/await com tratamento de exceções.

Tarefa 1: Criando uma Promise Tipada com Simulação de Tempo
Crie um arquivo chamado simulador.ts. Defina uma interface chamada Transacao contendo id: number, valor: number e status: "aprovada" | "rejeitada".
Desenvolva uma função chamada processarPagamento(valor: number): Promise<Transacao>. Dentro dela, retorne uma new Promise que usa um setTimeout de 2 segundos para simular o tempo de resposta.
Adicione uma regra lógica: se o valor for maior que 1000, a promessa deve ser rejeitada com um objeto de erro; caso contrário, deve ser resolvida com o status "aprovada".
Tarefa 2: Consumindo Promessas com async/await e try/catch
Crie uma função assíncrona chamada executarFluxoCaixa().
Dentro dela, faça chamadas consecutivas à função processarPagamento usando o operador await.
Envolva as chamadas em uma estrutura try/catch para garantir que, caso uma transação de valor alto falhe, o fluxo capture o erro no bloco catch e o exiba no console de forma controlada, sem travar a execução do script.
Tarefa 3: Análise de Estados da Promise Assistida por IA
Abra o chat de um assistente de IA (como Gemini ou Claude).
Envie o código que você estruturou e utilize o seguinte prompt: "Aja como um especialista em Event Loop do JavaScript. Analise meu código assíncrono anexado. Explique de forma didática o que acontece com o estado da minha Promise (Pending, Fulfilled, Rejected) durante o setTimeout de 2 segundos e como o uso do 'await' pausa a leitura linear do código mantendo a segurança de tipos do dado retornado."
Estude a resposta da IA para consolidar a diferença conceitual entre o código síncrono e o fluxo assíncrono controlado.
Resultado Esperado: Ao rodar o script no terminal, o aluno deverá ver uma pausa de 2 segundos na tela (aguardando a resolução da Promise) antes que os dados da primeira transação aprovada apareçam. Na sequência, ao disparar o valor acima de 1000, o programa deve exibir imediatamente a mensagem de erro capturada de forma limpa pelo bloco catch.
*/