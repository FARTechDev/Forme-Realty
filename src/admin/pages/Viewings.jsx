import { Button, Field, Input } from '../ui'
import { useState } from 'react'
import RequestsPage, { Badge } from '../manage/RequestsPage'
import { fmtDate, titleCase } from '../ui'

function Reschedule({ row, update }) {
  const [d, setD] = useState(row.preferred_date); const [t, setT] = useState(row.preferred_time)
  return (
    <div className="bg-surface-container-low rounded-lg p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button size="sm" icon="check_circle" onClick={() => update({ status: 'confirmed' })}>Confirm</Button>
        <Button size="sm" variant="secondary" icon="task_alt" onClick={() => update({ status: 'completed' })}>Mark completed</Button>
        <Button size="sm" variant="secondary" icon="event_busy" onClick={() => update({ status: 'cancelled' })}>Cancel</Button>
      </div>
      <div className="grid grid-cols-2 gap-3 items-end">
        <Field label="Date"><Input type="date" value={d || ''} onChange={(e) => setD(e.target.value)} /></Field>
        <Field label="Time"><Input type="time" value={t || ''} onChange={(e) => setT(e.target.value)} /></Field>
      </div>
      <Button size="sm" variant="subtle" className="mt-3" icon="update" onClick={() => update({ preferred_date: d, preferred_time: t, status: 'rescheduled' })}>Reschedule</Button>
    </div>
  )
}

export default function Viewings() {
  return (
    <RequestsPage cfg={{
      table: 'viewing_requests', title: 'Viewings', noun: 'viewing', subtitle: 'Private viewing requests — confirm, reschedule or complete.', orderBy: 'preferred_date', orderAsc: true,
      statuses: ['pending', 'confirmed', 'rescheduled', 'completed', 'cancelled'], searchCols: ['name', 'email', 'ref', 'notes'], notesKey: 'admin_notes',
      csvCols: ['ref', 'property_id', 'name', 'email', 'phone', 'preferred_date', 'preferred_time', 'secondary_date', 'viewing_type', 'attendees', 'status'],
      reply: (r) => `mailto:${r.email}?subject=${encodeURIComponent('Your viewing request ' + r.ref)}`,
      actions: (row, update) => <Reschedule key={row.id + row.updated_at} row={row} update={update} />,
      columns: ({ propName }) => [
        { key: 'ref', label: 'Ref', render: (r) => <span className="font-medium">{r.ref}</span> },
        { key: 'when', label: 'When', render: (r) => <div><div>{fmtDate(r.preferred_date)}</div><div className="text-[12px] text-on-surface-variant">{r.preferred_time}</div></div> },
        { key: 'prop', label: 'Property', render: (r) => <span className="block max-w-xs truncate">{propName[r.property_id] || '—'}</span> },
        { key: 'name', label: 'Guest', render: (r) => <div><div>{r.name}</div><div className="text-[12px] text-on-surface-variant">{r.email}</div></div> },
        { key: 'viewing_type', label: 'Type', render: (r) => <Badge tone="sage">{titleCase(r.viewing_type)}</Badge> },
        { key: 'status', label: 'Status', render: (r) => <Badge tone={{ pending: 'amber', confirmed: 'green', rescheduled: 'blue', completed: 'green', cancelled: 'red' }[r.status]}>{r.status}</Badge> },
      ],
      detail: (r, { propName }) => [['Property', propName[r.property_id]], ['Date', fmtDate(r.preferred_date)], ['Time', r.preferred_time], ['Alternative date', r.secondary_date ? fmtDate(r.secondary_date) : ''], ['Type', titleCase(r.viewing_type)], ['Attendees', r.attendees], ['Name', r.name], ['Email', r.email], ['Phone', r.phone], ['Guest notes', r.notes]],
    }} />
  )
}
