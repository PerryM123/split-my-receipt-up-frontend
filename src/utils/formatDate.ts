export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  if (!date.getTime()) {
    throw new Error(`Invalid date string: ${dateString}`)
  }
  return date
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
    .replace(/-/g, '/')
}
