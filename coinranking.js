const CORS_BYPASS = 'https://cors-anywhere.herokuapp.com/';
// TODO o cors-anywhere aparentemente te limita depois de 2 minutos
//    e tem que reautorizar no site
const ENDPOINT = CORS_BYPASS + 'https://api.coinranking.com/v2/';

const API_KEY = 'coinranking09fa4518fc5cff889974c064cb364674f95555d4d679c84e';

const NULL_COIN = {
  uuid: null,
  name: '(escolha uma moeda)'
}

async function getCoins() {
  const results = await axios.get(ENDPOINT + 'coins', {
    headers: {
      'x-access-token': API_KEY,
    }
  });

  return results.data.data.coins; // TODO tratar erros na request
}

async function loadCoins() {
  let coins = await getCoins();
  coins.sort((a, b) => a.name > b.name);
  coins = [NULL_COIN, ...coins]; // TODO sort it alphabetically
  const dropdown = document.getElementById('coins-list');

  for (const coin of coins) {
    const option = document.createElement('option');
    option.text = `${coin.name} (${coin.symbol})`;
    option.text = coin.name + (coin.symbol ? ` (${coin.symbol})` : '');
    dropdown.add(option, coin.uuid);
  }
}

loadCoins();