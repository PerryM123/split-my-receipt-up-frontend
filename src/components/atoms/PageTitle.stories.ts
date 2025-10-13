import type { Meta, StoryObj } from '@nuxtjs/storybook'

import PageTitle from '@/components/atoms/PageTitle.vue'

const meta = {
  title: 'atoms/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof PageTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    default: 'My Page Title'
  }
}

export const LongTitle: Story = {
  args: {
    default: 'This is a Very Long Page Title That Spans Multiple Words'
  }
}
