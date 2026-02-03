import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class ExampleService {



  publicRoute() {
    return `This action returns public route, No authentication required.`;
  }

  protectedRoute(user: User) {

    const { password: _, ...safeUser } = user;

    return {
      message: 'This action returns protected example, authentication successful.',
      user: safeUser,
    };
    
  }


}
