const resolveAll = async (arr = [new Promise(), null]) => {
    const promises = arr.map(el => el instanceof Promise ? el.catch(error => error) : el)

    const results = await Promise.all(promises)

    results.forEach(result => {
        if (result instanceof Error) {
            throw result
        }
    })

    return results
}

const createRandomNumber = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

module.exports = {
    resolveAll,
    createRandomNumber
}