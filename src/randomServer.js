const connector = require("./connector")
const helpers = require("./helpers")

//cria o servidor que seleciona um elemento aleatório do array
const createRandomServer = ({
    arr = [""],
    port = 0
}) => {
    //previne o array de ser modificado
    Object.freeze(arr)

    //faz um index aleatório no array
    const makeRandomIndex = () => helpers.createRandomNumber() % arr.length

    //lida com as requisições do cliente
    const requestHandler = async data => {
        //imprime o input do cliente no console  
        helpers.logData(data)

        //faz um comprimento aleatório para o array  
        const randomArrayLength = makeRandomIndex() + 1

        return {
            //faz um array de elementos aleatórios do array original  
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