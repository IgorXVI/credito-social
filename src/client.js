const cluster = require("cluster")
const delay = require("delay")

const connector = require("./connector")
const portConfig = require("./portConfig")
const helpers = require("./helpers")

//faz um id para cada requisição
const makeRequestId = () => `${cluster.worker.id}: ${new Date().getTime()}`

//roda um cliente
const run = async () => {
    //loop infinito de requisições
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            //faz o input do cliente
            const data = {
                personId: helpers.createRandomNumber(),
                requestId: makeRequestId()
            }

            //pega o score do servidor de scores
            const response = await connector.request({
                data,
                port: portConfig.scoreServer
            })

            //imprime o resultado no console com formatação bonita
            console.log(JSON.stringify({
                data,
                response
            }, null, 2))
        }
        catch (error) {
            console.log(error)
        }

        //espera entre 1 e 2 segundos para fazer a próxima requisição
        await delay(Math.random() * 1000 + 1000)
    }
}

//confere se o cluster é o master
if (cluster.isMaster) {
    //se for, cria 5 processos filhos separados, que vão rodar em paralelo
    for (let i = 0; i < 5; i++) {
        cluster.fork()
    }
}
else {
    //roda o cliente
    run()
}