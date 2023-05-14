const express = require("express");
const { pool } = require("./data/data");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
pool.connect();

app.listen(8080, () => {
    console.log("O servidor está ativo na porta 8080");
})

const segredo = "MeuSegredo";

app.get("/", (req, res) => {
    res.send("Bem vindo a página principal")
})

app.post("/login", async (req, res) => {
    const {email,senha} = req.body;

    const client = await pool.connect();
    const checkUser = await client.query(`SELECT * FROM users WHERE email='${email}'`);
    
    if (checkUser.rowCount === 0) {
        res.status(401).json({message: 'Usuario não existe'});
        return
    } else if (checkUser.rows[0].senha !== senha) {
        res.status(401).json({message: 'Senha incorreta'});
        return
    } else {
        res.status(200).json({
        user: {
            id: checkUser.rows[0].id,
            email: checkUser.rows[0].email,
            nome: checkUser.rows[0].nome
        },
        token : jwt.sign({id : checkUser.rows[0].id}, segredo)        
    }); 
    }

    const { id, nome } = checkUser.rows[0]
      
})

app.get("/users",async (req, res) => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`SELECT * FROM users`);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})

app.post("/users", async (req,res) => {
    try {
        const { nome, email, senha } = req.body;

        const client = await pool.connect();
        const cadastro = await client.query (`INSERT INTO users (nome, email, senha) VALUES ('${nome}','${email}', '${senha}')`)
        res.send(`Usuário cadastrado com sucesso.`);        
    }catch (error) {
        console.error(error);
        res.status(500).send(`Erro de conexão com o servidor`);        
    }    
})

app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const client = await pool.connect();
        const updateUser = await client.query
            (`UPDATE users SET nome = '${nome}',email ='${email}',senha ='${senha}' WHERE id=${id}`);    
        res.status(200).send({message: "Usuario atualizado com sucesso."});        

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();

        const deleteName = await client.query(`DELETE FROM users WHERE id=${id}`)        
        res.status(200).send("Usuario deletado com sucesso.");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})