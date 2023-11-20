import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetqa/validators/src/organizations/organization.create.validator";

@Injectable()
export class OrganizationRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'organization'>,
  ) {
  }
  getOrgById(id: string) {
    return this._prisma.model.organization.findUnique({
      where: {
        id
      }
    });
  }
  async getOrCreateOrg(body: OrganizationCreateValidator) {
    const {guildId, serverName} = body;
    const org = await this._prisma.model.organization.findUnique({
      where: {
        guildId
      }
    });

    return org ? org : await this._prisma.model.organization.create({
      data: {
        stripeCustomerId: '',
        guildId,
        subDomain: serverName
      }
    });
  }
}
