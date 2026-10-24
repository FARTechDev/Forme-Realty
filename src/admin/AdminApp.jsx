import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth'
import AdminLayout from './AdminLayout'
import Toaster from '../components/Toaster'
import { Spinner } from './ui'
import './admin.css'

const page = (n) => lazy(() => import(`./pages/${n}.jsx`))
const Login = page('Login')
const Dashboard = page('Dashboard')
const Properties = page('Properties')
const PropertyForm = page('PropertyForm')
const Inquiries = page('Inquiries')
const Viewings = page('Viewings')
const Applications = page('Applications')
const ApplicationDetail = page('ApplicationDetail')
const Valuations = page('Valuations')
const Journal = page('Journal')
const Neighborhoods = page('Neighborhoods')
const Testimonials = page('Testimonials')
const Team = page('Team')
const Subscribers = page('Subscribers')
const Settings = page('Settings')

function Guard({ children }) {
  const { admin, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size={28} /></div>
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />
  return children
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner size={28} /></div>}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<Guard><AdminLayout /></Guard>}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/new" element={<PropertyForm />} />
            <Route path="properties/:id" element={<PropertyForm />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="viewings" element={<Viewings />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetail />} />
            <Route path="valuations" element={<Valuations />} />
            <Route path="journal" element={<Journal />} />
            <Route path="neighborhoods" element={<Neighborhoods />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="team" element={<Team />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </AuthProvider>
  )
}
