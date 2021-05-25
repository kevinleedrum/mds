# Data Display

## Badges

A Badge can be used as a standalone component, or it can wrap another element in order to place
itelf in a corner of that element.

<!-- #region badges -->
<section class="mds">
  <div class="mt-10">
    <strong>Standalone Badges</strong>
    <div class="flex items-center my-5 space-x-20">
      <mx-badge badge-class="bg-blue-500 text-white" value="Pending" squared />
      <mx-badge badge-class="bg-red-800 text-white" value="8" />
      <mx-badge badge-class="bg-yellow-200" value="999+" />
      <mx-badge badge-class="bg-green-200 text-green-800" icon="ph-star" value="Popular" squared />
    </div>
    <strong>Anchored Badges</strong>
    <div class="flex items-center my-5 space-x-20">
      <mx-badge badge-class="bg-purple-500 text-white" value="237">
        <mx-button btn-type="action" icon="ph-bell">Notifications</mx-button>
      </mx-badge>
      <mx-badge badge-class="bg-red-500 text-white" icon="ph-x" bottom snug>
        <mx-button btn-type="icon" icon="ph-video-camera" />
      </mx-badge>
      <mx-badge badge-class="bg-yellow-300" dot tight>
        <mx-button btn-type="action">Announcements</mx-button>
      </mx-badge>
      <mx-badge badge-class="bg-gray-700 text-white" value="3" bottom left snug>
        <mx-button btn-type="icon" icon="ph-shopping-cart" />
      </mx-badge>
    </div>
  </div>
</section>
<!-- #endregion badges -->

<<< @/vuepress/components/data-display.md#badges

### Badge Properties

| Property     | Attribute     | Description                                                      | Type      | Default     |
| ------------ | ------------- | ---------------------------------------------------------------- | --------- | ----------- |
| `value`      | `value`       | The value to display inside the badge                            | `any`     | `undefined` |
| `squared`    | `squared`     | Make the corners a little more square (best for standalone text) | `boolean` | `false`     |
| `dot`        | `dot`         | Display as a small dot (no value)                                | `boolean` | `false`     |
| `badgeClass` | `badge-class` | Additional classes to add to the badge itself                    | `string`  | `undefined` |
| `icon`       | `icon`        | Class name of icon                                               | `string`  | `undefined` |
| `tight`      | `tight`       | Place anchored badge further inward                              | `boolean` | `false`     |
| `snug`       | `snug`        | Place badge even further inward (suitable for icon buttons)      | `boolean` | `false`     |
| `bottom`     | `bottom`      | Anchor the badge to the bottom of the wrapped content            | `boolean` | `false`     |
| `left`       | `left`        | Anchor the badge to the left of the wrapped content              | `boolean` | `false`     |
