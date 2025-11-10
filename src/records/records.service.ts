import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from '../dto/record.dto';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRecordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });

    if (!user) throw new NotFoundException('User not found');
    if (!category) throw new NotFoundException('Category not found');

    return this.prisma.record.create({ data: dto });
  }

  async findOne(id: number) {
    const record = await this.prisma.record.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }

  async findFiltered(userId?: number, categoryId?: number) {
    if (!userId && !categoryId)
      throw new BadRequestException('You must provide user_id or category_id');

    return this.prisma.record.findMany({
      where: {
        ...(userId && { userId }),
        ...(categoryId && { categoryId }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.record.delete({ where: { id } });
  }
}
