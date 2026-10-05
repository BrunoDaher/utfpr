# 🛠️ Laboratório 4
## Feed de Rede Social com Axios, Zod e IA

> **Objetivo:** construir um feed de rede social consumindo a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/), com requisições centralizadas, validação em tempo de execução e formulários tipados.

Ao final, sua aplicação deverá combinar **React + TypeScript**, **Mantine UI**, **Axios**, **Zod** e um **Custom Hook assíncrono**.

## ✅ Antes de começar

Prepare o projeto com Vite e TypeScript:

- [x] Crie uma aplicação React usando o template TypeScript.
- [x] Configure o Router.
- [x] Instale e configure a biblioteca Mantine UI.
- [x] Inicie o servidor local e confirme que a aplicação abre sem erros.

## 1. Axios centralizado e interceptors

### 1.1 Instalação e configuração

1. Instale o Axios:

	```bash
	yarn add axios
	```

2. Crie o arquivo `src/services/api.ts`.
3. Instancie o Axios com a seguinte URL base:

	```ts
	baseURL: 'https://jsonplaceholder.typicode.com'
	```

4. Configure um **interceptor de requisição** para adicionar automaticamente o token simulado:

	```text
	Authorization: Bearer MOCK-TOKEN
	```

5. Configure um **interceptor de resposta** para:
	- capturar erros HTTP globalmente;
	- exibir uma notificação visual de erro usando o Mantine;
	- personalizar a mensagem para o contexto de falha na comunicação com a API.

### 1.2 Como verificar no DevTools

1. Abra o Chrome DevTools com `F12`.
2. Acesse a aba **Network** (Rede).
3. Filtre as requisições por **Fetch/XHR**.
4. Dispare qualquer requisição do feed.
5. Abra a requisição e localize **Request Headers**.
6. Confirme a presença do cabeçalho `Authorization` com o valor `Bearer MOCK-TOKEN`.

> **Checkpoint:** o token deve ser adicionado automaticamente, sem precisar ser informado manualmente em cada chamada.

## 2. Schemas Zod e Custom Hook com IA

### 2.1 Instalação

Instale o Zod:

```bash
yarn add zod
```

### 2.2 Padrão de arquivos

Use nomes de arquivo com inicial maiúscula e mantenha o schema e o tipo inferido com exatamente o mesmo nome:

```text
src/
├── hooks/
│   └── useAsyncData.ts
└── schemas/
	 ├── NewPostSchema.ts
	 └── PostSchema.ts
```

Cada schema deve exportar sua constante e seu tipo TypeScript:

```ts
export const PostSchema = /* schema Zod */;
export type PostSchema = z.infer<typeof PostSchema>;
```

### 2.3 Prompt sugerido

Use o assistente de IA com o prompt abaixo:

```text
Gere dois arquivos de schema Zod em src/schemas/:
1) PostSchema.ts para validar o retorno da JSONPlaceholder;
2) NewPostSchema.ts para validar o formulário de nova postagem.

Ambos os arquivos devem exportar a constante do schema e o tipo inferido
com o mesmo nome (ex.: export const PostSchema = ...; export type
PostSchema = z.infer<typeof PostSchema>;).

Em seguida, crie o Custom Hook src/hooks/useAsyncData.ts para gerenciar
os estados de data, loading, error e a execução da função assíncrona.
```

Depois de gerar os arquivos:

- [x] Salve-os em `src/schemas/` e `src/hooks/`.
- [x] Revise o código gerado antes de utilizá-lo.
- [x] Compare a solução com o repositório da disciplina, quando necessário.

> **Atenção:** a IA auxilia na implementação, mas a responsabilidade por revisar tipos, regras de validação e tratamento de erros continua sendo sua.

## 3. Feed, validação runtime e criação de postagens

### 3.1 Carregamento do feed

Na página principal `/feed`:

1. Use o `useAsyncData` para consumir `GET /posts`.
2. Valide a resposta em tempo de execução:

	```ts
	PostSchema.array().safeParse(response.data)
	```

3. Se os dados forem válidos, renderize as postagens em cards responsivos utilizando componentes do Mantine, como:

	`Card`, `Text`, `Title`, `Badge`, `Avatar` e `Group`.

4. Se a validação falhar, exiba um alerta visual informando que houve divergência no contrato dos dados.

### 3.2 Formulário de nova postagem

Crie o componente `<NewPostForm />` com os campos:

- **Título**
- **Conteúdo**

Integre as regras do `NewPostSchema` usando uma destas abordagens:

- `@mantine/form`; ou
- validação manual com `.safeParse()`.

Ao enviar dados válidos:

1. Faça uma requisição `POST /posts` usando a instância centralizada do Axios.
2. Exiba uma mensagem de sucesso com `notifications.show`.
3. Insira a nova postagem no topo da lista exibida na tela.

## 🎯 Resultado esperado

Uma interface de feed social que:

- consome a API JSONPlaceholder;
- apresenta estados de carregamento e erro;
- utiliza interceptors do Axios, verificados pelo Chrome DevTools;
- abstrai operações assíncronas com um Custom Hook;
- valida contratos da API em runtime com Zod;
- valida o formulário de postagem;
- mantém dados e formulários tipados com TypeScript;
- permite criar uma nova postagem e exibi-la imediatamente no topo do feed.

## 📦 Entrega rápida

- [x] Projeto iniciado e executando sem erros.
- [x] Axios centralizado e interceptors funcionando.
- [x] Cabeçalho `Authorization` confirmado no DevTools.
- [x] `PostSchema` e `NewPostSchema` implementados.
- [x] `useAsyncData` implementado.
- [x] Feed com loading, erro e validação runtime.
- [x] Formulário validado e integrado ao `POST /posts`.
- [x] Nova postagem exibida no topo após o envio.