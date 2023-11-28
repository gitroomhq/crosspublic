import { Module } from '@nestjs/common';
import {CategoryService} from "@meetfaq/database/src/categories/category.service";
import {CategoryRepository} from "@meetfaq/database/src/categories/category.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [CategoryService, CategoryRepository],
  get exports() {
    return this.providers;
  }
})
export class CategoryModule {}
