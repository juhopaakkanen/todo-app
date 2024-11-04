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
