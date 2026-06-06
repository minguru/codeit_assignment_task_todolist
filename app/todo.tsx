import TodoPusher from '@/app/todo/TodoPusher'
import TodoList from '@/app/todo/TodoList'
import { apiUrl } from '@/app/constants'
import { cookies } from "next/headers"

interface getTodos {
  id: number,
  name: string,
  isCompleted: boolean
}

export default async function Todo() {
  const tenantId = (await cookies()).get('codeit_tenant_id')?.value

  const response = await fetch(`${apiUrl(tenantId)}/items`, {
    'cache': 'no-store'
  })
  const data: getTodos[] = await response.json()
  return (
    <>
      <TodoPusher data={data} apiUrl={apiUrl(tenantId)} />
      <TodoList data={data} apiUrl={apiUrl(tenantId)} />
    </>
  )
}
