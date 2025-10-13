import type { Meta, StoryObj } from '@nuxtjs/storybook'

import BaseButton from '@/components/atoms/BaseButton.vue'

const meta = {
  title: 'atoms/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    secondary: { control: 'boolean' },
    small: { control: 'boolean' }
  }
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

const testData = {
  to: 'google.com',
  default: 'もっと見る'
}
export const Primary: Story = {
  args: {
    ...testData,
    primary: true
  }
}
export const Secondary: Story = {
  args: {
    ...testData,
    secondary: true
  }
}
export const SmallPrimary: Story = {
  args: {
    ...testData,
    primary: true,
    small: true
  }
}
export const SmallSecondary: Story = {
  args: {
    ...testData,
    secondary: true,
    small: true
  }
}
