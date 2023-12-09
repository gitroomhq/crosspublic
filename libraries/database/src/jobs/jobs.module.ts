import { Module } from '@nestjs/common';
import {JobsService} from "@crosspublic/database/src/jobs/jobs.service";
import {JobsRepository} from "@crosspublic/database/src/jobs/jobs.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [JobsService, JobsRepository],
  get exports() {
    return this.providers;
  }
})
export class JobsModule {}
