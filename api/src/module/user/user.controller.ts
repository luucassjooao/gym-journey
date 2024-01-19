import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUserInfo')
  getUserInfo(@ActiveUserId() userId: string) {
    return this.userService.getUserInfo(userId);
  }
}
