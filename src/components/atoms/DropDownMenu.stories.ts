import type { Meta, StoryObj } from '@nuxtjs/storybook'

import DropDownMenu from '@/components/atoms/DropDownMenu.vue'

const meta = {
  title: 'atoms/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Test Label',
    options: ['Newest', 'Oldest']
  }
}
