const axios = require('axios');
const { pool } = require('../../../config/database');

class EnderecoModel {

  static async criarEndereco(aluno_id, cep, numero) {
    const viaCep = `https://viacep.com.br/ws/${cep}/json/`;
    try {
      const resposta = await axios.get(viaCep);

      if (resposta.data.erro) {
        throw new Error("CEP inválido ou não encontrado.");
      }

      const { logradouro, bairro, localidade, uf } = resposta.data
      const dados = [
        aluno_id,
        cep,
        logradouro,
        numero,
        bairro,
        localidade,
        uf
      ];
      const consulta = `INSERT INTO enderecos(aluno_id, cep, rua, numero, bairro, cidade, estado)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING *`;

      const novoEndereco = await pool.query(consulta, dados);
      return novoEndereco.rows;

    } catch (erro) {
      throw new Error(`Erro ao buscar endereço no ViaCEP: ${erro.message}`);
    }
  }

  static async editarEndereco(aluno_id, cep, numero) {
    const viaCep = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const resposta = await axios.get(viaCep);

      if (resposta.data.erro) {
        throw new Error("CEP inválido ou não encontrado.");
      }

      const { logradouro, bairro, localidade, uf } = resposta.data;
      const dados = [
        cep,
        logradouro,
        numero,
        bairro,
        localidade,
        uf,
        aluno_id
      ];
      const consulta = `UPDATE enderecos 
                        SET cep = $1, rua = $2, numero = $3, bairro = $4, cidade = $5, estado = $6, 
                        WHERE aluno_id = $7 RETURNING *`;
      const enderecoAtualizado = await pool.query(consulta, dados);
      return enderecoAtualizado.rows;

    } catch (erro) {
      throw new Error(`Erro ao atualizar endereço com dados do ViaCEP: ${erro.message}`);
    }
  }

  static async listarEnderecos() {
    const consulta = `SELECT * FROM enderecos`;
    const resultado = await pool.query(consulta);
    return resultado.rows;
  }

  static async listarEndereco(matricula) {
    const dados = [matricula];
    const consulta = `SELECT * FROM enderecos WHERE aluno_id = $1`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }

  static async listarEnderecoCEP(cep) {
    const dados = [cep];
    const consulta = `SELECT * FROM enderecos WHERE cep = $1`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }

  static async listarEnderecoCidade(localidade) {
    const dados = [localidade];
    const consulta = `SELECT * FROM enderecos WHERE cidade = $1`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }
}

module.exports = EnderecoModel;
