# Search Fields

<!-- #region search -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div class="space-y-20">
      <strong>Regular</strong>
      <mx-search name="search" placeholder="Search" />
    </div>
    <div class="space-y-20">
      <strong>Dense</strong>
      <mx-search dense name="search" placeholder="Search" />
    </div>
    <div class="space-y-20">
      <strong>Flat</strong>
      <mx-search flat name="search" placeholder="Search" />
    </div>
    <div class="space-y-20">
      <strong>Flat Dense</strong>
      <mx-search flat dense name="search" placeholder="Search" />
    </div>
  </div>
</section>
<!-- #endregion search -->

<<< @/vuepress/components/search.md#search

### Events

| Event     | Description                               | Type                |
| --------- | ----------------------------------------- | ------------------- |
| `mxClear` | Emitted when the clear button is clicked. | `CustomEvent<void>` |

### Properties

| Property      | Attribute       | Description                                                                                                                                                 | Type      | Default     |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `dense`       | `dense`         |                                                                                                                                                             | `boolean` | `false`     |
| `elAriaLabel` | `el-aria-label` | The `aria-label` attribute for the `<input>` element. If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search". | `string`  | `undefined` |
| `flat`        | `flat`          |                                                                                                                                                             | `boolean` | `false`     |
| `name`        | `name`          |                                                                                                                                                             | `string`  | `undefined` |
| `placeholder` | `placeholder`   |                                                                                                                                                             | `string`  | `undefined` |
| `showClear`   | `show-clear`    | Set to `false` to hide the clear button.                                                                                                                    | `boolean` | `true`      |
| `value`       | `value`         |                                                                                                                                                             | `string`  | `undefined` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#search
