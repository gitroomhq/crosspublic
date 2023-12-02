exports.default = {
  "$schema": "https://mintlify.com/schema.json",
  "name": "Starter Kit",
  "logo": {
    "dark": "/logo/dark.png",
    "light": "/logo/light.png"
  },
  "favicon": "/favicon.png",
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
    },
    {
      "name": "Cloud",
      "url": "https://panel.meetfaq.com"
    }
  ],
  "modeToggle": {
    "default": "light"
  },
  "topbarCtaButton": {
    "type": "github",
    "url": "https://github.com/github-20k/meetqa"
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
      "url": "https://gitroom.com/blog"
    }
  ],
  "navigation": [
    {
      "group": "Get Started",
      "pages": ["introduction", "quickstart", "howitworks"]
    },
    {
      "group": "API Documentation",
      "pages": ["api-reference/introduction"]
    },
    {
      "group": "Public api Documentation",
      "pages": ["public-api-reference/introduction"]
    }
  ],
  "footerSocials": {
    "twitter": "https://twitter.com/nevodavid",
    "github": "https://github.com/github-20k/meetqa",
    "linkedin": "https://www.linkedin.com/nevodavid"
  }
};
