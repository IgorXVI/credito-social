const connector = require("./connector")
const helpers = require("./helpers")

const createRandomServer = ({
    arr = [""],
    port = 0
}) => {
    Object.freeze(arr)

    const makeRandomIndex = () => helpers.createRandomNumber() % arr.length

    //lida com as requisições do cliente
    const requestHandler = async data => {
        console.log(JSON.stringify(data, null, 2))

        const randomArrayLength = makeRandomIndex() + 1

        return {
            results: new Array(randomArrayLength)
                .fill(null)
                .map(() => arr[makeRandomIndex()])
        }
    }

    //cria o servidor
    connector.createServer({
        port,
        requestHandler
    })
}

module.exports = {
    createRandomServer
}