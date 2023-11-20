import { Module } from '@nestjs/common';
import {CategoryService} from "@meetqa/database/src/categories/category.service";
import {CategoryRepository} from "@meetqa/database/src/categories/category.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [CategoryService, CategoryRepository],
  get exports() {
    return this.providers;
  }
})
export class CategoryModule {}
