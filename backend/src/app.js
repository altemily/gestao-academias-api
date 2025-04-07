const express = require('express');
const app = express();
const alunoRoutes = require('./modules/aluno/routes/index')
const personalTrainerRotas = require('./modules/personal/routes/index');

// Middlewares
app.use(express.json());

// Rotas
app.use('/alunos', alunoRoutes);
app.use('/personal-trainers', personalTrainerRotas);


// Middleware para rotas não encontradas
app.use((requisicao, resposta) => {
  resposta.status(404).json({ mensagem: 'Rota não encontrada.' });
});

module.exports = app;
