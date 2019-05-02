class Account {

  constructor(username) {
    this.username = username;
    this.transactions = new TransactionCollection();
  }

  // Return current balance
  get balance() {
    let balance = this.transactions.sum('value');

    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  // Add new transaction
  newTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

//Helper class to get a user's balance using array.sum
class TransactionCollection extends Array {
  sum(key) {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }
}

//Parent class for withdrawals and deposits
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = this.getFormattedDate();
    this.account.newTransaction(this);
    return true;
  }

  getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
  }

  sum(key) {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }

}

class Withdrawal extends Transaction {
  // Update the balance in the account
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance >= this.amount);
  }
}

class Deposit extends Transaction {
  // Update the balance in the account
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE
const myAccount = new Account('ferrazf');

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);



