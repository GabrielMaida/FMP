const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

////////////////////////////////////////////////////////////////////

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://readonly_user:qs7UALDMx7UHhgZ8@cluster0.gotgxlc.mongodb.net/FMP-Data?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 3500;

mongoose
  .connect(MONGODB_URI) //tenta conectar, avisa se der erro e finaliza o processo
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => {
    console.log("MongoDB connection error:" + err);
    process.exit(1);
  });

const tarefaSchema = new mongoose.Schema({
  id_tarefa: Number,
  nome: String,
  descricao: String,
  dificuldade: { type: Number, enum: [1, 2, 3, 4, 5] },
  habito: Boolean,
  frequencia: { type: String, enum: ["diario", "semanal", "mensal"] },
});

const usuarioSchema = new mongoose.Schema({
  id_usuario: Number,
  nome: String,
  senha: String,
  url_imagem: String,
  exp: Number,
  nivel: Number,
  tarefas: [Number],
});

// Criar os modelos
const Tarefa = mongoose.model("Tarefa", tarefaSchema, "tarefas");
const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");

////////////////////////////////////////////////////////////////////

// Endpoint para retornar usuário por ID
app.get("/api/user/:id_usuario", async (req, res) => {
  try {
    const user = await Usuario.findOne({ id_usuario: req.params.id_usuario });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: `id_usuario ${req.params.id_usuario} couldn't be found.`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para retornar todos os usuários
app.get("/api/user", async (req, res) => {
  try {
    const users = await Usuario.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para criar um novo usuário
app.post("/api/user", async (req, res) => {
  try {
    const { id_usuario, nome, senha, url_imagem, exp, nivel, tarefas } =
      req.body;

    const existingUser = await Usuario.findOne({ id_usuario: id_usuario });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `id_usuario ${id_usuario} already exists.` });
    }

    const newUser = new Usuario({
      id_usuario,
      nome,
      senha,
      url_imagem,
      exp,
      nivel,
      tarefas: tarefas || [],
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para editar os dados de um usuário específico pelo seu Id
app.put("/api/user/:id_usuario", async (req, res) => {
  try {
    const updateData = req.body;

    // `new: true` retorna o documento atualizado.
    // `runValidators: true` garante que as validações do schema sejam executadas.
    const updatedUser = await Usuario.findOneAndUpdate(
      { id_usuario: req.params.id_usuario },
      updateData,
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res
        .status(404)
        .json({ message: `Usuário com id ${id_usuario} não encontrado.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para deletar um usuário específico pelo seu Id
app.delete("/api/user/:id_usuario", async (req, res) => {
  try {
    const deletedUser = await Usuario.findOneAndDelete({
      id_usuario: req.params.id_usuario,
    });

    if (deletedUser) {
      res
        .status(200)
        .json({ message: `Usuário deletado com sucesso.`, deletedUser });
    } else {
      res.status(404).json({ message: `Usuário não encontrado.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////////////////////////////////////////////////////////////////////

// Endpoint para retornar tarefa por ID
app.get("/api/tarefa/:id_tarefa", async (req, res) => {
  try {
    const tarefa = await Tarefa.findOne({ id_tarefa: req.params.id_tarefa });
    if (tarefa) {
      res.status(200).json(tarefa);
    } else {
      res.status(404).json({ message: `Tarefa não encontrada.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para retornar todas as tarefas
app.get("/api/tarefa", async (req, res) => {
  try {
    const tarefas = await Tarefa.find({});
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para criar uma nova tarefa
app.post("/api/tarefa", async (req, res) => {
  try {
    const { id_tarefa, nome, descricao, dificuldade, habito, frequencia } =
      req.body;

    const existingTask = await Tarefa.findOne({ id_tarefa: id_tarefa });
    if (existingTask) {
      return res
        .status(409)
        .json({ message: `id_tarefa ${id_tarefa} already exists.` });
    }

    const newTask = new Tarefa({
      id_tarefa,
      nome,
      descricao,
      dificuldade,
      habito,
      frequencia,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para editar os dados de uma tarefa por ID
app.put("/api/tarefa/:id_tarefa", async (req, res) => {
  try {
    const updateData = req.body;

    // `new: true` retorna o documento atualizado.
    // `runValidators: true` garante que as validações do schema sejam executadas.
    const updatedTarefa = await Tarefa.findOneAndUpdate(
      { id_tarefa: req.params.id_tarefa },
      updateData,
      { new: true, runValidators: true }
    );

    if (updatedTarefa) {
      res.status(200).json(updatedTarefa);
    } else {
      res.status(404).json({
        message: `Tarefa com id ${req.params.id_tarefa} não encontrada.`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para deletar uma tarefa específica pelo seu Id
app.delete("/api/tarefa/:id_tarefa", async (req, res) => {
  try {
    const deletedTarefa = await Tarefa.findOneAndDelete({
      id_tarefa: req.params.id_tarefa,
    });

    if (deletedTarefa) {
      res
        .status(200)
        .json({ message: `Tarefa deletada com sucesso.`, deletedTarefa });
    } else {
      res.status(404).json({ message: `Tarefa não encontrada.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////////////////////////////////////////////////////////////////////

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
