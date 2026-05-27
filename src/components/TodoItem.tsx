'use client'

import { toggleTodoAction, deleteTodoAction } from '@/app/actions/todos'
import type { Todo } from '@/lib/dal/todos'

type Props = {
  todo: Todo
}

export function TodoItem({ todo }: Props) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => toggleTodoAction(todo.id, e.target.checked)}
        className="w-5 h-5 cursor-pointer accent-blue-500"
      />
      <span
        className={`flex-1 text-gray-800 ${
          todo.done ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodoAction(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors text-sm px-2 py-1 rounded"
      >
        削除
      </button>
    </li>
  )
}
