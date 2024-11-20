import { nanoid } from 'nanoid';

const USER_ID_KEY = 'userId' as const;

export const getStoredId = (): string => localStorage.getItem(USER_ID_KEY) ?? '';
export const setStoredId = (id: string): void => localStorage.setItem(USER_ID_KEY, id);

export const getOrCreateId = (): string => {
  const savedId = getStoredId();
  if (savedId) return savedId;

  const newId = nanoid();
  setStoredId(newId);
  return newId;
};
