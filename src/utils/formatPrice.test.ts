import { describe, it, expect } from 'vitest'
import formatPrice from './formatPrice'

describe('formatPrice', () => {
  it('formats whole numbers correctly', () => {
    expect(formatPrice(1000)).toBe('1,000円')
    expect(formatPrice(10000)).toBe('10,000円')
  })

  it('formats decimal numbers correctly', () => {
    expect(formatPrice(1000.5)).toBe('1,000.5円')
    expect(formatPrice(10.99)).toBe('10.99円')
  })

  it('handles edge cases correctly', () => {
    expect(formatPrice(0)).toBe('0円')
    expect(formatPrice(-1000)).toBe('-1,000円')
    expect(formatPrice(1000000)).toBe('1,000,000円')
  })
})
