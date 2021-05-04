module.exports = {
  important: '.mds',
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,vue}', './vuepress/**/*.{js,jsx,ts,tsx,vue,md,html}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-text-dark': 'var(--mds-primary-text-dark)', // Dark text primary
        'primary-text-light': 'var(--mds-primary-text-light)', // Light text primary
        'primary-bg-dark': 'var(--mds-primary-bg-dark)', // Dark background primary
        'primary-text-light': 'var(--mds-primary-bg-light)', // Light background primary
        'gray-bg-dark': 'var(--mds-gray-bg-dark)',
        'gray-bg-light': 'var(--mds-gray-bg-light)',
      },
      container: {
        center: true,
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      fontSize: {
        // Font size and line-height
        xxs: ['0.625rem', '1rem'], // 10px / 16px
        xs: ['0.75rem', '1rem'], // 12px / 16px
        sm: ['0.875rem', '1.25rem'], // 14px / 20px
        base: ['1rem', '1.5rem'], // 16px / 24px
        lg: ['1.125rem', '1.5rem'], // 18px / 24px
        xl: ['1.25rem', '1.5rem'], // 20px / 24px
      },
      spacing: {
        '2': '0.125rem',
        '4': '0.25rem',
        '8': '0.5rem',
        '12': '0.75rem',
        '16': '1rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '32': '2rem',
        '40': '2.5rem',
        '48': '3rem',
        '56': '3.5rem',
        '64': '4rem',
        '72': '4.5rem',
        '80': '5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
