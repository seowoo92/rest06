import { useState } from 'react'
import { notices } from '../data/notices'
import { useReveal } from '../hooks/useReveal'

/* ── Category badge config ── */
const CAT_STYLES = {
  이벤트: { bg: 'var(--primary-tint)', color: 'var(--primary-strong)' },
  점검:   { bg: '#FBE7DE',             color: '#D85E1C' },
  서비스: { bg: '#E3EFFA',             color: '#3E8DD6' },
  공지:   { bg: 'var(--surface-2)',    color: 'var(--muted)' },
}

/* ── SVG ── */
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

/* ── Notice Item ── */
function NoticeItem({ notice, open, onToggle }) {
  const catStyle = CAT_STYLES[notice.cat] || CAT_STYLES['공지']

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
          gap: '1rem',
          padding: '1.3rem 1.5rem',
          textAlign: 'left',
          background: 'none',
          color: 'var(--ink)',
        }}
      >
        {/* Category badge */}
        <span
          style={{
            background: catStyle.bg,
            color: catStyle.color,
            fontSize: '0.72rem',
            fontWeight: 700,
            borderRadius: 999,
            padding: '3px 10px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {notice.cat}
        </span>

        {/* Title */}
        <span
          style={{
            flex: 1,
            fontWeight: 600,
            fontSize: '0.95rem',
            color: 'var(--ink)',
            lineHeight: 1.5,
          }}
        >
          {notice.title}
        </span>

        {/* Date */}
        <span
          style={{
            fontSize: '0.8rem',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {notice.date}
        </span>

        {/* Expand icon */}
        <span style={{ color: open ? 'var(--primary)' : 'var(--muted)', marginLeft: '0.25rem' }}>
          <ChevronDown size={18} rotated={open} />
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: '0 1.5rem 1.4rem 1.5rem',
            borderTop: '1px solid var(--line-2)',
            paddingTop: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--muted)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {notice.body}
          </p>
        </div>
      )}
    </div>
  )
}

export default function CommunityNotice() {
  const revealRef = useReveal()
  const [openId, setOpenId] = useState(null)

  function toggleItem(id) {
    setOpenId((prev) => (prev === id ? null : id))
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
          NOTICE
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
          공지사항
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
          곁에의 새로운 소식과 중요한 안내를 확인하세요
        </p>
      </div>

      {/* ── Notice List ── */}
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '4rem clamp(1.5rem, 4vw, 3rem) 6rem',
        }}
      >
        <div
          data-reveal
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {notices.map((notice) => (
            <NoticeItem
              key={notice.id}
              notice={notice}
              open={openId === notice.id}
              onToggle={() => toggleItem(notice.id)}
            />
          ))}
        </div>

        {notices.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 0',
              color: 'var(--muted)',
              fontSize: '0.95rem',
            }}
          >
            등록된 공지사항이 없습니다.
          </div>
        )}
      </section>
    </div>
  )
}
