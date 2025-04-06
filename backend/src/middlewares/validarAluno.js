function validarAluno(requisicao, resposta, next) {

  const { nome, email, telefone } = requisicao.body;
  if (!nome || !email || !telefone) {
    return resposta.status(400).json({ mensagem: 'Os campos nome, email e telefone são obrigatórios.' });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return resposta.status(400).json({ mensagem: 'Formato de e-mail inválido.' });
  }

  const telefoneValido = /^\d{10,11}$/.test(telefone);
  if (!telefoneValido) {
    return resposta.status(400).json({ mensagem: 'O telefone deve conter apenas números, com 10 ou 11 dígitos.' });
  }

  next();

}

module.exports =  validarAluno;
