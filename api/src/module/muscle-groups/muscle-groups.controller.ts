import { Controller, Get, Param } from '@nestjs/common';
import { MuscleGroupsService } from './muscle-groups.service';
import { isPublic } from 'src/shared/decorators/IsPublic';
import { ParseArrayUUIDPipe } from 'src/shared/pipes/ParseArrayUUIDPipe';

@isPublic()
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

  @Get('multiple/:ids')
  async selectedMusclesGroups(@Param('ids', ParseArrayUUIDPipe) ids: string[]) {
    const fd = await this.muscleGroupsService.selectedMuscles(ids);
    return fd;
  }
}
