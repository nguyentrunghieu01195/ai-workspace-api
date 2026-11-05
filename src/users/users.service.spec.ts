import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('return all users', () => {
    expect(service.findAll()).toHaveLength(2);
  });

  it('find admin by id', () => {
    const user = service.findById('1');
    expect(user.role).toBe('ADMIN');
  })

  it('Not found user by id', () => {
    expect(() => service.findById('3')).toThrow(NotFoundException);
  });
});
