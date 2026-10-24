import RequestsPage, { Badge } from '../manage/RequestsPage'
import { fmtDate, titleCase } from '../ui'

const TYPES = ['general', 'consultation', 'property', 'buyer', 'seller', 'landlord', 'tenant', 'investment', 'commercial', 'land', 'development', 'new_development', 'mortgage', 'management', 'relocation', 'press', 'careers', 'accessibility']
export default function Inquiries() {
  return (
    <RequestsPage cfg={{
      table: 'inquiries', title: 'Inquiries', noun: 'inquiry', subtitle: 'Every message from the website — contact, property, service and careers forms.',
      statuses: ['new', 'in_progress', 'replied', 'closed'], types: TYPES.map((t) => ({ value: t, label: titleCase(t) })),
      searchCols: ['name', 'email', 'subject', 'message', 'ref'], csvCols: ['ref', 'type', 'name', 'email', 'phone', 'subject', 'message', 'status', 'created_at'],
      reply: (r) => `mailto:${r.email}?subject=${encodeURIComponent('Re: ' + (r.subject || 'Your enquiry to FORME Realty'))}`,
      columns: ({ propName }) => [
        { key: 'ref', label: 'Ref', render: (r) => <span className="font-medium tabular-nums">{r.ref}</span> },
        { key: 'name', label: 'From', render: (r) => <div><div>{r.name}</div><div className="text-[12px] text-on-surface-variant">{r.email}</div></div> },
        { key: 'subject', label: 'Subject', render: (r) => <div className="max-w-xs"><div className="truncate">{r.subject || '—'}</div>{r.property_id && <div className="text-[12px] text-on-surface-variant truncate">{propName[r.property_id]}</div>}</div> },
        { key: 'type', label: 'Type', render: (r) => <Badge tone="sage">{titleCase(r.type)}</Badge> },
        { key: 'status', label: 'Status', render: (r) => <Badge tone={{ new: 'amber', in_progress: 'blue', replied: 'sage', closed: 'neutral' }[r.status]}>{titleCase(r.status)}</Badge> },
        { key: 'created_at', label: 'Received', render: (r) => fmtDate(r.created_at) },
      ],
      detail: (r, { propName }) => [['Name', r.name], ['Email', r.email], ['Phone', r.phone], ['Type', titleCase(r.type)], ['Subject', r.subject], ['Property', r.property_id ? propName[r.property_id] : ''], ['Message', r.message],
        ...Object.entries(r.payload || {}).filter(([k]) => k !== 'page').map(([k, v]) => [k, String(v)])],
    }} />
  )
}
