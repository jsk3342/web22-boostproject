import { Injectable } from '@nestjs/common';
import { MemoryDbDto } from '../dto/memoryDbDto.js';
import { getRandomElementsFromArray } from '../common/util.js';
import { fromLiveSessionDto } from '../dto/liveSessionDto.js';

@Injectable()
export class MemoryDBService {
  private db: MemoryDbDto[] = [];
  private currentId = 0;

  findAll(): MemoryDbDto[] {
    return this.db;
  }

  findById(id: number): MemoryDbDto | undefined {
    return this.db.find(item => item.id === id);
  }

  findByUserId(userId: string): MemoryDbDto | undefined {
    return this.db.find(item => item.userId === userId);
  }

  findByStreamKey(streamKey: string): MemoryDbDto | undefined {
    return this.db.find(item => item.streamKey === streamKey);
  }

  findBySessionKey(sessionKey: string): MemoryDbDto | undefined {
    return this.db.find(item => item.sessionKey === sessionKey);
  }
  
  getRandomBroadcastInfo(count: number) {
    return getRandomElementsFromArray(this.db, count);
  }

  getBroadcastInfo(size: number, id : number = 0 ) {
    const startId: number = this.db.length - id;
    if (this.db.length < 8) {
      return this.db.reverse().map((info) => fromLiveSessionDto(info));
    }
    return this.db.slice(startId - size, startId).reverse().map((info) => fromLiveSessionDto(info));
  }

  create(item: Partial<MemoryDbDto>): void {
    const newItem = new MemoryDbDto({ ...item, id: ++this.currentId });
    this.db.push(newItem);
  }

  updateByUserId(userId: string, updatedItem: Partial<MemoryDbDto>): boolean {
    const index = this.db.findIndex(item => item.userId === userId);
    if (index === -1) return false;
    this.db[index] = { ...this.db[index], ...updatedItem } as MemoryDbDto;
    return true;
  }

  updateBySessionKey(sessionKey: string, updatedItem: Partial<MemoryDbDto>): boolean {
    const index = this.db.findIndex(item => item.sessionKey === sessionKey);
    if (index === -1) return false;
    this.db[index] = { ...this.db[index], ...updatedItem } as MemoryDbDto;
    return true;
  }

  delete(id: string | number): boolean {
    const index = this.db.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.db.splice(index, 1);
    return true;
  }
}

@Injectable()
export class MemoryDBManager {
  private readonly databases = new Map<new (...args: unknown[]) => unknown, MemoryDBService>();

  register(target: new (...args: unknown[]) => unknown, service: MemoryDBService): void {
    this.databases.set(target, service);
  }

  get(target: new (...args: unknown[]) => unknown): MemoryDBService | undefined {
    return this.databases.get(target);
  }
}
