import {Injectable} from "@nestjs/common";
import {JobsRepository} from "@crosspublic/database/src/jobs/jobs.repository";

@Injectable()
export class JobsService {
  constructor(
    private readonly _jobsRepository: JobsRepository
  ) {}
  insertJob(organizationId: string, referenceId: string, messages: object) {
    return this._jobsRepository.insertJob(organizationId, referenceId, messages);
  }

  getJobById(organizationId: string, id: string) {
    return this._jobsRepository.getJobById(organizationId, id);
  }
}
