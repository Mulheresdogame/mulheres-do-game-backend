import express from 'express';
import candidaturaRoutes from './routes/candidatura.js';
import dotenv from 'dotenv';

// Carregar variáveis do .env
dotenv.config();

const app = express();

// Permitir leitura de JSON
app.use(express.json());

// Definir rotas da API
app.use('/api/candidatura', candidaturaRoutes);

// Porta do servidor
const PORT = process.env.PORT || 4000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
