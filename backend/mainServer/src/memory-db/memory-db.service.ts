import { Injectable } from '@nestjs/common';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

@Injectable()
export class MemoryDBService {
  private db: MemoryDbDto[] = [];

  findAll(): MemoryDbDto[] {
    return this.db;
  }

  findById(id: string | number): MemoryDbDto | undefined {
    return this.db.find(item => item.id === id);
  }

  create(item: Partial<MemoryDbDto>): void {
    // Create a new MemoryDbDto instance with the provided item
    const newItem = new MemoryDbDto(item);
    this.db.push(newItem);
  }

  update(id: string | number, updatedItem: Partial<MemoryDbDto>): boolean {
    const index = this.db.findIndex(item => item.id === id);
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
  private readonly databases = new Map<Function, any>();

  register(target: Function, service: MemoryDBService): void {
    this.databases.set(target, service);
  }

  get(target: Function): MemoryDBService | undefined {
    return this.databases.get(target);
  }
}
