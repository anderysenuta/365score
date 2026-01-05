import { format } from 'node-pg-format';
import { getPool } from '../../../services/postgres/postgres.service';
import { insertUserQuery } from './create-user.sql';
import type { User } from './create-user.types';

export const createUserService = async (name: string): Promise<User> => {
  const pool = getPool();
  const { rows } = await pool.query<User>(format(insertUserQuery, [name]));

  return rows[0];
};
