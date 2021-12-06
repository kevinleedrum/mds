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
    <mx-code language="css" show-line-numbers line-number-start="237">
      /* This CSS example has line numbers. */
      .danger {
        color: #f00;
      }
    </mx-code>
    <mx-code language="diff-typescript">
      @@ -2,3 +2,3 @@
        // This example has diff highlighting.
      - let dude = 'Lebowski';
      + const dude = 'Lebowski';
        console.log(`The ${dude} abides`);
    </mx-code>
    <!-- #endregion code -->
  </div>
</section>

#### Source for the above examples:

<<< @/vuepress/components/code.md#code

### Supported languages

The following keywords are currently supported for the `language` prop:

`atom`, `clike`, `css`, `diff`, `html`, `javascript`, `js`, `json`, `markup`, `mathml`, `rss`, `ruby`, `sql`, `ssml`, `svg`, `ts`, `typescript`, `xml`

### Properties

| Property          | Attribute           | Description                                                                                                           | Type      | Default     |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `code`            | `code`              | Unescaped code to format and display. Escaped code may be placed inside the default slot instead.                     | `string`  | `undefined` |
| `language`        | `language`          | The language of the code. Add a `diff-` prefix for diff highlighting. See [Supported languages](#supported-languages) | `string`  | `'none'`    |
| `lineNumberStart` | `line-number-start` |                                                                                                                       | `number`  | `1`         |
| `showLineNumbers` | `show-line-numbers` |                                                                                                                       | `boolean` | `false`     |

<script>
export default {
  mounted() {
    // HACK: Move all the mx-code elements outside the .theme-default-content block to prevent
    // the vuepress theme from styling the pre and code elements.  This was simpler than trying
    // to create a custom vuepress theme.
    setTimeout(() => {
      const rect = this.$refs.code.getBoundingClientRect()
      this.$refs.code.style.position = 'absolute'
      this.$refs.code.style.top = rect.top + 'px'
      this.$refs.code.style.left = rect.left + 'px'
      this.$refs.code.style.width = rect.width + 'px'
      this.$refs.code.style.height = rect.height + 'px'
      document.querySelector('.page').appendChild(this.$refs.code)
      this.$refs.placeholder.style.height = rect.height + 'px'
    }, 200)
    const repositionCodeElements = () => {
      const rect = this.$refs.placeholder.getBoundingClientRect()
      this.$refs.code.style.top = rect.top + 'px'
      this.$refs.code.style.left = rect.left + 'px'
      this.$refs.code.style.width = rect.width + 'px'
      this.$refs.code.style.height = rect.height + 'px'
    }
    window.addEventListener('resize', repositionCodeElements)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', repositionCodeElements)
      this.$refs.code.remove()
    })
  }
}
</script>
