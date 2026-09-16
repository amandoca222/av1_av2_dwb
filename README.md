# Loja Digital API

API REST em Node.js para gestão de produtos de uma loja digital, com autenticação por token, upload de imagens e documentação Swagger.

## Tecnologias

- Node.js
- Express
- JavaScript
- bcrypt
- jsonwebtoken
- dotenv
- multer
- swagger-jsdoc
- swagger-ui-express
- armazenamento em memória

## Como iniciar

```bash
npm install
npm start
```

O servidor fica disponível em:

```txt
http://localhost:3000
```

## Rotas da AV1 e AV2

### Públicas

- GET /
- GET /produtos
- GET /produtos/:id

### Protegidas

- POST /usuarios
- POST /login
- POST /produtos
- PUT /produtos/:id
- PATCH /produtos/:id
- DELETE /produtos/:id
- POST /upload

## Acesso às rotas protegidas

Envie o cabeçalho abaixo nas requisições protegidas:

```http
Authorization: Bearer seu-token
```

O valor do token deve ser o retornado na rota de login.

## JSON para cadastro de usuário

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

## JSON para login

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

## JSON para cadastro de produto

```json
{
  "nome": "Notebook Gamer",
  "descricao": "Notebook para jogos",
  "preco": 4999.99,
  "categoria": "Eletrônicos"
}
```

## Sequência recomendada no Insomnia

1. POST /usuarios
2. POST /login
3. Copiar o token do retorno
4. GET /produtos
5. GET /produtos/:id
6. POST /produtos com token
7. PATCH /produtos/:id com token
8. DELETE /produtos/:id com token
9. POST /upload com token
10. GET /api-docs

## Observações

- Os dados ficam em memória.
- A senha do usuário não é armazenada em texto puro.
- A documentação Swagger fica em `http://localhost:3000/api-docs`.
