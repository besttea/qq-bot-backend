import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from './generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    console.log('Database URL:', connectionString ? 'Set' : 'Not Set');
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    this.client = new (PrismaClient as any)({ adapter });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
