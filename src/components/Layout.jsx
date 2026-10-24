import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Toaster from './Toaster'
import Cursor from './Cursor'
import Preloader from './Preloader'
import Engine from './Engine'
import { TransitionProvider } from './PageTransition'

export default function Layout() {
  return (
    <TransitionProvider>
      <Preloader />
      <Cursor />
      <Engine />
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Outlet />
      </Suspense>
      <Footer />
      <Toaster />
    </TransitionProvider>
  )
}
