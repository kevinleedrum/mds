# Page Headers

<!-- #region page-headers -->
<section class="mds">
  <div class="space-y-20 -mx-32 md:-ml-32">
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
        value="0"
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
        :tabs.prop="[
          { label: 'Tab 1' },
          { label: 'Tab 2' },
          { label: 'Tab 3' },
        ]"
        value="0"
      />
    </mx-page-header>
  </div>
</section>
<!-- #endregion page-headers -->

<<< @/vuepress/components/page-headers.md#page-headers

<script>
export default {
  methods: {
    clickHandlerGoesHere() {
      console.log('Button clicked!')
    }
  }
}
</script>
