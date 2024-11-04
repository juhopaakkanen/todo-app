import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

export const sortFunctions = {
  date:
    (key: string) =>
    <T extends Record<string, any>>(a: T, b: T, direction: SortDirection) => {
      const aDate = new Date(a[key]);
      const bDate = new Date(b[key]);
      return direction === 'asc'
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    },
  default:
    (key: string) =>
    <T extends Record<string, any>>(a: T, b: T, direction: SortDirection) => {
      const aValue = a[key];
      const bValue = b[key];
      return direction === 'asc'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
          ? 1
          : -1;
    },
};

type SortFunction<T> = (a: T, b: T, direction: SortDirection) => number;

interface SortOptions<T> {
  initialSortBy?: string | null;
  initialDirection?: SortDirection;
  customSortFns?: Record<string, SortFunction<T>>;
}

export function useSort<T extends Record<string, any>>(
  items: T[],
  {
    initialSortBy = null,
    initialDirection = 'asc',
    customSortFns = {},
  }: SortOptions<T> = {},
) {
  const [sortBy, setSortBy] = useState<string | null>(initialSortBy);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialDirection);

  const sortedItems = useMemo(() => {
    if (!items || !sortBy) return items;

    return [...items].sort((a, b) => {
      if (customSortFns[sortBy]) {
        return customSortFns[sortBy](a, b, sortDirection);
      }
      return sortFunctions.default(sortBy)(a, b, sortDirection);
    });
  }, [items, sortBy, sortDirection, customSortFns]);

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  return {
    sortBy,
    sortDirection,
    sortedItems,
    toggleSort,
  };
}
