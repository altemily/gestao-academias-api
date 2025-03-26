const express = require('express');
const dotenv = require('dotenv');
const { pool } = require('./src/config/database'); // Importa a conexão com o banco de dados PostgreSQL

dotenv.config(); // Inicializando o dotenv
const port = process.env.PORTA; // Criando uma variável de ambiente

const app = express(); // Inicializando o express
app.use(express.json()); // Habilitando o uso de JSON

// Criar um novo agendamento
app.post('/treinos', async (requisicao, resposta) => {
  try {
    const { aluno, personalTrainer, data, hora, tipoTreino, status } = requisicao.body;
    
    if (!aluno || !personalTrainer || !data || !hora || !tipoTreino || !status) {
      return res.status(400).json({ mensagem: "Todos os dados devem ser preenchidos." });
    }

    const resultado = await pool.query(
      `INSERT INTO treinos (aluno, personal_trainer, data, hora, tipo_treino, status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [aluno, personalTrainer, data, hora, tipoTreino, status]
    );

    resposta.status(201).json({ mensagem: "Treino criado com sucesso.", treino: resultado.rows[0] });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao criar o treino.", erro: error.message });
  }
});

// Listar treinos agendados
app.get('/treinos', async (requisicao, resposta) => {
  try {
    const resultado = await pool.query("SELECT * FROM treinos");
    resposta.status(200).json(resultado.rows);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao buscar treinos.", erro: error.message });
  }
});

// Buscar agendamento por ID
app.get('/treinos/:id', async (requisicao, resposta) => {
  try {
    const { id } = requisicao.params;
    const resultado = await pool.query("SELECT * FROM treinos WHERE id = $1", [id]);

    if (resultado.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Treino não encontrado." });
    }

    resposta.status(200).json(resultado.rows[0]);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao buscar treino.", erro: error.message });
  }
});

// Atualizar as informações de um agendamento
app.put('/treinos/:id', async (requisicao, resposta) => {
  try {
    const { id } = requisicao.params;
    const { tipoTreino, status } = requisicao.body;

    const resultado = await pool.query(
      `UPDATE treinos SET tipo_treino = COALESCE($1, tipo_treino), 
                         status = COALESCE($2, status) 
       WHERE id = $3 RETURNING *`,
      [tipoTreino, status, id]
    );

    if (resultado.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Treino não encontrado." });
    }

    resposta.status(200).json({ mensagem: "Treino atualizado com sucesso.", treino: resultado.rows[0] });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao atualizar treino.", erro: error.message });
  }
});

// Excluir um agendamento
app.delete('/treinos/:id', async (requisicao, resposta) => {
  try {
    const { id } = requisicao.params;
    const resultado = await pool.query("DELETE FROM treinos WHERE id = $1 RETURNING *", [id]);

    if (resultado.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Treino não encontrado." });
    }

    resposta.status(200).json({ mensagem: "Treino excluído com sucesso." });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao excluir treino.", erro: error.message });
  }
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

