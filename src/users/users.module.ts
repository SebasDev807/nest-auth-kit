import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [
    //avoid circular dependency: auth.module.ts <-> users.module.ts
    forwardRef(() => AuthModule),
  ],
})
export class UsersModule {}
