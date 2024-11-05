import { Task } from '../types';

const API_URL = 'http://localhost:3000';

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
