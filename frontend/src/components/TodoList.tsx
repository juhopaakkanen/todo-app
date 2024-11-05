import { Task, TodoListType, TaskStatus } from '../types';
import { TaskList } from './TaskList';

interface TodoListProps {
  list: TodoListType;
  tasks: Task[];
  onMarkDone: (id: number) => void;
  onMarkUndone: (id: number) => void;
}

export function TodoList({
  list,
  tasks,
  onMarkDone,
  onMarkUndone,
}: TodoListProps) {
  return (
    <div className="todo-list">
      <h2>{list.name}</h2>
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks, use the form above to add tasks</p>
      ) : (
        <>
          <TaskList
            title="Tasks"
            tasks={tasks}
            status={TaskStatus.Todo}
            onStatusChange={onMarkDone}
            buttonText="Mark as done"
          />

          <TaskList
            title="Done"
            tasks={tasks}
            status={TaskStatus.Done}
            onStatusChange={onMarkUndone}
            buttonText="Mark as undone"
          />
        </>
      )}
    </div>
  );
}
