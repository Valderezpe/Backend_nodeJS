const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3010

app.use(bodyParser.json())

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

// [POST] / mensagens - Criar uma nova mensagem
app.post('/mensagens', (req, res) => {
  const mensagem = req.body.mensagem
  mensagens.push(mensagem)

  res.send(`Mensagem criada com sucesso: '${mensagem}'.`)
})

// [PUT] / mensagens {id} -- Atualiza uma mensagem pelo ID
app.put('/mensagens/:id', (req, res) => {
  const id = req.params.id - 1
  const mensagem = req.body.mensagem
  mensagens[id] = mensagem

  res.send(`Mensagem atualizada com sucesso:'${mensagem}'.`)
})

// [DELETE] /mensagens {id}  Remover uma mensagem pelo ID
app.delete('/mensagens/:id', (req, res) => {
  const id = req.params.id - 1
  delete mensagens[id]
  res.send('Mensagem removida com sucesso.')
})
app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}`)
})
