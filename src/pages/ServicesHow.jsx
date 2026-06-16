import { useState } from 'react'
import { faqs } from '../data/faqs'
import { useReveal } from '../hooks/useReveal'

/* ── Inline SVGs ── */
function ChevronDown({ size = 18, rotated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.25s ease',
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/* ── Step data ── */
const STEPS = [
  {
    num: '01',
    title: '서비스 선택 & 신청',
    desc: '앱에서 필요한 서비스를 선택하고 날짜·시간·주소를 입력하세요. 1분 안에 신청이 완료되며, 별도 회원가입 없이도 이용 가능해요.',
    color: '#1FA46A',
    bg: '#E0F1E8',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#1FA46A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 12h8M8 8h5M8 16h3" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '매니저 매칭 & 방문',
    desc: '신청 후 가장 가까운 검증된 매니저가 자동으로 매칭돼요. 모든 매니저는 신원 확인과 서비스 교육을 이수했으며, 평균 45분 내 방문해요.',
    color: '#E08A2B',
    bg: '#FBEEDB',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#E08A2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '완료 & 간편 결제',
    desc: '작업이 완료되면 사진 리포트를 받고, 앱에서 카드·간편결제로 결제하세요. 예상 금액은 신청 단계에서 미리 확인할 수 있어요.',
    color: '#2FA26B',
    bg: '#E0F1E8',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#2FA26B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
]

/* ── FAQ Item ── */
function FaqItem({ faq, open, onToggle }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: `1.5px solid ${open ? 'var(--primary)' : 'var(--line-2)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.2rem 1.5rem',
          textAlign: 'left',
          background: 'none',
          color: 'var(--ink)',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.5, flex: 1 }}>
          {faq.q}
        </span>
        <span style={{ color: open ? 'var(--primary)' : 'var(--muted)' }}>
          <ChevronDown size={18} rotated={open} />
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: '0 1.5rem 1.3rem',
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.75,
            borderTop: '1px solid var(--line-2)',
            paddingTop: '1rem',
          }}
        >
          {faq.a}
        </div>
      )}
    </div>
  )
}

export default function ServicesHow() {
  const revealRef = useReveal()
  const [openFaq, setOpenFaq] = useState(null)

  function toggleFaq(id) {
    setOpenFaq((prev) => (prev === id ? null : id))
  }

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
          HOW TO USE
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
          신청부터 완료까지, 단 3단계
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
          복잡한 과정은 없어요. 선택하고, 기다리고, 결제하면 끝이에요
        </p>
      </div>

      {/* ── Steps ── */}
      <section
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '4rem clamp(1.5rem, 4vw, 3rem) 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            data-reveal
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                position: 'relative',
              }}
            >
              {/* Step left: number + connector */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: step.bg,
                    border: `2px solid ${step.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    color: step.color,
                    letterSpacing: '0.02em',
                  }}
                >
                  {step.num}
                </div>
                {/* Connector line (not on last step) */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 32,
                      background: 'var(--line)',
                      marginTop: 4,
                    }}
                  />
                )}
              </div>

              {/* Step right: card */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--surface)',
                  border: '1.5px solid var(--line-2)',
                  borderRadius: '18px',
                  padding: '1.6rem 1.8rem',
                  marginBottom: i < STEPS.length - 1 ? '1.5rem' : 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: step.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </div>
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: 'var(--ink)',
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '2rem clamp(1.5rem, 4vw, 3rem) 5.5rem',
        }}
      >
        <div data-reveal style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              margin: '0 0 0.5rem',
            }}
          >
            FAQ
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              fontWeight: 800,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            자주 묻는 질문
          </h2>
        </div>

        <div
          data-reveal
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              open={openFaq === faq.id}
              onToggle={() => toggleFaq(faq.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
