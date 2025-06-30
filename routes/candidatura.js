import express from 'express';
import supabase from '../supabaseClient.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Armazenamento da imagem na memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('foto'), async (req, res) => {
  const { nome, idade, pais, provincia, email, telefone, sobre } = req.body;
  const foto = req.file;

  if (!foto) {
    return res.status(400).json({ error: 'Foto não enviada' });
  }

  try {
    // Gera nome único para imagem
    const fileExt = foto.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    // Envia para o Supabase Storage (bucket "fotos")
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('fotos')
      .upload(fileName, foto.buffer, {
        contentType: foto.mimetype,
        upsert: true
      });

    if (uploadError) {
      console.error('Erro ao subir imagem:', uploadError);
      return res.status(500).json({ error: 'Falha ao salvar imagem', detalhe: uploadError.message });
    }

    // Gera URL pública
    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/fotos/${fileName}`;

    // Salva dados + link da imagem
    const { data, error } = await supabase
      .from('candidaturas')
      .insert([{ nome, idade, pais, provincia, email, telefone, sobre, foto: imageUrl }]);

    if (error) {
      console.error('Erro ao salvar candidatura:', error);
      return res.status(500).json({ error: 'Erro ao salvar candidatura', detalhe: error.message });
    }

    res.status(200).json({ message: 'Candidatura salva com sucesso', data });
  } catch (err) {
    console.error('Erro geral:', err);
    res.status(500).json({ error: 'Erro inesperado', detalhe: err.message });
  }
});

export default router;
