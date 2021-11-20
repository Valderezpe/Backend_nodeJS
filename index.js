const express = require('express')
const app = express()

const port = 3010

app.get('/', (req, res) => {
  res.send('Backend_API')
})

const mensagens = ['Essa é a primeira mensagem', 'Essa é a segunda mensagem']

app.get('/mensagens', (req, res) => {
  res.send(mensagens)
})

// [GET] / mensagens/ {id} - Retorna uma única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
  const id = req.params.id - 1
  const mensagem = mensagens[id]

  res.send(mensagem)
})
app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}`)
})
