import type { Meta, StoryObj } from '@nuxtjs/storybook'

import LoadingIcon from '@/components/atoms/LoadingIcon.vue'

const meta = {
  title: 'atoms/LoadingIcon',
  component: LoadingIcon,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof LoadingIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
