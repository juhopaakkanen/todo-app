import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './App.css';
import { Task, TaskStatus } from './App.type';
import { getTasks } from './api/tasks';

function App() {
  const [newTaskName, setNewTaskName] = useState<string>('');

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  const addTask = () => {
    // TODO: add implementation
  };

  const markAsDone = (id: number) => {
    // TODO: add implementation
  };

  const markAsUndone = (id: number) => {
    // TODO: add implementation
  };

  return (
    <div>
      <h2>ToDo App</h2>
      <div className="addNewTask">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <h3>Tasks</h3>
      <table className="taskItems">
        <tbody>
          {tasks
            .filter((task: Task) => task.status === TaskStatus.Todo)
            .map((task: Task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => markAsDone(task.id)}>
                    Mark as done
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Done</h3>
      <table className="taskItems">
        <tbody>
          {tasks
            .filter((task) => task.status === TaskStatus.Done)
            .map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => markAsUndone(task.id)}>
                    Mark as undone
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
