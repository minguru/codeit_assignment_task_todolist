'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/components/global/Loading'

interface getTodos {
  id: number,
  name: string,
  isCompleted: boolean
}

export default function TodoListItem({
  type,
  data,
  apiUrl
}: {
  type: string,
  data: getTodos[],
  apiUrl: string
}) {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  /**
   * 체크박스를 클릭하면 완료 미완료 처리를 합니다.
   * @param id: number api item id 값
   * @param r: boolean todo 인지 확인
   */
  const handleToggle = async (id: number, r: boolean) => {
    // r 값으로 완료 미완료 처리
    setLoading(true)

    await fetch(`${apiUrl}/items/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: r })
    })

    setLoading(false)

    router.refresh()
  }

  return (
    <>
      {
        type === 'todo' || type === 'done' ?
        <div className={`
          ${type === 'todo' ? `todo` : `done`} 
          w-full md:w-1/2 
          [&.todo]:[&_li]:bg-[#ffffff] dark:[&.todo]:[&_li]:bg-[var(--slate-300)] 
          [&.done]:[&_li]:bg-[var(--violet-100)] 
          [&.done]:[&_li]:line-through
        `}>
          <img
            src={`/images/${type}.png`}
            srcSet={`/images/${type}.png 1x, /images/${type}@2x.png 2x, /images/${type}@3x.png 3x`}
            alt={`${type}`}
          />

          {
            // 목록에 항목이 없을 때!
            data.length === 0 ?
            <div className="w-full flex flex-col justify-center items-center pt-0 gap-4 sm:pt-16 sm:gap-6">
              <picture className="min-h-[120px] sm:min-h-[240px]">
                <source 
                  media="(max-width: 640px)" 
                  srcSet={`/images/${type}-not-found-small.png 1x, /images/${type}-not-found-small@2x.png 2x, /images/${type}-not-found-small@3x.png 3x`} 
                />
                <img 
                  src={`/images/${type}-not-found-large.png`} 
                  srcSet={`/images/${type}-not-found-large.png 1x, /images/${type}-not-found-large@2x.png 2x, /images/${type}-not-found-large@3x.png 3x`} 
                  alt={`${type === 'todo' ? `연필을 들고있는 코드잇 캐릭터 이미지` : type === 'done' ? `곤란해 하는 코드잇 캐릭터 이미지` : null}`} 
                />
              </picture>

              <p className="text-center text-base text-[var(--slate-400)]">
                {
                  type === 'todo' ? 
                  <>할 일이 없어요.<br />TODO를 새롭게 추가해주세요!</>
                  : type === 'done' ?
                  <>아직 다 한 일이 없어요.<br />해야 할 일을 체크해보세요!</>
                  : null
                }
              </p>
            </div>
            : ''
          }

          <ul className="pt-4">
            {
              // 할 일 데이터 리스트화
              data.map((d, k) => {
                return (
                  <li key={k} className="flex items-center justify-start gap-4 py-2 px-3 rounded-3xl mb-4 last-of-type:mb-0">
                    <button 
                      onClick={() => { handleToggle(d.id, type === 'todo') }}
                      className="hover:cursor-pointer min-w-8"
                    >
                      <img 
                        src={`/icon/${type === 'todo' ? `empty` : `checked`}.svg`} 
                        alt="체크박스" 
                      />
                    </button>

                    <p className="leading-none text-[var(--slate-800)] text-base">
                      {
                        <a 
                          className={`
                            hover:cursor-pointer hover:underline leading-[1.2] 

                            ${ type === 'todo' ? `dark:text-[var(--slate-900)]` : `dark:line-through` }
                          `} 
                          href={`/items/${d.id}`} 
                          onClick={() => {router.push(`/items/${d.id}`)}}
                        >{d.name}</a>
                      }
                    </p>
                  </li>
                )
              })
            }
          </ul>
        </div>
        : null
      }

      { loading ? <Loading /> : null }
    </>
  )
}
