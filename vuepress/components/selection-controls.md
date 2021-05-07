# Selection Controls

Selection controls consist of checkboxes, radios, and switches.

## Checkboxes

<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-checkbox name="foo" label-name="Premier" checked="true" /></div>
    <div><mx-checkbox name="foo" label-name="W Collection" /></div>
    <div><mx-checkbox name="foo" label-name="Equestrian" /></div>
    <div><mx-checkbox name="foo" label-name="Warlock" /></div>
  </div>
</div>

```html
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-checkbox name="foo" label-name="Premier" checked="true" /></div>
    <div><mx-checkbox name="foo" label-name="W Collection" /></div>
    <div><mx-checkbox name="foo" label-name="Equestrian" /></div>
    <div><mx-checkbox name="foo" label-name="Warlock" /></div>
  </div>
</div>
```

### Properties

| Property     | Attribute    | Description | Type      | Default     |
| ------------ | ------------ | ----------- | --------- | ----------- |
| `checked`    | `checked`    |             | `boolean` | `false`     |
| `identifier` | `identifier` |             | `string`  | `nanoid(5)` |
| `labelName`  | `label-name` |             | `string`  | `''`        |
| `name`       | `name`       |             | `string`  | `''`        |
| `value`      | `value`      |             | `string`  | `''`        |

## Radio Buttons

<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-radio name="foo" label-name="Premier" /></div>
    <div><mx-radio name="foo" label-name="W Collection" /></div>
    <div><mx-radio name="foo" label-name="Equestrian" /></div>
    <div><mx-radio name="foo" label-name="Warlock" /></div>
  </div>
</div>

```html
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-radio name="foo" label-name="Premier" /></div>
    <div><mx-radio name="foo" label-name="W Collection" /></div>
    <div><mx-radio name="foo" label-name="Equestrian" /></div>
    <div><mx-radio name="foo" label-name="Warlock" /></div>
  </div>
</div>
```

### Properties

| Property     | Attribute    | Description | Type      | Default     |
| ------------ | ------------ | ----------- | --------- | ----------- |
| `checked`    | `checked`    |             | `boolean` | `false`     |
| `identifier` | `identifier` |             | `string`  | `nanoid(5)` |
| `labelName`  | `label-name` |             | `string`  | `''`        |
| `name`       | `name`       |             | `string`  | `''`        |
| `value`      | `value`      |             | `string`  | `''`        |
