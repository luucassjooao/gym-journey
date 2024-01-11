import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MuscleExerciseSeed } from 'seed/muscle-exercise.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const seeding = app.get(MuscleExerciseSeed);
  await seeding.verifyIfSeedIsCreated();

  await app.listen(3000);
}
bootstrap();
