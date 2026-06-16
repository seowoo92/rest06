import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── SVGs ── */
function MailIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function PhoneIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function KakaoIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3C1E1E">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.735 1.673 5.13 4.2 6.555l-.91 3.352a.3.3 0 0 0 .44.327l3.895-2.575A11.85 11.85 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
    </svg>
  )
}

function CheckCircleIcon({ size = 48, color = '#1FA46A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ── Inquiry types ── */
const INQUIRY_TYPES = ['서비스 문의', '예약/취소', '결제 문의', '매니저 문의', '기타']

/* ── Info cards ── */
const INFO_CARDS = [
  {
    icon: <MailIcon size={22} color="var(--primary)" />,
    title: '이메일 문의',
    value: 'help@gyeote.co.kr',
    desc: '24시간 접수, 1영업일 내 답변',
    bg: 'var(--primary-tint)',
    iconBg: 'var(--primary)',
  },
  {
    icon: <PhoneIcon size={22} color="#E08A2B" />,
    title: '고객센터',
    value: '1660-0000',
    desc: '평일 09~18시 (점심 12~13시 제외)',
    bg: '#FBEEDB',
    iconBg: '#E08A2B',
  },
  {
    icon: <KakaoIcon size={22} />,
    title: '카카오 채널',
    value: '@곁에',
    desc: '채널 검색 후 채팅 문의',
    bg: '#FEF8C4',
    iconBg: '#FEE500',
  },
]

export default function CommunityInquiry() {
  const revealRef = useReveal()

  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0])
  const [name, setName]               = useState('')
  const [contact, setContact]         = useState('')
  const [message, setMessage]         = useState('')
  const [error, setError]             = useState('')
  const [done, setDone]               = useState(false)
  const [submitting, setSubmitting]   = useState(false)

  function validate() {
    if (!name.trim()) return '이름을 입력해주세요.'
    if (!contact.trim()) return '연락처 또는 이메일을 입력해주세요.'
    if (!message.trim()) return '문의 내용을 입력해주세요.'
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setSubmitting(true)
    // Simulate network delay — Supabase integration TBD
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setDone(true)
  }

  function resetForm() {
    setInquiryType(INQUIRY_TYPES[0])
    setName('')
    setContact('')
    setMessage('')
    setError('')
    setDone(false)
  }

  /* shared input style */
  const inputStyle = {
    width: '100%',
    background: 'var(--input-bg)',
    border: '1.5px solid var(--line)',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.18s',
    boxSizing: 'border-box',
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
          CONTACT
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
          무엇이든 물어보세요
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
          궁금하신 점이나 불편한 점을 편하게 말씀해 주세요
        </p>
      </div>

      {/* ── Main content ── */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '4rem clamp(1.5rem, 4vw, 3rem) 6rem',
          display: 'grid',
          gridTemplateColumns: '1fr minmax(240px, 320px)',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Form card */}
        <div
          data-reveal
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--line-2)',
            borderRadius: '20px',
            padding: '2.2rem 2.4rem',
          }}
        >
          {done ? (
            /* ── Done state ── */
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.2rem',
              }}
            >
              <CheckCircleIcon size={52} color="var(--primary)" />
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                문의가 접수됐어요!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
                빠른 시일 내에 연락드릴게요.
                <br />
                평균 답변 시간은 1영업일이에요.
              </p>
              <button
                onClick={resetForm}
                style={{
                  background: 'var(--primary-tint)',
                  color: 'var(--primary-strong)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderRadius: '10px',
                  padding: '0.7rem 1.6rem',
                  marginTop: '0.5rem',
                  transition: 'opacity 0.18s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                새 문의 작성
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {/* Inquiry type chips */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '0.6rem',
                  }}
                >
                  문의 유형
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {INQUIRY_TYPES.map((t) => {
                    const active = t === inquiryType
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setInquiryType(t)}
                        style={{
                          background: active ? 'var(--primary)' : 'var(--surface-2)',
                          color: active ? '#fff' : 'var(--muted)',
                          border: `1.5px solid ${active ? 'var(--primary)' : 'var(--line-2)'}`,
                          borderRadius: 999,
                          padding: '0.38rem 1rem',
                          fontSize: '0.82rem',
                          fontWeight: active ? 700 : 500,
                          transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                        }}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Name */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '0.5rem',
                  }}
                >
                  이름 <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)' }}
                />
              </div>

              {/* Contact / Email */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '0.5rem',
                  }}
                >
                  연락처 / 이메일 <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="010-0000-0000 또는 email@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)' }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '0.5rem',
                  }}
                >
                  문의 내용 <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="문의하실 내용을 자세히 적어주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '120px',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)' }}
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  style={{
                    fontSize: '0.83rem',
                    color: '#D85E1C',
                    margin: '-0.8rem 0 1rem',
                    fontWeight: 500,
                  }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  background: submitting ? 'var(--muted-2)' : 'var(--grad)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  padding: '0.9rem',
                  transition: 'opacity 0.18s',
                  cursor: submitting ? 'wait' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                {submitting ? '전송 중...' : '문의 보내기'}
              </button>
            </form>
          )}
        </div>

        {/* Right: Info sidebar */}
        <div
          data-reveal
          style={{
            transitionDelay: '0.1s',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {INFO_CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                background: card.bg,
                borderRadius: '16px',
                padding: '1.3rem 1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: card.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', margin: '0 0 3px' }}>
                  {card.title}
                </p>
                <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)', margin: '0 0 4px' }}>
                  {card.value}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
