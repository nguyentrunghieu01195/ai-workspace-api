import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = { getUser: vi.fn() };

  beforeEach(async () => {
    authService.getUser.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates getUser to AuthService', () => {
    const user = { id: '1', email: 'admin@example.com', role: 'ADMIN' };
    authService.getUser.mockReturnValue(user);

    expect(controller.getUser('1')).toBe(user);
    expect(authService.getUser).toHaveBeenCalledWith('1');
  });
});
