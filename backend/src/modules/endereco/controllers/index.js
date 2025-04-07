const EnderecoModel = require('../models/index');

class EnderecoController {
  static async criarEndereco(requisicao, resposta) {
    try {
      const { aluno_id, cep, rua, numero, bairro, cidade, estado } = requisicao.body;

      const endereco = await EnderecoModel.criarEndereco(
        aluno_id,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
      );

      return resposta.status(201).json({ mensagem: 'Endereço criado com sucesso.', endereco });
    } catch (erro) {
      return resposta.status(500).json({ mensagem: 'Erro ao criar endereço.', erro: erro.message });
    }
  }

  static async editarEndereco(requisicao, resposta) {
    try {
      const { aluno_id } = requisicao.params;
      const { cep, rua, numero, bairro, cidade, estado } = requisicao.body;

      const enderecoAtualizado = await EnderecoModel.editarEndereco(
        aluno_id,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
      );

      if (enderecoAtualizado.length === 0) {
        return resposta.status(404).json({ mensagem: 'Endereço não encontrado para esse aluno.' });
      }

      return resposta.status(200).json({ mensagem: 'Endereço atualizado com sucesso.', endereco: enderecoAtualizado });
    } catch (erro) {
      return resposta.status(500).json({ mensagem: 'Erro ao editar endereço.', erro: erro.message });
    }
  }

  static async listarEnderecos(requisicao, resposta) {
    try {
      const enderecos = await EnderecoModel.listarEnderecos();
      if (enderecos.length === 0) {
        return resposta.status(404).json({ mensagem: 'Nenhum endereço encontrado.' });
      }
      return resposta.status(200).json(enderecos);
    } catch (erro) {
      return resposta.status(500).json({mensagem: 'Erro ao listar endereços.', erro: erro.message});
    }
  }

  static async listarEnderecoPorAluno(requisicao, resposta) {
    try {
      const aluno_id = requisicao.params.aluno_id;
      const endereco = await EnderecoModel.listarEnderecoPorAluno(aluno_id);
      if (endereco.length === 0) {
        return resposta.status(404).json({ mensagem: 'Endereço não encontrado para esse aluno.' });
      }
      return resposta.status(200).json(endereco);
    } catch (erro) {
      return resposta.status(500).json({mensagem: 'Erro ao buscar endereço.', erro: erro.message});
    }
  }

  static async listarEnderecoPorCidade(requisicao, resposta) {
    try {
      const { cidade } = requisicao.params;
      const enderecos = await EnderecoModel.listarEnderecoPorCidade(cidade);
      if (enderecos.length === 0) {
        return resposta.status(404).json({ mensagem: 'Nenhum endereço encontrado para essa cidade.' });
      }
      return resposta.status(200).json(enderecos);
    } catch (erro) {
      return resposta.status(500).json({mensagem: 'Erro ao buscar por cidade.', erro: erro.message});
    }
  }

  static async listarEnderecoPorCEP(requisicao, resposta) {
    try {
      const { cep } = requisicao.params;
      const enderecos = await EnderecoModel.listarEnderecoPorCEP(cep);
      if (enderecos.length === 0) {
        return resposta.status(404).json({ mensagem: 'Nenhum endereço encontrado para esse CEP.' });
      }
      return resposta.status(200).json(enderecos);
    } catch (erro) {
      return resposta.status(500).json({mensagem: 'Erro ao buscar por CEP.', erro: erro.message});
    }
  }

  static async excluirEndereco(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      await EnderecoModel.excluirEnderecoPorId(id);

      return resposta.status(200).json({ mensagem: 'Endereço excluído com sucesso.' });
    } catch (erro) {
      return resposta.status(500).json({mensagem: 'Erro ao excluir endereço.', erro: erro.message});
    }
  }
}
module.exports = EnderecoController;
