export interface TodoListType {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  createdAt: string;
  listId: number;
}

export enum TaskStatus {
  Todo = 'todo',
  Done = 'done',
}
