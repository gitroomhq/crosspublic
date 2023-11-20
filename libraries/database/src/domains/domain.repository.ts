import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DomainRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'domains'>,
  ) {
  }

  totalDomainsByOrganizationId(organizationId: string) {
    return this._prisma.model.domains.count({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }
}
