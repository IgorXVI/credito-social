const randomServer = require("./randomServer")
const portConfig = require("./portConfig")

randomServer.createRandomServer({
    arr: [
        "matou",
        "roubou",
        "estuprou",
        "falou mal do governo",
        "não pagou as dívidas",
        "dirigiu bebado"
    ],
    port: portConfig.crimeServer
})