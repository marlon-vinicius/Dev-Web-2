const express = require("express");
const { pool } = require("./data/data");
const jwt = require("jsonwebtoken");

const app = express();
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
    res.status(200).send()
})

app.post("/login", (req,res) => {
    const user = {
        id: 123,
        name: 'Marlon',
        password: '123'
    }

    const token = jwt.sign(user, segredo);
    res.status(200).json({token});
})

app.get("/userProtegido", verifyToken,async (req, res) => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query
        ("SELECT * From Users");
        console.table(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
    }

    const { id, name, password } = req.user;
    res.status(200).json({id, name, password});
})