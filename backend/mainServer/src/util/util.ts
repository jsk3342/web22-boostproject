import { fromLiveCurationDto } from '../dto/liveCurationDto.js';
import { MemoryDbDto } from '../dto/memoryDbDto';

export function getRandomElementsFromArray(array: Array<MemoryDbDto>, n: number) {
  if (n >= array.length) {
    return array.map((info) => fromLiveCurationDto(info)); 
  }

  const result = [];
  const usedIndices = new Set();
  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(randomIndex)) {
      const liveCurationDto = fromLiveCurationDto(array[randomIndex])
      result.push(liveCurationDto);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}