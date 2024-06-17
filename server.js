const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');


app.use(bodyParser.text());

app.post('/create-corrida', (req, res) => {
  const data = req.body;
  fs.writeFile('public/corrida.txt', data, (err) => {
    if (err) {
      console.error('Erro ao criar o arquivo:', err);
      return res.status(500).send('Erro ao criar o arquivo');
    }
    res.send('Arquivo criado com sucesso');
  });
});


app.use(express.static('public')); // Serve arquivos estáticos da pasta "public"

app.delete('/delete-corrida', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'corrida.txt');

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Erro ao excluir o arquivo:', err);
      return res.status(500).send('Erro ao excluir o arquivo');
    }

    res.send('Arquivo excluído com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
