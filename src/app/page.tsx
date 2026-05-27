// Server Component — DB から直接データを取得してレンダリング
import { getTodos } from '@/lib/dal/todos'
import { TodoForm } from '@/components/TodoForm'
import { TodoItem } from '@/components/TodoItem'

export default async function Home() {
  const todos = await getTodos()
  const doneCnt = todos.filter((t) => t.done).length

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo アプリ</h1>
        <p className="text-gray-500 mb-6 text-sm">
          {todos.length} 件中 {doneCnt} 件完了
        </p>

        {/* Client Component: フォームのインタラクション */}
        <TodoForm />

        {todos.length === 0 ? (
          <p className="text-center text-gray-400 py-12">タスクがありません</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              // Client Component: チェックボックス・削除ボタン
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
