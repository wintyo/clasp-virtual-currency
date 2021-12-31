export module Utils {
  /**
   * HMAC認証値をhex文字列で返す
   */
  export function makeSignature(value: string, key: string) {
    const signBytes = Utilities.computeHmacSha256Signature(value, key);
    return signBytes.reduce((str, byte) => {
      const hex = (byte < 0 ? byte + 256 : byte).toString(16);
      return str + (hex.length === 1 ? '0' : '') + hex;
    }, '');
  }

  /**
   * URLとparamsを結合させた文字列を返却する
   * @param url
   * @param params
   */
  export function getUrlWithQuery(
    url: string,
    params: { [key: string]: string } = {}
  ) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return queryString ? `${url}?${queryString}` : url;
  }
}
