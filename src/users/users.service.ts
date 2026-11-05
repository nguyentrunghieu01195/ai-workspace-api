import { Injectable, NotFoundException } from '@nestjs/common';


export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      role: 'ADMIN',
    },
    {
      id: '2',
      email: 'user@example.com',
      role: 'USER',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
