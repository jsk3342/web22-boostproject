import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryDBService<T> {
  private db: T[] = [];

  findAll(): T[] {
    return this.db;
  }

  findById(id: string | number): T | undefined {
    return this.db.find(item => (item as any).id === id);
  }

  create(item: T): void {
    this.db.push(item);
  }

  update(id: string | number, updatedItem: Partial<T>): boolean {
    const index = this.db.findIndex(item => (item as any).id === id);
    if (index === -1) return false;
    this.db[index] = { ...this.db[index], ...updatedItem } as T;
    return true;
  }

  delete(id: string | number): boolean {
    const index = this.db.findIndex(item => (item as any).id === id);
    if (index === -1) return false;
    this.db.splice(index, 1);
    return true;
  }
}

@Injectable()
export class MemoryDBManager {
  private readonly databases = new Map<Function, any>();

  register<T>(target: Function, service: MemoryDBService<T>): void {
    this.databases.set(target, service);
  }

  get<T>(target: Function): MemoryDBService<T> | undefined {
    return this.databases.get(target);
  }
}
