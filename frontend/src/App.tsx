import { useQuery, useQueryClient } from '@tanstack/react-query';
import './App.css';
import { Task, TaskStatus } from './App.type';
import { getTasks } from './api/tasks';
import { useSort, sortFunctions } from './hooks/useSort';
import { AddTaskForm } from './components/AddTaskForm';
import { TodoList } from './components/TodoList';

function App() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const {
    sortedItems: sortedTasks,
    sortDirection,
    toggleSort,
  } = useSort<Task>(tasks, {
    initialSortBy: 'createdAt',
    initialDirection: 'desc',
    customSortFns: {
      createdAt: sortFunctions.date('createdAt'),
    },
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  const handleAddTask = (taskName: string) => {
    const newTask: Task = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: taskName,
      status: TaskStatus.Todo,
      createdAt: new Date().toISOString(),
      listId: 1,
    };

    queryClient.setQueryData(['tasks'], (oldTasks: Task[] = []) => [
      ...oldTasks,
      newTask,
    ]);
  };

  const handleMarkAsDone = (id: number) => {
    queryClient.setQueryData(['tasks'], (oldTasks: Task[] = []) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, status: TaskStatus.Done } : task,
      ),
    );
  };

  const handleMarkAsUndone = (id: number) => {
    queryClient.setQueryData(['tasks'], (oldTasks: Task[] = []) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, status: TaskStatus.Todo } : task,
      ),
    );
  };

  return (
    <div>
      <h2>ToDo App</h2>
      <AddTaskForm onAdd={handleAddTask} />

      <div className="sort-control">
        <button onClick={() => toggleSort('createdAt')}>
          Sort by date {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <TodoList
        list={{ id: 1, name: 'Personal' }}
        tasks={sortedTasks}
        onMarkDone={handleMarkAsDone}
        onMarkUndone={handleMarkAsUndone}
      />
    </div>
  );
}

export default App;
