import type { Meta, StoryObj } from '@nuxtjs/storybook'

import LoadingFullScreen from '@/components/molecules/LoadingFullScreen.vue'

const meta = {
  title: 'molecules/LoadingFullScreen',
  component: LoadingFullScreen,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof LoadingFullScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
