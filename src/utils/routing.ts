const normalizeBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const basePath = new URL(baseUrl, window.location.origin).pathname

  if (basePath === '/') {
    return ''
  }

  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
}

export const getAppPath = () => {
  const basePath = normalizeBasePath()
  const { pathname } = window.location

  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || '/'
  }

  return pathname || '/'
}

export const getAppUrl = (path: string) => {
  const basePath = normalizeBasePath()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${basePath}${normalizedPath}`
}
