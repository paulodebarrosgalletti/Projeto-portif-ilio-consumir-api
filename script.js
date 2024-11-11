
const apiKey = "";//Sua api key aqui!
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultado = document.getElementById("resultado");

async function carregarMoedas() {
    const response = await fetch(apiURL + "USD");
    const data = await response.json();

    const moedas = Object.keys(data.conversion_rates);

    moedas.forEach(moeda => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = moeda;
        option1.textContent = option2.textContent = moeda;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    
    });
}

async function converterMoeda() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultado.textContent = "Por favor digite um número válido";
        return;
    }

    const response = await fetch(apiURL + from);
    const data = await response.json();
    const taxaDeCambio = data.conversion_rates[to];
    const valorConvertido = (amount * taxaDeCambio).toFixed(2);

    resultado.textContent = `${amount} ${from} = ${valorConvertido} ${to}`;
    
}

carregarMoedas();