import type { AnalyzeReceiptResponse, ItemInfo } from '@/types/receipt'

export type ParseReceiptAnalysisJsonResult =
  | { success: true; data: AnalyzeReceiptResponse }
  | { success: false; error: string }

const isValidItem = (item: unknown): item is ItemInfo => {
  if (typeof item !== 'object' || item === null) return false
  const candidate = item as Record<string, unknown>
  return (
    typeof candidate.name === 'string' &&
    typeof candidate.price_total === 'number'
  )
}

export default function parseReceiptAnalysisJson(
  rawJson: string
): ParseReceiptAnalysisJsonResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(rawJson)
  } catch {
    return {
      success: false,
      error: 'Invalid JSON. Please check the format and try again.'
    }
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return {
      success: false,
      error:
        'Invalid JSON shape. Expected a JSON object with a "receipt_info" field.'
    }
  }

  const receiptInfo = (parsed as Record<string, unknown>).receipt_info
  if (typeof receiptInfo !== 'object' || receiptInfo === null) {
    return {
      success: false,
      error: 'Invalid JSON shape. Missing "receipt_info" object.'
    }
  }

  const { items, receipt_total: receiptTotal } = receiptInfo as Record<
    string,
    unknown
  >

  if (!Array.isArray(items) || !items.every(isValidItem)) {
    return {
      success: false,
      error:
        'Invalid JSON shape. "receipt_info.items" must be an array of items with a "name" string and "price_total" number.'
    }
  }

  if (typeof receiptTotal !== 'number') {
    return {
      success: false,
      error:
        'Invalid JSON shape. "receipt_info.receipt_total" must be a number.'
    }
  }

  return {
    success: true,
    data: parsed as AnalyzeReceiptResponse
  }
}
