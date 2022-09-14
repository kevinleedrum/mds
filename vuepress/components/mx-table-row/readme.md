# mx-table-row



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                                           | Type                | Default     |
| -------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `actions`            | --                     | An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. | `ITableRowAction[]` | `[]`        |
| `checked`            | `checked`              |                                                                                                                       | `boolean`           | `false`     |
| `collapseNestedRows` | `collapse-nested-rows` | Toggles the visibility of all nested rows (except those set to `doNotCollapse`)                                       | `boolean`           | `false`     |
| `doNotCollapse`      | `do-not-collapse`      | Do not collapse this row if the parent row's `collapseNestedRows` prop is set to `true`.                              | `boolean`           | `false`     |
| `doNotDrag`          | `do-not-drag`          | Do not allow dragging of this row even if the parent table's `draggableRows` prop is set to `true`.                   | `boolean`           | `false`     |
| `rowId`              | `row-id`               | This is required for checkable rows in order to persist the checked state through sorting and pagination.             | `string`            | `undefined` |
| `rowIndex`           | `row-index`            | This row's index in the `HTMLMxTableElement.rows` array.  This is set internally by the table component.              | `number`            | `undefined` |
| `subheader`          | `subheader`            | Style the row as a subheader.                                                                                         | `boolean`           | `false`     |


## Events

| Event            | Description                                                                                                | Type                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `mxCheck`        | Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked           | `CustomEvent<{ rowId: string; checked: boolean; }>`        |
| `mxDragKeyDown`  | Emits the `KeyboardEvent.key` when a key is pressed while keyboard dragging.  Handled by the parent table. | `CustomEvent<string>`                                      |
| `mxRowAccordion` | Emitted when a row is collapsed or expanded.  Handled by the parent table.                                 | `CustomEvent<void>`                                        |
| `mxRowDragEnd`   | Emitted when dragging ends.  Handled by the parent table.                                                  | `CustomEvent<{ isKeyboard: boolean; isCancel: boolean; }>` |
| `mxRowDragStart` | Emitted when dragging starts.  Handled by the parent table.                                                | `CustomEvent<{ isKeyboard: boolean; }>`                    |


## Methods

### `collapse(skipTransition?: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `focusDragHandle() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getChildren() => Promise<HTMLElement[]>`

Returns the immediate children of the row, as well as the immediate children of all nested
rows.  If a child is `display: contents` (i.e. the first column wrapper), then its children
are added.

#### Returns

Type: `Promise<HTMLElement[]>`



### `getHeight() => Promise<number>`

Calculate the height of the row, including the height of nested rows

#### Returns

Type: `Promise<number>`



### `getNestedRowIndexes() => Promise<number[]>`

Get an array of row IDs for rows nested directly inside this row

#### Returns

Type: `Promise<number[]>`



### `toggle(hideRow: boolean, skipTransition: boolean) => Promise<void>`

Show/hide the row (with an optional accordion transition)

#### Returns

Type: `Promise<void>`



### `translateRow(x: number, y: number) => Promise<void>`

Apply a CSS transform to translate the row by `x` and `y` pixels

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [mx-table](../mx-table)

### Depends on

- [mx-checkbox](../mx-checkbox)
- [mx-button](../mx-button)
- [mx-icon-button](../mx-icon-button)
- [mx-menu](../mx-menu)
- [mx-menu-item](../mx-menu-item)

### Graph
```mermaid
graph TD;
  mx-table-row --> mx-checkbox
  mx-table-row --> mx-button
  mx-table-row --> mx-icon-button
  mx-table-row --> mx-menu
  mx-table-row --> mx-menu-item
  mx-menu-item --> mx-checkbox
  mx-table --> mx-table-row
  style mx-table-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


