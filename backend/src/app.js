const express = require('express');
const app = express();
const alunoRoutes = require('./modules/aluno/routes/index')

// Middlewares
app.use(express.json());

// Rotas
app.use('/alunos', alunoRoutes);



// Middleware para rotas não encontradas
app.use((requisicao, resposta) => {
  resposta.status(404).json({ mensagem: 'Rota não encontrada.' });
});

module.exports = app;
