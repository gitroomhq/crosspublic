import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {DomainSubDomainOrganizationValidator} from "@meetfaq/validators/src/public/domain.subDomain.organization.validator";
import {UpdateStyleValidator} from "@meetfaq/validators/src/organizations/update.style.validator";

@Injectable()
export class OrganizationRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'organization'>,
    private readonly _domains: PrismaRepository<'domains'>,
    private readonly _integrations: PrismaRepository<'integrations'>,
  ) {
  }
  updateStyles(organizationId: string, canEditBranding: boolean, styles: UpdateStyleValidator) {
    return this._prisma.model.organization.update({
      where: {
        id: organizationId
      },
      data: {
        name: styles.name,
        topBarColor: styles.topBarColor,
        topBarTextColor: styles.topBarTextColor,
        backgroundColor: styles.backgroundColor,
        pageTextColor: styles.pageTextColor,
        pageBlockColor: styles.pageBlockColor,
        ...canEditBranding && styles.brandingText ? {brandingText: styles.brandingText} : {},
      }
    });
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
              id: true,
              apiKey: true,
              name: true,
            }
          }
        }
      });

      return {apiKey: data?.organization?.apiKey || '', id: data?.organization?.id || '', name: data?.organization?.name || ''};
    }

    const data = await this._prisma.model.organization.findUnique({
      where: {
        subDomain: body.subdomain
      },
      select: {
        apiKey: true,
        id: true,
        name: true,
        domains: {
          select: {
            domain: true
          }
        }
      }
    });

    return {
      id: data?.id,
      apiKey: data?.domains?.[0]?.domain ? `https://${data?.domains?.[0]?.domain}` : data?.apiKey || '',
      name: data?.name || ''
    };
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
}
