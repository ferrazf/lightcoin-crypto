let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0
    this.balance = 0;
  }

}

//Parent class for withdrawals and deposits
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.account.balance += this.value;
  }

}

class Withdrawal extends Transaction {
  // Update the balance in the account
  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {
  // Update the balance in the account
  get value() {
    return this.amount
  }

}


// DRIVER CODE
const myAccount = new Account("billybob");

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);\



