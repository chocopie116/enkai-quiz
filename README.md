enkai-quiz
=========
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


# はじめに
宴会のクイズコンテンツで利用できるシステムです。

アプリケーションとして提供する機能は下記になります。
* ユーザー登録機能(nicknameで登録)
* 回答機能
* ランキング機能
* 問題管理機能

問題の出題機能に関しては、本システムのサポート外です。(DVDやpowerpointでやってください。)
以下にherokuで動かす方法について記述します。


## 本番環境へのデプロイについて

### 目次
* アプリケーションコードのデプロイ
* herokuのaddonの設定
* 環境変数の設定
* migrationの設定


### アプリケーションコードのデプロイ

```bash
git push heroku master
```


### herokuのaddonの設定

```bash
heroku addons:add cleardb:ignite --app {APPNAME}
```

### Herokuサーバーの環境変数の設定


```sh
heroku config
##=> mysql://bf317b0613a601:241378d0@us-cdbr-iron-east-01.cleardb.net/heroku_7bcef9df5808462?reconnect=true #存在しない適当なuriです
heroku config:add DB_USER=bf317b0613a601 DB_PASS=241378d0 DB_HOST=us-cdbr-iron-east-01.cleardb.net DB_NAME=heroku_7bcef9df5808462
```

### migrationの設定

```
heroku run db-migrate up --config migrations/database.json --env prod #production
```


### メモ

一部のURL\(/staff/\*)では、Basic認証がかかっています
問題の管理機能を/staff/\* 以下のルーティングにまとめています。
BASIC認証のID・PWは下記になります。

<pre>
ID: username-you-like
PW: password-you-like
</pre>

