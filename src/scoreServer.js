const connector = require("./connector")
const portConfig = require("./portConfig")
const helpers = require("./helpers")

//JSON de crimes e seus valores para o cálculo de score
const crimes = {
    "matou": 1000,
    "roubou": 80,
    "estuprou": 200,
    "falou mal do governo": 100,
    "não pagou as dívidas": 20,
    "dirigiu bebado": 10
}

//JSON de doações e seus valores para o cálculo de score
const donations = {
    "cruz vermelha": 50,
    "legião da boa vontade": 50,
    "vaquinha do partido novo": 10,
    "youtuber pedindo dinheiro": 1,
    "pessoa desconhecida com cancer": 100
}

//previne o JSON de crimes de ser modificado
Object.freeze(crimes)

//previne o JSON de doações de ser modificado
Object.freeze(donations)

//soma os valores de cada string com base no JSON
const makeScore = ({
    scoreJson = {},
    results = [0]
}) => results.reduce((total, result) => total + scoreJson[result], 0)

//lida com as requisições do cliente
const requestHandler = async data => {
    //imprime input do cliente no console
    helpers.logData(data)

    //faz a requisição para o servidor de crimes
    const crimeData = await connector.request({
        data,
        port: portConfig.crimeServer
    })

    //faz a requisição para o servidor de doações
    const donationData = await connector.request({
        data,
        port: portConfig.donationServer
    })

    //faz a soma de crimes  
    const crimeSum = makeScore({ scoreJson: crimes, results: crimeData.results })

    //faz a soma de doações
    const donationSum = makeScore({ scoreJson: donations, results: donationData.results })

    //calcula o score final, doações tem valor positivo e crimes tem valor negativo  
    const score = donationSum - crimeSum

    //retorna o score para o cliente
    return {
        score
    }
}

//cria o servidor
connector.createServer({
    port: portConfig.scoreServer,
    requestHandler
})