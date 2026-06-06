import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (!req.cookies.get('codeit_tenant_id')) {
    res.cookies.set('codeit_tenant_id', crypto.randomUUID(), {
      httpOnly: true, // JS 접근 차단
      secure: true, // https에서만
      sameSite: 'lax', // cross-site 요청엔 쿠키 차단, 단 링크 클릭 진입(GET)은 허용
      maxAge: 60 * 60 * 24 * 365,  // 유지 기간 설정
      path: '/',
    })
  }
  return res
}

export const config = {
  matcher: [
    // 정적 파일, 이미지, favicon 등은 제외하고 페이지 요청에만 적용
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
