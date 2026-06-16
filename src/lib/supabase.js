import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const BASE_URL = '/rest06'

export function redirectURL() {
  return window.location.origin + BASE_URL
}

// env가 없을 때 dummy client로 fallback (개발 편의용)
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { flowType: 'pkce' } })
  : createClient('https://dummy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.dummy', { auth: { flowType: 'pkce' } })

export default supabase
