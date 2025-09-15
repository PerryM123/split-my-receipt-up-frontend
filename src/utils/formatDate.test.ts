import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format ISO date string to YYYY/MM/DD format', () => {
    const testCases = [
      {
        input: '2025-06-04T11:08:36.000000Z',
        expected: '2025/6/4'
      },
      {
        input: '2023-12-31T23:59:59.999Z',
        // UTCから日本標準時の時間なので以下になる
        expected: '2024/1/1'
      },
      {
        input: '2022-01-01T00:00:00.000Z',
        expected: '2022/1/1'
      }
    ]

    testCases.forEach(({ input, expected }) => {
      expect(formatDate(input)).toBe(expected)
    })
  })

  it('should handle different time zones', () => {
    const testCases = [
      {
        // Tokyo標準時
        input: '2024-03-15T05:00:00+09:00',
        expected: '2024/3/15'
      },
      {
        // New York標準時
        input: '2024-03-14T20:00:00-05:00',
        expected: '2024/3/15'
      }
    ]

    testCases.forEach(({ input, expected }) => {
      expect(formatDate(input)).toBe(expected)
    })
  })

  it('should throw an error for invalid date strings', () => {
    const invalidCases = [
      'not a date',
      '',
      // Invalid dateになるはずの日付
      '2023-13-32'
    ]
    invalidCases.forEach((invalidInput) => {
      expect(() => formatDate(invalidInput)).toThrow()
    })
  })
})
