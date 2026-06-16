import { useState, useRef, useEffect } from 'react'
import supabase from '../lib/supabase'

const SUGGESTED = [
  '어떤 서비스가 있나요?',
  '가격이 어떻게 되나요?',
  '매니저 매칭은 어떻게 되나요?',
  '이용 방법을 알려주세요',
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState('solar')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: newMessages, provider },
      })

      if (error) throw error

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.content },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '죄송해요, 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            width: 'min(360px, calc(100vw - 2rem))',
            height: 'min(520px, calc(100vh - 8rem))',
            background: 'var(--surface)',
            borderRadius: '16px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
            overflow: 'hidden',
            border: '1px solid var(--line)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'var(--grad)',
              padding: '0.9rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 6px #4ade80',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>
                곁에 AI 상담
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Provider toggle */}
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  padding: '2px',
                  gap: '2px',
                }}
              >
                {[
                  { id: 'solar', label: 'Solar' },
                  { id: 'openai', label: 'GPT' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setProvider(id)}
                    style={{
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: provider === id ? 'var(--primary)' : '#fff',
                      background: provider === id ? '#fff' : 'transparent',
                      transition: 'all 0.15s',
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                }}
              >
                <CloseIcon size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
            }}
          >
            {/* Welcome + suggested questions */}
            <div>
              <Bubble role="assistant">
                안녕하세요! 곁에 AI 상담사입니다.{'\n'}궁금한 점을 편하게 물어보세요.
              </Bubble>
              {messages.length === 0 && (
                <div
                  style={{
                    marginTop: '0.6rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  {SUGGESTED.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        padding: '5px 11px',
                        borderRadius: '999px',
                        border: '1px solid var(--primary)',
                        color: 'var(--primary)',
                        fontSize: '0.76rem',
                        background: 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.12s, color 0.12s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--primary-tint)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {messages.map((msg, i) => (
              <Bubble key={i} role={msg.role}>
                {msg.content}
              </Bubble>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.6rem 0.9rem',
                    borderRadius: '14px 14px 14px 4px',
                    background: 'var(--surface-2)',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'block',
                        animation: `chatDot 1.2s ${i * 0.18}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '0.65rem 0.75rem',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
              background: 'var(--surface)',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(input)
                }
              }}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1,
                padding: '0.5rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid var(--line)',
                background: 'var(--input-bg)',
                color: 'var(--ink)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background:
                  input.trim() && !loading ? 'var(--grad)' : 'var(--line)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? '채팅 닫기' : 'AI 상담 열기'}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'var(--grad)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(var(--ring-rgb), 0.4)',
          zIndex: 1001,
          transition: 'transform 0.18s, box-shadow 0.18s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = '0 10px 32px rgba(var(--ring-rgb), 0.55)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(var(--ring-rgb), 0.4)'
        }}
      >
        {isOpen ? <CloseIcon size={20} /> : <ChatIcon size={22} />}
      </button>

      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </>
  )
}

function Bubble({ role, children }) {
  const isUser = role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '82%',
          padding: '0.6rem 0.9rem',
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'var(--grad)' : 'var(--surface-2)',
          color: isUser ? '#fff' : 'var(--ink)',
          fontSize: '0.875rem',
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function ChatIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
