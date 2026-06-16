import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/services'
import { reviews } from '../data/reviews'
import { useReveal } from '../hooks/useReveal'

/* ── Avatar colors for social proof badges ── */
const AVATAR_COLORS = ['#1FA46A', '#E08A2B', '#3E8DD6', '#7E76D6']
const AVATARS = ['김', '이', '박', '정']

/* ── Star SVG ── */
function StarIcon({ filled = true, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#FBBF24' : 'none'} stroke="#FBBF24" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

/* ── Chevron SVG ── */
function ChevronIcon({ direction = 'right', size = 18 }) {
  const paths = {
    right: 'M9 18l6-6-6-6',
    left:  'M15 18l-6-6 6-6',
    down:  'M6 9l6 6 6-6',
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={paths[direction]} />
    </svg>
  )
}

/* ── ArrowRight SVG ── */
function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

/* ── Check SVG ── */
function CheckIcon({ size = 14, color = '#1FA46A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ── MapPin SVG ── */
function MapPinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

/* ── Bell SVG ── */
function BellIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export default function Home({ onBookingOpen }) {
  const navigate = useNavigate()
  const revealRef = useReveal()
  const [reviewIdx, setReviewIdx] = useState(0)
  const timerRef = useRef(null)

  const VISIBLE = 4
  const totalSlides = Math.ceil(reviews.length / VISIBLE)

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setReviewIdx((i) => (i + 1) % totalSlides)
    }, 5500)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function goSlide(idx) {
    setReviewIdx(idx)
    startTimer()
  }

  const visibleReviews = reviews.slice(reviewIdx * VISIBLE, reviewIdx * VISIBLE + VISIBLE)

  return (
    <div
      ref={revealRef}
      style={{ animation: 'pageIn 0.4s ease', overflow: 'hidden' }}
    >
      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          padding: '0 clamp(1.5rem, 6vw, 7rem)',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '6rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Left */}
        <div style={{ maxWidth: '540px' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--primary-tint)',
              color: 'var(--primary-strong)',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: '999px',
              padding: '5px 14px',
              marginBottom: '1.4rem',
              letterSpacing: '0.01em',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--primary)',
                animation: 'pulseRing 1.8s infinite',
                flexShrink: 0,
              }}
            />
            청년 1인 가구를 위한 생활 도움 서비스
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'var(--ink)',
              margin: '0 0 1.2rem',
              letterSpacing: '-0.02em',
              whiteSpace: 'pre-line',
            }}
          >
            {'필요한 모든 순간,\n곁에가 손이 되어드려요'}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--muted)',
              margin: '0 0 2.2rem',
              maxWidth: '440px',
            }}
          >
            집수리, 가구 조립, 장보기, 반려동물 돌봄까지.
            <br />
            혼자 해결하기 어려운 일상 속 불편함을 곁에가 함께 해결해요.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.4rem' }}>
            <button
              onClick={() => onBookingOpen && onBookingOpen()}
              style={{
                background: 'var(--grad)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '12px',
                padding: '0.85rem 1.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 22px rgba(31,164,106,0.35)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(31,164,106,0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(31,164,106,0.35)'
              }}
            >
              지금 도움 신청하기
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/services')}
              style={{
                background: 'var(--surface)',
                color: 'var(--ink)',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '12px',
                padding: '0.85rem 1.6rem',
                border: '1.5px solid var(--line)',
                transition: 'border-color 0.18s, background 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)'
                e.currentTarget.style.background = 'var(--primary-tint)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.background = 'var(--surface)'
              }}
            >
              서비스 둘러보기
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex' }}>
              {AVATARS.map((ch, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: AVATAR_COLORS[i],
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: i === 0 ? 0 : -10,
                    border: '2.5px solid var(--bg)',
                    zIndex: 4 - i,
                    position: 'relative',
                  }}
                >
                  {ch}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--ink)' }}>3,200명+</strong>의 이웃이 곁에를 이용하고 있어요
            </p>
          </div>
        </div>

        {/* Right — Phone mockup */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '480px',
          }}
        >
          {/* Main phone card */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '28px',
              boxShadow: '0 24px 72px rgba(0,0,0,0.12), 0 6px 18px rgba(0,0,0,0.06)',
              width: '280px',
              overflow: 'hidden',
              border: '1px solid var(--line-2)',
            }}
          >
            {/* Map preview area */}
            <div
              style={{
                height: '190px',
                background: 'linear-gradient(135deg, #D6EDE1 0%, #C3E4D4 40%, #A8D5C0 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Faux map grid */}
              {[20, 50, 75, 105, 130, 160].map((y, i) => (
                <div
                  key={`h${i}`}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: y,
                    height: 1,
                    background: 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
              {[40, 90, 140, 200, 250].map((x, i) => (
                <div
                  key={`v${i}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: x,
                    width: 1,
                    background: 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
              {/* Map blocks */}
              <div style={{ position: 'absolute', top: 30, left: 50, width: 60, height: 40, background: 'rgba(255,255,255,0.45)', borderRadius: 6 }} />
              <div style={{ position: 'absolute', top: 80, left: 100, width: 80, height: 50, background: 'rgba(255,255,255,0.45)', borderRadius: 6 }} />
              <div style={{ position: 'absolute', top: 30, left: 160, width: 50, height: 30, background: 'rgba(255,255,255,0.45)', borderRadius: 6 }} />
              {/* Route line */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 280 190">
                <path d="M60 160 Q120 80 190 50" stroke="#1FA46A" strokeWidth="3" fill="none" strokeDasharray="8 4" strokeLinecap="round" />
              </svg>
              {/* Start pin */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 44,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#E08A2B',
                  border: '3px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              />
              {/* Destination pin */}
              <div
                style={{
                  position: 'absolute',
                  top: 38,
                  right: 52,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    background: 'var(--primary)',
                    boxShadow: '0 4px 12px rgba(31,164,106,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ transform: 'rotate(45deg)' }}>
                    <MapPinIcon size={13} />
                  </div>
                </div>
              </div>
            </div>

            {/* Manager info */}
            <div style={{ padding: '18px 20px 20px' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--muted)', margin: '0 0 10px', fontWeight: 500 }}>내 주변 매니저</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--grad)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  박
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', margin: 0 }}>박민준 매니저</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} size={11} />)}
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: 2 }}>4.98</span>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    background: 'var(--primary-tint)',
                    color: 'var(--primary-strong)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: '4px 10px',
                  }}
                >
                  450m
                </div>
              </div>

              {/* Arrival bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>도착까지</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)' }}>약 8분</span>
                </div>
                <div style={{ height: 6, background: 'var(--line)', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: '64%',
                      background: 'var(--grad)',
                      borderRadius: 999,
                      animation: 'barFill 1.6s ease forwards',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge: top-left — rating */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '-4%',
              background: 'var(--surface)',
              borderRadius: 14,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
              border: '1px solid var(--line-2)',
              animation: 'floatA 4s ease-in-out infinite',
              whiteSpace: 'nowrap',
            }}
          >
            <StarIcon size={16} />
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)' }}>평균 평점 4.9</span>
          </div>

          {/* Floating badge: bottom-left — count */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '-6%',
              background: 'var(--surface)',
              borderRadius: 14,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
              border: '1px solid var(--line-2)',
              animation: 'floatB 5s ease-in-out infinite',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--primary-tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckIcon size={13} color="var(--primary)" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)' }}>누적 도움 12만 건</span>
          </div>

          {/* Floating badge: bottom-right — ding dong */}
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '-2%',
              background: '#1E2535',
              color: '#fff',
              borderRadius: 14,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
              animation: 'floatA 5.5s ease-in-out infinite 1s',
              whiteSpace: 'nowrap',
              maxWidth: 220,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(31,164,106,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BellIcon size={13} />
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.78rem', lineHeight: 1.3 }}>딩동! 매니저가 곧 도착해요</span>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
          padding: '2.8rem clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {[
            { value: '12만+', label: '누적 도움 건수', color: 'var(--primary)' },
            { value: '4.9점', label: '평균 만족도', color: '#E08A2B' },
            { value: '3,200명', label: '등록 매니저', color: '#3E8DD6' },
            { value: '45분', label: '평균 도착 시간', color: '#7E76D6' },
          ].map((item) => (
            <div key={item.value} data-reveal>
              <p
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: item.color,
                  margin: '0 0 4px',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.value}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0, fontWeight: 500 }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section
        style={{
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <div data-reveal style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            SERVICES
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>
            어떤 도움이 필요하세요?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0 }}>
            집안일의 모든 것, 곁에가 함께합니다
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {services.map((svc, i) => (
            <div
              key={svc.id}
              data-reveal
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <button
                onClick={() => onBookingOpen && onBookingOpen(svc.id)}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1.5px solid var(--line-2)',
                  borderRadius: '20px',
                  padding: '1.6rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.09)`
                  e.currentTarget.style.borderColor = svc.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderColor = 'var(--line-2)'
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: svc.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={svc.iconPath} />
                  </svg>
                </div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', margin: '0 0 4px' }}>{svc.name}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{svc.tagline}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: svc.color }}>{svc.price}</span>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: svc.tint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: svc.color,
                    }}
                  >
                    <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        style={{
          background: 'var(--surface)',
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>
              이렇게 간단해요
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0 }}>
              앱 하나로 도움 요청부터 완료까지
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                num: '01',
                icon: (
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 12h8M8 8h5M8 16h3" />
                  </svg>
                ),
                tint: 'var(--primary-tint)',
                title: '서비스 선택',
                desc: '앱에서 필요한 서비스를 선택하고 원하는 날짜와 시간을 설정하세요.',
              },
              {
                num: '02',
                icon: (
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#3E8DD6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                ),
                tint: '#E3EFFA',
                title: '매니저 매칭',
                desc: '가장 가까운 검증된 매니저를 자동으로 매칭해드려요. 평균 45분 내 도착.',
              },
              {
                num: '03',
                icon: (
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#7E76D6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ),
                tint: '#E9E7FA',
                title: '완료 & 리뷰',
                desc: '작업이 완료되면 사진 리포트를 받고 만족도를 남겨주세요.',
              },
            ].map((step, i) => (
              <div
                key={step.num}
                data-reveal
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  style={{
                    background: 'var(--bg)',
                    borderRadius: '20px',
                    padding: '2.2rem 2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid var(--line-2)',
                    height: '100%',
                  }}
                >
                  {/* Big number background */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      fontSize: '6.5rem',
                      fontWeight: 900,
                      color: 'var(--line)',
                      lineHeight: 1,
                      userSelect: 'none',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      background: step.tint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.2rem',
                      position: 'relative',
                    }}
                  >
                    {step.icon}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', margin: '0 0 0.6rem', position: 'relative' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, margin: 0, position: 'relative' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section
        style={{
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div data-reveal style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            REVIEWS
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>
            곁에를 경험한 이웃들의 이야기
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0 }}>
            실제 이용 고객의 생생한 후기를 확인하세요
          </p>
        </div>

        {/* Review cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2.4rem',
          }}
        >
          {visibleReviews.map((rv, i) => (
            <div
              key={rv.id}
              style={{
                background: 'var(--surface)',
                borderRadius: '20px',
                padding: '1.8rem',
                border: '1.5px solid var(--line-2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'opacity 0.4s, transform 0.4s',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} size={14} filled={s < rv.rating} />
                ))}
              </div>

              {/* Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: rv.tint,
                  color: rv.color,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  borderRadius: 999,
                  padding: '3px 10px',
                  width: 'fit-content',
                }}
              >
                {rv.tag}
              </div>

              {/* Quote */}
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
                "{rv.q}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: rv.color,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {rv.initial}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', margin: 0 }}>{rv.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0 }}>{rv.meta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => goSlide((reviewIdx - 1 + totalSlides) % totalSlides)}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1.5px solid var(--line)',
              background: 'var(--surface)',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.18s, color 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)'
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.color = 'var(--muted)'
            }}
          >
            <ChevronIcon direction="left" size={16} />
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goSlide(i)}
                style={{
                  width: i === reviewIdx ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === reviewIdx ? 'var(--primary)' : 'var(--line)',
                  transition: 'width 0.3s, background 0.3s',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goSlide((reviewIdx + 1) % totalSlides)}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1.5px solid var(--line)',
              background: 'var(--surface)',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.18s, color 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)'
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.color = 'var(--muted)'
            }}
          >
            <ChevronIcon direction="right" size={16} />
          </button>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section
        style={{
          background: 'var(--grad)',
          padding: '5rem clamp(1.5rem, 6vw, 7rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2
            data-reveal
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}
          >
            오늘 미뤄둔 집안일,
            <br />
            곁에에게 맡겨보세요
          </h2>
          <p data-reveal style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.82)', margin: '0 0 2.4rem', lineHeight: 1.6 }}>
            지금 신청하면 당일 매니저 매칭이 가능해요.
            <br />
            첫 이용 시 10% 할인 혜택도 드려요.
          </p>
          <div data-reveal style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onBookingOpen && onBookingOpen()}
              style={{
                background: '#fff',
                color: 'var(--primary-strong)',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '12px',
                padding: '0.9rem 2rem',
                boxShadow: '0 6px 22px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.15)'
              }}
            >
              지금 도움 신청하기
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/services')}
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '12px',
                padding: '0.9rem 1.8rem',
                border: '1.5px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.18s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            >
              서비스 둘러보기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
