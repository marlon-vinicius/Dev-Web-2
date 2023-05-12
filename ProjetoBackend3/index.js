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

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({message:
        'Token não fornecido!'});
        return
    }

    try {
        const decodificado = jwt.verify(token, segredo);        
        req.user = decodificado;
        next();
    } catch (err) {
        res.status(403).json({message:
        'Token inválido!'});
    }
}

app.get("/", (req, res) => {
    res.send("Bem vindo a página principal")
})

app.post("/login", async (req, res) => {
    const {email,senha} = req.body;
    const client = await pool.connect();
    const checkUser = await client.query(`SELECT * FROM users WHERE email='${email}'`);
    
    if (!checkUser) {
        res.status(401).json({message:
             'Usuario não existe'});
        return
    }
    
    if ((checkUser.rows[0].senha) !== senha) {
        res.status(401).json({message: 'Senha incorreta'});
        return
    }

    const {id,nome} = checkUser.rows[0]
    res.status(200).json({
        user: {
            id,
            nome,
            email,
        },
    });

    const token = jwt.sign(id, segredo);
    res.status(200).json({token});
})

app.get("/users",async (req, res) => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * From users");
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
        const { name, email, senha } = req.body;

        const client = await pool.connect();
        const checkUser = await client.query(`SELECT * FROM users WHERE id=${id}`);

        if (!checkUser) {
            await client.query(`UPDATE users SET nome = '${name}',email ='${email}',senha ='${senha}' WHERE id=${id}`);
            const { rows } = await client.query(`SELECT * FROM users WHERE id=${id}`);
            res.status(200).send({message: "Usuario atualizado com sucesso.", rows});
        } else {
            res.status(401).send("Usuario não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const deleteName = await client.query(`DELETE FROM users where id=${id}`)        
        res.status(200).send("Usuario deletado com sucesso.");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }
})