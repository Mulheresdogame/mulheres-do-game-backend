# Backend - Mulheres do Game

Este backend em Node.js + Express salva dados do formulário no Supabase.

## Como usar

1. Crie um projeto no [https://app.supabase.com](https://app.supabase.com)
2. No painel do Supabase, crie a tabela `candidaturas` com as colunas:

| Campo     | Tipo     |
|-----------|----------|
| nome      | text     |
| idade     | integer  |
| pais      | text     |
| provincia | text     |
| email     | text     |
| telefone  | text     |
| sobre     | text     |

3. Copie a `SUPABASE_URL` e `SUPABASE_KEY` para o arquivo `.env`
4. Instale as dependências:

```bash
npm install
```

5. Rode localmente:

```bash
npm start
```

## Teste com curl:

```bash
curl -X POST http://localhost:4000/api/candidatura -H "Content-Type: application/json" -d '{
  "nome": "Maria",
  "idade": 25,
  "pais": "Moçambique",
  "provincia": "Nampula",
  "email": "maria@example.com",
  "telefone": "841234567",
  "sobre": "Sou extrovertida e confiante."
}'
```

## Deploy gratuito recomendado

Você pode fazer deploy facilmente usando [Render](https://render.com):

1. Crie uma conta no site
2. Clique em "New Web Service"
3. Conecte seu repositório ou suba os arquivos
4. Configure variáveis de ambiente `.env`
5. O Render vai gerar uma URL como `https://seu-backend.onrender.com`
