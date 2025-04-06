const express = require('express');
const AlunoController = require('../controllers/index');
const validarAluno = require('../../../middlewares/validarAluno');

const router = express.Router();


router.post('/', validarAluno, AlunoController.criar);
router.get('/', AlunoController.listar);
router.get('/:id', AlunoController.listarPorID);
router.put('/:id', validarAluno, AlunoController.editar);
router.delete('/:id', AlunoController.excluirPorID);
router.delete('/', AlunoController.excluirTodos);

module.exports = router;
