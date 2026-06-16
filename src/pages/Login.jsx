import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* ── SVGs ── */
function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function EyeIcon({ size = 18, off = false }) {
  return off ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { signIn, signUp, signInWithGoogle, signInWithKakao } = useAuth()

  const [tab, setTab]             = useState('login')   // 'login' | 'signup'
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [nickname, setNickname]   = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const inputStyle = {
    width: '100%',
    background: 'var(--input-bg)',
    border: '1.5px solid var(--line)',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    color: 'var(--ink)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.18s',
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (tab === 'login') {
      const { error: err } = await signIn({ email, password })
      if (err) {
        setError(err.message || '로그인에 실패했어요.')
        setLoading(false)
      } else {
        navigate('/')
      }
    } else {
      if (!nickname.trim()) {
        setError('닉네임을 입력해주세요.')
        setLoading(false)
        return
      }
      const { error: err } = await signUp({ email, password, nickname })
      if (err) {
        setError(err.message || '회원가입에 실패했어요.')
        setLoading(false)
      } else {
        navigate('/')
      }
    }
  }

  async function handleGoogle() {
    setError('')
    const { error: err } = await signInWithGoogle()
    if (err) setError(err.message || '구글 로그인에 실패했어요.')
  }

  async function handleKakao() {
    setError('')
    const { error: err } = await signInWithKakao()
    if (err) setError(err.message || '카카오 로그인에 실패했어요.')
  }

  function switchTab(t) {
    setTab(t)
    setError('')
    setEmail('')
    setPassword('')
    setNickname('')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        animation: 'pageIn 0.35s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '1.7rem',
              fontWeight: 900,
              color: 'var(--primary)',
              margin: '0 0 6px',
              letterSpacing: '-0.03em',
            }}
          >
            곁에
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
            생활 도움 매칭 서비스
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--line-2)',
            borderRadius: '20px',
            padding: '2.2rem 2.4rem',
          }}
        >
          {/* Tab toggle */}
          <div
            style={{
              display: 'flex',
              background: 'var(--surface-2)',
              borderRadius: '10px',
              padding: '4px',
              marginBottom: '1.8rem',
            }}
          >
            {[
              { id: 'login',  label: '로그인' },
              { id: 'signup', label: '회원가입' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                style={{
                  flex: 1,
                  borderRadius: '7px',
                  padding: '0.55rem',
                  fontSize: '0.9rem',
                  fontWeight: tab === t.id ? 700 : 500,
                  background: tab === t.id ? 'var(--surface)' : 'transparent',
                  color: tab === t.id ? 'var(--ink)' : 'var(--muted)',
                  boxShadow: tab === t.id ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Nickname (signup only) */}
            {tab === 'signup' && (
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '0.45rem',
                  }}
                >
                  닉네임
                </label>
                <input
                  type="text"
                  placeholder="사용할 닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={(e)  => { e.target.style.borderColor = 'var(--line)' }}
                />
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.83rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '0.45rem',
                }}
              >
                이메일
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--line)' }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.6rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.83rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '0.45rem',
                }}
              >
                비밀번호
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="6자 이상"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: '2.8rem' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={(e)  => { e.target.style.borderColor = 'var(--line)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <EyeIcon size={17} off={showPw} />
                </button>
              </div>
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
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'var(--muted-2)' : 'var(--grad)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '12px',
                padding: '0.9rem',
                transition: 'opacity 0.18s',
                cursor: loading ? 'wait' : 'pointer',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              {loading
                ? '처리 중...'
                : tab === 'login' ? '로그인' : '가입하기'}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '1.6rem 0',
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              또는 소셜 계정으로 계속하기
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {/* Google */}
            <button
              onClick={handleGoogle}
              style={{
                width: '100%',
                background: 'var(--surface)',
                color: 'var(--ink)',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '12px',
                padding: '0.8rem',
                border: '1.5px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'background 0.18s, border-color 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--surface-2)'
                e.currentTarget.style.borderColor = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface)'
                e.currentTarget.style.borderColor = 'var(--line)'
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  flexShrink: 0,
                }}
              >
                <GoogleIcon size={15} />
              </div>
              구글로 계속하기
            </button>

            {/* Kakao */}
            <button
              onClick={handleKakao}
              style={{
                width: '100%',
                background: '#FEE500',
                color: '#3C1E1E',
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '12px',
                padding: '0.8rem',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'opacity 0.18s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: '#3C1E1E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <KakaoLetterK />
              </div>
              카카오로 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Kakao "K" letter mark */
function KakaoLetterK() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#FEE500">
      <path d="M7 5v14M7 12l10-7M7 12l10 7" stroke="#FEE500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}
