## 開発環境

- node: v14.18.x
- npm: v6.14.x

## 認証情報の設定

1. [このページ](https://console.cloud.google.com/apis/credentials?project=gas-virtual-currency)からデスクトップクライアントの認証ファイルをダウンロードし、`./creds.json`に配置する。
1. `npm run clasp login --creds creds.json`でログイン認証ページに飛び、認証する。認証できれば、`./.clasprc.json`にファイルが生成される

## 参考記事

### clasp

- [GAS 用の CLI ツール clasp を使って GAS をローカルで開発して実行するの巻。](https://qiita.com/jiroshin/items/dcc398285c652554e66a#%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E8%A8%98%E8%BF%B0%E3%81%97%E3%81%A6push%E3%81%99%E3%82%8B)
- [GAS（Google App Scripts）用の CLI ツール clasp からローカル環境で GAS を実行してログを確認する手順](https://t-cr.jp/memo/3ad17a27aa48af71)
