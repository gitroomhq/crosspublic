import { WebAPICallResult, WebClient, WebClientOptions } from "@slack/web-api";
import { Installation } from "@slack/oauth";
import { Enterprise } from "@slack/web-api/dist/response/OauthV2AccessResponse";

interface AuthTestResult extends WebAPICallResult {
  bot_id?: string;
  url?: string;
}

const client = new WebClient();
export class SlackService {
  accessToken: string;
  static async load(code: string) {
    const resp = await client.oauth.v2.access({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code,
      redirect_uri: `https://redirectmeto.com/${process.env.FRONTEND_URL}/api/integrations/slack`
    });

    const authResult = await SlackService.runAuthTest(resp.access_token!, {});

    return {
      user: {
        id: resp?.authed_user?.id!,
      },
      team: {
        id: resp?.team?.id!,
        name: resp?.team?.name!,
      },
      bot: {
        userId: resp.bot_user_id,
        id: authResult.bot_id as string,
        token: resp?.access_token!,
        userToken: resp?.authed_user?.access_token
      }
    }
  }
  static async runAuthTest(token: string, clientOptions: WebClientOptions): Promise<AuthTestResult> {
    const client = new WebClient(token, clientOptions);
    const authResult = await client.auth.test();
    return authResult as unknown as AuthTestResult;
  }
}
