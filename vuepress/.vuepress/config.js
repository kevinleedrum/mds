const process = require('process');
const { description } = require('../../package');

module.exports = {
  title: 'Moxi Design System',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'stylesheet', href: '/styles/mds-core.css' }],
    ['script', { src: 'https://unpkg.com/phosphor-icons' }],
    ['script', { type: 'module', src: '/components/mds-components.esm.js' }],
    ['script', { nomodule: '', src: '/components/mds-components.js' }],
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
      '/components/': ['inputs'],
    },
  },
  plugins: [
    [
      'flexsearch',
      {
        /*
        Plugin custom options
      */
        maxSuggestions: 10, // how many search suggestions to show on the menu, the default is 10.
        searchPaths: ['path1', 'path2'], // an array of paths to search in, keep it null to search all docs.
        searchHotkeys: ['s'], // Hot keys to activate the search input, the default is "s" but you can add more.
        searchResultLength: 60, // the length of the suggestion result text by characters, the default is 60 characters.
        /*
        Default FlexSearch options
        To override the default options you can see available options at https://github.com/nextapps-de/flexsearch
      */
        search_options: {
          encode: 'icase',
          tokenize: 'forward',
          resolution: 9,
          doc: {
            id: 'key',
            field: ['title', 'content', 'headers'],
          },
        },
      },
    ],
  ],
};
