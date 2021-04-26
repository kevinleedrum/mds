const process = require('process');
const { description } = require('../../package');

module.exports = {
  title: 'Moxi Design System',
  description: description,
  base: process.env.NODE_ENV === 'development' ? '/' : '/mds/',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'stylesheet', href: '/styles/mds-core.css' }],
    ['script', { src: 'https://unpkg.com/phosphor-icons' }],
    ['script', { type: 'module', src: '/components/mds-components.esm.js' }],
    ['script', { nomodule: '', src: '/components/mds-components.js' }],
    ['script', { src: '/fixProdInitialLoad.js' }],
  ],
  theme: 'yuu',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
      },
      {
        text: 'CSS Documentation',
        link: '/css-documentation/',
      },
      {
        text: 'Components',
        link: '/components/',
      },
    ],
    sidebar: {
      '/css-documentation/': [
        'responsive-design',
        'hover-focus-states',
        'container',
        'display',
        'float',
        'clear',
        'object-fit',
        'object-position',
        'overflow',
        'overscroll-behavior',
        'top-right-bottom-left',
        'visibility',
        'z-index',
        'flex-direction',
        'flex-wrap',
        'flex',
        'flex-grow',
        'flex-shrink',
        'order',
        'typography',
      ],
      '/components/': ['inputs', 'buttons'],
    },
  },
  plugins: [['fulltext-search']],
};
