const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
