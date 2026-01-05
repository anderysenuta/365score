import { usersAPI } from '../api/users.api';
import { useFetch } from './useFetch';
import type { CreateUserInput } from '../api/types';

// GET: Get single user
export function useUser(id: string) {
  return useFetch(() => usersAPI.getUser(id), { enabled: true });
}

// GET: List users
export function useUsers() {
  return useFetch(() => usersAPI.listUsers(), { enabled: true });
}

// POST: Create user
export function useCreateUser() {
  return useFetch((data: CreateUserInput) => usersAPI.createUser(data));
}