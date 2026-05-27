import { db } from '@/lib/db'

export type Todo = {
  id: number
  title: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getTodos(): Promise<Todo[]> {
  return db.todo.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getTodoById(id: number): Promise<Todo | null> {
  return db.todo.findUnique({ where: { id } })
}

export async function createTodo(title: string): Promise<Todo> {
  return db.todo.create({ data: { title } })
}

export async function toggleTodo(id: number, done: boolean): Promise<Todo> {
  return db.todo.update({ where: { id }, data: { done } })
}

export async function deleteTodo(id: number): Promise<void> {
  await db.todo.delete({ where: { id } })
}
