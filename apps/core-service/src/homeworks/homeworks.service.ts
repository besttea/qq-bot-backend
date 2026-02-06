import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@ZKLib/database';

@Injectable()
export class HomeworksService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: any) {
    return this.prisma.client.homework.create({ data });
  }

  async findAll() {
    return this.prisma.client.homework.findMany({
      orderBy: { created_at: 'desc' },
      include: { class: true },
    });
  }

  async findOne(id: string) {
    const homework = await this.prisma.client.homework.findUnique({
      where: { id },
      include: { class: true, submissions: true },
    });
    if (!homework) throw new NotFoundException(`Homework #${id} not found`);
    return homework;
  }

  async update(id: string, data: any) {
    await this.findOne(id); // Ensure exists
    return this.prisma.client.homework.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure exists
    // Soft delete logic can be added here if needed, for now hard delete
    return this.prisma.client.homework.delete({ where: { id } });
  }
}
