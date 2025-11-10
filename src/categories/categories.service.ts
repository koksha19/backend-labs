import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const isGlobal = !dto.userId;
    return this.prisma.category.create({
      data: {
        name: dto.name,
        isGlobal,
        userId: dto.userId ?? null,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findByUser(userId: number) {
    return this.prisma.category.findMany({
      where: {
        OR: [
          { isGlobal: true },
          { userId },
        ],
      },
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.category.delete({ where: { id } });
  }
}
