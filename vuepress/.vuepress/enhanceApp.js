import pageComponents from '@internal/page-components';

export default ({ Vue, options, router, siteData }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component);
  }
  Vue.config.ignoredElements = [
    // Use a `RegExp` to ignore all elements that start with "nova-"
    // 2.5+ only
    /^mx-/,
  ];
};
