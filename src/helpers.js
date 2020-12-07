//cria um número aleatório entre 0 e o maior inteiro possível
const createRandomNumber = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

//imprime o objeto data no console com formatação bonita
const logData = data => console.log(JSON.stringify(data, null, 2))

module.exports = {
    logData,
    createRandomNumber
}