import TodoPusher from '@/app/todo/TodoPusher'
import TodoList from '@/app/todo/TodoList'
import { API_URL } from '@/app/constants'

interface getTodos {
  id: number,
  name: string,
  isCompleted: boolean
}

export default async function Todo() {
  const response = await fetch(`${API_URL}/items`)
  const data: getTodos[] = await response.json()

  return (
    <>
      <TodoPusher data={data} apiUrl={API_URL} />
      <TodoList data={data} apiUrl={API_URL} />
    </>
  )
}
