# Tabs

The Moxi Design System tab implementation consists of an `mx-tabs` component that wraps `mx-tab` components.

<!-- #region tabs -->
<section class="mds">
  <div class="my-20">
    <strong>Horizontal Fill (stretch tabs to fill width)</strong>
    <mx-tabs fill>
      <mx-tab :selected="activeTabA === 0" icon="ph-house" label="Home" @click="activeTabA = 0"></mx-tab>
      <mx-tab :selected="activeTabA === 1" icon="ph-heart" label="Favorites" badge badge-class="bg-green-600" @click="activeTabA = 1"></mx-tab>
      <mx-tab :selected="activeTabA === 2" icon="ph-magnifying-glass" label="Search" @click="activeTabA = 2"></mx-tab>
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Horizontal Stack (set tabs to a min width)</strong>
    <mx-tabs class="mt-10">
      <mx-tab :selected="activeTabB === 0" icon="ph-house" label="Home" @click="activeTabB = 0"></mx-tab>
      <mx-tab :selected="activeTabB === 1" icon="ph-heart" label="Favorites" badge badge-class="bg-green-600" @click="activeTabB = 1"></mx-tab>
      <mx-tab :selected="activeTabB === 2" icon="ph-magnifying-glass" label="Search" @click="activeTabB = 2"></mx-tab>
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Icons Only, Horizontal Stack</strong>
    <mx-tabs class="mt-10">
      <mx-tab :selected="activeTabC === 0" icon="ph-house" @click="activeTabC = 0"></mx-tab>
      <mx-tab :selected="activeTabC === 1" icon="ph-heart" badge badge-class="bg-red-500" @click="activeTabC = 1"></mx-tab>
      <mx-tab :selected="activeTabC === 2" icon="ph-magnifying-glass" @click="activeTabC = 2"></mx-tab>
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Text Only, Horizontal Fill</strong>
    <mx-tabs class="mt-10" fill>
      <mx-tab :selected="activeTabD === 0" label="Home" @click="activeTabD = 0"></mx-tab>
      <mx-tab :selected="activeTabD === 1" label="Favorites" @click="activeTabD = 1"></mx-tab>
      <mx-tab :selected="activeTabD === 2" label="Search" @click="activeTabD = 2"></mx-tab>
    </mx-tabs>
  </div>
</section>
<!-- #endregion tabs -->

<<< @/vuepress/components/tabs.md#tabs

### Tabs Properties

| Property | Attribute | Description                           | Type      | Default |
| -------- | --------- | ------------------------------------- | --------- | ------- |
| `fill`   | `fill`    | Stretch tabs to fill the entire width | `boolean` | `false` |

### Tab Properties

| Property     | Attribute     | Description                                                                                 | Type      | Default |
| ------------ | ------------- | ------------------------------------------------------------------------------------------- | --------- | ------- |
| `ariaLabel`  | `aria-label`  | If you are not providing a visible label, this should be provided instead for accessibility | `string`  | `''`    |
| `badge`      | `badge`       | Display a dot badge                                                                         | `boolean` | `false` |
| `badgeClass` | `badge-class` | Additional classes for the badge                                                            | `string`  | `''`    |
| `icon`       | `icon`        | Class name of icon to display                                                               | `string`  | `''`    |
| `label`      | `label`       | Label text to display                                                                       | `string`  | `''`    |
| `selected`   | `selected`    |                                                                                             | `boolean` | `false` |

<script>
export default {
  data() {
    return {
      activeTabA: 0,
      activeTabB: 0,
      activeTabC: 1,
      activeTabD: 2
    }
  }
}
</script>
