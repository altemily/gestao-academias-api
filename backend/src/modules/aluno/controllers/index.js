const AlunoModel = require('../models');

class AlunoController {
  static async criar(requisicao, resposta) {
    try {
      const { nome, email, telefone } = requisicao.body;
      const novoAluno = await AlunoModel.criar(nome, email, telefone);
      resposta.status(201).json({ mensagem: "Aluno criado com sucesso!", aluno: novoAluno });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao criar aluno.", erro: erro.message });
    }
  }

  static async listar(requisicao, resposta) {
    try {
      const alunos = await AlunoModel.listar();
      if (alunos.length === 0) {
        return resposta.status(404).json({ mensagem: "Nenhum aluno encontrado." });
      }
      resposta.status(200).json(alunos);
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao buscar alunos.", erro: erro.message });
    }
  }

  static async listarPorID(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const aluno = await AlunoModel.listarPorID(id);
      if (aluno.length === 0) {
        return resposta.status(404).json({ mensagem: "Aluno não encontrado." });
      }
      resposta.status(200).json(aluno[0]);
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao buscar aluno.", erro: erro.message });
    }
  }

  static async editar(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const { nome, email, telefone } = requisicao.body;
      const alunoAtualizado = await AlunoModel.editar(id, nome, email, telefone);

      if (alunoAtualizado.length === 0) {
        return resposta.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      resposta.status(200).json({ mensagem: "Aluno atualizado com sucesso!", aluno: alunoAtualizado[0] });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao atualizar aluno.", erro: erro.message });
    }
  }

  static async excluirPorID(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const aluno = await AlunoModel.listarPorID(id);

      if (aluno.length === 0) {
        return resposta.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      await AlunoModel.excluirPorID(id);
      resposta.status(200).json({ mensagem: "Aluno excluído com sucesso!" });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao excluir aluno.", erro: erro.message });
    }
  }

  static async excluirTodos(requisicao, resposta) {
    try {
      await AlunoModel.excluirTodos();
      resposta.status(200).json({ mensagem: "Todos os alunos foram excluídos com sucesso!" });
    } catch (erro) {
      resposta.status(500).json({ mensagem: "Erro ao excluir todos os alunos.", erro: erro.message });
    }
  }
}

module.exports = AlunoController;
