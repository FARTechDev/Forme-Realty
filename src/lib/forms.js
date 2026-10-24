// Generic submit handler for every <form data-form="slug"> in the converted design pages.
// Maps the fields to an inquiry (or valuation request) so nothing the design shows is a dead end.
import { db } from './db'
import { toast } from '../components/toast'

const TYPE = [
  ['start-a-conversation', 'consultation'], ['career', 'careers'], ['press', 'press'], ['accessib', 'accessibility'], ['buyer', 'buyer'], ['seller', 'seller'],
  ['landlord', 'landlord'], ['tenant', 'tenant'], ['investment', 'investment'], ['commercial', 'commercial'], ['land-dev', 'land'], ['development', 'development'],
  ['new-dev', 'new_development'], ['mortgage', 'mortgage'], ['management', 'management'], ['relocation', 'relocation'], ['valuation', 'valuation'],
]
const labelOf = (el, form) => {
  const id = el.id && form.querySelector(`label[for="${CSS.escape(el.id)}"]`)
  const wrap = el.closest('label')
  const prev = el.previousElementSibling?.tagName === 'LABEL' ? el.previousElementSibling : el.parentElement?.querySelector('label')
  return (el.getAttribute('name') || id?.textContent || wrap?.textContent || prev?.textContent || el.placeholder || el.id || 'field').replace(/\s+/g, ' ').replace(/\(optional\)/i, '').trim()
}

export function collect(form) {
  const fields = {}
  let name = '', email = '', phone = '', message = '', subject = ''
  form.querySelectorAll('input, select, textarea').forEach((el) => {
    if (el.type === 'submit' || el.type === 'button' || el.type === 'hidden' && !el.name) return
    if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return
    const label = labelOf(el, form)
    const v = el.type === 'checkbox' ? 'Yes' : String(el.value || '').trim()
    if (!v) return
    fields[label] = fields[label] && fields[label] !== v ? `${fields[label]}, ${v}` : v
    const key = (label + ' ' + (el.placeholder || '')).toLowerCase()
    if (el.type === 'email' || /e-?mail/.test(key)) email = email || v
    else if (el.type === 'tel' || /phone|mobile|telephone/.test(key)) phone = phone || v
    else if (el.tagName === 'TEXTAREA' || /message|notes|brief|describe|details|how can/.test(key)) message = message ? `${message}\n\n${v}` : v
    else if (/subject|topic|interest|enquiry type|inquiry type/.test(key)) subject = subject || v
    else if (/name/.test(key) && !/company|business|property/.test(key)) name = name ? `${name} ${v}` : v
  })
  return { fields, name, email, phone, message, subject }
}

export function installFormHandler() {
  const onSubmit = async (e) => {
    const form = e.target.closest?.('form[data-form]')
    if (!form) return
    e.preventDefault()
    const btn = form.querySelector('button[type="submit"], button:not([type])')
    if (btn?.disabled) return
    const slug = form.getAttribute('data-form')
    const type = (TYPE.find(([k]) => slug.includes(k)) || [0, 'general'])[1]
    const { fields, name, email, phone, message, subject } = collect(form)
    const orig = btn?.innerHTML
    if (btn) { btn.disabled = true; btn.style.opacity = '.6' }
    try {
      let ref
      if (type === 'valuation') {
        const addr = Object.entries(fields).find(([k]) => /address|location|property/i.test(k))?.[1] || ''
        const r = await db.submitValuation({ name: name || 'Valued client', email, phone, property_address: addr, property_type: fields['Property Type'] || '', reason: subject || fields['Reason'] || '', timeline: fields['Timeline'] || '', notes: message })
        ref = r.ref
      } else {
        const r = await db.submitInquiry({ type, name: name || email || 'Website visitor', email, phone, subject: subject || document.title.split(' — ')[0], message, payload: { ...fields, page: slug } })
        ref = r.ref
      }
      form.style.display = 'none'
      const ok = document.createElement('div')
      ok.className = 'p-8 rounded-lg bg-secondary-container/50 border border-secondary/20 text-on-surface'
      ok.innerHTML = `<span class="material-symbols-outlined text-[32px] text-secondary">check_circle</span><h3 class="font-headline-md text-headline-md font-light mt-3">Thank you — we have your message.</h3><p class="font-body-md text-body-md text-on-surface-variant mt-2">A member of our team will respond personally within one working day.${ref ? ` Your reference is <strong>${ref}</strong>.` : ''}</p>`
      form.parentElement.insertBefore(ok, form.nextSibling)
      toast('Message sent — thank you.')
    } catch (err) {
      console.error(err)
      toast(err.message || 'Something went wrong — please try again.', 'error')
      if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.innerHTML = orig }
    }
  }
  document.addEventListener('submit', onSubmit, true)
  return () => document.removeEventListener('submit', onSubmit, true)
}
