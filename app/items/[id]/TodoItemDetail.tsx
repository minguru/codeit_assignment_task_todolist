'use client'

import { useState } from 'react'
import { useRouter } from "next/navigation"
import RoundedButton from '@/app/components/button/RoundedButton'
import Loading from '@/app/components/global/Loading'

interface getTodoDetail {
  id: number,
  name: string,
  tenantId: string,
  memo: string,
  imageUrl: string,
  isCompleted: boolean
}

export default function TodoItemDetail({
  data,
  apiUrl
}: {
  data: getTodoDetail,
  apiUrl: string
}) {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [done, setDone] = useState<boolean>(data.isCompleted)
  const [memo, setMemo] = useState<string>(data.memo ?? '')
  const [preview, setPreview] = useState<string | null>(data.imageUrl)
  const [file, setFile] = useState<File | null>(null)

  const FILENAME_ENGLISH_ONLY = /^[a-zA-Z0-9._-]+$/ // 이미지 파일명 정규식

  /**
   * 변경 사항을 업데이트 합니다.
   * @param id: number api item id 값
   */
  const handleUpdate = async (id: number) => {
    const message:number[] = []

    if ( // memo 업데이트
      memo !== (data.memo ?? '')
    ) {
      setLoading(true)
      await fetch(`${apiUrl}/items/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memo: memo
        })
      })
      message.push(1)
    }

    if ( // isCompleted 업데이트
      done !== data.isCompleted
    ) {
      setLoading(true)
      await fetch(`${apiUrl}/items/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCompleted: done
        })
      })
      message.push(1)
    }
    
    if ( // image 업로드
      preview !== data.imageUrl && file
    ) {
      setLoading(true)

      // 이미지 체크
      const filename = file.name.replace(/\.[^.]+$/, '') // 확장자 제거
      if ( !FILENAME_ENGLISH_ONLY.test(filename) ) {
        alert('이미지 이름은 영문, 숫자, 특수문자(. _ -)만 사용할 수 있습니다!')
        setLoading(false)
        return false
      }
      if ( file.size >= 5 * 1024 * 1024 ) {
        alert('파일 크기는 5MB 미만이어야 합니다!')
        setLoading(false)
        return false
      }

      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch(`${apiUrl}/images/upload`, {
        method: "POST",
        body: formData
      })
      const { url } = await res.json()

      await fetch(`${apiUrl}/items/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: url
        })
      })
      message.push(1)
    }

    if ( message.length > 0 ) {
      setLoading(false)
      router.push('/')
    } else {
      alert('변경 사항이 없습니다!')
      return
    }
  }

  /**
   * 해당 할 일을 삭제합니다.
   * @param id:number api item id 값
   */
  const handleDelete = async (id: number) => {
    const deleteConfirm = confirm("정말로 삭제하시겠습니까?")
    if (deleteConfirm) {
      setLoading(true)
      await fetch(`${apiUrl}/items/${id}`, {
        method: "delete"
      }).then(() => {
        setLoading(false)
        router.push('/')
      })
    }
  }

  return (
    <>
      <div className="detail-wrapper bg-background h-full px-4 sm:px-6 md:px-[7.7%] isolate box-border max-w-[1200px] w-full mx-auto pt-6">
        <div 
          className={`name w-full flex justify-center items-center px-4 py-4 gap-4 border-2 border-solid border-[var(--slate-800)] rounded-3xl dark:border-[var(--slate-800)] ${ !done ? `dark:bg-[var(--slate-300)]!` : `dark:bg-[var(--violet-100)]!` }`} 
          style={{ backgroundColor: !done ? `var(--background)` : `var(--violet-100)` }}
        >
          <div 
            className="checkbox hover:cursor-pointer min-w-8" 
            onClick={() => { done ? setDone(false) : setDone(true)} }
          >
            <img 
              src={`/icon/${ !done ? `empty` : `checked` }.svg`} 
              alt="체크박스" 
            />
          </div>

          <p className={`font-bold text-[20px] underline underline-offset-2 leading-[1.2] ${ !done ? `dark:text-[var(--background)]` : `dark:text-[var(--slate-800)]` }`}>
            {data.name}
          </p>
        </div>

        <div className="image-memo flex flex-col md:flex-row w-full justify-start md:justify-between gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div className={`
            image w-full md:h-auto min-h-[311px] max-h-100 md:w-5/12 relative rounded-3xl overflow-hidden flex justify-center items-center box-border 

            ${ preview === null ? `border-dashed border-2 border-[var(--slate-300)] bg-[var(--slate-100)] dark:bg-[var(--slate-400)]` : `bg-[var(--slate-500)]`}
          `}>
            {
              preview === null ?
              <img 
                src="/images/image-not-found.png" 
                srcSet="/images/image-not-found.png 1x, /images/image-not-found@2x.png 2x, /images/image-not-found@3x.png 3x" 
                alt="업로드 된 이미지가 없음을 나타내는 임시 이미지" 
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" 
                onLoadStart={() => {setLoading(true)}}
                onLoad={() => {setLoading(false)}}
              /> 
              : 
              <img 
                src={preview} 
                alt="사용자가 업로드한 이미지" 
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full object-cover" 
              />
            }
            

            <button className="absolute bottom-3 right-3">
              <input 
                type="file" 
                id="imageSelector" 
                className="sr-only" 
                accept="image/*" 
                onChange={(e) => {
                  // 업로드 된 이미지 state 저장 및 미리보기 이미지 변경
                  const selectedImage = e.target.files?.[0]
                  if (selectedImage) {
                    setFile(selectedImage)
                    setPreview(URL.createObjectURL(selectedImage))
                  }
                }} 
              />
              <label htmlFor="imageSelector" className="block hover:cursor-pointer rounded-3xl overflow-hidden">
                {
                  preview === null ?
                  <img src="/icon/image-plus.svg" alt="이미지 추가 버튼" />
                  :
                  <img src="/icon/image-edit.svg" alt="이미지 수정 버튼" />
                }
              </label>
            </button>
          </div>

          <div 
            className="memo w-full h-78 md:h-auto min-h-78 md:w-7/12 rounded-3xl overflow-hidden flex flex-col gap-6 text-[var(--slate-900)]" 
            style={{backgroundImage: `image-set(url('/images/memo.png') 1x, url('/images/memo@2x.png') 2x, url('/images/memo@3x.png') 3x)`}}
          >
            <h2 className="w-full text-center font-extrabold text-base text-[var(--amber-800)] content-center pt-6">
              Memo
            </h2>

            <textarea 
              id="memoTextBox" 
              name="memoTextBox" 
              className="resize-none w-full h-80 md:h-full outline-none text-center content-center px-3 mb-6" 
              onChange={(e) => { setMemo(e.target.value)} } 
              value={ memo }
            ></textarea>
          </div>
        </div>

        <div className="buttons flex justify-center md:justify-end gap-4 md:gap-6 mt-6 pb-10">
          <RoundedButton 
            onClickEvent={() => {handleUpdate(data.id)}} 
            type={ (memo.trim() === (data.memo ? data.memo : '') && done === data.isCompleted && preview === data.imageUrl) ? `edit` : `done-edit` }
          />

          <RoundedButton 
            onClickEvent={() => {handleDelete(data.id)}} 
            type="delete" 
          />
        </div>
      </div>

      { loading ? <Loading /> : null }
    </>
  )
}
