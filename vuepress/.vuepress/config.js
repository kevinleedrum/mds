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
};
