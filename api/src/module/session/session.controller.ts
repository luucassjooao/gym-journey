import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SessionsService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { ParseArrayUUIDPipe } from 'src/shared/pipes/ParseArrayUUIDPipe';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':muscleGroupId')
  create(
    @ActiveUserId() userId: string,
    @Param('muscleGroupId', ParseArrayUUIDPipe) muscleGroupId: string[],
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create(userId, muscleGroupId, createSessionDto);
  }

  @Get()
  findAllMyOwnSessions(@ActiveUserId() userId: string) {
    return this.sessionsService.findAllMyOwnSessions(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Get('getLatestSessions/:muscleGroupsIds')
  getLatestSessions(
    @ActiveUserId() userId: string,
    @Param('muscleGroupsIds', ParseArrayUUIDPipe) muscleGroupsIds: string[],
  ) {
    return this.sessionsService.getLatestSessions(userId, muscleGroupsIds);
  }

  @Put(':id')
  updateSeriesInformation(
    @ActiveUserId() userId: string,
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.updateSeriesInformation(
      userId,
      id,
      updateSessionDto,
    );
  }
}
