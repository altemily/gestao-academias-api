const { pool } = require('../../../config/database');

class AgendamentoModel {
  static async criarAgendamento(aluno_id, personal_id, data, horario, tipo_treino, status) {
    const query = ` INSERT INTO agendamentos (aluno_id, personal_id, data, horario, tipo_treino, status)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const valores = [aluno_id, personal_id, data, horario, tipo_treino, status];
    const resultado = await pool.query(query, valores);
    return resultado.rows;
  }

  static async listarAgendamentos() {
    const query = `SELECT * FROM agendamentos ORDER BY data, horario`;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  static async listarAgendamentoPorId(id) {
    const query = `SELECT * FROM agendamentos WHERE id = $1`;
    const resultado = await pool.query(query, [id]);
    return resultado.rows;
  }

  static async listarAgendamentosPorAluno(aluno_id) {
    const consulta = `SELECT * FROM agendamentos WHERE aluno_id = $1 ORDER BY data, horario`;
    const resultado = await pool.query(consulta, aluno_id);
    return resultado.rows;
  }

  static async editarAgendamento(id, data, horario, tipo_treino, status) {
    const consulta = `  UPDATE agendamentos 
                        SET data = $1, horario = $2, tipo_treino = $3, status = $4
                        WHERE id = $5 RETURNING *`;
    const valores = [data, horario, tipo_treino, status, id];
    const resultado = await pool.query(consulta, valores);
    return resultado.rows;
  }

  static async excluirAgendamento(id) {
    const consulta = `DELETE FROM agendamentos WHERE id = $1`;
    await pool.query(consulta, id);
  }
}

module.exports = AgendamentoModel;
