import { Link } from '../../components/Link'
import { Shell, btn } from './flow'
export default function AdditionalInfoConfirmation() {
  return <Shell title="Thank you" back={false} intro="Your response has been added to your application and your advisor has been notified."><Link to="/rental-application/status" className={btn}>Back to overview</Link></Shell>
}
