"use strict";

let label_daMoeda;
let input_da_Moeda;
let label_paraMoeda;
let input_para_Moeda;

let mostra_taxa;
let troca;

window.onload = () => {

  label_daMoeda = document.getElementById('daMoeda');
  input_da_Moeda = document.getElementById('da_Moeda');
  label_paraMoeda = document.getElementById('paraMoeda');
  input_para_Moeda = document.getElementById('para_Moeda');

  mostra_taxa = document.getElementById('mostra_taxa');
  troca = document.getElementById('troca');

  label_daMoeda.addEventListener('change', calculate);
  input_da_Moeda.addEventListener('input', calculate);
  label_paraMoeda.addEventListener('change', calculate);
  input_para_Moeda.addEventListener('input', calculate);
  troca.addEventListener('click', infotroca);

  let currency = { "BRL": "Real", "EUR": "Euro", "USD": "Dollar" };
  let options = [];
  for (var [key, value] of Object.entries(currency)) {
    options.push(`<option value='${key}'>${value}</option>`);
  }
  label_daMoeda.innerHTML = options.join('\n');
  label_paraMoeda.innerHTML = options.join('\n');
  calculate();

}

function infotroca() {
  let temp = label_daMoeda.value;
  label_daMoeda.value = label_paraMoeda.value;
  label_paraMoeda.value = temp;
  calculate();
}

async function getURL(url) {
  return (await fetch(url)).json();
}

function getInfoSelect(select) {
  return select.options[select.selectedIndex].text;
}

async function calculate() {
  let from = label_daMoeda.value;
  let to = label_paraMoeda.value;
  let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);
  console.log(rates);
  let rate = rates[to];
  mostra_taxa.innerText = `1 ${getInfoSelect(label_daMoeda)} = ${rate} ${getInfoSelect(label_paraMoeda)}`
  input_para_Moeda.value = (input_da_Moeda.value * rate).toFixed(2);
}