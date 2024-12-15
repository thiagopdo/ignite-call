# Next.js Google Calendar Scheduler

![Next.js](https://img.shields.io/badge/Next.js-12.3.1-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-5.0.0-blueviolet.svg)
![SQLite](https://img.shields.io/badge/SQLite-3.39.0-green.svg)
![Google API](https://img.shields.io/badge/Google%20API-Calendar%20%26%20OAuth-red.svg)

## Descrição

Este projeto é uma aplicação de agendamento de eventos construída com **Next.js**. Ele permite que os usuários sincronizem seus calendários com o **Google Calendar** para:

- Verificar datas disponíveis.
- Agendar compromissos.
- Sincronizar eventos automaticamente com seus calendários.

A aplicação utiliza o **Prisma** como ORM para manipulação do banco de dados, utilizando **SQLite** como armazenamento local.

---

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **Prisma**: ORM para manipulação de dados.
- **SQLite**: Banco de dados leve e eficiente.
- **Google Calendar API**: Integração para criar e gerenciar eventos.
- **Google OAuth 2.0**: Autenticação segura dos usuários.

---

## Funcionalidades

- **Autenticação com o Google**: Conecte-se utilizando sua conta Google para gerenciar seus eventos.
- **Sincronização em tempo real**: Agendamentos são automaticamente sincronizados com o Google Calendar.
- **Painel de Administração**: Verificação e gerenciamento de eventos agendados.
- **Banco de Dados Local**: Dados armazenados utilizando SQLite para maior simplicidade.

---

## Requisitos

Antes de iniciar, certifique-se de que possui:

- Node.js (v16 ou superior)
- Yarn ou npm
- Conta no Google Cloud Platform para configurar as APIs

---

## Como Rodar o Projeto

### 1. Clone o Repositório

```bash
https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instale as Dependências

Utilizando **npm** ou **yarn**:

```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
DATABASE_URL=file:./dev.db
```

### 4. Configure o Banco de Dados

Rode as migrações para configurar o banco de dados SQLite:

```bash
npx prisma migrate dev
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

---

## Configuração do Google Cloud

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto.
3. Habilite as APIs "Google Calendar API" e "Google OAuth 2.0".
4. Configure as credenciais e obtenha o **Client ID** e **Client Secret**.
5. Adicione a URL de redirecionamento: `http://localhost:3000/api/auth/callback/google`.

---

## Estrutura do Projeto

```plaintext
/
|-- prisma/          # Esquema e migrações do Prisma
|-- pages/           # Páginas e rotas da aplicação
|-- components/      # Componentes reutilizáveis
|-- lib/             # Configurações e integrações externas
|-- styles/          # Estilos globais e modulares
```

---

## Contribuição

Fique à vontade para contribuir com melhorias ou correções! Para isso:

1. Fork o repositório.
2. Crie uma nova branch para sua feature/correção.
3. Envie um Pull Request descrevendo as alterações realizadas.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## Contato

Se tiver dúvidas ou sugestões, entre em contato:

- Email: [seu-email@example.com](mailto:seu-email@example.com)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)

---

