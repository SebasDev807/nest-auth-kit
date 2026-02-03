
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { envs } from '../config';

/**
 * PrismaService extends the PrismaClient to provide database access throughout the NestJS application.
 * It configures the PrismaClient to connect to a PostgreSQL database using the connection string
 * specified in the environment variables.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
  
    const adapter = new PrismaPg({ 
        connectionString: envs.DATABASE_URL 
    });

    super({ adapter });
  }
}
