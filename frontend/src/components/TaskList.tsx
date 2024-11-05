import { Task, TaskStatus } from '../types';

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
  const filteredTasks = tasks.filter((task) => task.status === status);
  const hasNoTasks = filteredTasks.length === 0;
  const isDoneList = status === TaskStatus.Done;

  return (
    <section className="task-list">
      <h3>{title}</h3>
      {hasNoTasks ? (
        <p className="empty-state">
          {isDoneList ? 'Get to work!' : 'Excellent! All tasks are done!'}
        </p>
      ) : (
        <table className="task-items">
          <tbody>
            {filteredTasks.map((task) => (
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
      )}
    </section>
  );
}
