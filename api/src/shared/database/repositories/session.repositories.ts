import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.SessionCreateArgs) {
    return this.prismaService.session.create(createDto);
  }

  findMany(findManyDto: Prisma.SessionFindManyArgs) {
    return this.prismaService.session.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.SessionFindUniqueArgs) {
    return this.prismaService.session.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.SessionUpdateArgs) {
    return this.prismaService.session.update(updateDto);
  }
}
