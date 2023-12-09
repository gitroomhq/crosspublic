import { Module } from '@nestjs/common';
import {CategoryService} from "@crosspublic/database/src/categories/category.service";
import {CategoryRepository} from "@crosspublic/database/src/categories/category.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [CategoryService, CategoryRepository],
  get exports() {
    return this.providers;
  }
})
export class CategoryModule {}
