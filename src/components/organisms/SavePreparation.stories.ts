import type { Meta, StoryObj } from '@nuxtjs/storybook'

import SavePreparation from '@/components/organisms/SavePreparation.vue'

const meta = {
  title: 'organisms/SavePreparation',
  component: SavePreparation,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof SavePreparation>

export default meta
type Story = StoryObj<typeof meta>

export const PerryPaid: Story = {
  args: {
    userWhoPaid: 'perry'
  }
}

export const HannahPaid: Story = {
  args: {
    userWhoPaid: 'hannah'
  }
}
