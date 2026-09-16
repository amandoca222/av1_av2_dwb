# API da AV2 - Loja de Produtos

API em Node.js com Express para gestão de produtos, autenticação por JWT, upload de imagens e documentação Swagger.

## Tecnologias

- Express
- bcrypt
- jsonwebtoken
- dotenv
- multer
- swagger-jsdoc
- swagger-ui-express

## Como executar

1. Instale as dependências:
   npm install
2. Inicie o servidor:
   npm start
3. Acesse a documentação:
   http://localhost:3000/api-docs

## Rotas principais

- POST /usuarios - cadastro de usuário
- POST /login - autenticação
- GET /produtos - listar produtos
- GET /produtos/:id - consultar produto por ID
- POST /produtos - cadastrar produto
- PUT /produtos/:id - editar produto
- DELETE /produtos/:id - excluir produto
- POST /upload - upload de imagem

## Observação

Todos os dados ficam em memória, como solicitado na atividade AV2.
