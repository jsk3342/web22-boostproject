import { MemoryDbDto } from '../dto/memoryDbDto';

export function getRandomElementsFromArray(array: Array<MemoryDbDto>, n: number) {
  if (n >= array.length) {
    return [...array]; 
  }

  const result = [];
  const usedIndices = new Set();
  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(randomIndex)) {
      result.push(array[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return result;
}