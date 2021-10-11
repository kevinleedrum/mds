# Badges

A Badge can be used as a standalone component, or it can wrap another element in order to place
itelf in a corner of that element.

<!-- #region badges -->
<section class="mds">
  <div class="mt-10">
    <strong>Standalone Badges</strong>
    <div class="flex items-center my-20 space-x-20">
      <mx-badge badge-class="bg-blue-500 text-white" value="Pending" squared />
      <mx-badge badge-class="bg-red-800 text-white" value="8" />
      <mx-badge badge-class="bg-yellow-200" value="999+" />
      <mx-badge badge-class="bg-green-200 text-green-800" icon="ph-star" value="Popular" squared />
      <mx-badge badge-class="text-green-500" indicator />
      <mx-badge badge-class="text-black" indicator="square" />
      <mx-badge badge-class="text-yellow-300" indicator="triangle-up" />
      <mx-badge badge-class="text-yellow-600" indicator="hexagon" />
      <mx-badge badge-class="text-red-600" indicator="triangle-down" />
      <mx-badge badge-class="text-blue-400" indicator="star" />
    </div>
    <strong>Anchored Badges</strong>
    <div class="flex items-center my-20 space-x-20">
      <mx-badge badge-class="bg-purple-500 text-white" value="237">
        <mx-button btn-type="action" icon="ph-bell">Notifications</mx-button>
      </mx-badge>
      <mx-badge badge-class="bg-red-500 text-white" icon="ph-x" bottom offset="10">
        <mx-icon-button icon="ph-video-camera" />
      </mx-badge>
      <mx-badge badge-class="text-red-600" indicator offset="4">
        <mx-button btn-type="action">Announcements</mx-button>
      </mx-badge>
      <mx-badge badge-class="text-yellow-300" indicator="star" top left offset="12">
        <mx-icon-button icon="ph-user-circle" />
      </mx-badge>
      <mx-badge badge-class="bg-blue-700 text-white" value="3" bottom left offset="10">
        <mx-icon-button icon="ph-shopping-cart" />
      </mx-badge>
    </div>
  </div>
</section>
<!-- #endregion badges -->

<<< @/vuepress/components/badges.md#badges

### Badge Properties

| Property     | Attribute     | Description                                                                                                                                      | Type                                                                        | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ----------- |
| `badgeClass` | `badge-class` | Additional classes to add to the badge itself                                                                                                    | `string`                                                                    | `undefined` |
| `bottom`     | `bottom`      | Anchor the badge to the bottom of the wrapped content                                                                                            | `boolean`                                                                   | `false`     |
| `icon`       | `icon`        | Class name of icon                                                                                                                               | `string`                                                                    | `undefined` |
| `indicator`  | `indicator`   | Render as a small indicator shape with no inner text. If the prop is present, but no string value is passed, the shape will default to a circle. | `"hexagon" | "square" | "star" | "triangle-down" | "triangle-up" | boolean` | `undefined` |
| `left`       | `left`        | Anchor the badge to the left of the wrapped content                                                                                              | `boolean`                                                                   | `false`     |
| `offset`     | `offset`      | Offset badge inward by this many pixels (e.g. 10 for icon buttons)                                                                               | `number`                                                                    | `0`         |
| `squared`    | `squared`     | Make the corners a little more square (best for standalone text)                                                                                 | `boolean`                                                                   | `false`     |
| `value`      | `value`       | The value to display inside the badge                                                                                                            | `any`                                                                       | `undefined` |
