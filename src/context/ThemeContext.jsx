import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

const themes = {
  green: {
    label: '그린',
    primary: '#1FA46A',
    strong: '#15784E',
    tint: '#E2F3EA',
    secondary: '#5BC08C',
    ring: '31,164,106',
    grad: 'linear-gradient(135deg,#1FA46A 0%,#5BC08C 100%)',
  },
  blue: {
    label: '블루',
    primary: '#2E7DF0',
    strong: '#1B5FCB',
    tint: '#E4EDFE',
    secondary: '#6FA8FF',
    ring: '46,125,240',
    grad: 'linear-gradient(135deg,#2E7DF0 0%,#6FA8FF 100%)',
  },
  sunset: {
    label: '선셋',
    primary: '#F97A3D',
    strong: '#D85E1C',
    tint: '#FFE9D8',
    secondary: '#FFC24D',
    ring: '249,122,61',
    grad: 'linear-gradient(135deg,#F97A3D 0%,#FFC24D 100%)',
  },
}

const modes = {
  light: {
    '--bg': '#FBF7EF',
    '--surface': '#FFFFFF',
    '--surface-2': '#F6F1E8',
    '--surface-3': '#F1ECE2',
    '--input-bg': '#FAF6EE',
    '--ink': '#262A2E',
    '--muted': '#606A6E',
    '--muted-2': '#8B9398',
    '--line': '#E7E0D5',
    '--line-2': '#EFE8DD',
    '--line-3': '#F3EDE3',
    '--footer-bg': '#20262B',
  },
  dark: {
    '--bg': '#14181B',
    '--surface': '#1E242A',
    '--surface-2': '#191F24',
    '--surface-3': '#28303A',
    '--input-bg': '#232B32',
    '--ink': '#ECF1F3',
    '--muted': '#A6B0B6',
    '--muted-2': '#7B868D',
    '--line': '#2D353D',
    '--line-2': '#252C33',
    '--line-3': '#20262C',
    '--footer-bg': '#0E1316',
  },
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('green')
  const [mode, setMode] = useState('light')

  const applyVars = useCallback((themeId, modeId) => {
    const root = document.documentElement
    const t = themes[themeId] || themes.green
    const m = modes[modeId] || modes.light

    root.style.setProperty('--primary', t.primary)
    root.style.setProperty('--primary-strong', t.strong)
    root.style.setProperty('--primary-tint', t.tint)
    root.style.setProperty('--secondary', t.secondary)
    root.style.setProperty('--grad', t.grad)
    root.style.setProperty('--ring-rgb', t.ring)

    Object.entries(m).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [])

  useEffect(() => {
    let savedTheme = 'green'
    let savedMode = 'light'
    try {
      const t = localStorage.getItem('gyeote-theme')
      const m = localStorage.getItem('gyeote-mode')
      if (themes[t]) savedTheme = t
      if (m === 'dark' || m === 'light') savedMode = m
    } catch (_) {}

    setThemeState(savedTheme)
    setMode(savedMode)
    applyVars(savedTheme, savedMode)
  }, [applyVars])

  const setTheme = useCallback((id) => {
    if (!themes[id]) return
    setThemeState(id)
    applyVars(id, mode)
    try { localStorage.setItem('gyeote-theme', id) } catch (_) {}
  }, [mode, applyVars])

  const toggleMode = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    applyVars(theme, next)
    try { localStorage.setItem('gyeote-mode', next) } catch (_) {}
  }, [mode, theme, applyVars])

  return (
    <ThemeContext.Provider value={{ theme, mode, themes, modes, setTheme, toggleMode, applyVars }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export { themes, modes }
