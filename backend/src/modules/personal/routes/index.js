const express = require('express');
const PersonalTrainerController = require('../controllers/index');
const validarPersonal = require('../../../middlewares/validarPersonal');

const rotas = express.Router();

rotas.post('/', validarPersonal, PersonalTrainerController.criar);
rotas.put('/:id', validarPersonal, PersonalTrainerController.editar);
rotas.get('/', PersonalTrainerController.listar);
rotas.get('/:id', PersonalTrainerController.listarPorID);
rotas.delete('/:id', PersonalTrainerController.excluirPorID);
rotas.delete('/', PersonalTrainerController.excluirTodos);

module.exports = rotas;
