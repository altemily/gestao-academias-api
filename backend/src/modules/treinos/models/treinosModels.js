const { pool} = require('../../../config/database');

class TreinoModel{

    static async criar(aluno, personalTrainer, data, hora, tipoTreino, status){
        const dados = [aluno, personalTrainer, data, hora, tipoTreino, status]
        const consulta = `INSERT INTO treinos(aluno, personalTrainer, data, hora, tipoTreino, status) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const novoTreino = await pool.query(consulta, dados)
        return novoTreino.rows
    }

    static async editar(id, aluno, personalTrainer, data, hora, tipoTreino, status){
        const dados = [id, aluno, personalTrainer, data, hora, tipoTreino, status]
        const consulta = `UPDATE treinos SET aluno = $2 personalTrainer = $3, data = $4, hora = $5, tipoTreino = $6, status = $7 WHERE id = $1 RETURNING *`
        const treinoAtualizado = await pool.query(consulta, dados);
        return treinoAtualizado.rows
    }

    static async listar(){
        const consulta = `SELECT * FROM treinos`
        const treino = await pool.query(consulta)
        return treino.rows
    }

    static async listarPorID(id){
        const dados = [id]
        const consulta = `SELECT * FROM treinos WHERE id = $1`
        const treino = await pool.query(consulta, dados)
        return treino.rows
    }

    static async excluirPorID(id){
        const dados = [id]
        const consulta = `DELETE FROM treinos WHERE id = $1`
        await pool.query(consulta, dados)
    }

    static async excluirTodos(){
        const consulta = `DELETE FROM treinos`
        await pool.query(consulta)
    }

}


module.exports = TreinoModel;