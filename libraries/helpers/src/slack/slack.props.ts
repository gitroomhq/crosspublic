export const slackProps = {
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
  stateSecret: process.env.BACKEND_TOKEN_PROTECTOR!,
  scopes: [
    'channels:history',
    'chat:write',
    'chat:write.public',
    'groups:history',
    'im:history',
    'im:write',
    'links:read',
    'mpim:history',
    'users.profile:read',
    'commands',
  ],
};
