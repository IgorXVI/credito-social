const randomServer = require("./randomServer")
const portConfig = require("./portConfig")

randomServer.createRandomServer({
    arr: [
        "cruz vermelha",
        "legião da boa vontade",
        "vaquinha do partido novo",
        "youtuber pedindo dinheiro",
        "pessoa desconhecida com cancer"
    ],
    port: portConfig.donationServer
})