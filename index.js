const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Inicializando o dotenv

const port = process.env.PORTA; // Criando uma variável de ambiente
const app = express(); // Inicializando o express

app.use(express.json()); // Habilitando o uso de JSON

const bancoDados = []; // Criando um banco de dados 


// Criar um novo agendamento
app.post('/treinos', (requisicao, resposta) => {
  try {
    const { id, aluno, personalTrainer, data, hora, tipoTreino, status } = requisicao.body;
    
    if (!id || !aluno || !personalTrainer || !data || !hora || !tipoTreino || !status) {
      return resposta.status(400).json({ mensagem: "Todos os dados devem ser preenchidos." });
    }

    const novoTreino = { id, aluno, personalTrainer, data, hora, tipoTreino, status };
    bancoDados.push(novoTreino);
    
    resposta.status(201).json({ mensagem: "Treino criado com sucesso." });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao criar o treino.", erro: error.message });
  }
});

// Listar treinos agendados
app.get('/treinos', (requisicao, resposta) => {
  try {
    if (bancoDados.length === 0) {
      return resposta.status(200).json({ mensagem: "Banco de dados vazio." });
    }
    resposta.status(200).json(bancoDados);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao buscar treinos.", erro: error.message });
  }
});

// Buscar agendamento por ID
app.get('/treinos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const treino = bancoDados.find(elemento => elemento.id == id);
    if (!treino) {
      return resposta.status(404).json({ mensagem: "Treino não encontrado." });
    }
    
    return resposta.status(200).json(treino);
  } catch (error) {
    return resposta.status(500).json({ mensagem: "Erro ao buscar treino.", erro: error.message });
  }
});

// Atualizar as informações de um agendamento
app.put('/treinos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const { novoTipoTreino, novoStatus } = requisicao.body;

    const treino = bancoDados.find(elemento => elemento.id == id); 
    
    if (!treino) {
      return resposta.status(404).json({ mensagem: "Treino não encontrado." });
    }

    if (!novoTipoTreino && !novoStatus) {
      return resposta.status(400).json({ mensagem: "Os dados devem ser preenchidos." });
    }

    if (novoTipoTreino) treino.tipoTreino = novoTipoTreino;
    if (novoStatus) treino.status = novoStatus;

    return resposta.status(200).json({ mensagem: "Treino atualizado com sucesso." });
  } catch (error) {
    return resposta.status(500).json({ mensagem: "Erro ao atualizar treino.", erro: error.message });
  }
});

// Excluir um agendamento
app.delete('/treinos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const index = bancoDados.findIndex(elemento => elemento.id == id); 
    
    if (index === -1) {
      return resposta.status(404).json({ mensagem: "Treino não encontrado." });
    }

    bancoDados.splice(index, 1);
    return resposta.status(200).json({ mensagem: "Treino excluído com sucesso." });
  } catch (error) {
    return resposta.status(500).json({ mensagem: "Erro ao excluir treino.", erro: error.message });
  }
});
// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});