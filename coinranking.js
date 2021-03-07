const CORS_BYPASS = 'https://cors-anywhere.herokuapp.com/';
// TODO o cors-anywhere aparentemente te limita depois de 2 minutos
//    e tem que reautorizar no site
const ENDPOINT = CORS_BYPASS + 'https://api.coinranking.com/v2/';

const API_KEY = 'coinranking09fa4518fc5cff889974c064cb364674f95555d4d679c84e';

const NULL_COIN = {
  name: '(escolha uma moeda)',
  uuid: 'aaaaaaa' // gambiarra pra manter o dropdown em ordem alfabética
}

function createCoin(dropdown, coin, isSelected) {
  const option = document.createElement('option');
  option.selected = isSelected;
  option.text = `${coin.name} (${coin.symbol})`;
  option.text = coin.name + (coin.symbol ? ` (${coin.symbol})` : '');
  dropdown.add(option, coin.uuid);
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
  coins.sort((a, b) => a.name < b.name);
  
  const dropdownFrom = document.getElementById('daMoeda');
  const dropdownTo = document.getElementById('paraMoeda');

  for (const coin of coins) {
    createCoin(dropdownFrom, coin);
    createCoin(dropdownTo, coin);
  }

  createCoin(dropdownFrom, NULL_COIN, true);
  createCoin(dropdownTo, NULL_COIN, true);
}

loadCoins();