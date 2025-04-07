const { pool } = require('../../../config/database');

class PersonalTrainerModel {
  static async criar(nome, contato) {
    const dados = [nome, contato];
    const consulta = `INSERT INTO personal_trainers (nome, contato)
                      VALUES ($1, $2) RETURNING *`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }

  static async editar(id, nome, contato) {
    const dados = [id, nome, contato];
    const consulta = `UPDATE personal_trainers
                      SET nome = $2, contato = $3
                      WHERE id = $1 RETURNING *`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }

  static async listar() {
    const consulta = `SELECT * FROM personal_trainers`;
    const resultado = await pool.query(consulta);
    return resultado.rows;
  }

  static async listarPorID(id) {
    const consulta = `SELECT * FROM personal_trainers WHERE id = $1`;
    const resultado = await pool.query(consulta, [id]);
    return resultado.rows;
  }

  static async excluirPorID(id) {
    const consulta = `DELETE FROM personal_trainers WHERE id = $1`;
    await pool.query(consulta, [id]);
  }

  static async excluirTodos() {
    const consulta = `DELETE FROM personal_trainers`;
    await pool.query(consulta);
  }
}

module.exports = PersonalTrainerModel;
