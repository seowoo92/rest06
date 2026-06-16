# 곁에 (Gyeote)

청년 1인 가구를 위한 생활 도움 매칭 서비스.

## 기술 스택

- Vite + React
- CSS Variables (custom theme system)
- react-router-dom
- @supabase/supabase-js
- GitHub Pages 배포

## 로컬 개발

1. 의존성 설치
   ```bash
   npm install
   ```

2. 환경변수 설정 (`.env.local`)
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

3. 개발 서버 실행
   ```bash
   npm run dev
   ```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 후 gh-pages 브랜치에 배포합니다.

배포 URL: https://seowoo92.github.io/rest06/

## 프로젝트 구조

```
src/
  components/    # Navbar, Footer, BookingModal
  context/       # ThemeContext, AuthContext
  data/          # 서비스, 후기, 공지 목 데이터
  hooks/         # useReveal
  lib/           # supabase.js
  pages/         # 각 페이지 컴포넌트
```
