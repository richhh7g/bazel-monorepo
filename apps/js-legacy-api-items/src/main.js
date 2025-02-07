const express = require("express");
const packagejson = require("express/package.json");
const { Hello } = require("./message/message.js");

const items = [];
let idCounter = 1;
const port = 3333;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(Hello);
});

/**
 * Criação de um novo item
 * POST /items
 * Exemplo de corpo esperado:
 * {
 *   "name": "Item 1",
 *   "description": "Descrição do item 1"
 * }
 */
app.post("/items", (req, res) => {
  const newItem = { id: idCounter++, ...req.body };
  items.push(newItem);

  res.status(201).json(newItem);
});

/**
 * Leitura de todos os itens
 * GET /items
 */
app.get("/items", (req, res) => {
  res.json(items);
});

/**
 * Leitura de um único item pelo ID
 * GET /items/:id
 */
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const item = items.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  res.json(item);
});

/**
 * Atualização de um item pelo ID
 * PUT /items/:id
 * Exemplo de corpo esperado:
 * {
 *   "name": "Item Atualizado",
 *   "description": "Descrição atualizada"
 * }
 */
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  items[index] = { id, ...req.body };

  res.json(items[index]);
});

/**
 * Exclusão de um item pelo ID
 * DELETE /items/:id
 */
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(
      `Servidor rodando em http://localhost:${port} na versão ${packagejson.version}`
    );
  });
}

module.exports = app;
