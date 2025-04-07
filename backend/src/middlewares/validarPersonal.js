function validarPersonal(requisicao, resposta, next) {
  const { nome, contato } = requisicao.body;

  if (!nome || !contato) {
    return resposta.status(400).json({ mensagem: "Nome e contato são obrigatórios." });
  }

  const nomeValido = nome.length >= 3;
  const contatoValido = contato.length >= 8;

  if (!nomeValido) {
    return resposta.status(400).json({ mensagem: "Nome deve ter pelo menos 3 caracteres." });
  }

  if (!contatoValido) {
    return resposta.status(400).json({ mensagem: "Contato deve ter pelo menos 8 caracteres." });
  }

  next();
}

module.exports = validarPersonal;
