import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = { findById: vi.fn() };

  beforeEach(async () => {
    usersService.findById.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('looks up the user through UsersService', () => {
    const user = { id: '1', email: 'admin@example.com', role: 'ADMIN' };
    usersService.findById.mockReturnValue(user);

    expect(service.getUser('1')).toBe(user);
    expect(usersService.findById).toHaveBeenCalledWith('1');
  });
});
