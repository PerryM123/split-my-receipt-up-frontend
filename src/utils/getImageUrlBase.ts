export const getImageUrlBase = () => {
  const config = useRuntimeConfig()
  const { imageUrlBaseLocal, imageUrlBaseLan } = config.public
  if (import.meta.client) {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${imageUrlBaseLocal}`
    }
    return `${imageUrlBaseLan}`
  }
  return `${imageUrlBaseLocal}`
}
