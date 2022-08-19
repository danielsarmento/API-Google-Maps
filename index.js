require('dotenv').config();
const express = require('express');
const app = express();

const routes = require('./routes/routes_geolocalizacao');// Importando as rotas 
const PORT = process.env.PORT;
const connectDB = require('./dataBase/dataBase')
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Conseguir receber um POST

// Usando as rotas criadas no arquivo do mesmo
app.use(routes);// Usando as Rotas no Servidor

// Servidor

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
});