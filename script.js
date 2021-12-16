// get access to the elt
const balance = document.getElementById('balance');
const money_plus = document.getElementById('mney-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// access the data

const dummyTransactions = [
  {id: 1, text: 'Flower', amount: -20},
  {id: 2, text: 'Salary', amount: 220},
  {id: 3, text: 'Salad', amount: -40},
  {id: 4, text: 'Book', amount: 30},
  {id: 5, text: 'Camera', amount: 120},
];

//global variables

let transactions = dummyTransactions;

// Add transactions to DOM list

function addTransactionDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  // create a new transaction elt to be added in the li list
  const item = document.createElement('li');

  // add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">x</button>
  `;

  list.appendChild(item);
}

// init the app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
}

init();
