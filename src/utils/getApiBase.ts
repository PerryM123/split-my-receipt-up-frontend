// TODO: テストは追加必須
export const getApiBase = () => {
  const config = useRuntimeConfig()

  if (import.meta.client) {
    // TODO: 以下は仮
    console.log('perry: clientside: getApiBase')
    const hostname = window.location.hostname

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return config.public.apiBaseLocal
    }

    return config.public.apiBaseLan
  } else {
    // TODO: 以下は仮
    console.log('perry: serverside: getApiBase')
  }

  return config.public.apiBaseLocal
}
