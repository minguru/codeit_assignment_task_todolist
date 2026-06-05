'use client'

import { useState } from "react"

export default function Base({
  children
}: {
  children: React.ReactNode
}) {
  const LS_KEY: string = 'codeit-user-id' // 브라우저 localStorage에 codeit-user-id 값을 저장해 브라우저 캐시 초기화를 하지 않는 이상 해당 유저가 브라우저에서 데이터 열람을 유지시킬 수 있도록 설정 

  const [ codeitUserId ] = useState<string>(() => {
    if ( typeof window === 'undefined' ) return '' // SSR 가드 코드 삽입
    
    const storedUserId: string | false = localStorage.getItem(LS_KEY) ?? false

    if ( storedUserId ) return storedUserId
    else {
      const randomUserId = crypto.randomUUID()
      localStorage.setItem(LS_KEY, randomUserId)
      return randomUserId
    }
  })

  const API_URL = `https://assignment-todolist-api.vercel.app/api/${codeitUserId}`

  console.log(API_URL)
  
  return (
    <>
      {children}
    </>
  )
}