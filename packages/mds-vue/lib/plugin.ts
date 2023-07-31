import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from '@moxiworks/mds/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};