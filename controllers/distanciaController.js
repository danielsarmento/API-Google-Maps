const axios = require('axios');
const EscolasCadastradas = require('../models/modelEscolas');
require('dotenv').config();

exports.distancia = async (req, res) => {
    
    const {origin} = req.body;
    // Ajustando string para requisição
    const origem = origin.replace(/ /g, "%20");
        
    try{

        const escola = await EscolasCadastradas.find()
        
        const enderecosEscolas = escola.map((obj) => {
            return obj.Endereco
        })
        const enderecoEscola = enderecosEscolas.map((endereco) => {
            return endereco.replace(/ /g, "%20")
        })
        
        const result = [];
        for(i=0; i<enderecoEscola.length; i++){
            let config = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${enderecoEscola[i]}&key=${process.env.key}`,
                headers: { }
              };
    
            let data = await axios(config)
            let distancia = data.data.rows[0].elements[0].distance.text
            result.push({escola: escola[i].Nome ,dist: distancia, ender: enderecosEscolas[i]})
            console.log(distancia, enderecosEscolas[i])
        }
        

        res.json(result)

    } catch (err){
        return { error: true, message: err.message }
    }
}