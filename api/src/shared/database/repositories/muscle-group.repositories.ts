import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MuscleGroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique(findUniqueDto: Prisma.MuscleGroupFindUniqueArgs) {
    return this.prismaService.muscleGroup.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.MuscleGroupFindManyArgs) {
    return this.prismaService.muscleGroup.findMany(findManyDto);
  }
}
