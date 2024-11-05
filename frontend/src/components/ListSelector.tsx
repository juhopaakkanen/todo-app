import { TodoListType } from '../types';

interface ListSelectorProps {
  lists: TodoListType[];
  selectedListId: number | null;
  onSelectList: (listId: number | null) => void;
}

export function ListSelector({
  lists,
  selectedListId,
  onSelectList,
}: ListSelectorProps) {
  return (
    <div className="list-selector">
      <label htmlFor="list-select">Select List:</label>
      <select
        id="list-select"
        value={selectedListId ?? 'all'}
        onChange={(e) =>
          onSelectList(e.target.value === 'all' ? null : Number(e.target.value))
        }
      >
        <option value="all">All Lists</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
    </div>
  );
}
