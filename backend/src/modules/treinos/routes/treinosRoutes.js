const express = require('express');
const TreinoController = require('../controllers/treinosControllers');

const router = express.Router();

router.post('/treino', TreinoController.criar);
router.put('/treino/:id', TreinoController.editar);
router.get('/treino', TreinoController.listar);
router.get('/treino/:id', TreinoController.listarPorID);
router.delete('/treino/:id', TreinoController.excluirPorID);
router.delete('/treino', TreinoController.excluirTodos);


module.exports = router;