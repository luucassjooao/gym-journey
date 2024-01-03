import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExerciseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique(findUniqueDto: Prisma.ExerciseFindUniqueOrThrowArgs) {
    return this.prismaService.exercise.findUniqueOrThrow(findUniqueDto);
  }
}
