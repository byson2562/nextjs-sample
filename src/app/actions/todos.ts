'use server'

import { revalidatePath } from 'next/cache'
import { createTodo, toggleTodo, deleteTodo } from '@/lib/dal/todos'

export async function addTodoAction(formData: FormData) {
  const title = formData.get('title')
  if (typeof title !== 'string' || title.trim() === '') return
  await createTodo(title.trim())
  revalidatePath('/')
}

export async function toggleTodoAction(id: number, done: boolean) {
  await toggleTodo(id, done)
  revalidatePath('/')
}

export async function deleteTodoAction(id: number) {
  await deleteTodo(id)
  revalidatePath('/')
}
