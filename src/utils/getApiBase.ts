// TODO: テストは追加必須
export const getApiBase = () => {
  const config = useRuntimeConfig()
  if (import.meta.client) {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return config.public.apiBaseLocal
    }
    return config.public.apiBaseLan
  }
  return config.public.apiBaseLocal
}
