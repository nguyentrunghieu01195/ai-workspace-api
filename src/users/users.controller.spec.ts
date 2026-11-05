import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

describe('UsersController', () => {
  let controller: UsersController;
  const usersService = { findAll: vi.fn(), findById: vi.fn() };

  beforeEach(async () => {
    usersService.findAll.mockReset();
    usersService.findById.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll delegates to UsersService', () => {
    usersService.findAll.mockReturnValue([]);

    expect(controller.findAll()).toEqual([]);
    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('findById delegates to UsersService', () => {
    const user = { id: '2', email: 'user@example.com', role: 'USER' };
    usersService.findById.mockReturnValue(user);

    expect(controller.findById('2')).toBe(user);
    expect(usersService.findById).toHaveBeenCalledWith('2');
  });
});
