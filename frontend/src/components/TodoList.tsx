import { Task, TaskStatus, TodoListType } from '../App.type';
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
    <div className="todo-lists">
      <h2>{list.name}</h2>
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
    </div>
  );
}
