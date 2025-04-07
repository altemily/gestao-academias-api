function validarAgendamento(requisicao, resposta, next) {
  const { aluno_id, personal_id, data, horario, tipo_treino, status } = requisicao.body;

  // Verifica campos obrigatórios
  if (!aluno_id || !personal_id || !data || !horario || !tipo_treino || !status) {
    return resposta.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  // Valida a data (esperado formato AAAA-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return resposta.status(400).json({ mensagem: 'Formato da data inválido. Use AAAA-MM-DD.' });
  }

  // Valida o horário (formato HH:MM)
  if (!/^\d{2}:\d{2}$/.test(horario)) {
    return resposta.status(400).json({ mensagem: 'Formato do horário inválido. Use HH:MM.' });
  }

  // Valida os status permitidos
  const statusPermitidos = ['pendente', 'confirmado', 'cancelado'];
  if (!statusPermitidos.includes(status)) {
    return resposta.status(400).json({ mensagem: 'Status inválido. Use pendente, confirmado ou cancelado.' });
  }

  next();
}

module.exports = validarAgendamento;
