import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';
import { Task, TaskStatus } from './App.type';
import { getTasks } from './api/tasks';
import { useSort, sortFunctions } from './hooks/useSort';
import { AddTaskForm } from './components/AddTaskForm';
import { TodoList } from './components/TodoList';
import { DEFAULT_LISTS } from './constants/lists';
import ListSelector from './components/ListSelector';

function App() {
  const queryClient = useQueryClient();
  const [selectedListId, setSelectedListId] = useState(DEFAULT_LISTS[0].id);

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const selectedList = DEFAULT_LISTS.find(
    (list) => list.id === selectedListId,
  )!;
  const filteredTasks = tasks.filter((task) => task.listId === selectedListId);

  const {
    sortedItems: sortedTasks,
    sortDirection,
    toggleSort,
  } = useSort<Task>(filteredTasks, {
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
      listId: selectedListId,
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
    <main>
      <h1>ToDo App</h1>

      <ListSelector
        lists={DEFAULT_LISTS}
        selectedListId={selectedListId}
        onSelectList={setSelectedListId}
      />

      <AddTaskForm onAdd={handleAddTask} />

      <div className="sort-control">
        <button onClick={() => toggleSort('createdAt')}>
          Sort by date {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <TodoList
        list={selectedList}
        tasks={sortedTasks}
        onMarkDone={handleMarkAsDone}
        onMarkUndone={handleMarkAsUndone}
      />
    </main>
  );
}

export default App;
