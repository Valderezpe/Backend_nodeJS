const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb');
(async () => {
  const connectionString = 'mongodb://localhost:27017/server_banco'

  console.info('Conectando ao banco mongoDB...')

  const options = {
    useUnifiedTopology: true
  }

  const client = await mongodb.MongoClient.connect(connectionString, options)

  const app = express()

  const port = 3010

  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.send('Backend_API')
  })

  const db = client.db('server_banco');
  const mensagens = db.collection('mensagens');
 
  const getMensagensValidas =() => mensagens.find({}).toArray();

  const getMensagemById = id => getMensagensValidas().find(msg => msg.id === id)

  app.get('/mensagens', async(req, res) => {

    res.send(  await getMensagensValidas())
  })

  // [GET] / mensagens/ {id} - Retorna uma única mensagem pelo ID
  app.get('/mensagens/:id', (req, res) => {
    const id = +req.params.id

    const mensagem = getMensagemById(id)

    if (!mensagem) {
      res.send('Mensagem não encontrada.')

      return
    }

    res.send(mensagem)
  })

  // [POST] / mensagens - Criar uma nova mensagem
  app.post('/mensagens', (req, res) => {
    const mensagem = req.body

    if (!mensagem || !mensagem.texto) {
      res.send('Mensagem inválida.')

      return
    }
    mensagem.id = mensagens.length + 1
    mensagens.push(mensagem)

    res.send(mensagem)
  })

  // [PUT] / mensagens {id} -- Atualiza uma mensagem pelo ID
  app.put('/mensagens/:id', (req, res) => {
    const id = +req.params.id

    const mensagem = getMensagemById(id)

    const novoTexto = req.body.texto

    if (!novoTexto) {
      res.send('Mensagem inválida.')

      return
    }
    mensagem.texto = novoTexto

    res.send(mensagem)
  })

  // [DELETE] /mensagens {id}  Remover uma mensagem pelo ID
  app.delete('/mensagens/:id', (req, res) => {
    const id = +req.params.id

    const mensagem = getMensagemById(id)

    if (!mensagem) {
      res.send('Mensagem não encontrada.')
      return
    }

    const index = mensagens.indexOf(mensagem)

    delete mensagens[index]

    res.send('Mensagem removida com sucesso.')
  })

  app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`)
  })
})()
