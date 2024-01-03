import { Module } from '@nestjs/common';
import { PrismaService } from './shared/database/prisma.service';
import { DatabseModule } from './shared/database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { MuscleExerciseSeed } from 'seed/muscle-exercise.seed';
import { MuscleGroupsModule } from './module/muscle-groups/muscle-groups.module';

@Module({
  imports: [DatabseModule, AuthModule, MuscleGroupsModule],
  controllers: [],
  providers: [PrismaService, MuscleExerciseSeed],
})
export class AppModule {}
