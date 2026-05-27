'use client'

import { addTodoAction } from '@/app/actions/todos'
import { useRef } from 'react'

export function TodoForm() {
  const ref = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    await addTodoAction(formData)
    ref.current?.reset()
  }

  return (
    <form ref={ref} action={handleSubmit} className="flex gap-2 mb-6">
      <input
        name="title"
        type="text"
        placeholder="新しいタスクを入力..."
        required
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
      >
        追加
      </button>
    </form>
  )
}
