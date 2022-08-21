const axios = require('axios');
const EscolasCadastradas = require('../models/modelEscolas');
require('dotenv').config();

exports.distancia = async (req, res) => {
    
    const {origin, city} = req.body;
    console.log(`Origem: ${origin}, ${city}`)

    const originEdit = `${origin},${city}`

    // Ajustando string para requisição
    const origem = originEdit.replace(/ /g, "%20");
        
    try{
        // Buscando no DB as escolas - retorna um array de objetos
        const escola = await EscolasCadastradas.find()
        
        // Varre o array e salva apenas os endereços de cada escola
        const enderecosEscolas = escola.map((obj) => {
            return obj.Endereco
        })

        // Transforma os edereços em texto sem espaços para mandar como parâmetro na URL
        const enderecoEscola = enderecosEscolas.map((endereco) => {
            return endereco.replace(/ /g, "%20")
        })

        // Percorre o array das escolas e retorna as vagas de cada escola
        const vagasEscolas = escola.map((obj) => {
            
            return `Vagas no 1° ano: ${obj.Vagas1ano}, Vagas no 2° ano: ${obj.Vagas2ano}, Vagas no 3° ano: ${obj.Vagas3ano}`
        })
        console.log(vagasEscolas)
        
        const final = [];
        for(i=0; i<enderecoEscola.length; i++){
            let config = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${enderecoEscola[i]}&key=${process.env.key}`,
                headers: { }
              };
    
            let data = await axios(config)
            let distancia = data.data.rows[0].elements[0].distance.text
            final.push(`*${escola[i].Nome}*, _*Distância: ${distancia}*_, _${vagasEscolas[i]}_`)
            console.log(distancia, enderecosEscolas[i], final)
        }
        

        res.json(final)

    } catch (err){
        return { error: true, message: err.message }
    }
}