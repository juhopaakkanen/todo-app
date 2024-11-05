import { SORT_DIRECTION } from '../constants';
import { SortDirection } from '../types';

interface SortButtonProps {
  sortDirection: SortDirection;
  onSort: () => void;
  label: string;
}

export const SortButton = ({
  sortDirection,
  onSort,
  label,
}: SortButtonProps) => (
  <button onClick={onSort}>
    {label} {sortDirection === SORT_DIRECTION.ASC ? '↑' : '↓'}
  </button>
);
