import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchTerm } from './interfaces/search-term.interface';
import { PrismaService } from 'src/db/prisma.service';
import { hashSync } from 'bcryptjs';


//Customize as needed
@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService
  ) { }
/*
  Create a new user after checking for existing email.
  Hashes the password before storing.
    - @params createUserDto - Data Transfer Object containing user details
    - @returns The newly created user without the password field
    - @throws ConflictException if a user with the given email already exists
*/

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;

    const userExists = await this.findOneByFilter({ email });

    if (userExists) {
      throw new ConflictException("User already exists");
    }

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashSync(password, 10),
        ...rest
      },
      omit: { password: true }
    });


    return newUser;
  }

  async findOneByFilter(...filters: SearchTerm[]) {

    const user = await this.prisma.user.findFirst({
      where: {
        OR: filters
      },

    });

    return user;
  }


}
