import { useState, useMemo } from 'react';
import { SortDirection } from '../types';
import { SORT_DIRECTION } from '../constants';

type SortFunction<T> = (a: T, b: T, direction: SortDirection) => number;

interface SortOptions<T> {
  initialSortBy?: string | null;
  initialDirection?: SortDirection;
  customSortFns?: Record<string, SortFunction<T>>;
}

export const sortFunctions = {
  date:
    (key: string) =>
    <T extends Record<string, any>>(a: T, b: T, direction: SortDirection) => {
      const aDate = new Date(a[key]);
      const bDate = new Date(b[key]);
      return direction === SORT_DIRECTION.ASC
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    },
  default:
    (key: string) =>
    <T extends Record<string, any>>(a: T, b: T, direction: SortDirection) => {
      const aValue = a[key];
      const bValue = b[key];
      return direction === SORT_DIRECTION.ASC
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
          ? 1
          : -1;
    },
};

export function useSort<T extends Record<string, any>>(
  items: T[],
  {
    initialSortBy = null,
    initialDirection = SORT_DIRECTION.ASC,
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
      setSortDirection((prev) =>
        prev === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC,
      );
    } else {
      setSortBy(column);
      setSortDirection(SORT_DIRECTION.ASC);
    }
  };

  return {
    sortBy,
    sortDirection,
    sortedItems,
    toggleSort,
  };
}
