const express = require("express");
const { pool } = require("./data/data");
const app = express();
app.use(express.json());
app.listen(8080, () => {
    console.log("O servidor está ativo na porta 8080!!!");
});

pool.connect();

app.get("/getUsers", async (req,res) => {
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
})

app.post("/createUsers", async (req, res) => {
    try {
        const { id, nome } = req.body;
        pool.query (`INSERT INTO Users (id, nome) VALUES (${id}, '${nome}')`)        
    }catch (error) {
        console.error(error);
        res.status(500).send(`Erro de conexão com o servidor`);        
    }
    const client = await pool.connect();
    const { rows } = await client.query("SELECT * From Users");
    console.table(rows);
    res.status(200).send(rows);
  });

app.put("/updateUsers", async (req, res) => {
    try {
        const { id, nome } = req.body;
        pool.query (`UPDATE Users SET nome = '${nome}' WHERE id = ${id}`)
    }catch (error) {
        console.error(error);
        res.status(500).send(`Erro de conexão com o servidor`);        
    }
    const client = await pool.connect();
    const { rows } = await client.query("SELECT * From Users");
    console.table(rows);
    res.status(200).send(rows);
  });

app.delete("/deleteUsers", async (req, res) => {
    try {
        const { id } = req.body;
        pool.query (`DELETE FROM Users WHERE id = ${id}`)
    }catch (error) {
        console.error(error);
        res.status(500).send(`Erro de conexão com o servidor`);        
    }
    const client = await pool.connect();
    const { rows } = await client.query("SELECT * From Users");
    console.table(rows);
    res.status(200).send(rows);
  });