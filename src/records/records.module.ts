import { Module } from '@nestjs/common';
import { RecordService } from './records.service';
import { RecordController } from './records.controller';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordsModule {}
