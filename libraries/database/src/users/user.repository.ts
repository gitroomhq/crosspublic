import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetfaq/validators/src/organizations/organization.create.validator";
import {RegistrationValidator} from "@meetfaq/validators/src/auth/registration.validator";
import slugify from "slugify";
import {makeId} from "@meetfaq/helpers/src/makeid/make.id";
import {hashSync} from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    private readonly _prismaUser: PrismaRepository<'user'>
  ) {
  }

  async getUserByEmail(email: string) {
    return this._prismaUser.model.user.findFirst({
      where: {
        email
      },
      include: {
        organization: true
      }
    });
  }

  register(body: RegistrationValidator) {
    return this._prismaUser.model.user.create({
      data: {
        email: body.email.toLowerCase(),
        name: body.company,
        password: hashSync(body.password, 16),
        internalId: makeId(20),
        organization: {
          create: {
            role: 'ADMIN',
            organization: {
              create: {
                name: body.company,
                guildId:  makeId(10),
                subDomain: slugify(body.company, {
                  lower: true,
                  strict: true,
                  trim: true
                }) + '-' + makeId(3)
              }
            }
          }
        }
      },
      include: {
        organization: {
          include: {
            organization: true
          }
        }
      }
    });
  }
}
