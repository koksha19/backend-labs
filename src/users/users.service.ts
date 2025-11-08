import { Injectable, NotFoundException } from '@nestjs/common';

export type User = { id: number; name: string };

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(name: string): User {
    const user = { id: this.nextId++, name };
    this.users.push(user);

    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex((x) => x.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
  }
}
