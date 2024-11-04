import { useState } from 'react';
import './App.css';
import { Task, TaskStatus } from './App.type';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');

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
            .filter((task) => task.status === TaskStatus.Todo)
            .map((task) => (
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
