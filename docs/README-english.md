# Split My Receipt Up (Frontend)

※ [日本語のREADME.mdはここ！](./../README.md)👈

![alt text](/docs/images/new-sample-video.gif)

※ Storybook Page: https://perrym123.github.io/split-my-receipt-up-frontend/

## Why am I Making This?
Instead of calculating receipts by hand, let's use AI's OCR instead to convert a photo of a receipt into a machine-readable text format and calculate it that way!

## What I Want to Learn From Making This?
I've never had the chance to work in the backend of web development so I will take this oppurtunity to use Laravel and make an application following Domain-Driven Design (DDD) principles (reference: https://github.com/PerryM123/memories_backend). This repository will be for the frontend and using frontend tools I want to get into. For example: vitest, playwright, tailwindcss, figma, etc）

## Related Repositories

### API Documentation Repository (Swagger)
- [PerryM123/split-my-receipt-up-swagger-doc](https://github.com/PerryM123/split-my-receipt-up-swagger-doc)

### Backend:
- [PerryM123/memories_backend](https://github.com/PerryM123/memories_backend)

### Mock Environment

Since using OpenAI API requires tokens, this mock environment will act as OpenAI during my development progress.
- [PerryM123/OpenAI API Mock Environment (Split My Receipt Up)](https://github.com/PerryM123/open-ai-api-mock-environment/blob/master/docs/README-english.md)

## Simple BFF Architecture
![alt text](/docs/images/simple-architecture.jpg)

## Wireframe
- [figma design](https://www.figma.com/design/5YJWfJxPOz41nTYUs3Ecsv/Split-Me-Up-Before-You-Go-Go?node-id=0-1&t=pg6lQGz4q81qqjrR-1)

![alt text](/docs/images/wireframe.jpg)

## About the Local Environment

### Before Starting

To use the decided node version for this project, nvm (Node Version Manager) is needed.
- How to install: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

### Setting up Local Environment

```sh
$ git clone git@github.com:PerryM123/split-my-receipt-up-frontend.git
$ cd split-my-receipt-up-frontend
# Setting up env
$ cp .env.example .env
$ cp .env.e2e-testing.example .env.e2e-testing
# local
$ yarn
$ yarn dev
# If you want to check on your phone, run the command below and scan the QR code 
$ yarn dev:host
```

## Running E2E Tests
### Step 1
Copy `.env.e2e-testing.example` to `.env.e2e-testing`

### Step 2
Run local environment for e2e testing

```sh
$ yarn dev:e2e
# In another window
$ yarn e2e:ui
```

※ Be sure to have memories_backend local environment running in docker ([memories_backend's README](https://github.com/PerryM123/memories_backend/blob/master/docs/README-english.md))

# Milestones
- [x] ワイヤーフレームとページレイアウトを作成
- [x] ワイヤーを踏まえ、プロトタイプのアプリを作成
- [x] huskyのpre-commit＆pre-pushを設定
- [x] NuxtとNuxt Server APIにてBFFアーキテクチャを実現
- [x] プロトタイプの実装を完了すると`v0.1.0`としてリリース
- [x] 簡単なデザインを作成しアプリに反映
- [ ] アプリについてのランディングページを作成
- [ ] Google OAuth 2.0を利用してるログインページを作成
- [ ] Vercelへデプロイ

# Other

## When running local environment, I get: [Vue Router warn]: No match found for location with path "/.well-known/appspecific/com.chrome.devtools.json"


![vue-router-warning](/docs/images/vue-router-warning.png)

1. Open `chrome://flags` in your browser
1. Disable: `DevTools Project Settings` 

Reference: https://github.com/nuxt/nuxt/issues/31978#issuecomment-2892300995