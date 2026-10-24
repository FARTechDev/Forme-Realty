import ResourceManager from '../manage/ResourceManager'

export default function Neighborhoods() {
  return (
    <ResourceManager table="neighborhoods" title="Neighborhoods" noun="neighborhood" subtitle="Enclaves featured on the homepage and the Neighborhoods page." slugFrom="name" sortable searchCols={['name', 'city']}
      defaults={{ published: true }}
      columns={[
        { key: 'img', label: '', render: (r) => <img src={r.image} alt="" className="w-14 h-10 object-cover rounded bg-surface-container" /> },
        { key: 'name', label: 'Name', render: (r) => <div><div className="font-medium">{r.name}</div><div className="text-[12px] text-on-surface-variant">{r.city}</div></div> },
        { key: 'tagline', label: 'Tagline' },
      ]}
      fields={[
        { key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug' }, { key: 'city', label: 'City / region', required: true }, { key: 'tagline', label: 'Tagline' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 4 }, { key: 'image', label: 'Image', type: 'image' }, { key: 'published', label: 'Published', type: 'toggle' },
      ]} />
  )
}
