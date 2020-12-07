const cluster = require("cluster")
const delay = require("delay")

const connector = require("./connector")
const portConfig = require("./portConfig")
const helpers = require("./helpers")

const makeRequestId = () => `${cluster.worker.id}: ${new Date().getTime()}`

//roda um cliente
const run = async () => {
    //loop infinito de requisições
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            const data = {
                personId: helpers.createRandomNumber(),
                requestId: makeRequestId()
            }

            const response = await connector.request({
                data,
                port: portConfig.scoreServer
            })

            const resultJson = {
                data,
                response
            }

            const result = JSON.stringify(resultJson, null, 2)

            console.log(result)
        }
        catch (error) {
            console.log(error)
        }

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