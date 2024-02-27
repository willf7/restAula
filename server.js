const { request } = require("express");
const express = require("express");
const app = express();
const data = require("./data.json");

// Verbos HTTP
// GET -> Receber dados de um Resource
// POST -> Enviar dados ou ingoramcoes para serem processados por um Resource
// PUT -> Atualizar os dados de um Resource
// DELETE -> Deletar um Resource

// http://localhost:3000/clients

app.use(express.json()); //falando pro express usar notacao json

app.get("/clients", (req, res) => {
  res.json(data);
});

app.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find((cli) => cli.id == id);

  if (!client) return res.status(204).json();

  res.json(client);
});

app.post("/clients", (req, res) => {
  const { name, email } = req.body;

  res.json({ name, email });
});

app.put("/clients/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find((cli) => cli.id == id);

  if (!client) return res.status(204).json();

  const { name, email } = req.body;

  client.name = name;
  client.email = email;

  res.json(client);
});

app.delete("/clients/:id", (req, res) => {
  const { id } = req.params;
  const clientsFiltered = data.filter((client) => client.id != id);

  res.json(clientsFiltered);
});

app.listen(5000, () => {
  console.log("Server rodando");
});
