import { useState } from 'react'
import { reviews } from '../data/reviews'
import { useReveal } from '../hooks/useReveal'

/* ── Star SVG ── */
function StarIcon({ filled = true, size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? '#FBBF24' : 'none'}
      stroke="#FBBF24"
      strokeWidth="1.8"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

/* ── Filter chips ── */
const FILTERS = ['전체', '집수리', '가구 조립', '무거운 짐·이사', '장보기', '반려동물 돌봄']

/* ── Rating bar chart data ── */
const RATING_DIST = [
  { stars: 5, pct: 87 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
]

export default function CommunityReview() {
  const revealRef = useReveal()
  const [activeFilter, setActiveFilter] = useState('전체')

  const filtered =
    activeFilter === '전체'
      ? reviews
      : reviews.filter((r) => r.tag === activeFilter || r.tag.startsWith(activeFilter))

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
          REVIEWS
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
          이용후기
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
          실제 이용 고객의 생생한 후기를 확인하세요
        </p>
      </div>

      {/* ── Main content ── */}
      <section
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '4rem clamp(1.5rem, 4vw, 3rem) 6rem',
        }}
      >
        {/* Rating summary card */}
        <div
          data-reveal
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--line-2)',
            borderRadius: '20px',
            padding: '2rem 2.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Big score */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <p
              style={{
                fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: 'var(--ink)',
                margin: '0 0 4px',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              4.9
            </p>
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: '6px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} size={18} filled />
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0, fontWeight: 500 }}>
              총 8,420개 후기
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              alignSelf: 'stretch',
              background: 'var(--line-2)',
              flexShrink: 0,
            }}
          />

          {/* Bar chart */}
          <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {RATING_DIST.map((row) => (
              <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)', width: 14, textAlign: 'right', flexShrink: 0 }}>
                  {row.stars}
                </span>
                <StarIcon size={13} filled />
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: 'var(--line)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${row.pct}%`,
                      background: row.stars === 5 ? '#FBBF24' : 'var(--line-2)',
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', width: 30, textAlign: 'right', flexShrink: 0 }}>
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter chips */}
        <div
          data-reveal
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          {FILTERS.map((f) => {
            const active = f === activeFilter
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: active ? 'var(--primary)' : 'var(--surface)',
                  color: active ? '#fff' : 'var(--muted)',
                  border: `1.5px solid ${active ? 'var(--primary)' : 'var(--line-2)'}`,
                  borderRadius: 999,
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.85rem',
                  fontWeight: active ? 700 : 500,
                  transition: 'background 0.18s, color 0.18s, border-color 0.18s',
                }}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Review grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {filtered.map((rv, i) => (
            <div
              key={rv.id}
              data-reveal
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--line-2)',
                  borderRadius: '20px',
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                  height: '100%',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.07)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Stars row */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} size={15} filled={s < rv.rating} />
                  ))}
                </div>

                {/* Service tag */}
                <span
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
                </span>

                {/* Quote */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--ink)',
                    lineHeight: 1.75,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  &ldquo;{rv.q}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', borderTop: '1px solid var(--line-2)', paddingTop: '0.9rem' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: rv.color,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {rv.initial}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', margin: 0 }}>
                      {rv.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0 }}>
                      {rv.meta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 0',
              color: 'var(--muted)',
              fontSize: '0.95rem',
            }}
          >
            해당 서비스 후기가 없습니다.
          </div>
        )}
      </section>
    </div>
  )
}
