import { useLocation } from 'react-router-dom'
import { Link } from '../../components/Link'
import { Shell, getSession, btn, btn2, lab } from './flow'

export default function Confirmation() {
  const s = useLocation().state || { ...getSession() }
  return (
    <Shell title="Application submitted" back={false}>
      <div className="space-y-space-md">
        <span className="material-symbols-outlined text-secondary text-[56px]">task_alt</span>
        <p className="font-body-lg text-on-surface-variant font-light">Thank you. {s.title ? <>Your application for <b className="text-primary">{s.title}</b> is with our team.</> : 'Your application is with our team.'} We usually respond within two working days{s.email ? <>, at {s.email}</> : ''}.</p>
        {s.ref && <div className="inline-block bg-surface-container-low rounded-lg px-6 py-4"><span className={lab}>Your reference</span><div className="font-headline-sm text-primary">{s.ref}</div></div>}
        <p className="text-[14px] text-on-surface-variant">Keep this reference — you will need it with your email to track the application.</p>
        <div className="flex flex-wrap gap-space-sm"><Link to="/rental-application/status" className={btn}>Track application</Link><Link to="/rental-application/documents" className={btn2}>Upload documents</Link></div>
      </div>
    </Shell>
  )
}
