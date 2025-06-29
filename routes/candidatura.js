import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, idade, pais, provincia, email, telefone, sobre } = req.body;

  try {
    const { data, error } = await supabase
      .from('candidaturas')
      .insert([{ nome, idade, pais, provincia, email, telefone, sobre }]);

    if (error) {
      console.error('Erro do Supabase:', error.message);
      return res.status(500).json({ error: 'Erro ao salvar candidatura' });
    }

    res.status(200).json({ message: 'Candidatura salva com sucesso', data });
  } catch (err) {
    console.error('Erro geral:', err.message);
    res.status(500).json({ error: 'Erro inesperado' });
  }
});

export default router;
