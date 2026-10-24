import RequestsPage, { Badge } from '../manage/RequestsPage'
import { fmtDate } from '../ui'

export default function Valuations() {
  return (
    <RequestsPage cfg={{
      table: 'valuation_requests', title: 'Valuations', noun: 'valuation', subtitle: 'Property valuation and assessment requests.',
      statuses: ['new', 'scheduled', 'completed', 'closed'], searchCols: ['name', 'email', 'property_address', 'ref'], notesKey: 'admin_notes',
      csvCols: ['ref', 'name', 'email', 'phone', 'property_address', 'property_type', 'reason', 'timeline', 'estimated_value', 'status', 'created_at'],
      extra: [{ key: 'estimated_value', label: 'Estimated value (USD)', type: 'number' }],
      reply: (r) => `mailto:${r.email}?subject=${encodeURIComponent('Your FORME property valuation ' + r.ref)}`,
      columns: () => [
        { key: 'ref', label: 'Ref', render: (r) => <span className="font-medium">{r.ref}</span> },
        { key: 'name', label: 'Client', render: (r) => <div><div>{r.name}</div><div className="text-[12px] text-on-surface-variant">{r.email}</div></div> },
        { key: 'property_address', label: 'Property', render: (r) => <span className="block max-w-xs truncate">{r.property_address}</span> },
        { key: 'status', label: 'Status', render: (r) => <Badge tone={{ new: 'amber', scheduled: 'blue', completed: 'green', closed: 'neutral' }[r.status]}>{r.status}</Badge> },
        { key: 'created_at', label: 'Received', render: (r) => fmtDate(r.created_at) },
      ],
      detail: (r) => [['Name', r.name], ['Email', r.email], ['Phone', r.phone], ['Property address', r.property_address], ['Property type', r.property_type], ['Reason', r.reason], ['Timeline', r.timeline], ['Notes from client', r.notes]],
    }} />
  )
}
