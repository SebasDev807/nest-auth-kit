import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { AuthModule } from 'src/auth/auth.module';

/**
 * These files show how to use authentication and authorization in a NestJS application.
 * The ExampleModule encapsulates the ExampleService and ExampleController.
 */
@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
  imports: [AuthModule],
})
export class ExampleModule { }
