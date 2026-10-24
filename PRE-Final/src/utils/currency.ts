/**
 * Formats numbers into Philippine Peso currency (₱).
 * E.g., 1250 => "₱1,250.00"
 */
export function formatCurrency(amount: number): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

/**
 * Clean compact currency for small badges or stat previews
 */
export function formatCompactCurrency(amount: number): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  if (safeAmount >= 1_000_000) {
    return `₱${(safeAmount / 1_000_000).toFixed(1)}M`;
  }
  if (safeAmount >= 1_000) {
    return `₱${(safeAmount / 1_000).toFixed(1)}k`;
  }
  return formatCurrency(safeAmount);
}

