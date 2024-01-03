import { Module } from '@nestjs/common';
import { PrismaService } from './shared/database/prisma.service';
import { DatabseModule } from './shared/database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { MuscleExerciseSeed } from 'seed/muscle-exercise.seed';
import { MuscleGroupsModule } from './module/muscle-groups/muscle-groups.module';
import { SessionsModule } from './module/session/session.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './module/auth/auth.guard';

@Module({
  imports: [DatabseModule, AuthModule, MuscleGroupsModule, SessionsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PrismaService,
    MuscleExerciseSeed,
  ],
})
export class AppModule {}
