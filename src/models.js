// Banco de Dados
const mongoose = require('mongoose');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/fmp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir o esquema para os exercícios
const exerciseSchema = new mongoose.Schema({
    exerciseId: Number,
    name: String,
    unitXp: Number,
});

// Definir o esquema para o usuário
const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    password: String,
    exercises: [exerciseSchema],
    xpTotal: Number,
    level: Number,
    xpNextLevel: Number,
});

// Criar os modelos
const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);

// Função para salvar os dados
const saveData = async () => {
    // Salvar exercícios
    const exercises = [
        { exerciseId: 1, name: 'Push-up', unitXp: 10 },
        { exerciseId: 2, name: 'Squat', unitXp: 10 },
        { exerciseId: 3, name: 'Walking', unitXp: 150 },
        { exerciseId: 4, name: 'Water', unitXp: 300 },
    ];

    await Exercise.insertMany(exercises);

    // Salvar usuário
    const user = {
        userId: 1,
        name: 'User 1',
        email: 'user@gmail.com',
        password: '123456',
        exercises: exercises,
        xpTotal: 0,
        level: 1,
        xpNextLevel: 100,
    };

    await User.create(user);
    console.log('Dados salvos com sucesso!');
};

// Executar a função de salvar dados
saveData().then(() => {
    mongoose.connection.close();
}).catch(err => {
    console.error('Erro ao salvar dados:', err);
});
