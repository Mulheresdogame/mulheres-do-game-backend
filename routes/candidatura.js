import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, idade, pais, provincia, email, telefone, sobre } = req.body;

  try {
    const { data, error } = await supabase
      .from('candidaturas')
      .insert([{ nome, idade, pais, provincia, email, telefone, sobre }]);

    if (error) {
      console.error('🔴 ERRO DO SUPABASE:', error); // mostra o erro real
      return res.status(500).json({ error: 'Erro ao salvar candidatura', detalhe: error.message });
    }

    console.log('✅ Registro salvo:', data);
    res.status(200).json({ message: 'Candidatura salva com sucesso', data });
  } catch (err) {
    console.error('❌ ERRO GERAL:', err);
    res.status(500).json({ error: 'Erro inesperado', detalhe: err.message });
  }
});

export default router;
