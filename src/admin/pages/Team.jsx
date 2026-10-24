import ResourceManager from '../manage/ResourceManager'

export default function Team() {
  return (
    <ResourceManager table="team_members" title="Team" noun="team member" subtitle="People shown on Our People. The first member is the featured leader." sortable searchCols={['name', 'role']} defaults={{ published: true }}
      columns={[
        { key: 'img', label: '', render: (r) => <img src={r.image} alt="" className="w-10 h-10 object-cover rounded-full bg-surface-container" /> },
        { key: 'name', label: 'Name', render: (r) => <div><div className="font-medium">{r.name}</div><div className="text-[12px] text-on-surface-variant">{r.role}</div></div> },
      ]}
      fields={[
        { key: 'name', label: 'Name', required: true }, { key: 'role', label: 'Role', required: true }, { key: 'bio', label: 'Biography', type: 'textarea' },
        { key: 'image', label: 'Portrait', type: 'image' }, { key: 'published', label: 'Published', type: 'toggle' },
      ]} />
  )
}
