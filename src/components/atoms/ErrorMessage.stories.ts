import type { Meta, StoryObj } from '@nuxtjs/storybook'

import ErrorMessage from '@/components/atoms/ErrorMessage.vue'

const meta = {
  title: 'atoms/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

const testData = {
  default: 'エラーが発生しました'
}
export const Primary: Story = {
  args: {
    ...testData
  }
}
