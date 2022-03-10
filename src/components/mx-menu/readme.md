# mx-menu



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                      | Type                                                                                                                                                                                                         | Default          |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `anchorEl`         | --                  | The element to which the menu's position will be anchored                                                                                        | `HTMLElement`                                                                                                                                                                                                | `undefined`      |
| `autocompleteOnly` | `autocomplete-only` | If the anchor element contains an `input`, setting this to `true` will always select the first menu item when Enter is pressed inside the input. | `boolean`                                                                                                                                                                                                    | `false`          |
| `isOpen`           | `is-open`           | This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes.                | `boolean`                                                                                                                                                                                                    | `false`          |
| `offset`           | --                  | An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`.  The second is the distance from the `anchorEl`.    | `[number, number]`                                                                                                                                                                                           | `undefined`      |
| `placement`        | `placement`         | The placement of the menu, relative to the `anchorEl`.                                                                                           | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `triggerEl`        | --                  | The element that will open the menu when clicked.  If not provided, the `anchorEl' will be used.                                                 | `HTMLElement`                                                                                                                                                                                                | `undefined`      |


## Events

| Event     | Description                   | Type                |
| --------- | ----------------------------- | ------------------- |
| `mxClose` | Emitted when the menu closes. | `CustomEvent<void>` |
| `mxOpen`  | Emitted when the menu opens.  | `CustomEvent<void>` |


## Methods

### `closeMenu() => Promise<boolean>`

Close the menu.  Returns a promise that resolves to false if the menu was already closed.

#### Returns

Type: `Promise<boolean>`



### `openMenu() => Promise<boolean>`

Open the menu.  Returns a promise that resolves to false if the menu was already open.

#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [mx-dropdown-menu](../mx-dropdown-menu)
 - [mx-page-header](../mx-page-header)
 - [mx-pagination](../mx-pagination)
 - [mx-table](../mx-table)
 - [mx-table-row](../mx-table-row)
 - [mx-time-picker](../mx-time-picker)

### Graph
```mermaid
graph TD;
  mx-dropdown-menu --> mx-menu
  mx-page-header --> mx-menu
  mx-pagination --> mx-menu
  mx-table --> mx-menu
  mx-table-row --> mx-menu
  mx-time-picker --> mx-menu
  style mx-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
