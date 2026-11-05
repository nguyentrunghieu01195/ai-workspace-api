import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }
}
