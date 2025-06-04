export const getImageUrlBase = () => {
  const config = useRuntimeConfig()
  const { imageUrlBaseLocal, imageUrlBaseLan, awsImageBucket } = config.public
  if (import.meta.client) {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${imageUrlBaseLocal}/${awsImageBucket}`
    }
    return `${imageUrlBaseLan}/${awsImageBucket}`
  }
  return `${imageUrlBaseLocal}/${awsImageBucket}`
}
