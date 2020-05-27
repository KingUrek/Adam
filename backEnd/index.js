
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoSchema = require('./models/TodoItem');


const app = express();
// TODO:adicionar configurações de segurança no cors
app.use(cors());
app.use(bodyParser.json({ extend: false }));


mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Mongo is on')).catch(() => console.log("We can't reach mongo"));

const TodoModel = mongoose.model('Todos', todoSchema);

app.post('/todo', (req, res) => {
  const todo = new TodoModel(req.body);
  todo.save()
    .then(() => res.status(201).send('seu novo todo já esta na minha memória'))
    .catch(() => res.status(404).send('Tive um erro em salvar sua tarefa'));
});

app.delete('/todo', (req, res) => {
  TodoModel.deleteOne({ id: req.body.id })
    .then(() => res.status(200).send('Seu delete foi concluido com sucesso'))
    .catch(() => res.status(404));
});

app.put('/todo', (req, res) => {
  TodoModel.replaceOne({ id: req.body.id }, req.body)
    .then(() => res.status(200).send('Seu update foi concluido com sucesso'))
    .catch(() => res.status(404));
});


app.listen(3000, () => console.log(`Server is listen to the port ${process.env.PORT}`));
