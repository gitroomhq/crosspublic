import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JobsRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'jobs'>,
  ) {
  }
  insertJob(organizationId: string, referenceId: string, messages: object) {
    return this._prisma.model.jobs.create({
      data: {
        messageContent: messages,
        referenceId,
        organizationId,
        state: 'PENDING'
      }
    })
  }

  getJobById(organizationId: string, id: string) {
    return this._prisma.model.jobs.findFirst({
      where: {
        organizationId,
        id
      }
    });
  }
}
