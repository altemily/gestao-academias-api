cont { pool} = require('../../../config/database');

class TreinoModel{

    static async criar(aluno, personalTrainer, data, hora, tipoTreino, status){
        const dados = [aluno, personalTrainer, data, hora, tipoTreino, status]
        const consulta = `INSERT INTO treinos(aluno, personalTrainer, data, hora, tipoTreino, status) RETURNING *`
        const novoTreino = await pool.query(consulta, dados)
        return novoTreino.rows
    }

    static async editar(aluno, personalTrainer, data, hora, tipoTreino, status){
        
    }

}