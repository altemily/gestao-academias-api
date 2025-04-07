const express = require('express');
const app = express();
const alunoRoutes = require('./modules/aluno/routes/index');
const personalTrainerRoutes = require('./modules/personal/routes/index');
const enderecoRoutes = require('./modules/endereco/routes/index'); 
const agendamentoRoutes = require('./modules/agendamento/routes/index');

// Middlewares
app.use(express.json());

// Rotas
app.use('/alunos', alunoRoutes);
app.use('/personal-trainers', personalTrainerRoutes);
app.use('/enderecos', enderecoRoutes); 
app.use('/agendamentos', agendamentoRoutes);

// Middleware para rotas não encontradas
app.use((requisicao, resposta) => {
  resposta.status(404).json({ mensagem: 'Rota não encontrada.' });
});

module.exports = app;
