import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import slugify from "slugify";

@Injectable()
export class SettingsRepository {
  constructor(
    private readonly _domains: PrismaRepository<'domains'>,
    private readonly _org: PrismaRepository<'organization'>,
  ) {
  }

  checkSubDomain(orgId: string, subDomain: string) {
    return this._org.model.organization.findFirst({
      where: {
        subDomain: slugify(subDomain, {lower: true, strict: true, trim: true}),
        id: {
          not: orgId
        }
      }
    });
  }

  async getSubDomain(orgId: string) {
    return (await this._org.model.organization.findFirst({
      where: {
        id: orgId
      },
      select: {
        subDomain: true
      }
    })) || {subDomain: ''};
  }
  getDomain(orgId: string) {
    return this._domains.model.domains.findFirst({
      where: {
        organizationId: orgId
      }
    });
  }

  deleteDomain(orgId: string, domain: string) {
    return this._domains.model.domains.delete({
      where: {
        organizationId: orgId,
        id: domain
      }
    });
  }

  async changeSubDomain(orgId: string, domain: string) {
    const subDomainExists = await this._org.model.organization.findFirst({
        where: {
            subDomain: domain,
        }
    });

    if (subDomainExists) {
        throw new Error('Subdomain already exists');
    }

    return this._org.model.organization.update({
        where: {
            id: orgId,
        },
        data: {
            subDomain: domain,
        }
    });
  }

  getDomainById(orgId: string, domainId: string) {
    return this._domains.model.domains.findFirst({
      where: {
        organizationId: orgId,
        id: domainId
      }
    });
  }

  addDomain(orgId: string, domain: string) {
    return this._domains.model.domains.create({
      data: {
        organizationId: orgId,
        domain: slugify(domain, {lower: true, strict: true, trim: true}),
        state: 'ACTIVE'
      }
    });
  }
}
