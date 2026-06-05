import TodoPusher from '@/app/todo/TodoPusher'
import TodoList from '@/app/todo/TodoList'

export default async function Todo({
  apiUrl
}: {
  apiUrl: string
}) {
  const response = await fetch(`${apiUrl}/items`)
  const data = await response.json()

  return (
    <>
      <TodoPusher data={data} apiUrl={apiUrl} />
      <TodoList data={data} apiUrl={apiUrl} />
    </>
  )
}
