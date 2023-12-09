//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  redirects: async () => ([
    {
      permanent: true,
      source: '/docs',
      destination: process.env.DOCS_URL || '',
    },
    {
      permanent: true,
      source: '/register',
      destination: process.env.FRONTEND_URL || '',
    }
  ]),
  env: {
    DOCS_URL: process.env.DOCS_URL || ''
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);

