export interface ItemData {
  userName: string
  productName: string
  price: number
}
export interface ShoppingData {
  name: string
  displayName: string
  items: ItemData[]
}
