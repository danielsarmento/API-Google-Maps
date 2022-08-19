const mongoose = require('mongoose'); // Importando a biblioteca do mongoose para usar na configuração do banco de dados

// Limitando o estilo do dado.
const EstruturaDados = new mongoose.Schema({
    Nome: {type: String, required: true},
    Endereco: {type: String, required: true},
    Vagas1ano: {type: Number, required: true},
    Vagas2ano: {type: Number, required: true},
    Vagas3ano: {type: Number, required: true}
});

//Criando a coleção dentro do BD
const EscolasCadastradas = mongoose.model('EscolasCadastradas', EstruturaDados);

// Exportando a Coleção para ser acessada e criado o dado
module.exports = EscolasCadastradas;