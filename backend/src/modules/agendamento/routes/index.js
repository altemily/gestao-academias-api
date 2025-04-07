const express = require('express');
const AgendamentoController = require('../controllers/index');
const validarAgendamento = require('../../../middlewares/validarAgendamento');

const routes = express.Router();

routes.post('/agendamentos', validarAgendamento, AgendamentoController.criar);
routes.put('/agendamentos/:id', validarAgendamento, AgendamentoController.editar);
routes.get('/agendamentos', AgendamentoController.listarTodos);
routes.get('/agendamentos/:id', AgendamentoController.listarPorId);
routes.get('/agendamentos/aluno/:aluno_id', AgendamentoController.listarPorAluno);
routes.delete('/agendamentos/:id', AgendamentoController.excluir);

module.exports = routes;
