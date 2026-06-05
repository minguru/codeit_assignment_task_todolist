'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoundedButton from '@/app/components/button/RoundedButton'
import Loading from '@/app/components/global/Loading'

interface getTodos {
  id: number,
  name: string,
  isCompleted: boolean
}

export default function TodoPusher({
  data,
  apiUrl
}: {
  data: getTodos[],
  apiUrl: string
}) {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false)

  const todoItems = data.filter((item: getTodos) => item.isCompleted === false)
  const isNothing = todoItems.length === 0 ? true : false
  
  /**
   * 텍스트 인풋에 적힌 내용을 할 일 목록에 추가합니다.
   * @param v text input - value
   */
  const handleAdd = async (v: string) => {
    if ( v.trim() === '' || v.trim().length === 0 ) {
      alert('내용을 입력해주세요!')
    } else {
      setLoading(true)

      await fetch(`${apiUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: value })
      })

      setLoading(false)
    }

    setValue('')

    router.refresh()
  }

  return (
    <>
      <div>
        <div className="wrapper pt-6 pb-10 flex justify-between gap-4 items-center">
          <label htmlFor="todoPusher" className="
            todoInput bg-[var(--slate-100)] py-4 px-6 rounded-3xl border-2 border-solid border-[var(--slate-900)] w-full relative left-0 top-0 transition-all ease-out duration-100 leading-none 
            
            before:content-[''] before:box-content before:block before:w-full before:h-full before:bg-[var(--slate-900)] before:absolute before:left-[3.65px] before:top-1 before:-z-1 before:rounded-3xl before:border-2 before:border-solid before:border-[var(--slate-900)] before:transition-all before:duration-100 before:ease-out 
            
            has-[input:focus]:left-[3.65px] has-[input:focus]:top-1 has-[input:focus]:before:left-0 has-[input:focus]:before:top-0 has-[input:focus]:bg-[#fafbfc]

            dark:bg-[var(--slate-300)] dark:border-[var(--slate-800)] dark:before:bg-[var(--slate-800)] dark:before:border-[var(--slate-800)] dark:has-[input:focus]:bg-[var(--slate-100)]
          ">
            <input 
              type="text" 
              id="todoPusher" 
              placeholder="할 일을 입력해주세요" 
              value={value}
              onChange={(e) => setValue(e.target.value)} 
              // e.nativeEvent.isComposing 으로 엔터키 동작 시 두번 작동하는 것을 방지 (IME 한글 입력 이슈)
              onKeyDown={(e) => { if ( e.key === 'Enter' && !e.nativeEvent.isComposing ) { handleAdd(value); setIsEnterPressed(true) } }}
              onKeyUp={(e) => { if ( e.key === 'Enter' && !e.nativeEvent.isComposing ) { setIsEnterPressed(false) } }}
              className="hover:cursor-text leading-none w-full h-4 appearance-none outline-none text-base text-[var(--slate-900)] placeholder:text-[var(--slate-500)]"
            />
          </label>

          <RoundedButton 
            onClickEvent={() => {handleAdd(value)}} 
            alt="플러스 아이콘" 
            type="add" 
            isNothing={isNothing} 
            isEnterPressed={isEnterPressed}
          />
        </div>
      </div>

      { loading ? <Loading /> : null }
    </>
  );
}
