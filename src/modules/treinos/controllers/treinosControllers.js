const TreinoModel = require('../models/treinoModel');

class TreinoController {
  static async criar(requisicao, resposta) {
    try {
      const { aluno, personalTrainer, data, hora, tipoTreino, status } = requisicao.body;
      
      if (!aluno || !personalTrainer || !data || !hora || !tipoTreino || !status) {
        return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos!" });
      }

      const novoTreino = await TreinoModel.criar(aluno, personalTrainer, data, hora, tipoTreino, status);
      resposta.status(201).json({ mensagem: "Treino criado com sucesso!", treino: novoTreino });
    } catch (error) {
      resposta.status(500).json({ mensagem: "Erro ao criar treino.", erro: error.message });
    }
  }

  static async editar(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const { aluno, personalTrainer, data, hora, tipoTreino, status } = requisicao.body;

      if (!aluno || !personalTrainer || !data || !hora || !tipoTreino || !status) {
        return resposta.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
      }

      const treinoAtualizado = await TreinoModel.editar(aluno, personalTrainer, data, hora, tipoTreino, status);

      if (treinoAtualizado.length === 0) {
        return resposta.status(404).json({ mensagem: "Treino não encontrado." });
      }

      resposta.status(200).json({ mensagem: "Treino atualizado com sucesso!", treino: treinoAtualizado });
    } catch (error) {
      resposta.status(500).json({ mensagem: "Erro ao atualizar treino.", erro: error.message });
    }
  }

  static async listar(requisicao, resposta) {
    try {
      const treino = await TreinoModel.listar();
      
      if (treino.length === 0) {
        return resposta.status(404).json({ mensagem: "Não existem treinos cadastrados." });
      }

      resposta.status(200).json(treino);
    } catch (error) {
      resposta.status(500).json({ mensagem: "Erro ao buscar treinos.", erro: error.message });
    }
  }

  static async listarPorID(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const treino = await TreinoModel.listarPorAluno(id); 

      if (treino.length === 0) {
        return resposta.status(404).json({ mensagem: "Treino não encontrado." });
      }

      resposta.status(200).json(treino);
    } catch (error) {
      resposta.status(500).json({ mensagem: "Erro ao buscar treino.", erro: error.message });
    }
  }

  static async excluirPorID(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const treinoExcluido = await TreinoModel.listarPorAluno(id); 
      
      if (treinoExcluido.length === 0) {
        return resposta.status(404).json({ mensagem: "Treino não encontrado!" });
      }

      await TreinoModel.excluirPorAluno(id);
      resposta.status(200).json({ mensagem: "Treino excluído com sucesso!" });
    } catch (error) {
      resposta.status(500).json({ mensagem: "Erro ao excluir treino.", erro: error.message });
    }
  }

  static async excluirTodos(requisicao, resposta) {
    try {
      await TreinoModel.excluirTodos();
      resposta.status(200).json({ mensagem: "Todos os treinos foram excluídos com sucesso!" });
    } catch (error) {
      resposta.status(500).json({ mensagem: "Erro ao excluir todos os treinos.", erro: error.message });
    }
  }
}

module.exports = TreinoController;
