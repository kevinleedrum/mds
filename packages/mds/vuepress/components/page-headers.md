# Page Headers

The Page Header component displays the heading text of a page, and may also contain:

- a link to the previous page,
- primary, secondary, and tertiary [buttons](/components/buttons.html),
- and [tabs](/components/tabs.html).

On smaller screens, the size of the text and buttons will be reduced. Additionally, if there is not enough room on small screens for the tertiary button, it will be converted into a small menu button.

<!-- #region page-headers -->
<section class="mds">
  <div class="mt-20 space-y-20 -mx-32 md:-ml-32">
    <mx-page-header pattern class="shadow-2">Page Header</mx-page-header>
    <mx-page-header
      previous-page-url="#"
      previous-page-title="Home"
      class="shadow-2"
    >
      Page Header
    </mx-page-header>
    <mx-page-header
      :buttons.prop="[
        { label: 'Primary', onClick: clickHandlerGoesHere },
        { label: 'Secondary', onClick: clickHandlerGoesHere },
      ]"
      pattern
      previous-page-url="#"
      previous-page-title="Home"
      class="shadow-2"
    >
      Page Header
    </mx-page-header>
    <mx-page-header
      class="shadow-2"
      :buttons.prop="[{ label: 'Primary', onClick: clickHandlerGoesHere }]"
    >
      Page Header
    </mx-page-header>
    <mx-page-header
      pattern
      previous-page-url="#"
      previous-page-title="Home"
      class="shadow-2"
      :buttons.prop="[
        { label: 'Primary', onClick: clickHandlerGoesHere },
        { label: 'Secondary', onClick: clickHandlerGoesHere },
        { label: 'Tertiary', onClick: clickHandlerGoesHere },
      ]"
    >
      Page Header
      <mx-tabs
        slot="tabs"
        :tabs.prop="[
          { label: 'Tab 1' },
          { label: 'Tab 2' },
          { label: 'Tab 3' },
        ]"
        :value="activeTab"
        @mxChange="e => activeTab = e.detail"
      />
    </mx-page-header>
    <mx-page-header
      class="shadow-2"
      :buttons.prop="[
        { label: 'Primary', onClick: clickHandlerGoesHere },
        { label: 'Secondary', onClick: clickHandlerGoesHere },
      ]"
    >
      Page Header
      <mx-tabs
        slot="tabs"
        fill
        :tabs.prop="[
          { label: 'Tab 1' },
          { label: 'Tab 2' },
          { label: 'Tab 3' },
        ]"
        :value="activeTab"
        @mxChange="e => activeTab = e.detail"
      />
    </mx-page-header>
  </div>
</section>
<!-- #endregion page-headers -->

<<< @/vuepress/components/page-headers.md#page-headers

### Properties

| Property            | Attribute             | Description                                                                                            | Type                  | Default  |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ | --------------------- | -------- |
| `buttons`           | --                    | An array of prop objects for each button. Use the `label` property to specify the button's inner text. | `IPageHeaderButton[]` | `[]`     |
| `pattern`           | `pattern`             | When set to true, the Page Header will use the themed background pattern.                              | `boolean`             | `false`  |
| `previousPageTitle` | `previous-page-title` | The text to display for the previous page link                                                         | `string`              | `'Back'` |
| `previousPageUrl`   | `previous-page-url`   | The URL for the previous page link                                                                     | `string`              | `''`     |

<script>
export default {
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    clickHandlerGoesHere() {
      console.log('Button clicked!')
    }
  }
}
</script>
