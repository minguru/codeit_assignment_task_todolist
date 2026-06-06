const tenantId: string = `aldrb0306`

export const API_URL: string = `https://assignment-todolist-api.vercel.app/api/${tenantId}`

export function apiUrl(tId: string | undefined) {
  return tId !== undefined ? `https://assignment-todolist-api.vercel.app/api/${tId}` : `${tenantId}`
}
