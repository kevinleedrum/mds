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
  // theme: 'yuu',
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
        text: 'Examples',
        link: '/examples/',
      },
      {
        text: 'Components',
        link: '/components/',
      },
    ],
    sidebar: {
      '/examples/': ['grid', 'flex'],
      '/css-documentation/': [
        {
          title: 'Layout',
          children: [
            'layout/responsive-design',
            'layout/container',
            'layout/box-sizing',
            'layout/display',
            'layout/floats',
            'layout/clear',
            'layout/object-fit',
            'layout/object-position',
            'layout/overflow',
            'layout/overscroll-behavior',
            'layout/position',
            'layout/top-right-bottom-left',
            'layout/visibility',
            'layout/z-index',
          ],
        },
        {
          title: 'Flexbox',
          children: [
            'flexbox/flex-direction',
            'flexbox/flex-wrap',
            'flexbox/flex',
            'flexbox/flex-grow',
            'flexbox/flex-shrink',
            'flexbox/order',
          ],
        },
        {
          title: 'Grid',
          children: [
            'grid/grid-template-columns',
            'grid/grid-column',
            'grid/grid-template-rows',
            'grid/grid-row',
            'grid/grid-auto-flow',
            'grid/grid-auto-columns',
            'grid/grid-auto-rows',
            'grid/gap',
          ],
        },
        {
          title: 'Box Alignment',
          children: [
            'box-alignment/justify-content',
            'box-alignment/justify-items',
            'box-alignment/justify-self',
            'box-alignment/align-content',
            'box-alignment/align-items',
            'box-alignment/align-self',
            'box-alignment/place-content',
            'box-alignment/place-items',
            'box-alignment/place-self',
          ],
        },
        {
          title: 'Spacing',
          children: ['spacing/padding', 'spacing/margin', 'spacing/space'],
        },
        {
          title: 'Sizing',
          children: [
            'sizing/width',
            'sizing/min-width',
            'sizing/max-width',
            'sizing/height',
            'sizing/min-height',
            'sizing/max-height',
          ],
        },
        'colors',
        'typography',
        'backgrounds',
        'borders',
        'effects',
        'filters',
      ],
      '/components/': ['inputs', 'buttons'],
    },
  },
  plugins: [['fulltext-search']],
};
