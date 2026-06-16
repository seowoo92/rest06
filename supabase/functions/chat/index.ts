import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `당신은 곁에(Gyeote) 서비스의 친절한 AI 상담사입니다.
곁에는 1인 가구를 위한 생활 도움 매칭 서비스로, 검증된 매니저가 집 안팎의 불편한 일을 도와드립니다.

서비스 목록:
- 집수리: 전구·수전 교체, 못 박기, 간단 수리 (15,000원~)
- 가구 조립·설치: 침대·책상·선반, 박스패 포함 (25,000원~)
- 무거운 짐·이사 도움: 혼자 들기 힘든 짐 운반 (30,000원~)
- 장보기 대행: 무거운 생수·쌀, 대형마트 쇼핑 (9,900원~)
- 반려동물 돌봄: 산책·밥·놀이, 사진 리포트 제공 (19,000원~)

이용 방법:
1. 앱에서 필요한 서비스와 날짜·시간·주소 입력 (1분 완료)
2. 가장 가까운 검증된 매니저 자동 매칭 (평균 45분 내 도착)
3. 작업 완료 후 사진 리포트 수령 및 카드·간편결제

답변 규칙:
- 항상 친절하고 자연스러운 한국어로 답변하세요
- 서비스 관련 질문에 정확히 안내하세요
- 가격은 시작가 기준으로 안내하고, 상세 견적은 신청 시 확인 가능하다고 안내하세요
- 모르는 내용이나 복잡한 상담은 고객센터(카카오 채널 @곁에) 연결을 권유하세요
- 답변은 간결하게 2~4문장으로 유지하세요`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, provider = 'solar' } = await req.json()

    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ]

    let apiUrl: string
    let apiKey: string
    let model: string

    if (provider === 'openai') {
      apiUrl = 'https://api.openai.com/v1/chat/completions'
      apiKey = Deno.env.get('OPENAI_API_KEY') ?? ''
      model = 'gpt-4o-mini'
    } else {
      apiUrl = 'https://api.upstage.ai/v1/chat/completions'
      apiKey = Deno.env.get('SOLAR_API_KEY') ?? ''
      model = 'solar-pro'
    }

    if (!apiKey) {
      throw new Error(`${provider} API key가 설정되지 않았습니다`)
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages: fullMessages, stream: true }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`API 오류 (${response.status}): ${errText}`)
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
