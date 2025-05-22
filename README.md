# Split My Receipt Up (Frontend)

※ [English README.md is here！](/docs/README-english.md)👈

## なぜ作ってるか
レシートを見て手動で計算するよりAIのOCR（文字認識）でレシートの文字を取得し計算してくれるアプリは制作したいです！

## 何を学びたいか
僕は今までフロントエンド開発しかやったことがなく、あまりバックエンドの知識が深くなく、本格的にバックエンド開発をする機会もなく、バックエンドチームともっと話し合いできるように「バックエンドはどう動いてるか？バックエンドだと何を考慮するべきか？」ということを学ぶ目標をしてます。
なのでLaravelでドメイン駆動設計(DDD)を実践しつつ気になるフロントエンドツールとフレームワーク（vitest、playwright、tailwindcss、figmaなど）を活用します！

今のリポジトリはフロントエンド用で、バックエンド側は以下です！
- [PerryM123/memories_backend](https://github.com/PerryM123/memories_backend)

## 簡単なアーキテクチャ設計
![alt text](/docs/images/simple-architecture.jpg)

## ワイヤーフレーム
- [figmaワイヤー](https://www.figma.com/design/5YJWfJxPOz41nTYUs3Ecsv/Split-Me-Up-Before-You-Go-Go?node-id=0-1&t=pg6lQGz4q81qqjrR-1)

![alt text](/docs/images/wireframe.jpg)

## ローカル環境構築

```sh
$ git clone git@github.com:PerryM123/split-my-receipt-up-frontend.git
$ cd split-my-receipt-up-frontend
$ yarn
$ yarn dev
# 手元のスマホで見たい場合、以下のコマンドを実行した後表示されるQRを読み取ってください
$ yarn dev:host
```

# その他

## ローカルで 「[Vue Router warn]: No match found for location with path "/.well-known/appspecific/com.chrome.devtools.json"」 が出てくる場合


![vue-router-warning](/docs/images/vue-router-warning.png)

1. ブラウザで `chrome://flags` を開く
1. `DevTools Project Settings` を無効（Disabled）に変更
1. [Vue Router warn]が出なくなったらOKです！

参考: https://github.com/nuxt/nuxt/issues/31978#issuecomment-2892300995