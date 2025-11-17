import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (requisicao, resposta) => {
  resposta.json({
    message: 'Aqui é a rota padrão... Hello world'
  });
});

app.post('/', (req, res) => {
  const body = req.body;
  const soma = body.x + body.y;
  res.json(soma);
});

app.post('/login', async (req, res) => {
  const emailDoBanco = 'teste@email.com';
  const senhaDoBnaco = '123456';
  try {
    const { email, senha } = await req.body;

    if (email !== emailDoBanco) {
      throw new Error('Email inválido');
    }
    if (senha !== senhaDoBnaco) {
      throw new Error('Senha inválida');
    }

    res.json('Login efetuado com sucesso!');
  } catch (err) {
    console.error('Erro ao efetuar o login: ' + err);
    res.json('Erro ao efetuar o login: ' + err);
  }
});

app.listen(3000, () => {
  console.log(`Aplicação rodando na porta 3000`);
});
