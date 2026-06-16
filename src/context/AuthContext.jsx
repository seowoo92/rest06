import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import supabase, { redirectURL } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('r06_profiles')
      .select('id, nickname, role, avatar_url')
      .eq('id', userId)
      .single()
    if (error) {
      console.error('fetchProfile error:', error)
      return null
    }
    return data
  }, [])

  const reloadProfile = useCallback(async () => {
    if (!user) return
    const p = await fetchProfile(user.id)
    setProfile(p)
  }, [user, fetchProfile])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        const p = await fetchProfile(u.id)
        if (mounted) setProfile(p)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        const u = session?.user ?? null
        setUser(u)
        if (u) {
          const p = await fetchProfile(u.id)
          if (mounted) setProfile(p)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }, [])

  const signUp = useCallback(async ({ email, password, nickname }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { data, error }

    const u = data.user
    if (u) {
      const derivedNickname = nickname || email.split('@')[0]
      await supabase.from('r06_profiles').insert({
        id: u.id,
        nickname: derivedNickname,
        role: 'user',
        avatar_url: null,
      })
    }
    return { data, error }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectURL() },
    })
    return { data, error }
  }, [])

  const signInWithKakao = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: redirectURL() },
    })
    return { data, error }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }, [])

  const isAdmin = profile?.role === 'admin'
  const isLoggedIn = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isLoggedIn,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithKakao,
        signOut,
        reloadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
