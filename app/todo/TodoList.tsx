import TodoListItem from './TodoListItem'

interface getTodos {
  id: number,
  name: string,
  isCompleted: boolean
}

export default function TodoList({
  data,
  apiUrl
}: {
  data: getTodos[],
  apiUrl: string
}) {
  // data 할 일과 끝낸 일 분류
  const todoItems = data.filter((item: getTodos) => item.isCompleted === false)
  const doneItems = data.filter((item: getTodos) => item.isCompleted === true)

  return (
    <>
      <div>
        <div className="wrapper flex flex-col md:flex-row justify-between gap-12 md:gap-6 pb-12">
          <TodoListItem
            type="todo"
            data={todoItems}
            apiUrl={apiUrl}
          />

          <TodoListItem
            type="done"
            data={doneItems}
            apiUrl={apiUrl}
          />
        </div>
      </div>
    </>
  );
}
