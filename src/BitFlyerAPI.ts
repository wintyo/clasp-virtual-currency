import { Utils } from './Utils';

export module BitFlyerAPI {
  export type Currency = {
    JPY: number;
    BTC: number;
    ETH: number;
  };

  const properties = PropertiesService.getScriptProperties().getProperties();
  const DOMAIN = 'https://api.bitflyer.com';
  const { BITFLYER_ACCESS_KEY, BITFLYER_SECRET_KEY } = properties;

  /**
   * 現在の通貨を取得する
   */
  export function fetchCurrency(): Currency {
    const path = '/v1/me/getbalance';
    const method = 'get';
    const timestamp = Date.now().toString();

    const response = UrlFetchApp.fetch(DOMAIN + path, {
      method,
      headers: {
        'ACCESS-KEY': BITFLYER_ACCESS_KEY,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-SIGN': Utils.makeSignature(
          timestamp + method.toUpperCase() + path,
          BITFLYER_SECRET_KEY
        ),
      },
    });
    const json = JSON.parse(response.getContentText());
    return Object.assign(
      {},
      ...json.map((data) => ({
        [data.currency_code]: data.amount,
      }))
    );
  }

  /**
   * 取引情報を取得する
   */
  export function fetchTransactions() {
    const path = Utils.getUrlWithQuery('/v1/me/getbalancehistory', {
      product_code: 'JPY',
    });
    const method = 'get';
    const timestamp = Date.now().toString();

    const response = UrlFetchApp.fetch(DOMAIN + path, {
      method,
      headers: {
        'ACCESS-KEY': BITFLYER_ACCESS_KEY,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-SIGN': Utils.makeSignature(
          timestamp + method.toUpperCase() + path,
          BITFLYER_SECRET_KEY
        ),
      },
    });
    const json = JSON.parse(response.getContentText());
    return json;
  }
}
