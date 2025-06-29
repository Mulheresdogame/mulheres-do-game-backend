import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidaturaRoutes from './routes/candidatura.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/candidatura', candidaturaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
