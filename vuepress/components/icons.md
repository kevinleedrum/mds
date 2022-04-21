# Icons

All of the icons used in design system components are exposed as CSS classes. They may be used
in conjunction with an `<i>` element, or they can be used as the `icon` prop for components that
support it.

To achieve a 24px (1.5rem) icon size, add the `text-icon` utility class.

<section class="mds">
  <div class="flex items-center flex-wrap my-40 space-x-20">
    <!-- #region icons -->
    <i class="mds-warning-circle text-icon text-red-600"></i>
    <mx-icon-button icon="mds-x" el-aria-label="Close" />
    <i class="mds-clock text-icon text-blue-500"></i>
    <!-- #endregion icons -->
  </div>
</section>

<<< @/vuepress/components/icons.md#icons

<section class="mds">
  <div class="grid gap-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row mt-40">
    <div v-for="icon in icons" :key="icon" class="flex flex-col items-center  p-16 w-128 rounded-2xl border text-icon">
      <i :class="icon"></i>
      <code class="text-4 mt-8">{{ '.' + icon }}</code>
    </div>
  </div>
</section>

<script>
export default {
  data() {
    return {
      icons: []
    }
  },
  mounted() {
    this.getIcons()
  },
  methods: {
    getIcons() {
      document.styleSheets.forEach(stylesheet => {
        try {
          stylesheet.rules.forEach(rule => {
            if (!rule || !rule.selectorText) return
            if (rule.selectorText.includes('.mds-') && !rule.selectorText.includes('::')) {
              const split = rule.selectorText.split('.')
              this.icons.push(split[split.length - 1])
            }
          })
        } catch (err) {
          // Ignore "cannot access rules" exceptions
        }
      })
    }
  }
}
</script>
