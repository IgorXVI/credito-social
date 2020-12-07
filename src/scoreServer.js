const connector = require("./connector")
const portConfig = require("./portConfig")

const crimes = {
    "matou": 1000,
    "roubou": 80,
    "estuprou": 200,
    "falou mal do governo": 100,
    "não pagou as dívidas": 20,
    "dirigiu bebado": 10
}

const donations = {
    "cruz vermelha": 50,
    "legião da boa vontade": 50,
    "vaquinha do partido novo": 10,
    "youtuber pedindo dinheiro": 1,
    "pessoa desconhecida com cancer": 100
}

Object.freeze(crimes)
Object.freeze(donations)

const makeScore = ({
    scoreJson = {},
    results = [0]
}) => results.reduce((total, result) => total + scoreJson[result], 0)

//lida com as requisições do cliente
const requestHandler = async data => {
    const crimeData = await connector.request({
        data,
        port: portConfig.crimeServer
    })

    const donationData = await connector.request({
        data,
        port: portConfig.donationServer
    })

    const crimeSum = makeScore({ scoreJson: crimes, results: crimeData.results })
    const donationSum = makeScore({ scoreJson: donations, results: donationData.results })

    const score = donationSum - crimeSum

    return {
        score
    }
}

//cria o servidor
connector.createServer({
    port: portConfig.scoreServer,
    requestHandler
})