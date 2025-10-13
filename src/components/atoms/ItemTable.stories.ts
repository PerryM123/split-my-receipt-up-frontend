import type { Meta, StoryObj } from '@nuxtjs/storybook'

import ItemTable from '@/components/atoms/ItemTable.vue'

const meta = {
  title: 'atoms/ItemTable',
  component: ItemTable,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ItemTable>

export default meta
type Story = StoryObj<typeof meta>

const testData = {
  boughtItems: [
    {
      name: 'Apple',
      price: 100,
      bought_item_id: 0,
      receipt_id: 0,
      payer_name: 'perry'
    },
    {
      name: 'Banana',
      price: 200,
      bought_item_id: 1,
      receipt_id: 1,
      payer_name: 'perry'
    },
    {
      name: 'Orange',
      price: 150,
      bought_item_id: 2,
      receipt_id: 2,
      payer_name: 'perry'
    }
  ]
}

export const Default: Story = {
  args: {
    boughtItems: testData.boughtItems
  }
}

export const EmptyItems: Story = {
  args: {
    boughtItems: []
  }
}
