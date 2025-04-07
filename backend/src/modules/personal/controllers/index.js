const PersonalTrainerModel = require('../models/index');

class PersonalTrainerController {
  static async criar(requisicao, resposta) {
    try {
      const { nome, contato } = requisicao.body;

      if (!nome || !contato) {
        return resposta.status(400).json({ mensagem: "Nome e contato são obrigatórios." });
      }

      const novoPersonal = await PersonalTrainerModel.criar(nome, contato);
      resposta.status(201).json({ mensagem: "Personal trainer cadastrado com sucesso!", personal: novoPersonal });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao cadastrar personal trainer.", erro: erro.message });
    }
  }

  static async editar(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const { nome, contato } = requisicao.body;

      if (!nome || !contato) {
        return resposta.status(400).json({ mensagem: "Nome e contato são obrigatórios." });
      }

      const personalAtualizado = await PersonalTrainerModel.editar(id, nome, contato);

      if (personalAtualizado.length === 0) {
        return resposta.status(404).json({ mensagem: "Personal trainer não encontrado." });
      }

      resposta.status(200).json({ mensagem: "Personal trainer atualizado com sucesso!", personal: personalAtualizado });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao atualizar personal trainer.", erro: erro.message });
    }
  }

  static async listar(requisicao, resposta) {
    try {
      const lista = await PersonalTrainerModel.listar();
      resposta.status(200).json(lista);
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao listar personal trainers.", erro: erro.message });
    }
  }

  static async listarPorID(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const resultado = await PersonalTrainerModel.listarPorID(id);

      if (resultado.length === 0) {
        return resposta.status(404).json({ mensagem: "Personal trainer não encontrado." });
      }

      resposta.status(200).json(resultado);
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao buscar personal trainer.", erro: erro.message });
    }
  }

  static async excluirPorID(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const personalExcluir = await PersonalTrainerModel.listarPorID(id);

      if (personalExcluir.length === 0) {
        return resposta.status(404).json({ mensagem: "Personal trainer não encontrado." });
      }

      await PersonalTrainerModel.excluirPorID(id);
      resposta.status(200).json({ mensagem: "Personal trainer excluído com sucesso!" });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao excluir personal trainer.", erro: erro.message });
    }
  }

  static async excluirTodos(requisicao, resposta) {
    try {
      await PersonalTrainerModel.excluirTodos();
      resposta.status(200).json({ mensagem: "Todos os personal trainers foram excluídos com sucesso!" });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao excluir todos os personal trainers.", erro: erro.message });
    }
  }
}

module.exports = PersonalTrainerController;
