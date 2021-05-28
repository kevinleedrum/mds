# Tabs

The Moxi Design System tab implementation consists of an `mx-tabs` component that wraps `mx-tab` components.

<!-- #region tabs -->
<section class="mds">
  <div class="my-20">
    <strong>Horizontal Fill (stretch tabs to fill width)</strong>
    <mx-tabs fill>
      <mx-tab :selected="activeTab === 0" icon="ph-house" label="Home" @click="activeTab = 0"></mx-tab>
      <mx-tab :selected="activeTab === 1" icon="ph-heart" label="Favorites" badge badge-class="bg-green-600" @click="activeTab = 1"></mx-tab>
      <mx-tab :selected="activeTab === 2" icon="ph-magnifying-glass" label="Search" @click="activeTab = 2"></mx-tab>
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Horizontal Stack (set tabs to a min width)</strong>
    <mx-tabs class="mt-10">
      <mx-tab :selected="activeTab === 0" icon="ph-house" label="Home" @click="activeTab = 0"></mx-tab>
      <mx-tab :selected="activeTab === 1" icon="ph-heart" label="Favorites" badge badge-class="bg-green-600" @click="activeTab = 1"></mx-tab>
      <mx-tab :selected="activeTab === 2" icon="ph-magnifying-glass" label="Search" @click="activeTab = 2"></mx-tab>
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Icons Only, Horizontal Stack</strong>
    <mx-tabs class="mt-10">
      <mx-tab :selected="activeTab === 0" icon="ph-house" @click="activeTab = 0"></mx-tab>
      <mx-tab :selected="activeTab === 1" icon="ph-heart" badge badge-class="bg-red-500" @click="activeTab = 1"></mx-tab>
      <mx-tab :selected="activeTab === 2" icon="ph-magnifying-glass" @click="activeTab = 2"></mx-tab>
    </mx-tabs>
  </div>
  <div class="my-20">
    <strong>Text Only, Horizontal Fill</strong>
    <mx-tabs class="mt-10" fill>
      <mx-tab :selected="activeTab === 0" label="Home" @click="activeTab = 0"></mx-tab>
      <mx-tab :selected="activeTab === 1" label="Favorites" @click="activeTab = 1"></mx-tab>
      <mx-tab :selected="activeTab === 2" label="Search" @click="activeTab = 2"></mx-tab>
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
      activeTab: 1
    }
  }
}
</script>
