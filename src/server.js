const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI || 'o';
const PORT = process.env.PORT || 3500;

console.log(MONGODB_URI);

// Conectar ao MongoDB
/* istanbul ignore next */
try {
    mongoose.connect(MONGODB_URI);
} catch (error) {
    console.log("MongoDB connection error:" + error)
}

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
    level: Number
});

// Criar os modelos
const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('user', userSchema);

//integrantes do grupo
const data = {
    integrantes: [
        { nome: 'Gabriel Antônio' },
        { nome: '' },
        { nome: '' },
        { nome: '' }
    ]
};

//metodo chamar integrantes
app.get('/integrantes', (req, res) => {
    res.json(data);
});

// API para retornar todos os usuários
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ userId: 1 }); // Ordena em ordem crescente pelo campo userId
        
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
        /* istanbul ignore next */
        res.status(500).json({ message: err.message });
    }
});

// API para retornar apenas um usuário específico pelo seu Id
app.get('/api/user/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });

        if (user) {
            const exercises = await Exercise.find({ exerciseId: { $in: user.exercises } });
            /* istanbul ignore next */
            const search = {
                ...user.toObject(),
                exercises: exercises.map(exercise => ({
                    exerciseId: exercise.exerciseId,
                    name: exercise.name
                }))
            };
            res.status(200).json(search);
        } else {
            res.status(404).json({ message: `UserId ${req.params.userId} couldn't be found.` });
        }
    } catch (err) {
        /* istanbul ignore next */
        res.status(500).json({ message: err.message });
    };
});

// API para retornar todos os exercícios
app.get('/api/exercises', async (req, res) => {
    try {
        const users = await Exercise.find();

        res.status(200).json(users);
    } catch (err) {
        /* istanbul ignore next */
        res.status(500).json({ message: err.message });
    }
});

// API para retornar apenas um exercício específico pelo seu Id
/* istanbul ignore next */
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

// API para criar um novo usuário
/* istanbul ignore next */
app.post('/api/user', async (req, res) => {
    try {
        const newUser = {
            userId: req.body.userId,
            name: req.body.name,
            email: req.body.email,
            tel: req.body.tel,
            exercises: [],
            xpTotal: 0,
            level: 1
        }

        const user = await User.create(newUser);

        res.status(201).json({ message: `User ${req.body.userId} sucessfully created.`, data: user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API para editar os dados de um usuário específico pelo seu Id
/* istanbul ignore next */
app.put('/api/user/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });

        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.tel = req.body.tel;
            user.exercises = req.body.exercises;
            
            // Verificação de modificação e salvamento
            if (user.isModified('exercises')) {
                await user.save();
            }

            res.status(200).json({ message: `User ${req.params.userId} sucessfully updated.`, data: user});
        } else {
            res.status(404).json({ message: `UserId ${req.params.userId} couldn't be found.` });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// API para excluir um usuário específico pelo seu Id
/* istanbul ignore next */
app.delete('/api/user/:userId', async (req, res) => {
    try {
        /*const user = */await User.findOneAndDelete({ userId: req.params.userId });

        res.status(200).json({ message: `User ${req.params.userId} sucessfully deleted.`});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Iniciar o servidor
/* istanbul ignore next */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Exportar o app para os testes