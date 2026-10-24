// Human-friendly reference codes (INQ-2026-4821, VWR-2026-1093, APP-CAD-2026-9412 …)
export function makeRef(prefix = 'REF') {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${new Date().getFullYear()}-${n}`
}

export const uuid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })

export const slugify = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
