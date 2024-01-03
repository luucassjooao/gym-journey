import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repositories';
import { MuscleGroupRepository } from './repositories/muscle-group.repositories';
import { SessionRepository } from './repositories/session.repositories';
import { ExerciseRepository } from './repositories/exercise.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    MuscleGroupRepository,
    SessionRepository,
    ExerciseRepository,
  ],
  exports: [
    UserRepository,
    MuscleGroupRepository,
    ExerciseRepository,
    SessionRepository,
  ],
})
export class DatabseModule {}
