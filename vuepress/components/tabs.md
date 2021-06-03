# Tabs

The Moxi Design System tab implementation consists of an `mx-tabs` component that wraps `mx-tab` components.

A tab becomes selected by either setting its `selected` prop to true, _or_ by passing the selected tab index
into the parent `mx-tabs` component via the `value` prop. The `mx-tabs` component also emits a custom `mxChange`
event, which contains the newly selected tab index in the `Event.detail` property.

<!-- #region tabs -->
<section class="mds">
  <!-- The first two examples use the `value` prop and `mxChange` event on the `mx-tabs` component. -->
  <div class="my-20">
    <strong>Horizontal Fill (stretch tabs to fill width)</strong>
    <mx-tabs fill :value="activeTabA" @mxChange="e => activeTabA = e.detail">
      <mx-tab icon="ph-house" label="Home" />
      <mx-tab icon="ph-heart" label="Favorites" badge badge-class="bg-green-600" />
      <mx-tab icon="ph-magnifying-glass" label="Search" />
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Horizontal Stack (set tabs to a min width)</strong>
    <mx-tabs class="mt-10" :value="activeTabB" @mxChange="e => activeTabB = e.detail">
      <mx-tab icon="ph-house" label="Home" />
      <mx-tab icon="ph-heart" label="Favorites" badge badge-class="bg-green-600" />
      <mx-tab icon="ph-magnifying-glass" label="Search" />
    </mx-tabs>
  </div>
  <!-- The next two examples set the `selected` prop and `click` handler on each tab. -->
  <!-- This may be preferred when you want the tab to change with the active route, for example. -->
  <div class="my-20">
    <strong>Icons Only, Horizontal Stack</strong>
    <mx-tabs class="mt-10">
      <mx-tab :selected="activeTabC === 'home'" icon="ph-house" @click="activeTabC = 'home'" />
      <mx-tab :selected="activeTabC === 'favorites'" icon="ph-heart" badge badge-class="bg-red-500" @click="activeTabC = 'favorites'" />
      <mx-tab :selected="activeTabC === 'search'" icon="ph-magnifying-glass" @click="activeTabC = 'search'" />
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Text Only, Horizontal Fill</strong>
    <mx-tabs class="mt-10" fill>
      <mx-tab :selected="activeTabD === 'home'" label="Home" @click="activeTabD = 'home'" />
      <mx-tab :selected="activeTabD === 'favorites'" label="Favorites" @click="activeTabD = 'favorites'" />
      <mx-tab :selected="activeTabD === 'search'" label="Search" @click="activeTabD = 'search'" />
    </mx-tabs>
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
    <mx-tabs fill :value="activeTabE" @mxChange="e => activeTabE = e.detail">
      <mx-tab icon="ph-house" label="Home" />
      <mx-tab icon="ph-heart" label="Favorites" />
      <mx-tab icon="ph-magnifying-glass" label="Search" />
    </mx-tabs>
    <mx-tab-content :value="activeTabE" index="0">
      <p class="px-20">This is the Home tab.</p>
    </mx-tab-content>
    <mx-tab-content :value="activeTabE" index="1">
      <p class="px-20">This is the Favorites tab.</p>
    </mx-tab-content>
    <mx-tab-content :value="activeTabE" index="2">
      <p class="px-20">This is the Search tab.</p>
    </mx-tab-content>
  </div>
</section>
<!-- #endregion tab-content -->

<<< @/vuepress/components/tabs.md#tab-content

### Tabs Properties

| Property | Attribute | Description                                                                                    | Type      | Default |
| -------- | --------- | ---------------------------------------------------------------------------------------------- | --------- | ------- |
| `fill`   | `fill`    | Stretch tabs to fill the entire width                                                          | `boolean` | `false` |
| `value`  | `value`   | The index of the selected tab (not needed if manually setting the `selected` prop on each tab) | `number`  | `null`  |

### Tabs Events

| Event      | Description                                     | Type                  |
| ---------- | ----------------------------------------------- | --------------------- |
| `mxChange` | Emits the clicked tab's index as `Event.detail` | `CustomEvent<number>` |

### Tab Properties

| Property     | Attribute     | Description                                                                           | Type      | Default |
| ------------ | ------------- | ------------------------------------------------------------------------------------- | --------- | ------- |
| `ariaLabel`  | `aria-label`  | If you are not providing a `label`, this should be provided instead for accessibility | `string`  | `''`    |
| `badge`      | `badge`       | Display a dot badge                                                                   | `boolean` | `false` |
| `badgeClass` | `badge-class` | Additional classes for the badge                                                      | `string`  | `''`    |
| `icon`       | `icon`        | Class name of icon to display                                                         | `string`  | `''`    |
| `label`      | `label`       | Label text to display                                                                 | `string`  | `''`    |
| `selected`   | `selected`    | Only set this if you are not using the `mx-tabs` `value` prop                         | `boolean` | `false` |

### Tab Content Properties

| Property | Attribute | Description                                           | Type     | Default     |
| -------- | --------- | ----------------------------------------------------- | -------- | ----------- |
| `index`  | `index`   | The index of the tab that corresponds to this content | `number` | `undefined` |
| `value`  | `value`   | The index of the selected tab                         | `number` | `undefined` |

## CSS Variables

<<< @/src/tailwind/variables/index.scss#tabs

<script>
export default {
  data() {
    return {
      activeTabA: 0,
      activeTabB: 0,
      activeTabC: 'favorites',
      activeTabD: 'search',
      activeTabE: 1,
    }
  }
}
</script>
