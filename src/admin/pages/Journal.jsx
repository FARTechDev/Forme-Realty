import ResourceManager, { fmtDate } from '../manage/ResourceManager'
import { Badge } from '../ui'

export default function Journal() {
  return (
    <ResourceManager table="journal_posts" title="Journal" noun="story" subtitle="Essays and field notes shown on the public Journal." slugFrom="title" order={{ col: 'published_at', asc: false }} searchCols={['title', 'category', 'excerpt']}
      defaults={{ published: false, featured: false, author: 'FORME Editorial', read_time: 5, category: 'Architecture', published_at: new Date().toISOString() }}
      columns={[
        { key: 'cover', label: '', render: (r) => <img src={r.cover_image} alt="" className="w-14 h-10 object-cover rounded bg-surface-container" /> },
        { key: 'title', label: 'Title', render: (r) => <div><div className="font-medium">{r.title}</div><div className="text-[12px] text-on-surface-variant">/journal/{r.slug}</div></div> },
        { key: 'category', label: 'Category', render: (r) => <Badge tone="sage">{r.category}</Badge> },
        { key: 'published_at', label: 'Date', render: (r) => fmtDate(r.published_at) },
        { key: 'featured', label: 'Lead', render: (r) => (r.featured ? <Badge tone="dark">Lead</Badge> : '') },
      ]}
      fields={[
        { key: 'title', label: 'Title', required: true, full: true }, { key: 'slug', label: 'Slug', hint: 'Used in the URL' },
        { key: 'category', label: 'Category', type: 'select', options: ['Architecture', 'Architecture & Living', 'Neighborhoods', 'Property Insights', 'Considered Living', 'Viewing'] },
        { key: 'author', label: 'Author' }, { key: 'read_time', label: 'Read time (min)', type: 'number' }, { key: 'published_at', label: 'Publish date', type: 'datetime' },
        { key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
        { key: 'body', label: 'Body', type: 'textarea', rows: 12, hint: 'Separate paragraphs with a blank line. Lines starting with “## ” become headings.' },
        { key: 'cover_image', label: 'Cover image', type: 'image' },
        { key: 'featured', label: 'Lead essay', type: 'toggle' }, { key: 'published', label: 'Published', type: 'toggle' },
      ]} />
  )
}
