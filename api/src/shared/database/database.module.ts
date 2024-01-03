import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repositories';
import { MuscleGroupRepository } from './repositories/muscle-group.repositories';

@Global()
@Module({
  providers: [PrismaService, UserRepository, MuscleGroupRepository],
  exports: [UserRepository, MuscleGroupRepository],
})
export class DatabseModule {}
