import { describe, it, expect } from 'vitest'
import getSum from './getSum'

describe('getSum', () => {
  it('adds two positive numbers', () => {
    expect(getSum(2, 3)).toBe(5)
  })

  it('adds a positive and a negative number', () => {
    expect(getSum(5, -2)).toBe(3)
  })

  it('adds two negative numbers', () => {
    expect(getSum(-4, -6)).toBe(-10)
  })

  it('adds zero', () => {
    expect(getSum(0, 7)).toBe(7)
    expect(getSum(0, 0)).toBe(0)
  })
})
