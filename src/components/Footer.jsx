import { useNavigate } from 'react-router-dom'

const FOOTER_COLS = [
  {
    heading: '회사소개',
    links: [
      { label: '회사소개', path: '/about' },
      { label: 'CEO 소개', path: '/about/ceo' },
    ],
  },
  {
    heading: '서비스',
    links: [
      { label: '전체 서비스', path: '/services' },
      { label: '이용방법', path: '/services/how' },
    ],
  },
  {
    heading: '커뮤니티',
    links: [
      { label: '공지사항', path: '/community/notice' },
      { label: '이용후기', path: '/community/review' },
      { label: '문의하기', path: '/community/inquiry' },
    ],
  },
]

export default function Footer() {
  const navigate = useNavigate()

  const footerStyle = {
    background: 'var(--footer-bg)',
    color: '#90999F',
    padding: '56px 24px 0',
  }

  const innerStyle = {
    maxWidth: 1180,
    margin: '0 auto',
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 40,
    paddingBottom: 48,
  }

  const logoBlockStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  }

  const logoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  }

  const logoIconStyle = {
    width: 34,
    height: 34,
    borderRadius: 9,
    background: 'linear-gradient(135deg, #1FA46A 0%, #5BC08C 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }

  const logoTextStyle = {
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.3px',
  }

  const taglineStyle = {
    fontSize: 13.5,
    lineHeight: 1.7,
    color: '#90999F',
    maxWidth: 280,
  }

  const colHeadingStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    marginBottom: 16,
    letterSpacing: '-0.1px',
  }

  const bottomBarStyle = {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '20px 0',
    fontSize: 13,
    color: '#5A6468',
    textAlign: 'center',
  }

  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        {/* 4-column grid */}
        <div style={gridStyle} className="footer-grid">
          {/* Col 1: Brand */}
          <div style={logoBlockStyle}>
            <div style={logoRowStyle}>
              <div style={logoIconStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 11.2 12 5l8 6.2V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"
                    fill="#fff"
                  />
                  <circle cx="12" cy="13.2" r="1.7" fill="#1FA46A" />
                </svg>
              </div>
              <span style={logoTextStyle}>곁에</span>
            </div>
            <p style={taglineStyle}>
              혼자 사는 삶에도, 든든한 손 하나쯤은 있어야 하니까.
              청년 1인 가구의 생활 도움 파트너.
            </p>
          </div>

          {/* Cols 2-4: Links */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p style={colHeadingStyle}>{col.heading}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      fontSize: 13.5,
                      color: '#90999F',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#90999F' }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={bottomBarStyle}>
          © 2026 곁에 (Gyeote). 본 사이트는 디자인 시안이며 모든 정보는 예시입니다.
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
