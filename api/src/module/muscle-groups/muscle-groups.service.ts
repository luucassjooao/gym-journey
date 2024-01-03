import { Injectable } from '@nestjs/common';
import { MuscleGroupRepository } from 'src/shared/database/repositories/muscle-group.repositories';

@Injectable()
export class MuscleGroupsService {
  constructor(private readonly muscleGroupRepo: MuscleGroupRepository) {}

  findAll() {
    return this.muscleGroupRepo.findMany({});
  }

  findOne(id: string) {
    return this.muscleGroupRepo.findUnique({
      where: {
        id,
      },
      select: {
        exercises: true,
        id: true,
        media: true,
        name: true,
      },
    });
  }
}
