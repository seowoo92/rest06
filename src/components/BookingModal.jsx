import { useState, useEffect } from 'react'
import { services } from '../data/services'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

const TIME_SLOTS = [
  '오전 9시',
  '오전 11시',
  '오후 1시',
  '오후 3시',
  '오후 5시',
  '오후 7시',
]

function getDates(count = 10) {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }
  return dates
}

function formatDate(d) {
  return `${d.getMonth() + 1}/${d.getDate()}(${WEEKDAYS[d.getDay()]})`
}

const ServiceIcon = ({ path, color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d={path}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const STEP_LABELS = ['서비스', '일정', '주소', '확인']

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0)
  const [service, setService] = useState(null)
  const [date, setDate] = useState(null)     // Date object index (0-9)
  const [time, setTime] = useState(null)
  const [addr, setAddr] = useState('')
  const [addr2, setAddr2] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)

  const dates = getDates(10)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(0)
        setService(null)
        setDate(null)
        setTime(null)
        setAddr('')
        setAddr2('')
        setPhone('')
        setNote('')
        setDone(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const selectedService = services.find((s) => s.id === service)
  const selectedDate = date !== null ? dates[date] : null

  // Validation per step
  const canNext =
    step === 0 ? service !== null :
    step === 1 ? date !== null && time !== null :
    step === 2 ? addr.trim() !== '' && phone.trim() !== '' :
    true

  const handleNext = () => {
    if (!canNext) return
    if (step === 3) {
      setDone(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  const handlePrev = () => {
    setStep((s) => Math.max(0, s - 1))
  }

  const handleReset = () => {
    setStep(0)
    setService(null)
    setDate(null)
    setTime(null)
    setAddr('')
    setAddr2('')
    setPhone('')
    setNote('')
    setDone(false)
  }

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.52)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    animation: 'overlayIn 0.22s ease',
  }

  const modalStyle = {
    background: 'var(--surface)',
    borderRadius: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    animation: 'modalIn 0.28s cubic-bezier(0.22,1,0.36,1)',
    boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
  }

  const titleStyle = {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--ink)',
    letterSpacing: '-0.3px',
    marginBottom: 4,
  }

  const subtitleStyle = {
    fontSize: 13.5,
    color: 'var(--muted)',
    marginBottom: 20,
  }

  const closeButtonStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 34,
    height: 34,
    borderRadius: 10,
    background: 'var(--surface-2)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--muted)',
    padding: 0,
  }

  const bodyStyle = {
    padding: '28px 28px 28px',
  }

  const footerStyle = {
    display: 'flex',
    gap: 10,
    paddingTop: 20,
  }

  // ── Step indicators ──
  const StepBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
      {STEP_LABELS.map((label, i) => {
        const isCurrent = i === step
        const isPast = i < step
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                height: 6,
                borderRadius: 999,
                background: isPast || isCurrent ? 'var(--primary)' : 'var(--line)',
                width: isCurrent ? 34 : 18,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          </div>
        )
      })}
      <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
        {step + 1} / {STEP_LABELS.length}
      </span>
    </div>
  )

  // ── Step 0: Service Selection ──
  const Step0 = () => (
    <div>
      <p style={{ ...titleStyle }}>어떤 도움이 필요하신가요?</p>
      <p style={{ ...subtitleStyle }}>서비스를 선택해 주세요</p>
      <StepBar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {services.map((svc) => {
          const isSelected = service === svc.id
          return (
            <button
              key={svc.id}
              onClick={() => setService(svc.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 16px',
                borderRadius: 16,
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--line)'}`,
                background: isSelected ? 'var(--primary-tint)' : 'var(--surface-2)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: svc.tint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ServiceIcon path={svc.iconPath} color={svc.color} size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: isSelected ? 'var(--primary)' : 'var(--ink)',
                    marginBottom: 2,
                  }}
                >
                  {svc.name}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>
                  {svc.tagline}
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: isSelected ? 'var(--primary)' : 'var(--muted)',
                  flexShrink: 0,
                }}
              >
                {svc.price}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )

  // ── Step 1: Date & Time ──
  const Step1 = () => (
    <div>
      <p style={{ ...titleStyle }}>언제 도움이 필요하신가요?</p>
      <p style={{ ...subtitleStyle }}>날짜와 시간을 선택해 주세요</p>
      <StepBar />

      {/* Date picker */}
      <p
        style={{
          fontSize: 12.5,
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: 10,
        }}
      >
        날짜
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          marginBottom: 24,
        }}
      >
        {dates.map((d, i) => {
          const isSelected = date === i
          const isSun = d.getDay() === 0
          const isSat = d.getDay() === 6
          return (
            <button
              key={i}
              onClick={() => setDate(i)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px 6px',
                borderRadius: 12,
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--line)'}`,
                background: isSelected ? 'var(--primary-tint)' : 'var(--surface-2)',
                cursor: 'pointer',
                gap: 2,
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: isSun
                    ? '#E05252'
                    : isSat
                    ? '#4A7FC8'
                    : 'var(--muted)',
                  fontWeight: 500,
                }}
              >
                {WEEKDAYS[d.getDay()]}
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: isSelected ? 'var(--primary)' : 'var(--ink)',
                }}
              >
                {d.getDate()}
              </span>
              <span style={{ fontSize: 11, color: 'var(--muted-2)' }}>
                {d.getMonth() + 1}월
              </span>
            </button>
          )
        })}
      </div>

      {/* Time picker */}
      <p
        style={{
          fontSize: 12.5,
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: 10,
        }}
      >
        시간
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
        }}
      >
        {TIME_SLOTS.map((slot) => {
          const isSelected = time === slot
          return (
            <button
              key={slot}
              onClick={() => setTime(slot)}
              style={{
                padding: '11px 8px',
                borderRadius: 12,
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--line)'}`,
                background: isSelected ? 'var(--primary-tint)' : 'var(--surface-2)',
                fontSize: 13.5,
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'var(--primary)' : 'var(--ink)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s, color 0.2s',
              }}
            >
              {slot}
            </button>
          )
        })}
      </div>
    </div>
  )

  // ── Step 2: Address Form ──
  const Step2 = () => (
    <div>
      <p style={{ ...titleStyle }}>어디로 방문할까요?</p>
      <p style={{ ...subtitleStyle }}>주소와 연락처를 입력해 주세요</p>
      <StepBar />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 6,
            }}
          >
            주소 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="도로명 또는 지번 주소 입력"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: `1.5px solid ${addr ? 'var(--primary)' : 'var(--line)'}`,
              background: 'var(--input-bg)',
              color: 'var(--ink)',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)' }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = addr ? 'var(--primary)' : 'var(--line)'
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 6,
            }}
          >
            상세주소
          </label>
          <input
            type="text"
            value={addr2}
            onChange={(e) => setAddr2(e.target.value)}
            placeholder="동·호수, 건물명 등"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: `1.5px solid ${addr2 ? 'var(--primary)' : 'var(--line)'}`,
              background: 'var(--input-bg)',
              color: 'var(--ink)',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)' }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = addr2 ? 'var(--primary)' : 'var(--line)'
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 6,
            }}
          >
            연락처 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-0000-0000"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: `1.5px solid ${phone ? 'var(--primary)' : 'var(--line)'}`,
              background: 'var(--input-bg)',
              color: 'var(--ink)',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)' }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = phone ? 'var(--primary)' : 'var(--line)'
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 6,
            }}
          >
            요청사항
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="매니저에게 전달할 요청사항을 적어주세요 (선택)"
            rows={3}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: `1.5px solid ${note ? 'var(--primary)' : 'var(--line)'}`,
              background: 'var(--input-bg)',
              color: 'var(--ink)',
              fontSize: 14,
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
              lineHeight: 1.6,
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)' }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = note ? 'var(--primary)' : 'var(--line)'
            }}
          />
        </div>
      </div>
    </div>
  )

  // ── Step 3: Summary Review ──
  const Step3 = () => {
    const summaryRowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: '1px solid var(--line)',
    }
    const summaryLabelStyle = {
      fontSize: 13,
      color: 'var(--muted)',
      fontWeight: 500,
      flexShrink: 0,
      marginRight: 12,
    }
    const summaryValueStyle = {
      fontSize: 13.5,
      color: 'var(--ink)',
      fontWeight: 500,
      textAlign: 'right',
    }

    return (
      <div>
        <p style={{ ...titleStyle }}>신청 내용을 확인해 주세요</p>
        <p style={{ ...subtitleStyle }}>아래 내용으로 도움을 신청합니다</p>
        <StepBar />

        {selectedService && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 16px',
              borderRadius: 16,
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: selectedService.tint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ServiceIcon
                path={selectedService.iconPath}
                color={selectedService.color}
                size={22}
              />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
                {selectedService.name}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>
                {selectedService.tagline}
              </div>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--primary)',
              }}
            >
              {selectedService.price}
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--line)' }}>
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>방문 일시</span>
            <span style={summaryValueStyle}>
              {selectedDate ? formatDate(selectedDate) : '-'}{' '}
              {time || '-'}
            </span>
          </div>
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>주소</span>
            <span style={summaryValueStyle}>
              {addr}
              {addr2 ? ` ${addr2}` : ''}
            </span>
          </div>
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>연락처</span>
            <span style={summaryValueStyle}>{phone}</span>
          </div>
          {note && (
            <div style={{ ...summaryRowStyle, borderBottom: 'none' }}>
              <span style={summaryLabelStyle}>요청사항</span>
              <span style={{ ...summaryValueStyle, maxWidth: 240, wordBreak: 'keep-all' }}>
                {note}
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 16,
            padding: '12px 14px',
            borderRadius: 12,
            background: 'var(--primary-tint)',
            fontSize: 12.5,
            color: 'var(--primary)',
            lineHeight: 1.6,
          }}
        >
          신청 후 매니저 배정까지 약 30분~1시간이 소요됩니다. 등록된 연락처로 확인 문자가 발송됩니다.
        </div>
      </div>
    )
  }

  // ── Done Screen ──
  const DoneScreen = () => (
    <div style={{ padding: '48px 28px', textAlign: 'center' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          animation: 'pulseRing 1.4s cubic-bezier(0.66,0,0,1) infinite',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6 9 17l-5-5"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: 8,
          letterSpacing: '-0.3px',
        }}
      >
        도움 신청이 완료됐어요!
      </h3>

      {selectedService && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 999,
            background: 'var(--primary-tint)',
            marginBottom: 16,
          }}
        >
          <ServiceIcon
            path={selectedService.iconPath}
            color={selectedService.color}
            size={16}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--primary)',
            }}
          >
            {selectedService.name}
          </span>
        </div>
      )}

      <p
        style={{
          fontSize: 13.5,
          color: 'var(--muted)',
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        매니저 배정 후 등록하신 번호로<br />
        확인 문자를 보내드릴게요.
      </p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleReset}
          style={{
            flex: 1,
            padding: '13px',
            borderRadius: 14,
            border: '1.5px solid var(--line)',
            background: 'var(--surface-2)',
            color: 'var(--ink)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          새 도움 신청
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: '13px',
            borderRadius: 14,
            border: 'none',
            background: 'var(--grad)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          확인
        </button>
      </div>
    </div>
  )

  return (
    <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={modalStyle}>
        {/* Close button */}
        <button style={closeButtonStyle} onClick={onClose} aria-label="닫기">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {done ? (
          <DoneScreen />
        ) : (
          <>
            <div style={bodyStyle}>
              {step === 0 && <Step0 />}
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}

              {/* Navigation buttons */}
              <div style={footerStyle}>
                {step > 0 && (
                  <button
                    onClick={handlePrev}
                    style={{
                      flex: '0 0 auto',
                      padding: '13px 20px',
                      borderRadius: 14,
                      border: '1.5px solid var(--line)',
                      background: 'var(--surface-2)',
                      color: 'var(--ink)',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    이전
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!canNext}
                  style={{
                    flex: 1,
                    padding: '13px',
                    borderRadius: 14,
                    border: 'none',
                    background: 'var(--grad)',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: canNext ? 'pointer' : 'default',
                    opacity: canNext ? 1 : 0.4,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {step === 3 ? '도움 신청 완료하기' : '다음'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
