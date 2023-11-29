const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  purge: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}')
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B1D61",
        secondary: "#2A1544",
        line: '#CBCEDC',
        gray: '#8A919C',
        pink: '#AE4DDC'
      },
      backgroundImage: {
        auth: 'url(/bg.svg)',
        menu: 'linear-gradient(270deg, rgba(174, 77, 220, 0.02) 0%, rgba(174, 77, 220, 0.05) 37.65%, rgba(174, 77, 220, 0.10) 100%)',
        btn: 'linear-gradient(225deg, #AE4DDC -5.28%, #B85AF2 -5.27%, #9142E0 72.52%)',
        btnHover: 'linear-gradient(225deg, #863ba9 -5.28%, #B85AF2 -5.27%, #7a39bc 72.52%)',
      },
      animation: {
        'fade-up': 'fadeInUp 1s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
      },
      fontSize: {
        main: '18px'
      },
      fontWeight: {
        main: '600'
      },
      borderRadius: {
        container: '10px'
      }
    }
  }
};
