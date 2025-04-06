const { pool } = require('../../../config/database');

class AlunoModel {
  static async criar(nome, email, telefone) {
    const dados = [nome, email, telefone];
    const consulta = `
      INSERT INTO alunos (nome, email, telefone)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows[0];
  }

  static async editar(id, nome, email, telefone) {
    const dados = [id, nome, email, telefone];
    const consulta = `
      UPDATE alunos
      SET nome = $2, email = $3, telefone = $4
      WHERE id = $1
      RETURNING *`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows[0];
  }

  static async listar() {
    const consulta = `SELECT * FROM alunos`;
    const resultado = await pool.query(consulta);
    return resultado.rows;
  }

  static async listarPorID(id) {
    const dados = [id];
    const consulta = `SELECT * FROM alunos WHERE id = $1`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows[0];
  }

  static async excluirPorID(id) {
    const dados = [id];
    const consulta = `DELETE FROM alunos WHERE id = $1`;
    await pool.query(consulta, dados);
  }

  static async excluirTodos() {
    const consulta = `DELETE FROM alunos`;
    await pool.query(consulta);
  }
}

module.exports = AlunoModel;
