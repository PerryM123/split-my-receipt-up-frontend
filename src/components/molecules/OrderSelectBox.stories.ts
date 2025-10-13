import type { Meta, StoryObj } from '@nuxtjs/storybook'

import OrderSelectBox from '@/components/molecules/OrderSelectBox.vue'

const meta = {
  title: 'molecules/OrderSelectBox',
  component: OrderSelectBox,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof OrderSelectBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    receiptCount: 10,
    minDisplayCount: 1,
    maxDisplayCount: 5
  }
}

export const FullList: Story = {
  args: {
    receiptCount: 20,
    minDisplayCount: 1,
    maxDisplayCount: 20
  }
}

export const EmptyList: Story = {
  args: {
    receiptCount: 0
  }
}
