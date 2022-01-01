import { CoinCheckAPI } from './CoinCheckAPI';
import { BitFlyerAPI } from './BitFlyerAPI';

function main() {
  coincheck();
  bitflyer();
}

function coincheck() {
  const currencyMap = CoinCheckAPI.fetchCurrencyMap();
  console.log(currencyMap);

  const rateMap = CoinCheckAPI.fetchRateMap();
  console.log(rateMap);

  const total =
    currencyMap.jpy +
    currencyMap.btc * rateMap.btc_jpy +
    currencyMap.eth * rateMap.eth_jpy;
  console.log(total);
}

function bitflyer() {
  const currencyMap = BitFlyerAPI.fetchCurrencyMap();
  console.log(currencyMap);

  const rateMap = BitFlyerAPI.fetchRateMap();
  console.log(rateMap);

  const total =
    currencyMap.JPY +
    currencyMap.BTC * rateMap.BTC_JPY +
    currencyMap.ETH * rateMap.ETH_JPY;
  console.log(total);
}
