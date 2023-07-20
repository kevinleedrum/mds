# Floating Action Buttons

Floating Action Buttons represent primary, or occasionally secondary, actions on the screen. On small screens, Regular FABs shrink to a smaller size.

<!-- #region fabs -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div>
      <strong>Regular</strong>
      <div class="flex items-center mt-20 space-x-20">
        <mx-fab icon="ph-pencil" el-aria-label="Edit" />
        <mx-fab icon="ph-heart" secondary el-aria-label="Like" />
        <mx-fab el-aria-label="OK">
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1 7l4.5 4.5L14 3" stroke="currentColor" stroke-linecap="square"></path></svg>
        </mx-fab>
      </div>
    </div>
    <div>
      <strong>Extended (includes a text label)</strong>
      <div class="flex items-center mt-20 space-x-20">
        <mx-fab icon="ph-floppy-disk">Save</mx-fab>
        <mx-fab>Create</mx-fab>
      </div>
    </div>
  </div>
</section>
<!-- #endregion fabs -->

<<< @/vuepress/components/fabs.md#fabs

### Properties

| Property      | Attribute       | Description                                            | Type      | Default     |
| ------------- | --------------- | ------------------------------------------------------ | --------- | ----------- |
| `elAriaLabel` | `el-aria-label` | The aria-label attribute for the inner button element. | `string`  | `undefined` |
| `icon`        | `icon`          | Class name of icon                                     | `string`  | `undefined` |
| `secondary`   | `secondary`     | Style as a secondary action                            | `boolean` | `false`     |
| `value`       | `value`         |                                                        | `string`  | `undefined` |
