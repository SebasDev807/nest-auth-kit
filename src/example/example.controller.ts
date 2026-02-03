import { Controller, Get, Body } from '@nestjs/common';
import { ExampleService } from './example.service';
import { type User } from '../users/interfaces/user.interface';
import { Auth, GetUser } from 'src/auth/decorators';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) { }

  @Get('public')
  publicRoute() {
    return this.exampleService.publicRoute();
  }

  @Auth()
  @Get('protected')
  protectedRoute(
    @GetUser() user: User,
  ) {
    return this.exampleService.protectedRoute(user);
  }
}
