/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Operações de cadastro e gerenciamento de produtos
 */

const express = require('express');
const { produtos } = require('../data/produtos');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 */
router.get('/', authMiddleware, (req, res) => {
  return res.status(200).json(produtos);
});

router.post('/', authMiddleware, (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;

  if (!nome || !descricao || !preco) {
    return res.status(400).json({ message: 'Nome, descrição e preço são obrigatórios.' });
  }

  const novoProduto = {
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    nome,
    descricao,
    preco,
    categoria: categoria || 'Sem categoria'
  };

  produtos.push(novoProduto);

  return res.status(201).json({ message: 'Produto cadastrado com sucesso.', produto: novoProduto });
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Consulta um produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   put:
 *     summary: Atualiza um produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               categoria:
 *                 type: string
 *   delete:
 *     summary: Remove um produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const produto = produtos.find((item) => item.id === Number(id));

  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }

  return res.status(200).json(produto);
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }

  const produtoAtualizado = { ...produtos[index], ...req.body };
  produtos[index] = produtoAtualizado;

  return res.status(200).json({ message: 'Produto atualizado com sucesso.', produto: produtoAtualizado });
});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }

  const [produtoExcluido] = produtos.splice(index, 1);

  return res.status(200).json({ message: 'Produto excluído com sucesso.', produto: produtoExcluido });
});

module.exports = router;
