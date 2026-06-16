import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  {
    key: 'about',
    label: '회사소개',
    links: [
      { label: '회사소개', path: '/about' },
      { label: 'CEO 소개', path: '/about/ceo' },
    ],
  },
  {
    key: 'service',
    label: '서비스',
    links: [
      { label: '전체 서비스', path: '/services' },
      { label: '이용방법', path: '/services/how' },
    ],
  },
  {
    key: 'community',
    label: '커뮤니티',
    links: [
      { label: '공지사항', path: '/community/notice' },
      { label: '이용후기', path: '/community/review' },
      { label: '문의하기', path: '/community/inquiry' },
    ],
  },
]

export default function Navbar({ onBookingOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, mode, themes, toggleMode, setTheme } = useTheme()

  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  const handleMenuEnter = (key) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpenMenu(key)
  }

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null)
    }, 120)
  }

  const isActive = (links) =>
    links.some((l) => location.pathname === l.path || location.pathname.startsWith(l.path + '/'))

  const t = themes[theme]

  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: mode === 'dark'
      ? 'rgba(20, 24, 27, 0.88)'
      : 'rgba(251, 247, 239, 0.88)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderBottom: `1px solid var(--line)`,
    boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.10)' : 'none',
    transition: 'box-shadow 0.3s ease, background 0.4s ease',
  }

  const innerStyle = {
    maxWidth: 1180,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* ── Logo ── */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="곁에 홈으로"
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: t.grad,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 11.2 12 5l8 6.2V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"
                fill="#fff"
              />
              <circle cx="12" cy="13.2" r="1.7" fill="var(--primary)" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '-0.3px',
            }}
          >
            곁에
          </span>
        </button>

        {/* ── Desktop Nav ── */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginLeft: 28,
            flex: 1,
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.links)
            return (
              <div
                key={item.key}
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMenuEnter(item.key)}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    fontSize: 14.5,
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--primary)' : 'var(--ink)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = active ? 'var(--primary)' : 'var(--ink)'
                  }}
                >
                  {item.label}
                </button>

                {/* Dropdown */}
                {openMenu === item.key && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      paddingTop: 10,
                      zIndex: 60,
                    }}
                    onMouseEnter={() => handleMenuEnter(item.key)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div
                      style={{
                        minWidth: 230,
                        background: 'var(--surface)',
                        border: '1px solid var(--line)',
                        borderRadius: 16,
                        boxShadow: '0 18px 44px rgba(0,0,0,0.14)',
                        padding: 8,
                      }}
                    >
                      {item.links.map((link) => {
                        const linkActive = location.pathname === link.path
                        return (
                          <button
                            key={link.path}
                            onClick={() => {
                              navigate(link.path)
                              setOpenMenu(null)
                            }}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              padding: '11px 13px',
                              borderRadius: 11,
                              fontSize: 14,
                              fontWeight: linkActive ? 600 : 400,
                              color: linkActive ? 'var(--primary)' : 'var(--ink)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.15s, color 0.15s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--surface-2)'
                              if (!linkActive) e.currentTarget.style.color = 'var(--primary)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'none'
                              e.currentTarget.style.color = linkActive ? 'var(--primary)' : 'var(--ink)'
                            }}
                          >
                            {link.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* ── Right Controls ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginLeft: 'auto',
            flexShrink: 0,
          }}
        >
          {/* Theme Swatches */}
          <div
            style={{ display: 'flex', gap: 6 }}
            className="desktop-nav"
          >
            {Object.entries(themes).map(([key, tObj]) => {
              const isSelected = theme === key
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  title={tObj.label}
                  style={{
                    width: isSelected ? 20 : 16,
                    height: isSelected ? 20 : 16,
                    borderRadius: '50%',
                    background: tObj.grad,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.2s, height 0.2s, box-shadow 0.2s',
                    boxShadow: isSelected
                      ? `0 0 0 2px var(--surface), 0 0 0 4px ${tObj.primary}`
                      : 'none',
                  }}
                  aria-label={`${tObj.label} 테마`}
                />
              )
            })}
          </div>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleMode}
            title={mode === 'dark' ? '라이트 모드로' : '다크 모드로'}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--muted)',
              padding: 0,
              flexShrink: 0,
            }}
          >
            {mode === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* CTA Button */}
          <button
            onClick={onBookingOpen}
            style={{
              padding: '9px 18px',
              borderRadius: 12,
              background: 'var(--grad)',
              color: '#fff',
              fontSize: 13.5,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.2px',
              boxShadow: `0 4px 14px rgba(${t.ring},0.32)`,
              transition: 'opacity 0.2s, box-shadow 0.2s',
              flexShrink: 0,
            }}
            className="desktop-nav"
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            도움 신청
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
              padding: 0,
              flexShrink: 0,
            }}
            className="mobile-hamburger"
            aria-label="메뉴 열기"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid var(--line)',
            background: 'var(--surface)',
            padding: '12px 16px 20px',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.links)
            const expanded = mobileExpanded === item.key
            return (
              <div key={item.key} style={{ marginBottom: 4 }}>
                <button
                  onClick={() =>
                    setMobileExpanded((prev) => (prev === item.key ? null : item.key))
                  }
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--primary)' : 'var(--ink)',
                    background: expanded ? 'var(--surface-2)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>{item.label}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      transform: expanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {expanded && (
                  <div style={{ paddingLeft: 14, marginTop: 2 }}>
                    {item.links.map((link) => {
                      const linkActive = location.pathname === link.path
                      return (
                        <button
                          key={link.path}
                          onClick={() => navigate(link.path)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 14px',
                            borderRadius: 10,
                            fontSize: 14,
                            fontWeight: linkActive ? 600 : 400,
                            color: linkActive ? 'var(--primary)' : 'var(--muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {link.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {/* Mobile CTA */}
          <button
            onClick={() => { setMobileOpen(false); onBookingOpen?.() }}
            style={{
              width: '100%',
              marginTop: 12,
              padding: '13px',
              borderRadius: 14,
              background: 'var(--grad)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 4px 14px rgba(${t.ring},0.28)`,
            }}
          >
            도움 신청하기
          </button>

          {/* Mobile Theme Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 14,
              padding: '0 2px',
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              {Object.entries(themes).map(([key, tObj]) => {
                const isSelected = theme === key
                return (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    title={tObj.label}
                    style={{
                      width: isSelected ? 22 : 18,
                      height: isSelected ? 22 : 18,
                      borderRadius: '50%',
                      background: tObj.grad,
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 0.2s, height 0.2s, box-shadow 0.2s',
                      boxShadow: isSelected
                        ? `0 0 0 2px var(--surface), 0 0 0 4px ${tObj.primary}`
                        : 'none',
                    }}
                    aria-label={`${tObj.label} 테마`}
                  />
                )
              })}
            </div>
            <button
              onClick={toggleMode}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--muted)',
                padding: 0,
              }}
            >
              {mode === 'dark' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Responsive styles via <style> tag ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
