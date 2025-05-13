# TODO

## Design
- [ ] complete all designs using figma (SP only)
- [ ] Add wireframes to /docs/wireframe directory

## Needed Features:
- [ ] Upload images to S3 container
- [ ] CRUD for receipt info
- [x] Designing database
- [ ] Add redis and authentication

## frontend
- [x] add tailwind
- [x] add vitest
- [x] passing image to backend successfully
- [ ] implement designs
- [ ] mock open ai requests
- [ ] create pages:
  - [ ] top: /
  - [ ] receipt list: /receipts
  - [ ] receipt details: /receipts/:receipt-id
  - [x] preparation: /save-receipt
  - [ ] Receipt Saved Successfully: /save-receipt/success

## backend
- [x] setup an dockerized s3 container(minIO)
- [x] passing image to s3
- [x] Add image info to database
- [ ] Make a request to example.com's API as a test for OpenAI API

## When I have time
- [ ] Make Open AI API response include a confidence/accuracy rating
  - [ ] If the rating is too low, throw an error
  - [ ] If there is no receipt shown in the image, then throw an error
- [ ] swagger (with node??? or laravel???)
- [ ] i18 for localization