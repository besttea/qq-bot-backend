import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeworksService {
  async create(data: any) {
    return { message: 'create homework', data };
  }

  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return { id };
  }

  async update(id: string, data: any) {
    return { message: 'update homework', id, data };
  }

  async remove(id: string) {
    return { message: 'remove homework', id };
  }
}
