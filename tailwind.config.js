module.exports = {
  // important: '#mds',
  // mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
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
        sm: ['0.875rem', '20px'], // 14px
        base: ['1rem', '24px'], // 16px
        lg: ['1.125rem', '24px'], // 18px
        xl: ['1.25rem', '24px'], // 20px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
