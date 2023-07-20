# Tabs

The Moxi Design System implements tabs as an `mx-tabs` component with a `tabs` prop that accepts an array of objects to configure each tab. The selected tab index is specified using the `value` prop. The `mx-tabs` component also emits a custom `mxChange`
event, which contains the newly selected tab index in the `Event.detail` property.

The `mx-tabs` component will render as an `mx-select` when the screen width is less than or equal to 768 px and there are more than two tabs.

<!-- #region tabs -->
  <section class="mds">
    <!-- 
    The :tabs.prop syntax below is specific to Vue for passing data to DOM properties.
    If using JSX, you can set the tabs prop using the typical tabs={[...]} syntax.
    For vanilla JS, you will need to assign HTMLMxTabsElement.tabs = [...] in your script.
    -->
    <div class="my-20 space-y-20">
      <strong>Horizontal Fill (stretch tabs to fill width)</strong>
      <mx-tabs
        fill
        :tabs.prop="[
          { label: 'Home', icon: 'ph-house' },
          { label: 'Favorites', icon: 'ph-heart', badge: true, badgeClass: 'text-green-600' },
          { label: 'Search', icon: 'mds-search' },
        ]"
        :value="activeTab"
        @mxChange="e => activeTab = e.detail"
      />
    </div>
    <div class="my-20 space-y-20">
      <strong>Horizontal Stack (set tabs to a min width)</strong>
      <mx-tabs
        :tabs.prop="[
          { label: 'Home', icon: 'ph-house' },
          { label: 'Favorites', icon: 'ph-heart', badge: true, badgeClass: 'text-green-600' },
          { label: 'Search', icon: 'mds-search' },
        ]"
        :value="activeTab"
        @mxChange="e => activeTab = e.detail"
      />
    </div>
    <div class="my-20 space-y-20">
      <strong>Icons Only, Horizontal Stack</strong>
      <mx-tabs
        :tabs.prop="[
          { elAriaLabel: 'Home', icon: 'ph-house' },
          { elAriaLabel: 'Favorites', icon: 'ph-heart', badge: true, badgeClass: 'text-red-600' },
          { elAriaLabel: 'Search', icon: 'mds-search' },
        ]"
        :value="activeTab"
        @mxChange="e => activeTab = e.detail"
      />
    </div>
    <div class="my-20 space-y-20">
      <strong>Text Only, Horizontal Fill</strong>
      <mx-tabs
        fill
        :tabs.prop="[
          { label: 'Home' },
          { label: 'Favorites' },
          { label: 'Search' }
        ]"
        :value="activeTab"
        @mxChange="e => activeTab = e.detail"
      />
    </div>
  </section>
  <!-- #endregion tabs -->

<<< @/vuepress/components/tabs.md#tabs

## Tab Content

Content can be automatically hidden or shown based on the selected tab using the `mx-tab-content` component. The `mx-tabs` component and each `mx-tab-content` must be passed the same variable
for the `value` prop (a variable containing the active tab index), and each `mx-tab-content` must be given an `index` number that corresponds to its tab.

<!-- #region tab-content -->
<section class="mds">
  <div class="my-20 border">
    <mx-tabs
      fill
      :tabs.prop="[
        { label: 'Home', icon: 'ph-house' },
        { label: 'Favorites', icon: 'ph-heart' },
        { label: 'Search', icon: 'mds-search' },
      ]"
      :value="activeTab"
      @mxChange="e => activeTab = e.detail"
    />
    <mx-tab-content :value="activeTab" index="0">
      <p class="px-20">This is the Home tab.</p>
    </mx-tab-content>
    <mx-tab-content :value="activeTab" index="1">
      <p class="px-20">This is the Favorites tab.</p>
    </mx-tab-content>
    <mx-tab-content :value="activeTab" index="2">
      <p class="px-20">This is the Search tab.</p>
    </mx-tab-content>
  </div>
</section>
<!-- #endregion tab-content -->

<<< @/vuepress/components/tabs.md#tab-content

### Tabs Properties

| Property            | Attribute | Description                                           | Type            | Default     |
| ------------------- | --------- | ----------------------------------------------------- | --------------- | ----------- |
| `fill`              | `fill`    | Stretch tabs to fill the entire width                 | `boolean`       | `false`     |
| `tabs` _(required)_ | --        | An array of objects for each tab (see Tab Properties) | `IMxTabProps[]` | `undefined` |
| `value`             | `value`   | The index of the selected tab                         | `number`        | `null`      |

### Tabs Events

| Event      | Description                                     | Type                  |
| ---------- | ----------------------------------------------- | --------------------- |
| `mxChange` | Emits the clicked tab's index as `Event.detail` | `CustomEvent<number>` |

### Tab Properties

| Property      | Attribute       | Description                                                                                | Type      | Default |
| ------------- | --------------- | ------------------------------------------------------------------------------------------ | --------- | ------- |
| `badge`       | `badge`         | Display a circular badge                                                                   | `boolean` | `false` |
| `badgeClass`  | `badge-class`   | Additional classes for the badge                                                           | `string`  | `''`    |
| `elAriaLabel` | `el-aria-label` | If you are not providing a `label`, this should be provided instead for accessibility      | `string`  | `''`    |
| `icon`        | `icon`          | Class name of icon to display                                                              | `string`  | `''`    |
| `label`       | `label`         | Label text to display                                                                      | `string`  | `''`    |
| `selected`    | `selected`      | Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop | `boolean` | `false` |

### Tab Content Properties

| Property | Attribute | Description                                           | Type     | Default     |
| -------- | --------- | ----------------------------------------------------- | -------- | ----------- |
| `index`  | `index`   | The index of the tab that corresponds to this content | `number` | `undefined` |
| `value`  | `value`   | The index of the selected tab                         | `number` | `undefined` |

<script>
export default {
  data() {
    return {
      activeTab: 1
    }
  }
}
</script>
