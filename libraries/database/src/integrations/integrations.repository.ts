import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {Integrations} from '@prisma/client';

@Injectable()
export class IntegrationsRepository {
  constructor(
    private readonly _integrations: PrismaRepository<'integrations'>,
    private readonly _integrationsUsers: PrismaRepository<'integrationsUsers'>,
  ) {
  }

  findByGuildAndId(guildId: string, internalId: string) {
    return this._integrations.model.integrations.findFirst({
      where: {
        internalId: guildId,
        users: {
          some: {
            internalId
          }
        }
      },
      select: {
        organizationId: true,
        users: true
      }
    });
  }

  totalIntegrationsByOrganizationId(organizationId: string) {
    return this._integrations.model.integrations.count({
      where: {
        organizationId
      }
    });
  }

  async deleteIntegration(organizationId: string, id: string) {
    await this._integrationsUsers.model.integrationsUsers.deleteMany({
      where: {
        integrationId: id
      }
    });

    return this._integrations.model.integrations.delete({
      where: {
        organizationId,
        id,
      },
    });
  }

  getIntegrationByOrganizationId(organizationId: string) {
    return this._integrations.model.integrations.findMany({
      where: {
        organizationId
      },
      select: {
        id: true,
        type: true,
        notes: true,
        _count: {
          select: {
            users: true
          }
        }
      }
    });
  }

  createIntegration(data: Omit<Integrations, 'id'>, internalId: string) {
    return this._integrations.model.integrations.create({
      data: {
        ...data,
        users: {
          create: {
            internalId,
            owner: true,
          }
        }
      }
    });
  }
}
