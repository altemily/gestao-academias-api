const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORTA = process.env.PORTA || 3000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
