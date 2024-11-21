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
      const liveCurationDto = fromLiveCurationDto(array[randomIndex]);
      result.push(liveCurationDto);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

export function decodeBase64Image(base64Data: string): { buffer: Buffer; fileType: string } {
  try {
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid Base64 data');
    }

    const fileType = matches[1].split('/')[1]; // ex) jpeg
    const imageData = matches[2];
    const buffer = Buffer.from(imageData, 'base64');

    return { buffer: buffer, fileType: fileType };
  } catch (error) {
    console.error('Error saving Base64 image:', error);
    throw error;
  }
}
