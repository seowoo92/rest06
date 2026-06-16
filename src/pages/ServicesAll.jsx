import { useNavigate } from 'react-router-dom'
import { services } from '../data/services'
import { useReveal } from '../hooks/useReveal'

/* ── Inline SVGs ── */
function CheckIcon({ size = 13, color = '#1FA46A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function MessageIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function ServicesAll({ onBookingOpen }) {
  const navigate = useNavigate()
  const revealRef = useReveal()

  return (
    <div ref={revealRef} style={{ animation: 'pageIn 0.4s ease' }}>
      {/* ── Page Header ── */}
      <div
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--line-2)',
          padding: '4.5rem clamp(1.5rem, 6vw, 7rem) 3rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            margin: '0 0 0.8rem',
          }}
        >
          ALL SERVICES
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--ink)',
            margin: '0 0 0.8rem',
            letterSpacing: '-0.02em',
          }}
        >
          필요한 모든 생활 도움, 전부 모았어요
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
          집수리부터 반려동물 돌봄까지, 1인 가구의 일상 불편을 곁에가 해결해드려요
        </p>
      </div>

      {/* ── Service Cards ── */}
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '4rem clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
        }}
      >
        {services.map((svc, i) => (
          <div
            key={svc.id}
            data-reveal
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <div
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--line-2)',
                borderRadius: '20px',
                padding: '1.8rem 2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.4rem',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = svc.color
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.07)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line-2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: svc.tint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={svc.iconPath} />
                </svg>
              </div>

              {/* Body */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name + price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)' }}>{svc.name}</span>
                  <span
                    style={{
                      background: svc.tint,
                      color: svc.color,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      borderRadius: 999,
                      padding: '2px 10px',
                    }}
                  >
                    {svc.price}
                  </span>
                </div>

                {/* Desc */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    margin: '0 0 0.9rem',
                  }}
                >
                  {svc.desc}
                </p>

                {/* Includes chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {svc.includes.map((item) => (
                    <span
                      key={item}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--line-2)',
                        borderRadius: 999,
                        padding: '3px 10px',
                        fontSize: '0.78rem',
                        color: 'var(--muted)',
                        fontWeight: 500,
                      }}
                    >
                      <CheckIcon size={11} color={svc.color} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <div style={{ flexShrink: 0, alignSelf: 'center' }}>
                <button
                  onClick={() => onBookingOpen && onBookingOpen(svc.id)}
                  style={{
                    background: svc.color,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    borderRadius: '12px',
                    padding: '0.7rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'opacity 0.18s, transform 0.18s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.88'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = ''
                  }}
                >
                  신청하기
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3rem) 5rem',
        }}
      >
        <div
          data-reveal
          style={{
            background: 'var(--primary-tint)',
            border: '1.5px solid var(--primary)',
            borderRadius: '20px',
            padding: '2.2rem 2.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              <MessageIcon size={22} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', margin: '0 0 3px' }}>
                어떤 서비스가 필요한지 모르겠다면?
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
                문의하기로 상황을 알려주시면 딱 맞는 서비스를 안내해드려요
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/community/inquiry')}
            style={{
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: '12px',
              padding: '0.75rem 1.6rem',
              transition: 'opacity 0.18s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            문의하기
          </button>
        </div>
      </section>
    </div>
  )
}
