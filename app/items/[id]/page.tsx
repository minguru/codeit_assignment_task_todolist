import Header from '@/app/components/global/Header'
import TodoItemDetail from './TodoItemDetail'
import { apiUrl } from '@/app/constants'
import { cookies } from "next/headers"

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
  const tenantId = (await cookies()).get('codeit_tenant_id')?.value

  const { id } = await params
  
  const response = await fetch(`${apiUrl(tenantId)}/items/${id}`, {
    'cache': 'no-store'
  })
  const data: getTodoDetail = await response.json()

  return (
    <>
      <Header />
      <TodoItemDetail data={data} apiUrl={apiUrl(tenantId)} />
    </>
  )
}
