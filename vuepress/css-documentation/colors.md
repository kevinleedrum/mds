# Colors

## Global Colors

These are the global colors used throughout the design system. They can used as both CSS variables
and as utility classes.

<!-- When adding new colors, be sure to add them to both variables/index.scss and tailwind.config.js. -->

<section class="mds">
  <table >
    <thead>
      <tr>
        <th></th>
        <th class="text-left">Variable</th>
        <th>Color</th>
        <th class="text-left">Utility Classes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="color in colors" :key="color.name">
        <td class="capitalize">{{ color.friendlyName }}</td>
        <td><code>--mc-{{ color.name }}</code></td>
        <td class="text-center">
          <span role="presentation" class="inline-block w-32 mb-4 border" :style="{ background: color.value }">&nbsp;</span><br />
          <code>{{ color.value }}</code>
        </td>
        <td class="text-4">
          <code class="block">.bg-{{ color.name }}</code>
          <code class="block">.text-{{ color.name }}</code>
          <code class="block">.border-{{ color.name }}</code>
        </td>
      </tr>
    </tbody>
  </table>
</section>

## Variables

The above colors, as well as all component colors, can be overridden via the following variables.

<<< @/src/tailwind/variables/index.scss

<script>
  export default {
    data() {
      return {
        colors: [],
      }
    },
    mounted() {
      [...document.styleSheets].forEach(stylesheet => {
        try {
          // The global colors are pulled from the document stylesheet.  Only `--mc-` variables with
          // raw hex values are included (so component-specific variables are excluded).
          [...stylesheet.cssRules].forEach(rule => {
            if (!rule || !rule.selectorText || rule.selectorText !== ':root') return
            const vars = [...rule.style].filter(name => name.startsWith("--mc-"))
            this.colors = vars.map(name => ({
              friendlyName: name.replace('--mc-', '').replace(/-/g, ' '),
              name: name.replace('--mc-', ''),
              value: rule.style.getPropertyValue(name).trim(),
            })).filter(({ value }) => value.startsWith("#"))
          })
        } catch (err) {
          // Ignore "cannot access rules" exceptions
        }
      })
    }
  }
</script>
