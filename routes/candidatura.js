import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, idade, pais, provincia, email, telefone, sobre } = req.body;

  const { data, error } = await supabase
    .from('candidaturas')
    .insert([{ nome, idade, pais, provincia, email, telefone, sobre }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao salvar candidatura' });
  }

  res.json({ message: 'Candidatura salva com sucesso!', data });
});

export default router;
