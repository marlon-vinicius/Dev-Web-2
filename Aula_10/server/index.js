const express = require("express")
const app = express()
const cors = require("cors")
const { pool } = require("./data/data")
app.use(express.json())
app.use(cors())
app.listen(3000, () => {
    console.log("Servidor está ativo na porta 3000!")
})

// cria o método de encerrar processo com o banco logo após a requisição
process.on('SIGINT', () => {
    pool.end();
    process.exit();
})

let register = null;

app.post("/api/registerUser", async (req, res) => {
    try {
        register = await pool.connect();
        const { nome, email, senha } = req.body
        await register.query(`INSERT INTO users
        (id, nome, email, senha) VALUES 
        (uuid_generate_v4(), '${nome}', '${email}', '${senha}')`)
        res.status(200).send("Cadastro realizado com sucesso")
    } catch (error) {
        res.status(500).send("Não conectou ao servidor")
    } finally {
        register.release();
    } 
})

app.get('/api/getUsers', async(req, res) => {
    try {
        register = await pool.connect();
        const data = await register.query(`SELECT * FROM users`);
        // console.log(data.rows);
        res.send(data.rows)
    } catch (error) {
        res.status(500).send('Erro na consulta')
    }
})

app.post("/api/updateUser", async (req, res) => {
    try {
        const { email, nome, senha } = req.body;
        pool.query (`UPDATE users SET nome = '${nome}',senha = '${senha}' WHERE email = '${email}'`)
        res.status(200).send("Usuário atualizado com sucesso")
    }catch (error) {
        console.error(error);
        res.status(500).send(`Erro de conexão com o servidor`);        
    }
});

app.delete("/api/deleteUser", async (req, res) => {
    try {
        const { email, senha } = req.body;
        pool.query (`DELETE FROM users WHERE email = '${email}'`)
        res.status(200).send("Usuário deletado com sucesso")
    }catch (error) {
        console.error(error);
        res.status(500).send(`Erro de conexão com o servidor`);        
    }
});