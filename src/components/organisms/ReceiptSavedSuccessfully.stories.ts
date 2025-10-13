import type { Meta, StoryObj } from '@nuxtjs/storybook'

import ReceiptSavedSuccessfully from '@/components/organisms/ReceiptSavedSuccessfully.vue'

const meta = {
  title: 'organisms/ReceiptSavedSuccessfully',
  component: ReceiptSavedSuccessfully,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ReceiptSavedSuccessfully>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    receiptTitle: 'Grocery Shopping',
    receiptId: 123
  }
}

export const LongTitle: Story = {
  args: {
    receiptTitle: 'A Very Long Receipt Title That Goes On and On',
    receiptId: 456
  }
}

export const NoReceiptId: Story = {
  args: {
    receiptTitle: 'Unnamed Receipt'
  }
}
