import { Utils } from './Utils';

export module CoinCheckAPI {
  export type CurrencyMap = {
    jpy: number;
    btc: number;
    eth: number;
  };
  export type RateMap = {
    btc_jpy: number;
    eth_jpy: number;
  };

  const properties = PropertiesService.getScriptProperties().getProperties();
  const { COIN_CHECK_ACCESS_KEY, COIN_CHECK_SECRET_KEY } = properties;

  /**
   * 現在の通貨を取得する
   */
  export function fetchCurrencyMap(): CurrencyMap {
    const url = 'https://coincheck.com/api/accounts/balance';
    const timestamp = Date.now().toString();

    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: {
        'ACCESS-KEY': COIN_CHECK_ACCESS_KEY,
        'ACCESS-NONCE': timestamp,
        'ACCESS-SIGNATURE': Utils.makeSignature(
          timestamp + url,
          COIN_CHECK_SECRET_KEY
        ),
      },
    });
    const json = JSON.parse(response.getContentText());
    const { success, ...rest } = json;
    Object.keys(rest).forEach((key) => {
      rest[key] = parseFloat(rest[key]);
    });
    return rest;
  }

  /**
   * 販売所のレートの取得
   * @param pair - 取引ペア
   */
  export function fetchRateMap(): RateMap {
    const pairs = ['btc_jpy', 'eth_jpy'] as const;
    const rateMap = Object.assign(
      {},
      ...pairs.map((pair) => {
        const url = `https://coincheck.com/api/rate/${pair}`;
        const response = UrlFetchApp.fetch(url, {
          method: 'get',
        });
        const json = JSON.parse(response.getContentText());
        return {
          [pair]: parseFloat(json.rate),
        };
      })
    );

    return rateMap;
  }

  /**
   * 取引所での取引情報を取得する
   */
  export function fetchTransactions() {
    const url =
      'https://coincheck.com/api/exchange/orders/transactions_pagination';
    const timestamp = Date.now().toString();

    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: {
        'ACCESS-KEY': COIN_CHECK_ACCESS_KEY,
        'ACCESS-NONCE': timestamp,
        'ACCESS-SIGNATURE': Utils.makeSignature(
          timestamp + url,
          COIN_CHECK_SECRET_KEY
        ),
      },
    });
    const json = JSON.parse(response.getContentText());
    return json;
  }
}
