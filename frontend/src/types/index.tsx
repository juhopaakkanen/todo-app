import { SORT_DIRECTION } from '../constants';

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

export type SortDirection =
  (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];
