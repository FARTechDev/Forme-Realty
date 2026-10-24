import ResourceManager from '../manage/ResourceManager'

export default function Testimonials() {
  return (
    <ResourceManager table="testimonials" title="Testimonials" noun="testimonial" subtitle="Client voices shown on Client Experiences." sortable searchCols={['client_name', 'quote', 'context']} defaults={{ published: true }}
      columns={[
        { key: 'client_name', label: 'Client', render: (r) => <div><div className="font-medium">{r.client_name}</div><div className="text-[12px] text-on-surface-variant">{r.context}</div></div> },
        { key: 'quote', label: 'Quote', render: (r) => <span className="line-clamp-2 max-w-md block text-on-surface-variant">{r.quote}</span> },
      ]}
      fields={[
        { key: 'client_name', label: 'Client name / initials', required: true }, { key: 'context', label: 'Context' }, { key: 'ref', label: 'Reference' },
        { key: 'quote', label: 'Quote', type: 'textarea', required: true }, { key: 'image', label: 'Image', type: 'image' }, { key: 'published', label: 'Published', type: 'toggle' },
      ]} />
  )
}
