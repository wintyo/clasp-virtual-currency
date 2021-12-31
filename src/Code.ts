import { CoinCheckAPI } from './CoinCheckAPI';

function main() {
  const greeting: string = 'hello, GAS';
  Logger.log(greeting);

  const aisatsu: string = 'こんにちは、GAS';
  console.log(aisatsu);
}

function request() {
  const data = CoinCheckAPI.fetchTransactions();

  console.log(data);
}
