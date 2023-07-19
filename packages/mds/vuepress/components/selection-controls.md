# Selection Controls

Selection controls consist of checkboxes, radios, and switches. Also see [Toggle Buttons](/components/buttons.html#toggle-buttons) and [Toggle Button Groups](/components/buttons.html#toggle-button-groups).

## Checkboxes

<!-- #region checkboxes -->
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-checkbox name="foo" label-name="Premier" checked /></div>
    <div><mx-checkbox name="foo" label-name="W Collection" /></div>
    <div><mx-checkbox name="foo" label-name="Equestrian" /></div>
    <div><mx-checkbox name="foo" label-name="Darkness falls across the land, The midnight hour is close at hand" /></div>
    <div><mx-checkbox name="foo" disabled label-name="Disabled" /></div>
    <div><mx-checkbox name="foo" checked disabled label-name="Disabled" /></div>
    <div><mx-checkbox name="foo" indeterminate label-name="Indeterminate" /></div>
    <div><mx-checkbox name="foo" indeterminate disabled label-name="Indeterminate" /></div>
  </div>
</div>
<!-- #endregion checkboxes -->

<<< @/vuepress/components/selection-controls.md#checkboxes

### Checkbox Properties

| Property        | Attribute       | Description                                                                   | Type      | Default     |
| --------------- | --------------- | ----------------------------------------------------------------------------- | --------- | ----------- |
| `checked`       | `checked`       |                                                                               | `boolean` | `false`     |
| `disabled`      | `disabled`      |                                                                               | `boolean` | `false`     |
| `elAriaLabel`   | `el-aria-label` | The aria-label attribute for the inner input element.                         | `string`  | `undefined` |
| `hideLabel`     | `hide-label`    | Hide the label text visually, but still make it accessible for screen readers | `boolean` | `false`     |
| `indeterminate` | `indeterminate` |                                                                               | `boolean` | `false`     |
| `labelClass`    | `label-class`   |                                                                               | `string`  | `''`        |
| `labelLeft`     | `label-left`    |                                                                               | `boolean` | `false`     |
| `labelName`     | `label-name`    |                                                                               | `string`  | `''`        |
| `name`          | `name`          |                                                                               | `string`  | `''`        |
| `value`         | `value`         |                                                                               | `string`  | `''`        |

## Radio Buttons

<!-- #region radio-buttons -->
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-radio name="foo" label-name="Premier" /></div>
    <div><mx-radio name="foo" label-name="W Collection" /></div>
    <div><mx-radio name="foo" label-name="Equestrian" /></div>
    <div><mx-radio name="foo" label-name="Darkness falls across the land, The midnight hour is close at hand" /></div>
    <div><mx-radio name="foo" disabled label-name="Disabled" /></div>
    <div><mx-radio name="foo" disabled checked label-name="Disabled" /></div>
  </div>
</div>
<!-- #endregion radio-buttons -->

<<< @/vuepress/components/selection-controls.md#radio-buttons

### Radio Button Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `checked`    | `checked`     |             | `boolean` | `false` |
| `disabled`   | `disabled`    |             | `boolean` | `false` |
| `labelClass` | `label-class` |             | `string`  | `''`    |
| `labelName`  | `label-name`  |             | `string`  | `''`    |
| `name`       | `name`        |             | `string`  | `''`    |
| `value`      | `value`       |             | `string`  | `''`    |

## Switches

<!-- #region switches -->
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-switch name="foo" label-name="Premier" /></div>
    <div><mx-switch name="foo" label-name="W Collection" /></div>
    <div><mx-switch name="foo" label-name="Equestrian" /></div>
    <div><mx-switch name="foo" label-name="Darkness falls across the land, The midnight hour is close at hand" /></div>
    <div><mx-switch name="foo" disabled label-name="Disabled" /></div>
    <div><mx-switch name="foo" disabled checked label-name="Disabled" /></div>
  </div>
</div>
<!-- #endregion switches -->

<<< @/vuepress/components/selection-controls.md#switches

### Switch Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `checked`    | `checked`     |             | `boolean` | `false` |
| `disabled`   | `disabled`    |             | `boolean` | `false` |
| `labelClass` | `label-class` |             | `string`  | `''`    |
| `labelName`  | `label-name`  |             | `string`  | `''`    |
| `name`       | `name`        |             | `string`  | `''`    |
| `value`      | `value`       |             | `string`  | `''`    |
