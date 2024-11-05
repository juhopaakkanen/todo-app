import { useState } from 'react';

interface AddTaskFormProps {
  onAdd: (taskName: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [newTaskName, setNewTaskName] = useState('');

  const handleAdd = () => {
    if (newTaskName.trim()) {
      onAdd(newTaskName);
      setNewTaskName('');
    }
  };

  return (
    <div className="add-new-task">
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
