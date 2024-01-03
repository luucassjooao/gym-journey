import { Module } from '@nestjs/common';
import { PrismaService } from './shared/database/prisma.service';
import { DatabseModule } from './shared/database/database.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [DatabseModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
