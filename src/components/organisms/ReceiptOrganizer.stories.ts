import type { Meta, StoryObj } from '@nuxtjs/storybook'

import ReceiptOrganizer from '@/components/organisms/ReceiptOrganizer.vue'

const meta = {
  title: 'organisms/ReceiptOrganizer',
  component: ReceiptOrganizer,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ReceiptOrganizer>

export default meta
type Story = StoryObj<typeof meta>

const testData = {
  receiptInfo: {
    items: [
      {
        name: 'ハーゲン ミニCコウチャクッキーコウガ',
        price_total: 218,
        who_paid: 'both'
      },
      {
        name: 'オリジナルアイスブラッドオレンジ',
        price_total: 204,
        who_paid: 'both'
      },
      {
        name: 'オカメ スゴイナットウS-903',
        price_total: 264,
        who_paid: 'both'
      },
      {
        name: 'アタックコウキンEXハヤヨウカエ850g',
        price_total: 308,
        who_paid: 'both'
      },
      {
        name: 'コウショウノドンゴジネヌ150*3',
        price_total: 78,
        who_paid: 'both'
      },
      { name: 'セブスプリサンゴールド', price_total: 499, who_paid: 'both' },
      {
        name: 'ワイドハイターEXパワー820ml',
        price_total: 328,
        who_paid: 'both'
      },
      {
        name: 'サラサーティコットン100ムコウ56',
        price_total: 280,
        who_paid: 'both'
      },
      { name: 'バナナ', price_total: 256, who_paid: 'both' },
      { name: 'ハウスバーニク35g', price_total: 100, who_paid: 'both' },
      { name: 'トマト コバコ', price_total: 398, who_paid: 'both' },
      {
        name: 'ダゾンビオセイタクブドウ',
        price_total: 326,
        who_paid: 'both'
      },
      {
        name: 'ダゾンビオ シチリアレモン 4コ',
        price_total: 163,
        who_paid: 'both'
      },
      {
        name: 'コイワイヨーグルトシボウ0 400g',
        price_total: 199,
        who_paid: 'both'
      },
      {
        name: 'ミヤマ イチオシキムチ 200g',
        price_total: 153,
        who_paid: 'both'
      },
      { name: 'コクサンワカドリムネニク', price_total: 596, who_paid: 'both' }
    ],
    receipt_total: 0
  },
  selectedFile: null,
  receiptTitle: 'Test Receipt Title',
  userWhoPaid: 'perry'
}

export const Default: Story = {
  args: {
    receiptInfo: testData.receiptInfo,
    receiptTotal: 4626,
    selectedFile: testData.selectedFile,
    receiptTitle: testData.receiptTitle,
    userWhoPaid: testData.userWhoPaid
  }
}

export const ErrorData: Story = {
  args: {
    receiptInfo: testData.receiptInfo,
    receiptTotal: 2000,
    selectedFile: testData.selectedFile,
    receiptTitle: testData.receiptTitle,
    userWhoPaid: testData.userWhoPaid
  }
}
