const AgendamentoModel = require('../models/index');

class AgendamentoController {
  static async criar(requisicao, resposta) {
    try {
      const { aluno_id, personal_id, data, horario, tipo_treino, status } = requisicao.body;

      const novoAgendamento = await AgendamentoModel.criarAgendamento(
        aluno_id,
        personal_id,
        data,
        horario,
        tipo_treino,
        status
      );

      return resposta.status(201).json(novoAgendamento);
    } catch (erro) {
      return resposta.status(500).json({ mensagem: erro.message });
    }
  }

  static async editar(requisicao, resposta) {
    try {
      const { id } = requisicao.params;
      const { data, horario, tipo_treino, status } = requisicao.body;

      const agendamentoAtualizado = await AgendamentoModel.editarAgendamento(
        id,
        data,
        horario,
        tipo_treino,
        status
      );
      // Formata a data no padrão brasileiro
      const agendamentoEditado = {...agendamentoAtualizado[0],
        data: new Date(agendamentoAtualizado[0].data).toLocaleDateString('pt-BR'),
      };

      return resposta.status(200).json(agendamentoEditado);
    } catch (erro) {
      return resposta.status(500).json({ mensagem: erro.message });
    }
  }

  static async listarTodos(requisicao, resposta) {
    try {
      const agendamentos = await AgendamentoModel.listarAgendamentos();

      const agendamentosFormatados = agendamentos.map((agendamento) => ({
        ...agendamento,
        data: new Date(agendamento.data).toLocaleDateString('pt-BR'),
      }));

      return resposta.status(200).json(agendamentosFormatados);
    } catch (erro) {
      return resposta.status(500).json({ mensagem: erro.message });
    }
  }

  static async listarPorId(requisicao, resposta) {
    try {
      const { id } = requisicao.params;
      const agendamento = await AgendamentoModel.listarAgendamentoPorId(id);

      if (agendamento.length === 0) {
        return resposta.status(404).json({ mensagem: 'Agendamento não encontrado.' });
      }

      const agendamentoFormatado = {...agendamento[0],
        data: new Date(agendamento[0].data).toLocaleDateString('pt-BR'),
      };

      return resposta.status(200).json(agendamentoFormatado);
    } catch (erro) {
      return resposta.status(500).json({ mensagem: erro.message });
    }
  }

  static async listarPorAluno(requisicao, resposta) {
    try {
      const { aluno_id } = requisicao.params;
      const agendamentos = await AgendamentoModel.listarAgendamentosPorAluno([aluno_id]);

      const agendamentosFormatados = agendamentos.map((agendamento) => ({
        ...agendamento,
        data: new Date(agendamento.data).toLocaleDateString('pt-BR'),
      }));

      return resposta.status(200).json(agendamentosFormatados);
    } catch (erro) {
      return resposta.status(500).json({ mensagem: erro.message });
    }
  }

  static async excluir(requisicao, resposta) {
    try {
      const { id } = requisicao.params;
      await AgendamentoModel.excluirAgendamento([id]);

      return resposta.status(204).json();
    } catch (erro) {
      return resposta.status(500).json({ mensagem: erro.message });
    }
  }
}

module.exports = AgendamentoController;
