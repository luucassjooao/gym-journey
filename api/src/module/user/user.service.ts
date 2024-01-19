import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UserService {
  constructor(private readonly usersRepo: UserRepository) {}

  async getUserInfo(id: string) {
    const getUserInfo = await this.usersRepo.findUnique({
      where: {
        id,
      },
    });

    delete getUserInfo.password;

    return getUserInfo;
  }
}
