import { test, expect, type FileChooser } from '@playwright/test'
import someJson from 'src/e2e/fixtures/analyzeReceipt201Response.json' assert { type: 'json' }

test.use({
  viewport: {
    width: 375,
    height: 667
  },
  deviceScaleFactor: 2
})

const addImageToSaveReceiptPage = async (
  fileChooserPromise: Promise<FileChooser>
) => {
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('./src/e2e/fixtures/receipt_image.jpg')
}

test('Test validation in step 1 when Image Analyze API fails', async ({
  page
}) => {
  await page.route('**/api/receipt-info/analyze', async (route) => {
    await route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    })
  })
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: '新規レシート作成' }).click()
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('Test Title')
  await page.getByRole('button', { name: '分析' }).click()
  await expect(page.getByText('Please select a receipt you')).toBeVisible()
  await page.getByRole('button', { name: 'Choose File' }).click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('./src/e2e/fixtures/receipt_image.jpg')
  await page.getByRole('button', { name: '分析' }).click()
  await expect(
    page.getByText('Failed analyzing image. Please try again at a later time.')
  ).toBeVisible()
  await page.getByRole('textbox').clear()
  await page.getByRole('button', { name: '分析' }).click()
  await expect(
    page.getByText('Please add a title for the receipt')
  ).toBeVisible()
})

test('Adding Receipt. Check receipt details after adding. Check Receipt List for confirmation', async ({
  page
}) => {
  // TODO: Need to add error pattern for STEP 2
  await page.route('**/api/receipt-info/analyze', async (route) => {
    await route.fulfill({
      status: 201,
      body: JSON.stringify(someJson)
    })
  })
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: '新規レシート作成' }).click()
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('Test Title 2982580523')
  await page.getByRole('radio', { name: 'Hannah' }).check()
  await page.getByRole('button', { name: 'Choose File' }).click()
  await addImageToSaveReceiptPage(fileChooserPromise)
  await page.getByRole('button', { name: '分析' }).click()
  // Testing inputs are being changed the totals are correct
  await expect(page.getByText('Perry: 2,313円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,313円')).toBeVisible()
  await expect(page.getByText('Both: 4,626円')).toBeVisible()
  await page
    .getByRole('row', {
      name: 'ハーゲン ミニCコウチャクッキーコウガ 218円 P H'
    })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', {
      name: 'オリジナルアイスブラッドオレンジ 204円 P H 両方'
    })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'オカメ スゴイナットウS-903 264円 P H 両方' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'アタックコウキンEXハヤヨウカエ850g 308円 P H' })
    .getByLabel('H')
    .check()
  await page
    .getByRole('row', { name: 'コウショウノドンゴジネヌ150*3 78円 P H 両方' })
    .getByLabel('H')
    .check()
  await page
    .getByRole('row', { name: 'セブスプリサンゴールド 499円 P H 両方 Edit' })
    .locator('label')
    .nth(1)
    .dblclick()
  await page
    .getByRole('row', { name: 'ハウスバーニク35g 100円 P H 両方 Edit' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'トマト コバコ 398円 P H 両方 Edit' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'ハウスバーニク35g 100円 P H 両方 Edit' })
    .getByLabel('両方')
    .check()
  await page
    .getByRole('row', { name: 'トマト コバコ 398円 P H 両方 Edit' })
    .getByLabel('両方')
    .check()
  await page
    .getByRole('row', { name: 'ダゾンビオ シチリアレモン 4コ 163円 P H 両方' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'ダゾンビオ シチリアレモン 4コ 163円 P H 両方' })
    .getByLabel('H')
    .check()
  await page
    .getByRole('row', { name: 'ダゾンビオセイタクブドウ 326円 P H 両方 Edit' })
    .getByLabel('H')
    .check()
  await page
    .getByRole('row', { name: 'トマト コバコ 398円 P H 両方 Edit' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'バナナ 256円 P H 両方 Edit' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'ミヤマ イチオシキムチ 200g 153円 P H 両方' })
    .getByLabel('P')
    .check()
  await page
    .getByRole('row', { name: 'コクサンワカドリムネニク 596円 P H 両方 Edit' })
    .getByLabel('P')
    .check()
  await expect(page.getByText('Perry: 2,671円')).toBeVisible()
  await expect(page.getByText('Hannah: 1,955円')).toBeVisible()
  await expect(page.getByText('Both: 4,626円')).toBeVisible()
  // Testing Edit Total feature
  await page.getByRole('button', { name: 'Edit Total' }).click()
  await page.getByRole('spinbutton').click()
  await page.getByRole('spinbutton').fill('5666')
  await page.getByRole('button', { name: '編集' }).click()
  await expect(page.getByText('Perry: 3,191円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,475円')).toBeVisible()
  await expect(page.getByText('Both: 5,666円')).toBeVisible()
  await page
    .getByRole('row', {
      name: 'ハーゲン ミニCコウチャクッキーコウガ 218円 P H'
    })
    .getByRole('button')
    .click()
  await page.getByRole('spinbutton').click()
  await page.getByRole('spinbutton').fill('100')
  await page.getByRole('button', { name: '編集' }).click()
  await expect(page.getByText('Perry: 3,132円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,534円')).toBeVisible()
  await expect(page.getByText('Both: 5,666円')).toBeVisible()
  await page
    .getByRole('row', { name: 'ダゾンビオ シチリアレモン 4コ 163円 P H 両方' })
    .getByRole('button')
    .click()
  await page.getByRole('spinbutton').click()
  await page.getByRole('spinbutton').fill('200')
  await page.getByRole('button', { name: '編集' }).click()
  await expect(page.getByText('Perry: 3,113円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,553円')).toBeVisible()
  await expect(page.getByText('Both: 5,666円')).toBeVisible()
  await page.getByRole('button', { name: 'See Final Result' }).click()
  await expect(page.getByText('Test Title 2982580523 was')).toBeVisible()
  await page.getByRole('link', { name: 'See The Receipt Details' }).click()
  await expect(
    page.getByRole('heading', { name: 'Test Title 2982580523' })
  ).toBeVisible()
  await expect(page.getByText('Perry: 3,113円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,553円')).toBeVisible()
  await expect(page.getByText('Total: 5,666円')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Perry: 1,971円' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Hannah: 1,411円' })
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Both: 907円' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'その他（税金、割引など）: 1,377円' })
  ).toBeVisible()
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: 'レシート一覧' }).click()
  await expect(page.getByRole('heading', { name: 'Test Title' })).toBeVisible()
  await expect(page.getByText('Perry: 3,113円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,553円')).toBeVisible()
  await page.getByRole('link', { name: '見る' }).nth(3).click()
  await expect(
    page.getByRole('heading', { name: 'Test Title 2982580523' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Payer: hannah' })
  ).toBeVisible()
  await expect(page.getByText('Perry: 3,113円')).toBeVisible()
  await expect(page.getByText('Hannah: 2,553円')).toBeVisible()
  await expect(page.getByText('Total: 5,666円')).toBeVisible()
  // Check if receipt is properly being rendered
  const imgElement = page.locator('img')
  await expect(imgElement).toBeVisible()
  const imgSrc = await imgElement.getAttribute('src')
  const res = await page.request.get(`${imgSrc}`)
  expect(res.status()).toBe(200)
})
