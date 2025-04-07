function validarEndereco(requisicao, resposta, next) {
  const { cep, rua, numero, bairro, cidade, estado } = requisicao.body;

  if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
    return resposta.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  next(); 
}

function validarComAluno(requisicao, resposta, next) {
  const { aluno_id, cep, rua, numero, bairro, cidade, estado } = requisicao.body;

  if (!aluno_id || !cep || !rua || !numero || !bairro || !cidade || !estado) {
    return resposta.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  next();
}

module.exports = {validarEndereco, validarComAluno};
