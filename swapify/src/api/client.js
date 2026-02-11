const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://xinyanc.pythonanywhere.com'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    const message = errorText || response.statusText
    throw new Error(`API error (${response.status}): ${message}`)
  }

  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export const apiGet = (path, options) => apiRequest(path, options)

export const apiPost = (path, body, options = {}) =>
  apiRequest(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  })

export const apiDelete = (path, options = {}) =>
  apiRequest(path, {
    ...options,
    method: 'DELETE',
  })
