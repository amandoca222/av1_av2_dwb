/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e geração de token
 */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usuarios } = require('../data/usuarios');

const jwtSecret = process.env.TOKENSECRETO || process.env.JWT_SECRET || 'av2_secret_key_2026';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const usuario = usuarios.find((item) => item.email === email);

  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, nome: usuario.nome },
    jwtSecret,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    message: 'Login realizado com sucesso.',
    token
  });
});

module.exports = router;
