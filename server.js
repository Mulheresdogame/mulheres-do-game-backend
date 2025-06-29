import express from 'express';
import candidaturaRoutes from './routes/candidatura.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/candidatura', candidaturaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
