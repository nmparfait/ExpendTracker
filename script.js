// get access to the elt
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
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

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    text.value = '';
    amount.value = '';
  }
}

//Generate random ID
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

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
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

//update the balance, income and expense
// working on the balances
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // working on income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  init();
}

// init the app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
