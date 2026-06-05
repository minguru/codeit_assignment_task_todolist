import Header from '@/app/components/global/Header'
import TodoItemDetail from './TodoItemDetail'
import { API_URL } from '@/app/constants'

interface getTodoDetail {
  id: number,
  name: string,
  tenantId: string,
  memo: string,
  imageUrl: string,
  isCompleted: boolean
}

export default async function ItemDetail({
  params
}: {
  params: Promise<{
    id: number
  }>
}) {
  const { id } = await params
  
  const response = await fetch(`${API_URL}/items/${id}`)
  const data: getTodoDetail = await response.json()

  return (
    <>
      <Header />
      <TodoItemDetail data={data} apiUrl={API_URL} />
    </>
  )
}
