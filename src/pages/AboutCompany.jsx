import { useReveal } from '../hooks/useReveal'

/* ── Inline SVG icons ── */

function ShieldIcon({ size = 28, color = 'var(--primary)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function LockIcon({ size = 28, color = '#3E8DD6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ZapIcon({ size = 28, color = '#E08A2B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function HeartIcon({ size = 28, color = '#E2683F' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

const PROMISES = [
  {
    icon: <ShieldIcon />,
    tint: 'var(--primary-tint)',
    color: 'var(--primary)',
    title: '신뢰',
    desc: '신원 인증·배경 조회를 완료한 매니저만 활동합니다. 모든 서비스는 실명 기반으로 운영됩니다.',
  },
  {
    icon: <LockIcon />,
    tint: '#E3EFFA',
    color: '#3E8DD6',
    title: '안전',
    desc: '서비스 중 발생하는 모든 사고에 대한 책임보험이 적용됩니다. 고객님의 안전을 최우선으로 생각합니다.',
  },
  {
    icon: <ZapIcon />,
    tint: '#FBEEDB',
    color: '#E08A2B',
    title: '신속',
    desc: '요청 후 평균 45분 내에 매니저가 도착합니다. 급한 상황도 걱정 없이 연락 주세요.',
  },
  {
    icon: <HeartIcon />,
    tint: '#FBE7DE',
    color: '#E2683F',
    title: '따뜻함',
    desc: '단순한 도움을 넘어 혼자 사는 분들의 든든한 이웃이 되고 싶습니다. 고객의 입장에서 먼저 생각합니다.',
  },
]

const STATS = [
  { value: '12만+', label: '누적 도움 건수', color: 'var(--primary)' },
  { value: '4.9점', label: '평균 만족도', color: '#E08A2B' },
  { value: '3,200명', label: '등록 매니저', color: '#3E8DD6' },
  { value: '15개 구', label: '서비스 지역', color: '#7E76D6' },
]

export default function AboutCompany() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef} style={{ animation: 'pageIn 0.4s ease' }}>
      {/* ─── PAGE HEADER ─── */}
      <header
        style={{
          padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 5rem)',
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          data-reveal
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--primary)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          ABOUT GYEOTE
        </p>
        <h1
          data-reveal
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            color: 'var(--ink)',
            margin: '0 0 1.4rem',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            whiteSpace: 'pre-line',
          }}
        >
          {'혼자 사는 삶에도,\n든든한 손 하나쯤은 있어야 하니까'}
        </h1>
        <p
          data-reveal
          style={{
            fontSize: '1.05rem',
            color: 'var(--muted)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.75,
          }}
        >
          곁에는 1인 가구가 겪는 크고 작은 불편함을 함께 해결하는 이웃 같은 서비스입니다.
        </p>
      </header>

      {/* ─── TEAM IMAGE PLACEHOLDER ─── */}
      <section
        style={{
          padding: '0 clamp(1.5rem, 6vw, 7rem) 5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          data-reveal
          style={{
            height: 'clamp(260px, 40vw, 480px)',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, var(--primary-tint) 0%, #C8EAD9 50%, #A8D5C0 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            border: '1px solid var(--line-2)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              left: -60,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -80,
              right: -40,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
            }}
          />
          {/* Placeholder icon */}
          <div style={{ position: 'relative' }}>
            <svg
              width={64}
              height={64}
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.7 }}
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--primary-strong)',
              fontWeight: 600,
              opacity: 0.7,
              position: 'relative',
            }}
          >
            곁에 팀 사진
          </p>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section
        style={{
          padding: '0 clamp(1.5rem, 6vw, 7rem) 6rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div data-reveal>
            <p
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              OUR STORY
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                fontWeight: 800,
                color: 'var(--ink)',
                margin: '0 0 1rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              청년 1인 가구 500만 시대,
              <br />
              곁에가 시작된 이유
            </h2>
            <div
              style={{
                width: 40,
                height: 3,
                background: 'var(--grad)',
                borderRadius: 999,
              }}
            />
          </div>

          {/* Right */}
          <div data-reveal>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                margin: '0 0 1.2rem',
              }}
            >
              전구 하나를 바꾸는 데도, 무거운 짐을 옮기는 데도 혼자라면 막막합니다.
              주변에 도움을 청할 가족도 친구도 없는 1인 가구의 현실을 바꾸고 싶었습니다.
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                margin: '0 0 1.2rem',
              }}
            >
              곁에는 2022년 서울에서 시작됐습니다. "기술이 아닌 사람이 사람을 돕는다"는 단순한 철학 하나로,
              검증된 매니저와 1인 가구를 연결해왔습니다.
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                margin: 0,
              }}
            >
              이제 12만 건이 넘는 도움이 이루어졌고, 3,200명의 매니저가 서울 전역에서 활동하고 있습니다.
              우리는 여전히 같은 질문을 품고 일합니다. "오늘 누군가의 곁이 되었는가?"
            </p>
          </div>
        </div>
      </section>

      {/* ─── 4 PROMISES ─── */}
      <section
        style={{
          background: 'var(--surface)',
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.6rem',
              }}
            >
              OUR PROMISES
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: 'var(--ink)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              곁에의 네 가지 약속
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {PROMISES.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  style={{
                    background: 'var(--bg)',
                    borderRadius: '20px',
                    padding: '2rem 1.8rem',
                    border: '1px solid var(--line-2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: p.tint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {p.icon}
                  </div>
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: p.color,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--muted)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ROW ─── */}
      <section
        style={{
          padding: '5.5rem clamp(1.5rem, 6vw, 7rem)',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.value} data-reveal style={{ transitionDelay: `${i * 0.07}s` }}>
              <p
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 900,
                  color: s.color,
                  margin: '0 0 6px',
                  letterSpacing: '-0.03em',
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--muted)',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
