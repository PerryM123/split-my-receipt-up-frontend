import { describe, it, expect } from 'vitest'
import parseReceiptAnalysisJson from './parseReceiptAnalysisJson'

const validPayload = {
  message: 'Receipt Info Analyzed Successfully',
  receipt_info: {
    items: [
      { name: 'バナナ', price_total: 256 },
      { name: 'トマト コバコ', price_total: 398 }
    ],
    receipt_total: 654
  }
}

describe('parseReceiptAnalysisJson', () => {
  it('parses a valid receipt analysis JSON string', () => {
    const result = parseReceiptAnalysisJson(JSON.stringify(validPayload))
    expect(result).toEqual({ success: true, data: validPayload })
  })

  it('fails on invalid JSON syntax', () => {
    const result = parseReceiptAnalysisJson('{ not valid json')
    expect(result.success).toBe(false)
  })

  it('fails when the parsed value is not an object', () => {
    const result = parseReceiptAnalysisJson('"just a string"')
    expect(result.success).toBe(false)
  })

  it('fails when receipt_info is missing', () => {
    const result = parseReceiptAnalysisJson(JSON.stringify({ message: 'ok' }))
    expect(result.success).toBe(false)
  })

  it('fails when items is not an array', () => {
    const payload = {
      receipt_info: { items: 'not-an-array', receipt_total: 100 }
    }
    const result = parseReceiptAnalysisJson(JSON.stringify(payload))
    expect(result.success).toBe(false)
  })

  it('fails when an item is missing price_total', () => {
    const payload = {
      receipt_info: {
        items: [{ name: 'バナナ' }],
        receipt_total: 100
      }
    }
    const result = parseReceiptAnalysisJson(JSON.stringify(payload))
    expect(result.success).toBe(false)
  })

  it('fails when an item is missing name', () => {
    const payload = {
      receipt_info: {
        items: [{ price_total: 100 }],
        receipt_total: 100
      }
    }
    const result = parseReceiptAnalysisJson(JSON.stringify(payload))
    expect(result.success).toBe(false)
  })

  it('fails when receipt_total is not a number', () => {
    const payload = {
      receipt_info: {
        items: [{ name: 'バナナ', price_total: 256 }],
        receipt_total: '654'
      }
    }
    const result = parseReceiptAnalysisJson(JSON.stringify(payload))
    expect(result.success).toBe(false)
  })
})
