import { TodoListType } from '../types';

interface ListSelectorProps {
  lists: TodoListType[];
  selectedListId: number;
  onSelectList: (listId: number) => void;
}

export const ListSelector = ({
  lists,
  selectedListId,
  onSelectList,
}: ListSelectorProps) => {
  return (
    <div className="list-selector">
      <label htmlFor="list-select">Select List:</label>
      <select
        id="list-select"
        value={selectedListId}
        onChange={(e) => onSelectList(Number(e.target.value))}
      >
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
    </div>
  );
};
