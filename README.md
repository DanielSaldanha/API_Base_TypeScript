# Base de Backend com TypeScript, Prisma e PostgreSQL

Projeto base estruturado para APIs RESTful em Node.js com TypeScript, Prisma ORM e PostgreSQL, seguindo a arquitetura em camadas:

```
Routes ──> Controllers ──> Services ──> Repositories ──> Database (Prisma / PostgreSQL)
```

---

## 📁 Estrutura de Pastas

```text
├── prisma/
│   └── schema.prisma          # Modelos de dados e conexão do Prisma com PostgreSQL
├── src/
│   ├── config/
│   │   └── prisma.ts          # Instância singleton do PrismaClient
│   ├── controllers/
│   │   └── user.controller.ts # Trata requisições HTTP, validação com Zod e respostas
│   ├── errors/
│   │   └── AppError.ts        # Classe customizada de erros operacionais
│   ├── middlewares/
│   │   └── errorHandler.ts    # Middleware central de tratamento de erros
│   ├── repositories/
│   │   └── user.repository.ts # Camada de acesso direto ao banco via Prisma
│   ├── routes/
│   │   ├── index.ts           # Roteador principal (/api) e health check
│   │   └── user.routes.ts     # Rotas do CRUD de usuários
│   ├── services/
│   │   └── user.service.ts    # Regras de negócio e validações
│   ├── app.ts                 # Configuração do Express (middlewares, rotas e erros)
│   └── server.ts              # Ponto de entrada do servidor HTTP
├── .env.example               # Exemplo das variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git (node_modules, .env, dist, etc.)
├── client.http                # Arquivo para testes das rotas (REST Client)
├── package.json
└── tsconfig.json
```

---

## 🛠️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** (v18+)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Express](https://expressjs.com/)**
- **[Prisma ORM](https://www.prisma.io/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Zod](https://zod.dev/)** para validação de dados de entrada
- **[tsx](https://github.com/privatenumber/tsx)** para desenvolvimento com hot-reload rápido

---

## 🚀 Como Executar o Projeto

### 1. Clonar ou abrir o projeto e instalar dependências
```bash
npm install
```

### 2. Configurar as variáveis de ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```
No arquivo `.env`, ajuste a string de conexão do PostgreSQL:
```env
PORT=3000
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
```

### 3. Executar as Migrações do Prisma
Certifique-se de que o PostgreSQL esteja em execução e execute:
```bash
npm run prisma:migrate
```
*(Esse comando criará as tabelas no PostgreSQL e gerará o Prisma Client automaticamente)*

### 4. Iniciar o servidor em modo de desenvolvimento
```bash
npm run dev
```
O servidor estará disponível em: `http://localhost:3000`

---

## 📜 Scripts Disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor em modo watch com `tsx` |
| `npm run build` | Compila o código TypeScript para JavaScript (`dist/`) |
| `npm start` | Executa o código compilado em produção |
| `npm run prisma:generate` | Gera o cliente TypeScript do Prisma |
| `npm run prisma:migrate` | Executa e cria migrações do banco com Prisma Migrate |
| `npm run prisma:studio` | Abre a interface gráfica do Prisma para visualizar dados |

---

## 🌐 Endpoints da API

Base URL: `http://localhost:3000/api`

### Healthcheck
- **GET** `/api/health` - Verifica o status da API

### Usuários (`/api/users`)

| Método | Rota | Descrição | Status Sucesso |
| --- | --- | --- | --- |
| `POST` | `/api/users` | Cria um novo usuário | `201 Created` |
| `GET` | `/api/users` | Lista todos os usuários | `200 OK` |
| `GET` | `/api/users/:id` | Busca usuário por UUID | `200 OK` |
| `PUT` | `/api/users/:id` | Atualiza dados do usuário | `200 OK` |
| `DELETE` | `/api/users/:id` | Remove um usuário | `204 No Content` |

#### Exemplo de Payload - Criar Usuário (`POST /api/users`)
```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

#### Exemplo de Payload - Atualizar Usuário (`PUT /api/users/:id`)
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

---

## 🧪 Testando as Rotas
Você pode testar diretamente utilizando o arquivo `client.http` com a extensão **REST Client** do VS Code, ou através de ferramentas como **Postman**, **Insomnia** ou `curl`.
