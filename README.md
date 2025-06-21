# Split My Receipt Up (Frontend)

※ [English README.md is here！](/docs/README-english.md)👈

## なぜ作ってるか
レシートを見て手動で計算するよりAIのOCR（文字認識）でレシートの文字を取得し計算してくれるアプリは制作したいです！

## 何を学びたいか
僕は今までフロントエンド開発しかやったことがなく、あまりバックエンドの知識が深くなく、本格的にバックエンド開発をする機会もなく、バックエンドチームともっと話し合いできるように「バックエンドはどう動いてるか？バックエンドだと何を考慮するべきか？」ということを学ぶ目標をしてます。
なのでLaravelでドメイン駆動設計(DDD)を実践しつつ気になるフロントエンドツールとフレームワーク（vitest、playwright、tailwindcss、figmaなど）を活用します！

## 関連リポジトリ

### フロントエンド側
- [PerryM123/memories_backend](https://github.com/PerryM123/memories_backend)

### MOCK環境
OpenAI APIを利用するとトークンがかかるので動作確認用のモック環境を用意しました。
- [PerryM123/OpenAI API Mock Environment (Split My Receipt Up)](https://github.com/PerryM123/open-ai-api-mock-environment)

## 簡単なBFFアーキテクチャ設計
![alt text](/docs/images/simple-architecture.jpg)

## ワイヤーフレーム
- [figmaワイヤー](https://www.figma.com/design/5YJWfJxPOz41nTYUs3Ecsv/Split-Me-Up-Before-You-Go-Go?node-id=0-1&t=pg6lQGz4q81qqjrR-1)

![alt text](/docs/images/wireframe.jpg)

## ローカルについて

### 事前準備
プロジェクトで固定されてるnodeバージョンが自動的に導入してくれるようにnvm(Node Version Manager)導入は必要で、 手順は以下です。
- nvm導入の手順: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

### ローカル環境構築

```sh
$ git clone git@github.com:PerryM123/split-my-receipt-up-frontend.git
$ cd split-my-receipt-up-frontend
# envファイルの準備
$ cp .env.example .env
$ cp .env.e2e-testing.example .env.e2e-testing
# local
$ yarn
$ yarn dev
# 手元のスマホで見たい場合、以下のコマンドを実行した後表示されるQRを読み取ってください
$ yarn dev:host
```

## E2Eテストの実施方法
### Step 1
`.env.e2e-testing.example` を `.env.e2e-testing` にコピー

### Step 2
E2E用のローカルを起動

```sh
$ yarn dev:e2e
# 別タブで
$ yarn e2e:ui
```

※ memories_backendのDockerでローカル環境を起動する必要があります([memories_backendのREADME](https://github.com/PerryM123/memories_backend))

# マイルストーン
- [x] Make wireframes for the page layout
- [x] Make a prototype of the app based on the wireframe
- [x] Add husky's pre-commit ＆ pre-push
- [ ] Complete BFF architecture using Nuxt and Nuxt Server API 
- [ ] Release the prototype as `v0.1.0`
- [ ] Add an actual design with a header and footer
- [ ] Make a landing page for the app
- [ ] Integrate a login page using Google OAuth 2.0
- [ ] Deploy to Vercel

# その他

## ローカルで 「[Vue Router warn]: No match found for location with path "/.well-known/appspecific/com.chrome.devtools.json"」 が出てくる場合


![vue-router-warning](/docs/images/vue-router-warning.png)

1. ブラウザで `chrome://flags` を開く
1. `DevTools Project Settings` を無効（Disabled）に変更
1. [Vue Router warn]が出なくなったらOKです！

参考: https://github.com/nuxt/nuxt/issues/31978#issuecomment-2892300995