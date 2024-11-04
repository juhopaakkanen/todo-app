import { Task, TaskStatus } from '../App.type';

interface TaskListProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onStatusChange: (id: number) => void;
  buttonText: string;
}

export function TaskList({
  title,
  tasks,
  status,
  onStatusChange,
  buttonText,
}: TaskListProps) {
  return (
    <>
      <h3>{title}</h3>
      <table className="taskItems">
        <tbody>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => onStatusChange(task.id)}>
                    {buttonText}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
