# mx-button

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                 | Type                                              | Default       |
| ---------- | ---------- | ------------------------------------------- | ------------------------------------------------- | ------------- |
| `btnType`  | `btn-type` |                                             | `"action" \| "contained" \| "outlined" \| "text"` | `'contained'` |
| `disabled` | `disabled` |                                             | `boolean`                                         | `false`       |
| `dropdown` | `dropdown` | Show chevron icon                           | `boolean`                                         | `false`       |
| `full`     | `full`     | Sets display to flex instead of inline-flex | `boolean`                                         | `false`       |
| `href`     | `href`     | Create button as link                       | `string`                                          | `undefined`   |
| `icon`     | `icon`     | Class name of icon                          | `string`                                          | `undefined`   |
| `target`   | `target`   | Only for link buttons                       | `string`                                          | `undefined`   |
| `type`     | `type`     |                                             | `"button" \| "reset" \| "submit"`                 | `'button'`    |
| `value`    | `value`    |                                             | `string`                                          | `undefined`   |
| `xl`       | `xl`       |                                             | `boolean`                                         | `false`       |


## Dependencies

### Used by

 - [mx-page-header](../mx-page-header)
 - [mx-table](../mx-table)
 - [mx-table-row](../mx-table-row)

### Graph
```mermaid
graph TD;
  mx-page-header --> mx-button
  mx-table --> mx-button
  mx-table-row --> mx-button
  style mx-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
