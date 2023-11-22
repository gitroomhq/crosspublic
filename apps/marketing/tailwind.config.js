const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9333EA",
        secondary: "#ff7e33",
        info: "#0C63E7",
        dark: "#0A101E",
        darker: "#090E1A",
      }
    },
  },
  plugins: [],
};
