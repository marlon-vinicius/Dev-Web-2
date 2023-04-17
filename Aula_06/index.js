const express = require("express"); // Chamando a dependencia inteira pra const express

const app = express();

app.use(express.json())

app.listen(8080,() => {
    console.log("O servidor está ativo na porta 8080");
});

let Alunos = ['Maria', 'João', 'José'];

// CRUD - GET POST PUT DELETE

// CREATE
app.post('/includeAluno', (req, res) => {
    const { nome } = req.body
    Alunos.push(nome);
    const { idade } = req.body

    res.send(`<h1> Olá ${nome}, seja bem vindo à sua primeira API! Você tem ${idade} anos de idade.`)
});

// READ
app.get('/getAluno', (req, res) => {
    const { index } = req.body;
    // connect SQL -
    // Select * From Alunos WHERE id = index
    res.send(`<h1>O aluno ${Alunos[index]} foi encontrado</h1>`);
});

app.get('/getAlunos', (req, res) => {
    // SELECT * From Alunos
    console.log(Alunos);
    res.send(`Todos os alunos cadastrados são: ${Alunos}`)
});

// UPDATE
app.put('/updateAluno', (req,res) => {
    // UPDATE nome FROM Alunos WHERE id = index;
    const {index,nome} = req.body;
    Alunos[index] = nome;
    res.send(`<h1>O nome foi atualizado com sucesso!!! </h1>`);
    console.log(Alunos);
});

// DELETE
app.delete('/deleteAluno', (req,res) => {
    // DELETE FROM Alunos WHERE id = index
    const {index} = req.body;
    Alunos.splice(index, 1);
    res.send(`<h1>Alunos após o DELETE: ${Alunos}`);
});