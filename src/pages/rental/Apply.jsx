import { useNavigate, useSearchParams } from 'react-router-dom'
import { db } from '../../lib/db'
import { useData } from '../../lib/hooks'
import { Shell, getDraft, setDraft, btn, inp, lab } from './flow'

const EMPLOY = ['Employed (Corporate / Professional)', 'Self-employed', 'Retired', 'Student', 'Other']
const TERMS = ['6 Months', '12 Months (Standard Fixed)', '24 Months', 'Flexible']

export default function Apply() {
  const [sp] = useSearchParams(); const nav = useNavigate()
  const { data: rentals = [] } = useData(() => db.publishedProperties({ listing_type: 'rent' }), [], [])
  const d = getDraft() || {}
  const slug = sp.get('property')
  const dflt = d.property_id || rentals.find((p) => p.slug === slug)?.id || ''
  const submit = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const prop = rentals.find((p) => p.id === f.property_id)
    setDraft({ ...f, occupants: +f.occupants || 1, property_title: prop?.title || '', rent_pcm: prop?.rent_pcm })
    nav('/rental-application/review')
  }
  return (
    <Shell title="Apply for a home" back={false} intro="Ten minutes, four short sections. You can review everything before it is sent.">
      <form key={dflt + rentals.length} onSubmit={submit} className="space-y-space-xl">
        <fieldset className="space-y-space-md"><legend className={`${lab} mb-2`}>1 · The home</legend>
          <select name="property_id" required defaultValue={dflt} className={inp}><option value="">Select a rental…</option>{rentals.map((p) => <option key={p.id} value={p.id}>{p.title} — {p.city}</option>)}</select>
          <div className="grid sm:grid-cols-2 gap-space-md"><label className="space-y-1"><span className={lab}>Move-in date</span><input name="move_in_date" type="date" required defaultValue={d.move_in_date} className={inp} /></label>
            <label className="space-y-1"><span className={lab}>Tenancy term</span><select name="tenancy_term" defaultValue={d.tenancy_term || TERMS[1]} className={inp}>{TERMS.map((t) => <option key={t}>{t}</option>)}</select></label></div>
          <label className="space-y-1 block"><span className={lab}>Occupants</span><input name="occupants" type="number" min="1" max="10" defaultValue={d.occupants || 1} className={inp} /></label></fieldset>
        <fieldset className="space-y-space-md"><legend className={`${lab} mb-2`}>2 · About you</legend>
          <input name="applicant_name" required placeholder="Full name" defaultValue={d.applicant_name} className={inp} />
          <div className="grid sm:grid-cols-2 gap-space-md"><input name="email" type="email" required placeholder="Email address" defaultValue={d.email} className={inp} /><input name="phone" placeholder="Phone" defaultValue={d.phone} className={inp} /></div>
          <select name="preferred_contact" defaultValue={d.preferred_contact || 'email'} className={inp}><option value="email">Prefer email</option><option value="phone">Prefer phone</option></select></fieldset>
        <fieldset className="space-y-space-md"><legend className={`${lab} mb-2`}>3 · Employment</legend>
          <select name="employment_status" defaultValue={d.employment_status || EMPLOY[0]} className={inp}>{EMPLOY.map((t) => <option key={t}>{t}</option>)}</select>
          <input name="employer" placeholder="Employer or business" defaultValue={d.employer} className={inp} /></fieldset>
        <fieldset className="space-y-space-md"><legend className={`${lab} mb-2`}>4 · Anything else</legend>
          <textarea name="references_text" rows={2} placeholder="References (previous landlord, employer contact)" defaultValue={d.references_text} className={inp} />
          <textarea name="special_notes" rows={3} placeholder="Pets, accessibility needs, other notes" defaultValue={d.special_notes} className={inp} /></fieldset>
        <button className={btn}>Review application</button>
      </form>
    </Shell>
  )
}
