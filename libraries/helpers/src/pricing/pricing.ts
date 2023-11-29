export interface PricingInterface {
  [key: string]: {
    pricing: {
      monthly: number;
      yearly: number;
    },
    faq: number;
    user: number;
    integrations: number;
    categories: number;
    domains: number;
    package: string;
    embed: boolean;
    api: boolean;
  }
}
export const pricing: PricingInterface = {
  FREE: {
    pricing: {
      monthly: 0,
      yearly: 0,
    },
    faq: 10,
    user: 1,
    integrations: 1,
    categories: 5,
    domains: 0,
    package: 'free',
    embed: false,
    api: false,
  },
  BASIC: {
    pricing: {
      monthly: 50,
      yearly: 500,
    },
    faq: 20,
    user: 3,
    integrations: 3,
    categories: 10,
    domains: 1,
    package: 'basic',
    embed: false,
    api: false,
  },
  PRO: {
    pricing: {
      monthly: 100,
      yearly: 1000,
    },
    user: 5,
    faq: 50,
    integrations: 7,
    categories: 20,
    domains: 1,
    package: 'pro',
    embed: true,
    api: true,
  }
}
