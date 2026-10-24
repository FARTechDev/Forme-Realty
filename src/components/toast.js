// Minimal toast bus: import { toast } from '../components/toast'; toast('Saved')
export const toast = (message, type = 'info') => window.dispatchEvent(new CustomEvent('forme:toast', { detail: { message, type } }))
