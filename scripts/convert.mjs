// Converts the Stitch design screens (code.html) into React JSX page components.
// Header/footer are dropped (shared Layout provides them). Page-level inline scripts are preserved
// and executed at runtime through lib/legacy.js so the original micro-interactions keep working.
import fs from 'node:fs'
import path from 'node:path'
import { parse, NodeType } from 'node-html-parser'
import { createRequire } from 'node:module'
const he = createRequire(import.meta.url)('he')

const SRC = process.argv[2]
const OUT = process.argv[3]
fs.mkdirSync(OUT, { recursive: true })

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
const INLINE = new Set(['a', 'span', 'em', 'strong', 'b', 'i', 'small', 'code', 'img', 'button', 'label', 'input', 'svg', 'sup', 'sub', 'abbr', 'time', 'select', 'textarea', 'mark', 'u'])
const NO_WS = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup', 'select', 'svg', 'ul', 'ol', 'dl', 'optgroup', 'defs', 'g', 'clipPath', 'linearGradient', 'radialGradient', 'mask', 'pattern', 'filter', 'symbol'])

const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', colspan: 'colSpan', rowspan: 'rowSpan', maxlength: 'maxLength',
  minlength: 'minLength', readonly: 'readOnly', autocomplete: 'autoComplete', crossorigin: 'crossOrigin', srcset: 'srcSet',
  frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', enctype: 'encType', novalidate: 'noValidate',
  autofocus: 'autoFocus', contenteditable: 'contentEditable', viewbox: 'viewBox', 'xlink:href': 'xlinkHref',
  'accept-charset': 'acceptCharset', datetime: 'dateTime', cellpadding: 'cellPadding', cellspacing: 'cellSpacing',
  spellcheck: 'spellCheck', inputmode: 'inputMode', referrerpolicy: 'referrerPolicy', playsinline: 'playsInline',
  preserveaspectratio: 'preserveAspectRatio',
}
const BOOL = new Set(['required', 'disabled', 'multiple', 'readonly', 'autofocus', 'hidden', 'open', 'novalidate', 'allowfullscreen', 'playsinline', 'loop', 'muted', 'autoplay', 'controls', 'reversed', 'inert'])

const PATHS = {
  properties: '/properties', residences: '/residences', neighborhoods: '/neighborhoods', 'our-approach': '/our-approach',
  journal: '/journal', 'start-a-conversation': '/start-a-conversation', 'start-conversation': '/start-a-conversation',
  contact: '/start-a-conversation', consultation: '/start-a-conversation', inquiry: '/start-a-conversation',
  'private-advisory': '/start-a-conversation', 'advisory-services': '/start-a-conversation',
  'privacy-policy': '/privacy-policy', privacy: '/privacy-policy', 'privacy-standard': '/privacy-policy',
  'terms-of-use': '/terms', 'terms-of-service': '/terms', terms: '/terms', 'terms-of-representation': '/terms', 'terms-of-advisory': '/terms',
  'fair-housing': '/fair-housing', 'fair-housing-statement': '/fair-housing', regulatory: '/fair-housing',
  accessibility: '/accessibility', 'accessibility-notice': '/accessibility', 'client-experiences': '/client-experiences',
  'rental-application-tracking': '/rental-application/status', 'forme-realty-our-people': '/our-people', partners: '/our-people',
  'frequently-asked-questions': '/faq', 'forme-realty-schedule-a-property-viewing': '/schedule-viewing',
  'land-development-opportunities': '/land-development', 'commercial-real-estate': '/commercial', home: '/',
  'forme-realty-arrange-a-property-viewing': '/arrange-viewing', 'forme-realty-property-management-services': '/property-management',
  'forme-realty-landlord-services': '/landlord-services',
  'page-45-additional-information-submission-confirmation': '/rental-application/additional-information/confirmation',
  'forme-realty-rental-application-additional-information-request': '/rental-application/additional-information',
  'financing-guidance': '/financing', 'page-25-mortgage-financing-guidance': '/financing',
  'relocation-moving': '/relocation', 'forme-realty-relocation-moving-guide': '/relocation', rentals: '/rentals',
  'private-acquisitions': '/buyer-services', 'portfolio-disposition': '/seller-services', 'valuation-appraisal': '/valuation',
  'rental-application-portal': '/rental-application', application: '/rental-application',
  'forme-realty-rental-application-submission-confirmation': '/rental-application/confirmation',
  'tenancy-dossier': '/rental-application/documents', 'dossier-review': '/rental-application/review',
  'rental-application-viewing-guide': '/rental-application/viewing-guide', 'property-detail': '/properties/the-courtyard-residence',
  'architectural-archive': '/journal',
}
const TEXT_RULES = [
  [/^(messages?)( & clarifications)?$/i, '/rental-application/messages'],
  [/messages & clarifications/i, '/rental-application/messages'],
  [/document centre|tenancy dossier|view document/i, '/rental-application/documents'],
  [/application clarifications|provide requested information/i, '/rental-application/additional-information'],
  [/view (submitted )?dossier|edit section/i, '/rental-application/review'],
  [/application status|return to my applications|rental applications?$/i, '/rental-application/status'],
  [/^rental application$/i, '/rental-application'],
  [/^home$/i, '/'],
  [/^rentals$/i, '/rentals'],
  [/start (a|your) conversation|start your search|discuss|request (an? )?(advisory|property|assessment)|contact/i, '/start-a-conversation'],
  [/explore our approach|discover (our|the forme) approach|our perspective/i, '/our-approach'],
  [/neighborhood|west lake hills|highland park/i, '/neighborhoods'],
  [/view profile/i, '/our-people'],
  [/calendar_today/i, '/schedule-viewing'],
  [/buyer resources/i, '/financing'],
  [/^services$/i, '/buyer-services'],
  [/propert|residence|opportunit|view spec|^view\b|browse/i, '/properties'],
]

function mapLink(dp, href, text) {
  const t = (text || '').replace(/\s+/g, ' ').trim()
  if (dp) {
    for (const [re, to] of TEXT_RULES.slice(0, 6)) if (re.test(t)) return to
    if (PATHS[dp]) return PATHS[dp]
  }
  for (const [re, to] of TEXT_RULES) if (re.test(t)) return to
  return PATHS[dp] || '/'
}

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
const jsStr = (v) => JSON.stringify(v)
const attrVal = (v) => (/["&\\{}\n<>]/.test(v) ? `{${jsStr(v)}}` : `"${v}"`)

function styleObj(css) {
  const parts = css.split(';').map((s) => s.trim()).filter(Boolean)
  const o = []
  for (const p of parts) {
    const i = p.indexOf(':')
    if (i < 0) continue
    const k = p.slice(0, i).trim()
    const v = p.slice(i + 1).trim()
    o.push(`${k.startsWith('--') ? jsStr(k) : jsStr(camel(k))}: ${jsStr(v)}`)
  }
  return `{{ ${o.join(', ')} }}`
}

let imgCount = 0
let formCount = 0
let pageSlug = ''

function attrsOf(node, tag, ctx) {
  const out = []
  const a = node.attributes
  const text = node.text
  for (const [k0, v0] of Object.entries(a)) {
    const k = k0.toLowerCase()
    let v = v0
    if (k === 'data-path') continue
    if (/^on[a-z]+$/.test(k)) { out.push(`data-${k}=${attrVal(v)}`); continue }
    if (tag === 'a' && k === 'href') continue
    if (k === 'style') { out.push(`style=${styleObj(v)}`); continue }
    if (tag === 'select' && k === 'value') continue
    if ((tag === 'input' || tag === 'textarea') && k === 'value') { out.push(`defaultValue=${attrVal(v)}`); continue }
    if (tag === 'input' && k === 'checked') { out.push('defaultChecked'); continue }
    if (k === 'selected') continue
    if (k === 'class') { v = v.replace(/\s+/g, ' ').trim() }
    let name = ATTR_MAP[k0] || ATTR_MAP[k]
    if (!name) {
      if (k.startsWith('data-') || k.startsWith('aria-')) name = k0
      else if (k0.includes('-') || k0.includes(':')) name = camel(k0.replace(':', '-'))
      else name = k0
    }
    if (BOOL.has(k) && (v === '' || v === k)) { out.push(name); continue }
    if (v === '' && !k.startsWith('data-') && !k.startsWith('aria-') && k !== 'alt' && k !== 'value' && k !== 'placeholder') { out.push(name); continue }
    out.push(`${name}=${attrVal(v)}`)
  }
  return out
}

function textOf(node) { return node.childNodes.map((c) => (c.nodeType === NodeType.TEXT_NODE ? he.decode(c.rawText) : '')).join('') }

function convertChildren(node, tag, depth) {
  const kids = node.childNodes.filter((c) => c.nodeType !== NodeType.COMMENT_NODE)
  const out = []
  kids.forEach((c, idx) => {
    if (c.nodeType === NodeType.TEXT_NODE) {
      let t = he.decode(c.rawText).replace(/\s+/g, ' ')
      if (t.trim() === '') {
        if (NO_WS.has(tag)) return
        const prev = kids[idx - 1], next = kids[idx + 1]
        const isInl = (n) => n && (n.nodeType === NodeType.TEXT_NODE ? n.rawText.trim() !== '' : INLINE.has(n.rawTagName?.toLowerCase()))
        if (isInl(prev) && isInl(next)) out.push('{" "}')
        return
      }
      if (NO_WS.has(tag) && tag !== 'select') return
      if (idx === 0) t = t.replace(/^ /, '')
      if (idx === kids.length - 1) t = t.replace(/ $/, '')
      if (/[{}<>]/.test(t)) out.push(`{${jsStr(t)}}`)
      else out.push(t.replace(/&/g, '&amp;'))
      return
    }
    if (c.nodeType === NodeType.ELEMENT_NODE) {
      const s = convertEl(c, depth + 1)
      if (s) out.push(s)
    }
  })
  return out
}

function convertEl(node, depth = 0, opts = {}) {
  const tag = node.rawTagName.toLowerCase()
  if (tag === 'script' || tag === 'style' || tag === 'noscript') return ''
  const pad = ''
  let attrs = attrsOf(node, tag, opts)

  if (tag === 'a') {
    const href = node.getAttribute('href') || '#'
    const dp = node.getAttribute('data-path')
    const text = node.text
    if (/^(mailto:|tel:|https?:)/.test(href)) {
      attrs.push(`href=${attrVal(href)}`)
      const inner = convertChildren(node, tag, depth).join('')
      return `<a ${attrs.join(' ')}>${inner}</a>`
    }
    if (href.startsWith('#') && href.length > 1) {
      attrs.push(`href=${attrVal(href)}`)
      const inner = convertChildren(node, tag, depth).join('')
      return `<a ${attrs.join(' ')}>${inner}</a>`
    }
    const to = mapLink(dp, href, text)
    const inner = convertChildren(node, tag, depth).join('')
    return `<Link to=${attrVal(to)} ${attrs.join(' ')}>${inner}</Link>`
  }

  if (tag === 'img') {
    imgCount++
    if (imgCount > 2) attrs.push('loading="lazy"')
    attrs.push('decoding="async"')
    return `<img ${attrs.join(' ')} />`
  }
  if (tag === 'form') { attrs.push(`data-form=${attrVal(pageSlug + (formCount++ ? '-' + formCount : ''))}`) }
  if (tag === 'select') {
    const sel = node.querySelector('option[selected]')
    if (sel) attrs.push(`defaultValue=${attrVal(sel.getAttribute('value') ?? sel.text.trim())}`)
  }
  if (tag === 'textarea') {
    const v = textOf(node)
    if (v.trim()) attrs.push(`defaultValue=${attrVal(v.trim())}`)
    return `<textarea ${attrs.join(' ')} />`
  }
  if (tag === 'option') {
    const v = node.getAttribute('value')
    // keep value attr as written by attrsOf
  }
  if (VOID.has(tag)) return `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''} />`
  const inner = convertChildren(node, tag, depth).join('')
  return `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>${inner}</${tag}>`
}

const pascal = (s) => s.split('_').map((w) => w[0].toUpperCase() + w.slice(1)).join('')

const dirs = fs.readdirSync(SRC).filter((d) => d.startsWith('forme_realty_'))
const index = []
for (const d of dirs) {
  const f = path.join(SRC, d, 'code.html')
  if (!fs.existsSync(f)) continue
  const raw = fs.readFileSync(f, 'utf8')
  const root = parse(raw, { comment: false, blockTextElements: { script: true, style: true, noscript: true, pre: true } })
  const main = root.querySelector('main')
  const slug = d.replace('forme_realty_', '')
  pageSlug = slug.replace(/_/g, '-')
  imgCount = 0
  formCount = 0

  // inline page scripts (excluding tailwind config)
  const scripts = root.querySelectorAll('script').filter((s) => !s.getAttribute('src') && !/tailwind\.config/.test(s.text)).map((s) => he.decode(s.rawText ?? s.text).trim()).filter(Boolean)
  const script = scripts.join('\n;\n')

  // main attributes -> keep, add ref
  const mainAttrs = attrsOf(main, 'main', {})
  const inner = convertChildren(main, 'main', 1).join('\n')
  const name = pascal(slug) + 'Page'
  const jsx = `// AUTO-GENERATED from the design screen "${d}" by scripts/convert.mjs
/* eslint-disable */
import { Link } from '../../components/Link'
import { useLegacyPage } from '../../lib/legacy'

const SCRIPT = ${jsStr(script)}

export default function ${name}() {
  const ref = useLegacyPage(SCRIPT)
  return (
    <main ref={ref} ${mainAttrs.join(' ')}>
${inner}
    </main>
  )
}
`
  fs.writeFileSync(path.join(OUT, name + '.jsx'), jsx)
  index.push({ slug, name, forms: formCount, hasScript: !!script })
}
fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify(index, null, 1))
console.log('converted', index.length, 'pages')
