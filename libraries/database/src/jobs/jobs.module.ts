import { Module } from '@nestjs/common';
import {JobsService} from "@meetfaq/database/src/jobs/jobs.service";
import {JobsRepository} from "@meetfaq/database/src/jobs/jobs.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [JobsService, JobsRepository],
  get exports() {
    return this.providers;
  }
})
export class JobsModule {}
