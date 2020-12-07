# Port 6661
Servidor que vai guardar os dados e scores de cada pessoa e sincronizar com o servidor de ongs e o servidor de crimes.

# Port 6662
Servidor que vai conter os crimes de cada pessoa.

# Port 6663
Servidor que vai conter as doações para ongs de cada pessoa.

# Client
Cliente que vai interagir com o servidor, enviando sujestões de score para uma pessoa.

# Plano

## Cliente
Vai mandar um identificador aleatório de uma pessoa para o servidor de scores e vai recber um número que represanta o score daquela pessoa.

## Servidor de Scores
Vai receber do cliente um identificador de uma pessoa, vai pedir para o servidor de crimes e o servidor de doações um relatório sobre os atos dessa pessoa (um array de strings de cada servidor), vai calcular o score dessa pessoa com base dos valores que ele tem guardado em um JSON para cada ato, se o ato não existir no JSON, terá um valor de 0.

## Servidor de Crimes
Vai receber o identificador da pessoa e vai selecionar um conjunto de crimes aleatórios para ela, com base em um array de crimes armazenado.

## Servidor de Doações
Mesma coisa que o servidor de crimes, só que o array é totalmente diferente.

