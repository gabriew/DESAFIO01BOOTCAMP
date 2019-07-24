const express = require("express");
const server = express();
server.use(express.json());
//Query parms = ?teste=1
//Router params = /users/1
//Request body = {"name": "Gabriel Henrique", "email": "gabriel.live@.com"}

const projects = [];
//Middleware local
function checkId(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({ error: "Você deve informar o ID!" });
  }
  return next();
}

//Monitor de requisições -- Middleware global
let i = 0;
server.use((req, res, next) => {
  i++;
  console.log("Contagem de Requisições", i);
  return next();
});

//Buscar projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Criar um Projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    task: []
  };
  projects.push(project);
  return res.json(project);
});

//Cria uma tarefa em um Projeto
server.post("/projects/:id/task", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.task.push(title);
  return res.send();
});

//Altera um projeto
server.put("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});

//Deleta um projeto
server.delete("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(p => p.id === id);
  projects.splice(project, 1);
  return res.send();
});

server.listen(35);
