# Agendei.app

Aplicação de agendamento de serviços conectando prestadores e clientes.

## Tecnologias
- Next.js 13
- TypeScript
- Supabase
- TailwindCSS

## Setup Local

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env.local

# Iniciar desenvolvimento
npm run dev
```

## Estrutura
```
src/
├── app/
│   ├── api/          # Rotas API
│   └── dashboard/    # Páginas Dashboard
├── components/       # Componentes
├── lib/              # Utilidades
└── models/           # Interfaces
```

## Banco de Dados
### Hosted at Supabase
Tables
- users (id, email, type)
- categories (id, name)
- providers (id, name, category_id)
- events (id, provider_id, user_id, date)


