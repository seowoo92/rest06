import { useReveal } from '../hooks/useReveal'

const CAREER = [
  { year: '2022', desc: '곁에 공동창업 · 대표이사' },
  { year: '2020', desc: '소셜임팩트 스타트업 PM' },
  { year: '2018', desc: '한국사회적기업진흥원 연구원' },
  { year: '2017', desc: '연세대학교 사회학과 졸업' },
]

const LETTER = [
  '처음 곁에를 만들 때, 저는 혼자 살고 있었습니다. 어느 날 전구가 나갔는데 사다리가 없었습니다. 마트에서 전구를 사왔지만 갈 수가 없었고, 몇 달째 그 전구 아래에서 살았습니다.',
  '작은 일인 것 같지만, 그 순간 저는 "혼자라서 불편한 게 이렇게 많구나"를 실감했습니다. 그리고 혼자 사는 사람에게 언제든 손이 되어줄 수 있는 서비스가 있다면 어떨까 생각했습니다.',
  '곁에는 그 질문에서 시작됐습니다. 거창한 기술이 아니라, 실제로 필요한 순간에 실제 사람이 와서 도와주는 것. 지금도 우리가 가장 집중하는 건 그 경험입니다.',
  '12만 건의 도움이 이루어지는 동안, 저는 수백 명의 고객분들과 매니저들을 직접 만났습니다. 그분들의 이야기가 곁에를 만들어왔습니다. 앞으로도 그렇게 하겠습니다.',
]

export default function AboutCeo() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef} style={{ animation: 'pageIn 0.4s ease' }}>
      {/* ─── PAGE HEADER ─── */}
      <header
        style={{
          padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 5vw, 4.5rem)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
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
          CEO MESSAGE
        </p>
        <h1
          data-reveal
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
            fontWeight: 800,
            color: 'var(--ink)',
            margin: 0,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
          }}
        >
          사람이 사람 곁에 있는 것,
          <br />
          그것으로 충분합니다
        </h1>
      </header>

      {/* ─── MAIN CONTENT: 2-col ─── */}
      <section
        style={{
          padding: '0 clamp(1.5rem, 6vw, 7rem) 7rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 340px) 1fr',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: Sticky profile card ── */}
        <div
          data-reveal
          style={{
            position: 'sticky',
            top: '6.5rem',
            alignSelf: 'start',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              border: '1.5px solid var(--line-2)',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            }}
          >
            {/* Avatar area */}
            <div
              style={{
                height: '200px',
                background: 'linear-gradient(145deg, var(--primary-tint) 0%, #B8DFC8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative rings */}
              <div
                style={{
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  border: '1px solid rgba(31,164,106,0.2)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '1px solid rgba(31,164,106,0.18)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              {/* Avatar circle */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: 'var(--grad)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '2.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 28px rgba(31,164,106,0.35)',
                  position: 'relative',
                  zIndex: 1,
                  border: '3px solid rgba(255,255,255,0.5)',
                }}
              >
                도
              </div>
            </div>

            {/* Name & title */}
            <div style={{ padding: '1.6rem 1.8rem 0' }}>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: 'var(--ink)',
                  margin: '0 0 4px',
                  letterSpacing: '-0.01em',
                }}
              >
                김도윤
              </h2>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--muted)',
                  margin: '0 0 1.4rem',
                  lineHeight: 1.5,
                }}
              >
                곁에 대표이사 / 공동창업자
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--line-2)', marginBottom: '1.4rem' }} />

              {/* Career list */}
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                CAREER
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {CAREER.map((item) => (
                  <li
                    key={item.year}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr',
                      gap: '8px',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        background: 'var(--primary-tint)',
                        borderRadius: 6,
                        padding: '2px 6px',
                        textAlign: 'center',
                      }}
                    >
                      {item.year}
                    </span>
                    <span style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.4 }}>{item.desc}</span>
                  </li>
                ))}
              </ul>
              <div style={{ height: '1.8rem' }} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Quote + Letter ── */}
        <div data-reveal>
          {/* Opening quote */}
          <div
            style={{
              position: 'relative',
              marginBottom: '2.8rem',
              paddingLeft: '2rem',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                borderRadius: 999,
                background: 'var(--grad)',
              }}
            />
            {/* Large quote mark */}
            <div
              style={{
                fontSize: '5rem',
                lineHeight: 0.8,
                color: 'var(--primary-tint)',
                fontWeight: 900,
                marginBottom: '0.6rem',
                userSelect: 'none',
              }}
            >
              "
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                fontWeight: 800,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
              }}
            >
              곁에 있다는 것,
              <br />
              그 자체가 힘이 됩니다.
            </h2>
          </div>

          {/* Letter paragraphs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4rem',
              marginBottom: '3rem',
            }}
          >
            {LETTER.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: '0.97rem',
                  color: 'var(--muted)',
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              paddingTop: '1.8rem',
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p
              style={{
                fontWeight: 800,
                fontSize: '1.15rem',
                color: 'var(--ink)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              김도윤
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--muted)',
                margin: 0,
              }}
            >
              곁에 대표이사 · 공동창업자
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
