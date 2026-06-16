import { useState, useRef, useEffect } from 'react'

const WELCOME = '안녕하세요! 곁에 AI 상담사입니다.\n궁금한 점을 편하게 물어보세요.'
const SUGGESTED = [
  '어떤 서비스가 있나요?',
  '가격이 어떻게 되나요?',
  '매니저 매칭은 어떻게 되나요?',
  '이용 방법을 알려주세요',
]

const EDGE_URL =
  (import.meta.env.VITE_SUPABASE_URL || 'https://exvcaeidzxlwxfznalsr.supabase.co') +
  '/functions/v1/chat'
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export default function ChatBot() {
  const [isOpen, setIsOpen]           = useState(false)
  const [messages, setMessages]       = useState([])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [provider, setProvider]       = useState('solar')
  const [welcomeText, setWelcomeText] = useState('')
  const [welcomeDone, setWelcomeDone] = useState(false)
  const [isMobile, setIsMobile]       = useState(false)

  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)
  const sendBtnRef = useRef(null)

  /* mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  /* focus input on open */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350)
  }, [isOpen])

  /* welcome typing */
  useEffect(() => {
    if (!isOpen || welcomeDone) return
    let i = 0
    const iv = setInterval(() => {
      i++
      setWelcomeText(WELCOME.slice(0, i))
      if (i >= WELCOME.length) { clearInterval(iv); setWelcomeDone(true) }
    }, 28)
    return () => clearInterval(iv)
  }, [isOpen, welcomeDone])

  /* send button bounce */
  function triggerSendAnim() {
    const el = sendBtnRef.current
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight
    el.style.animation = 'sendBounce 0.4s cubic-bezier(0.34,1.56,0.64,1)'
  }

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg    = { role: 'user', content: trimmed }
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)
    setInput('')
    setLoading(true)
    triggerSendAnim()

    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${ANON_KEY}`,
          'apikey':        ANON_KEY,
        },
        body: JSON.stringify({ messages: newHistory, provider }),
      })

      if (!res.ok || !res.body) throw new Error('API 오류')

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer  = ''
      let started = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue

          try {
            const json  = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content
            if (!delta) continue

            if (!started) {
              started = true
              setLoading(false)
              setMessages(prev => [...prev, { role: 'assistant', content: delta }])
            } else {
              setMessages(prev => {
                const last = prev[prev.length - 1]
                if (last?.role === 'assistant') {
                  return [...prev.slice(0, -1), { ...last, content: last.content + delta }]
                }
                return prev
              })
            }
          } catch { /* skip malformed chunk */ }
        }
      }

      if (!started) {
        setMessages(prev => [...prev, { role: 'assistant', content: '응답을 받지 못했습니다.' }])
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '죄송해요, 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      }])
    } finally {
      setLoading(false)
    }
  }

  /* panel size/position */
  const panelStyle = isMobile
    ? {
        position: 'fixed', inset: 0,
        background: 'var(--surface)',
        display: 'flex', flexDirection: 'column',
        zIndex: 1001, overflow: 'hidden',
        animation: 'chatSlideUp 0.3s ease',
      }
    : {
        position: 'fixed',
        bottom: '5.5rem', right: '1.5rem',
        width: 'min(360px, calc(100vw - 2rem))',
        height: 'min(520px, calc(100vh - 8rem))',
        background: 'var(--surface)',
        borderRadius: '16px',
        boxShadow: '0 16px 56px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
        zIndex: 1001, overflow: 'hidden',
        border: '1px solid var(--line)',
        animation: 'chatSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }

  return (
    <>
      {isOpen && (
        <div style={panelStyle}>

          {/* ── Header ── */}
          <div style={{
            position: 'relative',
            background: 'var(--grad)',
            padding: '0.9rem 1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0, overflow: 'hidden',
          }}>
            {/* dot-texture overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }} />

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#4ade80', boxShadow: '0 0 8px #4ade80',
                display: 'block', flexShrink: 0,
              }} />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>
                곁에 AI 상담
              </span>
              {loading && (
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>
                  답변 작성 중...
                </span>
              )}
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Solar / GPT toggle */}
              <div style={{
                display: 'flex', background: 'rgba(255,255,255,0.2)',
                borderRadius: '999px', padding: '2px', gap: '2px',
              }}>
                {[{ id: 'solar', label: 'Solar' }, { id: 'openai', label: 'GPT' }].map(({ id, label }) => (
                  <button key={id} onClick={() => setProvider(id)} style={{
                    padding: '3px 10px', borderRadius: '999px',
                    fontSize: '0.72rem', fontWeight: 600,
                    color: provider === id ? 'var(--primary)' : '#fff',
                    background: provider === id ? '#fff' : 'transparent',
                    transition: 'all 0.15s',
                  }}>
                    {label}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsOpen(false)} style={{
                color: 'rgba(255,255,255,0.85)',
                display: 'flex', alignItems: 'center', padding: '2px',
              }}>
                <CloseIcon size={18} />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.7rem',
          }}>
            {/* Welcome typing */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <AIAvatar />
              <div style={{
                maxWidth: '82%', padding: '0.6rem 0.9rem',
                borderRadius: '14px 14px 14px 4px',
                background: 'var(--surface-2)',
                color: 'var(--ink)', fontSize: '0.875rem',
                lineHeight: 1.55, whiteSpace: 'pre-wrap',
              }}>
                {welcomeText}
                {!welcomeDone && (
                  <span style={{ animation: 'blink 0.8s step-end infinite' }}>|</span>
                )}
              </div>
            </div>

            {/* Quick questions */}
            {messages.length === 0 && welcomeDone && (
              <div style={{
                marginLeft: '36px',
                display: 'flex', flexWrap: 'wrap', gap: '6px',
                animation: 'msgSlide 0.3s ease',
              }}>
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} style={{
                    padding: '5px 11px', borderRadius: '999px',
                    border: '1px solid var(--primary)', color: 'var(--primary)',
                    fontSize: '0.76rem', background: 'transparent', cursor: 'pointer',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--primary)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--primary)'
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Chat history */}
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                gap: '8px', alignItems: 'flex-end',
                animation: 'msgSlide 0.25s ease',
              }}>
                {msg.role === 'assistant' && <AIAvatar />}
                <div style={{
                  maxWidth: '82%', padding: '0.6rem 0.9rem',
                  borderRadius: msg.role === 'user'
                    ? '14px 14px 4px 14px'
                    : '14px 14px 14px 4px',
                  background: msg.role === 'user' ? 'var(--grad)' : 'var(--surface-2)',
                  color: msg.role === 'user' ? '#fff' : 'var(--ink)',
                  fontSize: '0.875rem', lineHeight: 1.55,
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>
                  {msg.content}
                  {msg.role === 'assistant' && msg.content === '' && (
                    <span style={{ animation: 'blink 0.6s step-end infinite' }}>▌</span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div style={{
                display: 'flex', gap: '8px', alignItems: 'flex-end',
                animation: 'msgSlide 0.25s ease',
              }}>
                <AIAvatar />
                <div style={{
                  padding: '0.65rem 0.9rem',
                  borderRadius: '14px 14px 14px 4px',
                  background: 'var(--surface-2)',
                  display: 'flex', gap: '5px', alignItems: 'center',
                }}>
                  {[0, 1, 2].map(j => (
                    <span key={j} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--primary)', display: 'block',
                      animation: `chatDot 1.2s ${j * 0.18}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* ── Input ── */}
          <div style={{
            padding: '0.65rem 0.75rem',
            borderTop: '1px solid var(--line)',
            display: 'flex', gap: '8px',
            flexShrink: 0, background: 'var(--surface)',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1, padding: '0.5rem 0.9rem',
                borderRadius: '999px',
                border: '1.5px solid var(--line)',
                background: 'var(--input-bg)', color: 'var(--ink)',
                fontSize: '0.875rem', outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--primary)'
                e.target.style.boxShadow = '0 0 0 3px rgba(var(--ring-rgb), 0.15)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--line)'
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              ref={sendBtnRef}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: input.trim() && !loading ? 'var(--grad)' : 'var(--line)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
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

      {/* ── Toggle button ── */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1001 }}>

        {/* Speech bubble tooltip */}
        {!isOpen && (
          <div style={{
            position: 'absolute',
            right: '66px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <div
              className="chat-bubble"
              onClick={() => setIsOpen(true)}
              style={{
                background: 'var(--surface)',
                color: 'var(--ink)',
                padding: '7px 13px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                border: '1px solid var(--line)',
                cursor: 'pointer',
                animation: 'bubbleFloat 2.8s ease-in-out infinite',
                userSelect: 'none',
              }}
            >
              궁금한 점을 물어보세요!
            </div>
          </div>
        )}

        {!isOpen && (
          <>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid var(--primary)',
              animation: 'pulseChat 2s ease-out infinite',
            }} />
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid var(--primary)',
              animation: 'pulseChat 2s 0.7s ease-out infinite',
            }} />
          </>
        )}
        <button
          onClick={() => setIsOpen(p => !p)}
          aria-label={isOpen ? '채팅 닫기' : 'AI 상담 열기'}
          style={{
            position: 'relative',
            width: 54, height: 54, borderRadius: '50%',
            background: 'var(--grad)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(var(--ring-rgb), 0.4)',
            transition: 'transform 0.18s, box-shadow 0.18s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.boxShadow = '0 10px 32px rgba(var(--ring-rgb), 0.55)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(var(--ring-rgb), 0.4)'
          }}
        >
          <span style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
            {isOpen ? <CloseIcon size={20} /> : <ChatIcon size={22} />}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40%           { transform: scale(1.2); opacity: 1;   }
        }
        @keyframes msgSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulseChat {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.1); opacity: 0;    }
        }
        @keyframes sendBounce {
          0%   { transform: scale(1);    }
          30%  { transform: scale(0.82); }
          65%  { transform: scale(1.18); }
          100% { transform: scale(1);    }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0);    }
          50%      { transform: translateY(-7px); }
        }
        .chat-bubble {
          position: relative;
        }
        .chat-bubble::after {
          content: '';
          position: absolute;
          right: -7px;
          top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid var(--surface);
        }
        .chat-bubble::before {
          content: '';
          position: absolute;
          right: -9px;
          top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 8px solid var(--line);
        }
      `}</style>
    </>
  )
}

function AIAvatar() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'var(--grad)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      fontSize: '0.72rem', fontWeight: 800, color: '#fff',
      boxShadow: '0 2px 8px rgba(var(--ring-rgb), 0.3)',
    }}>
      곁
    </div>
  )
}

function ChatIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
