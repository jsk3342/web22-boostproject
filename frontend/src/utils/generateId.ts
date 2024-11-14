// utils/generateId.js (또는 utils/nanoid.js)
import { nanoid } from 'nanoid';

export const generateId = (key = 'userId') => {
  const savedId = localStorage.getItem(key);

  if (savedId) {
    return savedId;
  }

  const newId = nanoid();
  localStorage.setItem(key, newId);
  return newId;
};
