import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetqa/validators/src/organizations/organization.create.validator";
import {DomainSubDomainOrganizationValidator} from "@meetqa/validators/src/public/domain.subDomain.organization.validator";
import slugify from "slugify";

@Injectable()
export class OrganizationRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'organization'>,
    private readonly _domains: PrismaRepository<'domains'>,
  ) {
  }
  getOrgById(id: string) {
    return this._prisma.model.organization.findUnique({
      where: {
        id
      }
    });
  }

  getOrganizationDomainSubdomainByOrgId(id: string) {
    return this._prisma.model.organization.findUnique({
      where: {
        id
      },
      select: {
        subDomain: true,
        domains: {
          select: {
            domain: true
          }
        }
      }
    });
  }

  async getOrganizationByDomainSubDomain(body: DomainSubDomainOrganizationValidator) {
    if (body.domain) {
      const data = await this._domains.model.domains.findUnique({
        where: {
            domain: body.domain
        },
        select: {
          organization: {
            select: {
              apiKey: true
            }
          }
        }
      });

      return data?.organization?.apiKey || '';
    }

    const data = await this._prisma.model.organization.findUnique({
      where: {
        subDomain: body.subdomain
      },
      select: {
        apiKey: true,
        domains: {
          select: {
            domain: true
          }
        }
      }
    });

    return data?.domains?.[0]?.domain ? `https://${data?.domains?.[0]?.domain}` : data?.apiKey || '';
  }

  getOrganizationByApiKey(apiKey: string) {
    return this._prisma.model.organization.findUnique({
      where: {
        apiKey
      },
      include: {
        subscriptions: true
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
        subDomain: slugify(serverName, {lower: true, strict: true, trim: true}),
      }
    });
  }
}
