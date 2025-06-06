# Split My Receipt Up (Frontend)

※ [日本語のREADME.mdはここ！](./../README.md)👈

## Why am I Making This?
Instead of calculating receipts by hand, let's use AI's OCR instead to convert a photo of a receipt into a machine-readable text format and calculate it that way!

## What I Want to Learn From Making This?
I've never had the chance to work in the backend of web development so I will take this oppurtunity to use Laravel and make an application following Domain-Driven Design (DDD) principles (reference: https://github.com/PerryM123/memories_backend). This repository will be for the frontend and using frontend tools I want to get into. For example: vitest, playwright, tailwindcss, figma, etc）

## Simple Architecture
![alt text](/docs/images/simple-architecture.jpg)

## Wireframe
- [figma design](https://www.figma.com/design/5YJWfJxPOz41nTYUs3Ecsv/Split-Me-Up-Before-You-Go-Go?node-id=0-1&t=pg6lQGz4q81qqjrR-1)

![alt text](/docs/images/wireframe.jpg)

## Setting up Local Environment

```sh
$ git clone git@github.com:PerryM123/split-my-receipt-up-frontend.git
$ cd split-my-receipt-up-frontend
$ yarn
$ yarn dev
# If you want to check on your phone, run the command below and scan the QR code 
$ yarn dev:host
```

# Other

## When running local environment, I get: [Vue Router warn]: No match found for location with path "/.well-known/appspecific/com.chrome.devtools.json"


![vue-router-warning](/docs/images/vue-router-warning.png)

1. Open `chrome://flags` in your browser
1. Disable: `DevTools Project Settings` 

Reference: https://github.com/nuxt/nuxt/issues/31978#issuecomment-2892300995