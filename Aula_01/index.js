//Chamar a biblioteca do express
const express = require("express");

const app = express();

//Chamando a abertura do meu serviço
//Criação do serviço express
app.listen(8080);

//Criação da primeira rota /
app.get("/", () => {
    console.log("Hello World !!");
})