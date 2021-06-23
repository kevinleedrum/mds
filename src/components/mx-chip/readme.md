# mx-chip



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                                 | Type      | Default     |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `avatarUrl` | `avatar-url` | URL of image to show on the left                                                                                            | `string`  | `undefined` |
| `choice`    | `choice`     | Style as a choice chip when selected. This is set internally when the chip is wrapped with an `mx-chip-group`.              | `boolean` | `false`     |
| `clickable` | `clickable`  | Use the pointer cursor and show a ripple animation. This does not need to be explicitly set for `choice` or `filter` chips. | `boolean` | `false`     |
| `disabled`  | `disabled`   |                                                                                                                             | `boolean` | `false`     |
| `filter`    | `filter`     | Style as a filter chip when selected                                                                                        | `boolean` | `false`     |
| `icon`      | `icon`       | Class name of icon to show on the left                                                                                      | `string`  | `undefined` |
| `outlined`  | `outlined`   |                                                                                                                             | `boolean` | `false`     |
| `removable` | `removable`  | Show the remove icon on the right                                                                                           | `boolean` | `false`     |
| `selected`  | `selected`   | Display a checkmark on the left side of the chip                                                                            | `boolean` | `false`     |
| `value`     | `value`      | The value associated with a choice chip (used with `mx-chip-group`)                                                         | `any`     | `undefined` |


## Events

| Event      | Description                             | Type                      |
| ---------- | --------------------------------------- | ------------------------- |
| `mxRemove` | Emitted when the remove icon is clicked | `CustomEvent<MouseEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
