# Code Blocks

The `mx-code` component renders code snippets with syntax highlighting (via [Prism](https://prismjs.com/)) and (optionally) line numbers.

For code that is unescaped, it is safer to pass it into the component via the `code` prop. Otherwise, it can simply be placed in the default slot. The language must be specified via the `language` prop in order for syntax highlighting to function.

<section class="mds">
  <div ref="placeholder"></div>
  <div ref="code" class="mds">
    <!-- #region code -->
    <mx-code language="html" code="<p>HTML&nbsp;Example</p>" />
    <mx-code language="js">
      const language = 'js'
    </mx-code>
    <mx-code language="json">
      {
        "json": "json"
      }
    </mx-code>
    <mx-code language="css" show-line-numbers>
      /* This CSS example has line numbers. */
      .danger {
        color: #f00;
      }
    </mx-code>
    <!-- #endregion code -->
  </div>
</section>

#### Source for the above examples:

<<< @/vuepress/components/code.md#code

<script>
export default {
  mounted() {
    // HACK: Move all the mx-code elements outside the .theme-default-content block to prevent
    // the vuepress theme from styling the pre and code elements.  This was simpler than trying
    // to create a custom theme.
    setTimeout(() => {
      const rect = this.$refs.code.getBoundingClientRect()
      this.$refs.code.style.position = 'absolute'
      this.$refs.code.style.top = rect.top + 'px'
      this.$refs.code.style.left = rect.left + 'px'
      this.$refs.code.style.width = rect.width + 'px'
      this.$refs.code.style.height = rect.height + 'px'
      document.querySelector('.page').appendChild(this.$refs.code)
      this.$refs.placeholder.style.height = rect.height + 'px'
    }, 100)
    const repositionCodeElements = () => {
      const rect = this.$refs.placeholder.getBoundingClientRect()
      this.$refs.code.style.top = rect.top + 'px'
      this.$refs.code.style.left = rect.left + 'px'
    }
    window.addEventListener('resize', repositionCodeElements)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', repositionCodeElements)
      this.$refs.code.remove()
    })
  }
}
</script>
