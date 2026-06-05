import Header from '@/app/components/global/Header'
import TodoPusher from '@/app/todo/TodoPusher'
import TodoList from '@/app/todo/TodoList'
import { API_URL } from '@/app/constants'

interface getTodos {
  id: number,
  name: string,
  isCompleted: boolean
}

export default async function Home() {
  const response: Response = await fetch(`${API_URL}/items`)
  const data: getTodos[] = await response.json()

  return (
    <>
      <Header />
      <TodoPusher data={data} apiUrl={API_URL} />
      <TodoList data={data} apiUrl={API_URL} />
    </>
  )
}
