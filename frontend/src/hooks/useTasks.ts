import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Task, TaskStatus } from '../types';
import { getTasks } from '../api/tasks';

export function useTasks() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const addTask = useMutation({
    mutationFn: (payload: { name: string; listId: number }) => {
      const newTask: Task = {
        id: Date.now() + Math.floor(Math.random() * 1000), // mock
        name: payload.name,
        status: TaskStatus.Todo,
        createdAt: new Date().toISOString(), // mock
        listId: payload.listId,
      };
      // TODO: API call
      return Promise.resolve(newTask);
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks: Task[] = []) => [
        ...oldTasks,
        newTask,
      ]);
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: (payload: { id: number; status: TaskStatus }) => {
      // TODO: API call
      return Promise.resolve(payload);
    },
    onSuccess: (payload) => {
      queryClient.setQueryData(['tasks'], (oldTasks: Task[] = []) =>
        oldTasks.map((task) =>
          task.id === payload.id ? { ...task, status: payload.status } : task,
        ),
      );
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTaskStatus,
  };
}
