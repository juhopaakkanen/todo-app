import { Injectable } from '@nestjs/common';
import { AddTaskDto, Task, TaskStatus, UpdateTaskDto } from './task.type';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Vacuum the living room',
      status: TaskStatus.Todo,
      createdAt: '2024-10-30T12:00:00.000Z',
      listId: 1,
    },
    {
      id: 2,
      name: 'Dust the kitchen',
      status: TaskStatus.Todo,
      createdAt: '2024-10-30T10:00:00.000Z',
      listId: 1,
    },
    {
      id: 3,
      name: 'Take out the trash',
      status: TaskStatus.Done,
      createdAt: '2024-10-30T08:00:00.000Z',
      listId: 1,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: AddTaskDto): void {
    console.log('addTask called');
    // TODO: add implementation, if you chose to implement the backend functionality
  }

  updateTask(id: number, task: UpdateTaskDto): void {
    console.log('updateTask called');
    // TODO: add implementation, if you chose to implement the backend functionality
  }
}
