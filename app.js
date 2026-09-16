require('dotenv').config();
const express = require('express');
const path = require('path');
const { swaggerUi, specs } = require('./src/config/swagger');
const authRoutes = require('./src/routes/authRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const produtosRoutes = require('./src/routes/produtosRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/login', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API da AV2 funcionando corretamente.',
    docs: `http://localhost:${port}/api-docs`
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Erro interno do servidor.',
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
});
