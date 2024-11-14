import { nanoid } from 'nanoid';

type StorageKey = 'userId';

export const getStoredId = (key: StorageKey): string | null => localStorage.getItem(key);

export const setStoredId = (key: StorageKey, id: string): void => localStorage.setItem(key, id);

export const getOrCreateId = (key: StorageKey = 'userId'): string => {
  const savedId = getStoredId(key);
  if (savedId) return savedId;

  const newId = nanoid();
  setStoredId(key, newId);
  return newId;
};
