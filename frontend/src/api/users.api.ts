import { fetchAPI } from './client';
import type { User, CreateUserInput } from './types';

export const usersAPI = {
  getUser: (id: string) => fetchAPI<User>(`/users/${id}`),

  createUser: (data: CreateUserInput) =>
    fetchAPI<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  listUsers: () => fetchAPI<User[]>('/users'),
};