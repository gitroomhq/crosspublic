import { Module } from '@nestjs/common';
import {FaqService} from "@crosspublic/database/src/faq/faq.service";
import {FaqRepository} from "@crosspublic/database/src/faq/faq.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [FaqService, FaqRepository],
  get exports() {
    return this.providers;
  }
})
export class FaqModule {}
