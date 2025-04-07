const express = require('express');
const EnderecoController = require('../controllers/index');
const { validarComAluno, validarEndereco } = require('../../../middlewares/validarEndereco');

const rotas = express.Router();

rotas.post('/enderecos', validarComAluno, EnderecoController.criarEndereco);
rotas.put('/enderecos/:aluno_id', validarEndereco, EnderecoController.editarEndereco);
rotas.get('/enderecos', EnderecoController.listarEnderecos);
rotas.get('/enderecos/aluno/:aluno_id', EnderecoController.listarEnderecoPorAluno);
rotas.get('/enderecos/cidade/:cidade', EnderecoController.listarEnderecoPorCidade);
rotas.get('/enderecos/cep/:cep', EnderecoController.listarEnderecoPorCEP);
rotas.delete('/enderecos/:id', EnderecoController.excluirEndereco);

module.exports = rotas;
