import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordsModule } from './records/records.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RecordController } from "./records/records.controller";
import { CategoryController } from "./categories/categories.controller";
import { RecordService } from "./records/records.service";
import { CategoryService } from "./categories/categories.service";

@Module({
  imports: [UsersModule, CategoriesModule, RecordsModule, PrismaModule],
  controllers: [AppController, UserController, CategoryController, RecordController],
  providers: [AppService, UserService, PrismaService, CategoryService, RecordService],
})
export class AppModule {}
