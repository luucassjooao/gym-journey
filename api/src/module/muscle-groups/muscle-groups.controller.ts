import { Controller, Get, Param } from '@nestjs/common';
import { MuscleGroupsService } from './muscle-groups.service';

@Controller('muscleGroups')
export class MuscleGroupsController {
  constructor(private readonly muscleGroupsService: MuscleGroupsService) {}

  @Get()
  findAll() {
    return this.muscleGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.muscleGroupsService.findOne(id);
  }
}
