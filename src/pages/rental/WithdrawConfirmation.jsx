import { Link } from '../../components/Link'
import { Shell, btn, btn2 } from './flow'
export default function WithdrawConfirmation() {
  return <Shell title="Application withdrawn" back={false} intro="We have closed your application and notified the team. Thank you for letting us know."><div className="flex flex-wrap gap-space-sm"><Link to="/rentals" className={btn}>Browse rentals</Link><Link to="/" className={btn2}>Return home</Link></div></Shell>
}
