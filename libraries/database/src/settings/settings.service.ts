import {Injectable} from "@nestjs/common";
import {SettingsRepository} from "@meetqa/database/src/settings/settings.repository";
import axios from "axios";

const vercelAxios = (version = 9, prefix = 'projects') => {
  const create = axios.create({
    baseURL: `https://api.vercel.com/v${version}/${prefix}/` + (prefix !== 'projects' ? '' : process.env['PROJECT_ID_VERCEL']),
    headers: {
      "Authorization": `Bearer ${process.env['AUTH_BEARER_TOKEN']}`
    }
  });

  create.interceptors.request.use(config => {
    // Assuming you want to add a query parameter like 'apiKey=12345'
    // Check if the URL already has a query string
    config.url += (config?.url?.includes('?') ? '&' : '?') + `teamId=${process?.env?.['TEAM_ID_VERCEL']}`;

    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
  });

  return create;
}


@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {
  }

  checkSubdomain(orgId: string, subDomain: string) {
    return this._settingsRepository.checkSubDomain(orgId, subDomain);
  }

  async getSettings(orgId: string) {
    const {subDomain} = await this._settingsRepository.getSubDomain(orgId);
    const getDomain = await this._settingsRepository.getDomain(orgId);

    return {
      subDomain, domains: [getDomain].filter(f => f)
    };
  }

  async checkDomain(orgId: string, domain: string) {
    const getDomain = await this._settingsRepository.getDomainById(orgId, domain);
    if (!getDomain) {
      return null;
    }

    try {
      const [{data: configResponse}, domainResponse] = await Promise.all([
        vercelAxios(6, 'domains').get('/' + getDomain.domain + '/config'),
        vercelAxios(10).get('/domains/' + getDomain.domain),
      ]);

      if (domainResponse.status !== 200) {
        return domainResponse.data;
      }

      let verificationResponse = null;
      if (!domainResponse.data.verified) {
        const {data: {verify}} = await vercelAxios(9).post('/domains/' + getDomain.domain + '/verify');
        verificationResponse = verify;
      }

      if (verificationResponse && verificationResponse.verified) {
        /**
         * Domain was just verified
         */
        return {
          configured: !configResponse.misconfigured,
          ...verificationResponse,
        }
      }

      console.log(configResponse);

      return {
        configured: !configResponse.misconfigured,
        ...domainResponse.data,
        ...(verificationResponse ? { verificationResponse } : {}),
      }
    }
    catch (err) {
      return null;
    }
  }

  async addDomain(orgId: string, domain: string) {
    await vercelAxios(10).post('/domains', {
      name: domain,
    });

    return this._settingsRepository.addDomain(orgId, domain);
  }

  async changeSubDomain(orgId: string, subDomain: string) {
    return this._settingsRepository.changeSubDomain(orgId, subDomain);
  }

  async deleteDomain(orgId: string, domain: string) {
    const getDomain = await this._settingsRepository.getDomainById(orgId, domain);
    if (!getDomain) {
      return false;
    }

    try {
      await vercelAxios(9).delete('/domains/' + getDomain.domain);
      await this._settingsRepository.deleteDomain(orgId, domain);
      return true;
    }
    catch (err) {
      return false;
    }
  }
}
