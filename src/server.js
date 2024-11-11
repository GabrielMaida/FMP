const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://GabrielAntonio:cesusc2024@cluster0.vs1rl.mongodb.net/FMP';
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(MONGODB_URI)
    .catch(err => console.log("MongoDB connection error"));

// Definir o esquema para os exercícios
const exerciseSchema = new mongoose.Schema({
    exerciseId: Number,
    name: String,
    unitXp: Number,
    category: { type: String, enum: ['peito', 'pernas', 'costas', 'cardio', 'abdômen', 'ombro'] }
});

// Definir o esquema para o usuário
const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    tel: String,
    exercises: [{ type: Number }],
    xpTotal: Number,
    level: Number,
});

// Criar os modelos
const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('user', userSchema);

// API para retornar todos os usuários
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        
        // Para cada usuário, buscar os exercícios correspondentes
        const usersWithExercises = await Promise.all(users.map(async (user) => {
            const exercises = await Exercise.find({ exerciseId: { $in: user.exercises } });
            return {
                ...user.toObject(),
                exercises: exercises.map(exercise => ({
                    exerciseId: exercise.exerciseId,
                    name: exercise.name
                }))
            };
        }));

        res.status(200).json(usersWithExercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API para retornar apenas um usuário específico pelo seu Id
app.get('/api/user/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });

        if (user) {
            const exercises = await Exercise.find({ exerciseId: { $in: user.exercises } });
            res.status(200).json({
                ...user.toObject(),
                exercises: exercises.map(exercise => ({
                    exerciseId: exercise.exerciseId,
                    name: exercise.name
                }))
            });
        } else {
            res.status(404).json({ message: `UserId ${req.params.userId} couldn't be found.` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// API para retornar todos os exercícios
app.get('/api/exercises', async (req, res) => {
    try {
        const users = await Exercise.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API para retornar apenas um exercício específico pelo seu Id
app.get('/api/exercise/:exerciseId', async (req, res) => {
    try {
        const exercise = await Exercise.findOne({ exerciseId: req.params.exerciseId });

        if (exercise) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ message: `ExerciseId ${req.params.exerciseId} couldn't be found.` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*
// Função para salvar os dados
const saveUser = async () => {
    // Salvar usuário
    const user = {
        userId: 1,
        name: 'User 1',
        email: 'user@gmail.com',
        tel: '48912345678',
        exercises: [2,3,6,8],
        xpTotal: 0,
        level: 1
    };

    await User.create(user);
    console.log('Data saved sucessfully!');
};


// Executar a função de salvar dados
saveUser().then(() => {
    mongoose.connection.close();
}).catch(err => {
    console.error('Saving data error:', err);
});*/