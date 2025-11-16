/**
 * Format numbers to max 4 decimal places
 */

export function formatNumber(value: number | string, maxDecimals: number = 4): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(num)) return '0'
  
  // If it's a whole number, return without decimals
  if (num % 1 === 0) return num.toString()
  
  // Format to max 4 decimal places, removing trailing zeros
  return num.toFixed(maxDecimals).replace(/\.?0+$/, '')
}

export function formatPercentage(value: number, maxDecimals: number = 4): string {
  return formatNumber(value, maxDecimals)
}

export function formatPrice(value: number | string, maxDecimals: number = 4): string {
  return formatNumber(value, maxDecimals)
}

