import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Task, TaskStatus } from './types';
import { getTasks } from './api/tasks';
import { AddTaskForm } from './components/AddTaskForm';
import { ListSelector } from './components/ListSelector';
import { SortButton } from './components/SortButton';
import { TodoList } from './components/TodoList';
import { DEFAULT_LISTS } from './constants/lists';
import { useSort, sortFunctions } from './hooks/useSort';
import { SORT_DIRECTION } from './constants';

function App() {
  const queryClient = useQueryClient();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const filteredTasks = selectedListId
    ? tasks.filter((task) => task.listId === selectedListId)
    : tasks;

  const {
    sortedItems: sortedTasks,
    sortDirection,
    toggleSort,
  } = useSort<Task>(filteredTasks, {
    initialSortBy: 'createdAt',
    initialDirection: SORT_DIRECTION.ASC,
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
      listId: selectedListId ?? DEFAULT_LISTS[0].id,
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

  const listsToShow = selectedListId
    ? [DEFAULT_LISTS.find((list) => list.id === selectedListId)!]
    : DEFAULT_LISTS;

  return (
    <main>
      <h1>ToDo App</h1>

      <ListSelector
        lists={DEFAULT_LISTS}
        selectedListId={selectedListId}
        onSelectList={setSelectedListId}
      />

      {selectedListId ? (
        <AddTaskForm onAdd={handleAddTask} />
      ) : (
        <p className="helper-text">Select a list from above to add new tasks</p>
      )}

      <SortButton
        sortDirection={sortDirection}
        onSort={() => toggleSort('createdAt')}
        label="Sort list items by date"
      />

      <div className="lists-grid">
        {listsToShow.map((list) => (
          <TodoList
            key={list.id}
            list={list}
            tasks={sortedTasks.filter((task) => task.listId === list.id)}
            onMarkDone={handleMarkAsDone}
            onMarkUndone={handleMarkAsUndone}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
