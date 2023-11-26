exports.default = {
  "$schema": "https://mintlify.com/schema.json",
  "name": "Starter Kit",
  "logo": {
    "dark": "/logo/dark.png",
    "light": "/logo/light.png"
  },
  "favicon": "/favicon.svg",
  "colors": {
    "primary": "#9333EA",
    "light": "#9333EA",
    "dark": "#9333EA",
    "anchors": {
      "from": "#9333EA",
      "to": "#9333EA"
    }
  },
  "openapi": "https://api.meetfaq.com/docs-json",
  "api": {
    "baseUrl": "https://api.meetfaq.com",
  },
  "topbarLinks": [
    {
      "name": "Support",
      "url": "mailto:nevo@meetfaq.com"
    }
  ],
  "modeToggle": {
    "default": "light"
  },
  "topbarCtaButton": {
    "name": "Dashboard",
    "url": "https://app.meetfaq.com"
  },
  "tabs": [
    {
      "name": "Public API Reference",
      "url": "public-api-reference"
    },
    {
      "name": "Internal API Reference (Self-Hosted)",
      "url": "api-reference"
    }
  ],
  "anchors": [
    {
      "name": "Documentation",
      "icon": "book-open-cover",
      "url": "https://docs.meetfaq.com"
    },
    {
      "name": "Community",
      "icon": "discord",
      "url": "https://discord.gitroom.com"
    },
    {
      "name": "Blog",
      "icon": "newspaper",
      "url": "https://meetfaq.substack.com"
    }
  ],
  "navigation": [
    {
      "group": "Get Started",
      "pages": ["introduction", "quickstart", "development"]
    },
    {
      "group": "Essentials",
      "pages": ["essentials/markdown", "essentials/code", "essentials/images", "essentials/settings", "essentials/navigation"]
    },
    {
      "group": "API Documentation",
      "pages": ["api-reference/introduction"]
    }
  ],
  "footerSocials": {
    "twitter": "https://twitter.com/nevodavid",
    "github": "https://github.com/github-20k/meetqa",
    "linkedin": "https://www.linkedin.com/nevodavid"
  }
};
