/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Cadastro e autenticação dos usuários
 */

const express = require('express');
const bcrypt = require('bcrypt');
const { usuarios } = require('../data/usuarios');

const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ message: 'Usuário já cadastrado.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    email,
    senha: senhaHash
  };

  usuarios.push(novoUsuario);

  return res.status(201).json({
    message: 'Usuário cadastrado com sucesso.',
    usuario: {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    }
  });
});

module.exports = router;
