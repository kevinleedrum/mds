const plugin = require('tailwindcss/plugin');

const { NODE_ENV } = process.env;

const config = {
  important: '.mds',
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      0: '0 0 #0000;',
      1: '0px 0px 2px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 1px 3px rgba(0, 0, 0, 0.06)',
      2: '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 3px 4px rgba(0, 0, 0, 0.02), 0px 1px 5px rgba(0, 0, 0, 0.04)',
      3: '0px 3px 3px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.04), 0px 1px 8px rgba(0, 0, 0, 0.06)',
      4: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 5px rgba(0, 0, 0, 0.04), 0px 1px 10px rgba(0, 0, 0, 0.06)',
      6: '0px 6px 10px rgba(0, 0, 0, 0.06), 0px 1px 18px rgba(0, 0, 0, 0.04), 0px 3px 5px rgba(0, 0, 0, 0.06)',
      8: '0px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 4px 5px rgba(0, 0, 0, 0.06)',
      9: '0px 9px 12px rgba(0, 0, 0, 0.06), 0px 3px 16px rgba(0, 0, 0, 0.04), 0px 5px 6px rgba(0, 0, 0, 0.06)',
      12: '0px 12px 17px rgba(0, 0, 0, 0.04), 0px 5px 22px rgba(0, 0, 0, 0.02), 0px 7px 8px rgba(0, 0, 0, 0.06)',
      16: '0px 16px 24px rgba(0, 0, 0, 0.04), 0px 6px 30px rgba(0, 0, 0, 0.02), 0px 8px 10px rgba(0, 0, 0, 0.06)',
      24: '0px 24px 38px rgba(0, 0, 0, 0.04), 0px 9px 46px rgba(0, 0, 0, 0.02), 0px 11px 15px rgba(0, 0, 0, 0.06)',
    },
    fontSize: {
      // Font size, line-height, and letter-spacing
      1: ['1.25rem', { lineHeight: '1.5rem', letterSpacing: '0.031rem' }], // 20px / 24px / 0.5px
      2: ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '0.031rem' }], // 18px / 24px / 0.5px
      3: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.009rem' }], // 16px / 24px / 0.15px
      4: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.016rem' }], // 14px / 20px / 0.25px
    },
    letterSpacing: {
      '0': '0rem',
      '0-1': '0.006rem',
      '0-15': '0.009rem',
      '0-25': '0.016rem',
      '0-3': '0.019rem',
      '0-4': '0.025rem',
      '0-5': '0.031rem',
      '1-25': '0.078rem',
      '1-5': '0.094rem',
    },
    spacing: {
      0: '0px',
      1: '1px',
      2: '0.125rem',
      4: '0.25rem',
      6: '0.375rem',
      8: '0.5rem',
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      15: '0.9375rem',
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
      24: '1.5rem',
      28: '1.75rem',
      30: '1.875rem',
      32: '2rem',
      36: '2.25rem',
      40: '2.5rem',
      44: '2.75rem',
      48: '3rem',
      56: '3.5rem',
      64: '4rem',
      72: '4.5rem',
      80: '5rem',
      96: '6rem',
      112: '7rem',
      128: '8rem',
      144: '9rem',
      152: '9.5rem',
      160: '10rem',
      164: '10.25rem',
      176: '11rem',
      192: '12rem',
      208: '13rem',
      216: '13.5rem',
      224: '14rem',
      240: '15rem',
      256: '16rem',
      288: '18rem',
      320: '20rem',
      360: '22.5rem',
      384: '24rem',
      480: '30rem',
    },
    extend: {
      colors: {
        'primary-dark': 'var(--mc-primary-dark)',
        'primary-hover': 'var(--mc-primary-hover)',
        'primary': 'var(--mc-primary)',
        'secondary-light': 'var(--mc-secondary-light)',
        'secondary-medium': 'var(--mc-secondary-medium)',
        'secondary-ultra-light': 'var(--mc-secondary-ultra-light)',
        'secondary': 'var(--mc-secondary)',
        'status-error-active': 'var(--mc-status-error-active)',
        'status-error-hover': 'var(--mc-status-error-hover)',
        'status-error': 'var(--mc-status-error)',
        'status-success': 'var(--mc-status-success)',
        'status-warning-active': 'var(--mc-status-warning-active)',
        'status-warning-hover': 'var(--mc-status-warning-hover)',
        'status-warning': 'var(--mc-status-warning)',
        'tertiary': 'var(--mc-tertiary)',
        'tertiary-hover': 'var(--mc-tertiary-hover)',
        'tertiary-dark': 'var(--mc-tertiary-dark)',
        'white': 'var(--mc-white)',
      },
      backgroundImage: {
        pattern: 'var(--mds-bg-pattern)',
      },
      minHeight: theme => ({
        ...theme('spacing'), // Extend to include spacing values (e.g. min-h-128)
      }),
      minWidth: {
        100: '6.25rem',
        150: '9.375rem',
      },
      maxHeight: theme => ({
        ...theme('spacing'), // Extend to include spacing values (e.g. max-h-128)
      }),
      borderRadius: {
        DEFAULT: '0.1875rem',
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    borderWidth: ({ after }) => after(['first-of-type', 'last-of-type']),
    borderRadius: ({ after }) => after(['first-of-type', 'last-of-type']),
    extend: {
      borderWidth: ['focus'],
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      // Make "disabled:" variant work for aria-disabled as well
      addVariant('disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled, .${e(
            `disabled${separator}${className}`,
          )}[aria-disabled='true']`;
        });
      });
      addVariant('first-of-type', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`first-of-type${separator}${className}`)}:first-of-type`;
        });
      });
      addVariant('last-of-type', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`last-of-type${separator}${className}`)}:last-of-type`;
        });
      });
    }),
  ],
};

if (NODE_ENV === 'development') {
  config.mode = 'jit';
  config.purge = ['./src/**/*.{js,jsx,ts,tsx,vue}', './vuepress/**/*.{js,jsx,ts,tsx,vue,md,html}'];
} else {
  config.purge = false;
}

module.exports = config;
