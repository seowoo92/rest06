import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import Home from './pages/Home'
import AboutCompany from './pages/AboutCompany'
import AboutCeo from './pages/AboutCeo'
import ServicesAll from './pages/ServicesAll'
import ServicesHow from './pages/ServicesHow'
import CommunityNotice from './pages/CommunityNotice'
import CommunityReview from './pages/CommunityReview'
import CommunityInquiry from './pages/CommunityInquiry'
import Login from './pages/Login'
import { useTheme } from './context/ThemeContext'
import './index.css'

/* ── Floating help button (sub-pages only) ── */
function FloatingBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="도움 신청"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 900,
        background: 'var(--grad)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.9rem',
        borderRadius: '999px',
        padding: '0.75rem 1.4rem',
        boxShadow: '0 6px 28px rgba(var(--ring-rgb), 0.45)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        animation: 'pulseRing 2.2s infinite',
        transition: 'transform 0.18s, box-shadow 0.18s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(var(--ring-rgb), 0.55)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(var(--ring-rgb), 0.45)'
      }}
    >
      <HandIcon size={17} />
      도움 신청
    </button>
  )
}

function HandIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  )
}

export default function App() {
  const { mode } = useTheme()
  const location = useLocation()

  /* BookingModal state */
  const [isBookingOpen, setIsBookingOpen]     = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  function openBookingWith(serviceId = null) {
    setSelectedService(serviceId)
    setIsBookingOpen(true)
  }

  function closeBooking() {
    setIsBookingOpen(false)
    setSelectedService(null)
  }

  /* Apply dark class to root for CSS scope, if needed */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  const isHome = location.pathname === '/'
  const isLoginPage = location.pathname === '/login'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        color: 'var(--ink)',
      }}
    >
      {/* Navbar */}
      <Navbar onBookingOpen={openBookingWith} />

      {/* Page routes */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"                    element={<Home onBookingOpen={openBookingWith} />} />
          <Route path="/about"               element={<AboutCompany />} />
          <Route path="/about/ceo"           element={<AboutCeo />} />
          <Route path="/services"            element={<ServicesAll onBookingOpen={openBookingWith} />} />
          <Route path="/services/how"        element={<ServicesHow />} />
          <Route path="/community/notice"    element={<CommunityNotice />} />
          <Route path="/community/review"    element={<CommunityReview />} />
          <Route path="/community/inquiry"   element={<CommunityInquiry />} />
          <Route path="/login"               element={<Login />} />
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA — hidden on home and login */}
      {!isHome && !isLoginPage && (
        <FloatingBtn onClick={() => openBookingWith()} />
      )}

      {/* Booking modal */}
      {isBookingOpen && (
        <BookingModal
          serviceId={selectedService}
          onClose={closeBooking}
        />
      )}
    </div>
  )
}
