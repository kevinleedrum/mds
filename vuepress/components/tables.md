# Data Tables

The `mx-table` component can be used one of two ways:

- &bull; by providing an array of data via the `rows` prop, allowing the table to automatically generate rows and cells
- &bull; by templating the rows and cells manually using `mx-table-row` and `mx-table-cell` components

On smaller, mobile-sized screens, the Data Table component shows one column of data at a time for each row, though rows may be expanded to reveal the remaining data.

## Basic data-driven table

To create a basic data table with auto-generated rows, provide a `rows` prop containing your data, as well as a `columns` prop, which is an array of [`ITableColumn`](#itablecolumn) objects that define the tables columns.

<section class="mds">
  <div class="mt-20">
    <!-- #region basic -->
    <mx-table
      paginate="false"
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'credits', heading: 'Song Credits', type: 'number' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
        { property: 'eyeColor', heading: 'Eye Color', sortable: false }
      ]"
    />
    <!-- #endregion basic -->
  </div>
</section>

<<< @/vuepress/components/tables.md#basic
<<< @/vuepress/components/tables.md#beatles

## Pagination

By default, the `paginate` prop is set to `true`, which will break the rows up into pages that are limited to `rowsPerPage` (the default is 10).

<section class="mds">
  <div class="mt-20"></div>
    <!-- #region paginated -->
    <mx-table
      rows-per-page="5"
      :rows-per-page-options.prop="[5, 10, 25, 50]"
      :rows.prop="albums"
      :columns.prop="[
        { property: 'entertainer', heading: 'Artist', sortable: false },
        { property: 'album', heading: 'Album' },
        { property: 'releasedate', heading: 'Release Date', type: 'date' },
        { property: 'label', heading: 'Label' },
      ]"
    />
    <!-- #endregion paginated -->
  </div>
</section>

<<< @/vuepress/components/tables.md#paginated

## Cell value getters

You can use the `getValue` property of `ITableColumn` to pass a value getter for a column. This can even return HTML.

<section class="mds">
  <div class="mt-20">
    <!-- #region components -->
    <mx-table
      auto-width
      paginate="false"
      hoverable="false"
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'isLeftHanded', heading: 'Handedness', getValue: buildBadge },
      ]"
    />
    <!-- #endregion components -->
  </div>
</section>

<<< @/vuepress/components/tables.md#components
<<< @/vuepress/components/tables.md#build-html

## Row actions

The `getRowActions` prop is function that accepts the `row` as a parameter and returns an array of props to generate [Menu Items](/components/menus.html) (or a [Text Button](/components/buttons.html#text-buttons) if there is only one action). For the inner text of the menu item / button, pass it as a `value` property.

<section class="mds">
  <div class="mt-20">
    <!-- #region action-menu -->
    <mx-table
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'credits', heading: 'Song Credits', type: 'number' }
      ]"
      :get-row-actions.prop="row => ([
        { value: 'Edit ' + row.firstName, onClick: () => clickHandler(row) },
        { value: 'Delete', onClick: () => clickHandler(row) }
      ])"
    />
    <mx-table
      class="mt-20"
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
        { property: 'credits', heading: 'Song Credits', type: 'number' }
      ]"
      :get-row-actions.prop="row => ([
        { value: 'Edit', icon: 'ph-pencil', onClick: () => clickHandler(row) }
      ])"
    />
    <!-- #endregion action-menu -->
  </div>
</section>

<<< @/vuepress/components/tables.md#action-menu

## Row selection

Setting the `checkable` prop on a table adds checkboxes to the rows to allow selecting one or more rows. When this is set, each row must be given a unique identifier in order to track the selected rows. This can be done by providing a `getRowId` function that tells the table how to generate the `rowId` for each row.

<section class="mds">
  <div class="mt-20">
    <!-- #region checkboxes -->
    <mx-table
      checkable
      :get-row-id.prop="row => row.id"
      :rows.prop="albums"
      :columns.prop="[
        { property: 'entertainer', heading: 'Artist', sortable: false },
        { property: 'album', heading: 'Album' },
        { property: 'releasedate', heading: 'Release Date', type: 'date' },
        { property: 'label', heading: 'Label' },
      ]"
    />
    <!-- #endregion checkboxes -->
  </div>
</section>

<<< @/vuepress/components/tables.md#checkboxes

## Multi-row actions

The `getMultiRowActions` prop can be used to generate an action menu/button for the selected rows. The `getMultiRowActions` function receives the selected `rowId`s as its only parameter. Similar to the [inline row actions](#row-actions), the function should return an array of [Menu Item](/components/menus.html) or [Text Button](/components/buttons.html#text-buttons) prop objects with a `value` property for the inner text of the menu item.

<section class="mds">
  <div class="mt-20">
    <!-- #region multi-row -->
    <mx-table
      ref="multitable1"
      checkable
      :get-row-id.prop="row => row.firstName"
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
        { property: 'eyeColor', heading: 'Eye Color' },
      ]"
      :get-multi-row-actions.prop="rowIds => ([
        {
          value: `Merge ${rowIds.length > 1 ? rowIds.length : ''} rows`,
          disabled: rowIds.length < 2,
          onClick: () => multiRowClickHandler(rowIds)
        },
        { value: 'Delete', onClick: () => multiRowClickHandler(rowIds) },
      ])"
    />
    <mx-table
      ref="multitable2"
      class="mt-20"
      checkable
      :get-row-id.prop="row => row.firstName"
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
      ]"
      :get-multi-row-actions.prop="rowIds => ([
        { value: 'Delete', icon: 'ph-trash', onClick: () => multiRowClickHandler(rowIds) }
      ])"
    />
    <!-- #endregion multi-row -->
  </div>
</section>

<<< @/vuepress/components/tables.md#multi-row
<<< @/vuepress/components/tables.md#multi-row-click-handler

## Custom layouts

Table rows can be manually templated using `mx-table-row` and `mx-table-cell` components within the table's default slot.

If you are relying on client-side sorting and pagination, you should iterate over the sorted/paginated array of rows that is emitted via the table's `mxVisibleRowsChange` event when creating your `mx-table-row` instances. This event fires once after the table first loads, as well as any time the sorting, pagination, or `rows` data is altered.

For checkable tables, you do not need to add the checkboxes to your custom layout; those will be added automatically. The action button/menu for each row is also generated for you if you provide an `actions` prop.

<section class="mds">
  <div class="mt-20">
    <!-- #region slot -->
    <mx-table
      checkable
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
        { property: 'eyeColor', heading: 'Eye Color' },
      ]"
      @mxVisibleRowsChange="e => visibleRows = e.detail"
    >
      <div>
        <mx-table-row
          v-for="(row, i) in visibleRows"
          :key="row.firstName"
          :row-id="row.firstName"
          :actions.prop="[{ value: 'Delete', onClick: () => clickHandler(row) }]"
        >
          <mx-table-cell>{{ row.firstName }}</mx-table-cell>
          <mx-table-cell>{{ row.lastName }}</mx-table-cell>
          <mx-table-cell>{{ row.birthdate.toLocaleDateString() }}</mx-table-cell>
          <mx-table-cell>
            <mx-badge
              indicator
              :style="{ color: getEyeColorHex(row.eyeColor) }"
              :title="row.eyeColor"
            ></mx-badge>
          </mx-table-cell>
        </mx-table-row>
      </div>
    </mx-table>
    <!-- #endregion slot -->
  </div>
</section>

<<< @/vuepress/components/tables.md#slot

## Search & filter slots

The `mx-table` component has both a `search` slot to accomodate a Search field, and a `filter` slot for any additional filter components.

<section class="mds">
  <div class="mt-20"></div>
    <!-- #region search-filter -->
    <mx-table
      rows-per-page="5"
      :rows-per-page-options.prop="[5, 10, 25, 50]"
      :rows.prop="filteredAlbums"
      :columns.prop="[
        { property: 'entertainer', heading: 'Artist', sortable: false },
        { property: 'album', heading: 'Album' },
        { property: 'releasedate', heading: 'Release Date', type: 'date' },
        { property: 'label', heading: 'Label' }
      ]"
    >
      <mx-search
        slot="search"
        :value="albumSearch"
        dense
        placeholder="Search"
        @input="albumSearch = $event.target.value"
      />
      <div slot="filter">
        <mx-button ref="labelMenuButton" btn-type="action" dropdown>
          {{ (this.albumLabelFilters.length || 'All') +
          (this.albumLabelFilters.length === 1 ? ' Label' : ' Labels') }}
        </mx-button>
        <mx-menu ref="labelMenu">
          <mx-menu-item
            v-for="label in albumLabels"
            :key="label"
            multi-select
            :checked="albumLabelFilters.includes(label)"
            @input="toggleLabelFilter(label)"
          >
            {{ label }}
          </mx-menu-item>
        </mx-menu>
      </div>
    </mx-table>
    <!-- #endregion search-filter -->
  </div>
</section>

<<< @/vuepress/components/tables.md#search-filter
<<< @/vuepress/components/tables.md#filtered-albums

## Empty state

The `mx-table` component has a default empty state for when there are no visible rows, which can be overridden using the `empty-state` slot.

<section class="mds">
  <div class="mt-20">
    <!-- #region empty-state -->
    <mx-table
      :rows.prop="[]"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'credits', heading: 'Song Credits', type: 'number' },
      ]"
    />
    <mx-table
      class="mt-20"
      paginate="false"
      :rows.prop="[]"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'credits', heading: 'Song Credits', type: 'number' },
      ]"
    >
      <p slot="empty-state" class="text-center opacity-50 text-h5 my-0">
        Your search returned 0 results.
      </p>
    </mx-table>
    <!-- #endregion empty-state -->
  </div>
</section>

<<< @/vuepress/components/tables.md#empty-state

## Server-side pagination

This example uses paginated data from [An API of Ice And Fire](https://anapioficeandfire.com/). To prevent client-side pagination, the `server-paginate` prop must be passed, and the pagination component's `mxPageChange` event should be leveraged to update the request parameters. If the API request needs to include sorting parameters as well, attach a listener to the `mxSortChange` event as well.

Other props that may be helpful when using server-side pagination include `showProgressBar`, `progressAppearDelay`, `totalRows`, `disablePagination`, and `disableNextPage`.

<section class="mds">
  <mx-checkbox
    class="my-20"
    label-name="Add a 1500ms delay to emulate a slow connection"
    :value="apiSlowRequest"
    @input="apiSlowRequest = !apiSlowRequest"
  />
  <!-- #region server -->
  <mx-table
    server-paginate
    :page="this.apiPage"
    :rows-per-page="this.apiPageSize"
    :rows-per-page-options.prop="[5, 10, 25, 50]"
    :disable-pagination="apiLoading"
    :disable-next-page="apiDisableNextPage"
    :rows.prop="apiHouses"
    :columns.prop="[
      { property: 'name', heading: 'Name', sortable: false },
      { property: 'region', heading: 'Region', sortable: false },
      { property: 'words', heading: 'Words', sortable: false }
    ]"
    :show-progress-bar="apiLoading"
    progress-appear-delay="150"
    @mxPageChange="onPageChange"
  />
  <!-- #endregion server -->
</section>

<<< @/vuepress/components/tables.md#server
<<< @/vuepress/components/tables.md#seed-data
<<< @/vuepress/components/tables.md#api-request

## Draggable rows

Set the `draggableRows` prop to allow reordering rows via drag and drop. The component emits an `mxRowMove` event containing the `rowId` (if set), `oldIndex`, and `newIndex` for the dragged row.

The `rows` array is not mutated by the component, so you must update the array using the event data.

<section class="mds">
  <div class="mt-20">
    <!-- #region draggable -->
    <mx-table
      draggable-rows
      paginate="false"
      :rows.prop="draggableBeatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'credits', heading: 'Song Credits', type: 'number' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
      ]"
      @mxRowMove="onRowMove"
    />
    <mx-table
      draggable-rows
      checkable
      class="mt-20"
      paginate="false"
      :get-row-id.prop="row => row.firstName"
      :rows.prop="draggableBeatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'credits', heading: 'Song Credits', type: 'number' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
      ]"
      @mxRowMove="onRowMove"
    />
    <!-- #endregion draggable -->
  </div>
</section>

<<< @/vuepress/components/tables.md#draggable
<<< @/vuepress/components/tables.md#row-move

## Advanced usage

The following example combines checkable, slotted table rows with pagination, row actions, multi-row actions, searching, and filtering.

<section class="mds">
  <div class="mt-20"></div>
    <!-- #region advanced -->
    <mx-table
      checkable
      :rows.prop="filteredAlbums2"
      :columns.prop="[
        { property: 'entertainer', heading: 'Artist', sortable: false },
        { property: 'album', heading: 'Album' },
        { property: 'releasedate', heading: 'Release Date', type: 'date' },
        { property: 'label', heading: 'Label' }
      ]"
      :get-multi-row-actions.prop="rowIds => ([
        {
          value: 'Like',
          icon: 'ph-heart',
          onClick: () => multiRowClickHandler(rowIds)
        },
        {
          value: 'Delete',
          icon: 'ph-trash',
          onClick: () => multiRowClickHandler(rowIds)
        }
      ])"
      @mxVisibleRowsChange="e => albumRows = e.detail"
    >
      <mx-search
        slot="search"
        :value="albumSearch2"
        dense
        placeholder="Search"
        @input="albumSearch2 = $event.target.value"
      />
      <div slot="filter">
        <mx-button ref="labelMenuButton2" class="whitespace-nowrap" btn-type="action" dropdown>
          {{ (this.albumLabelFilters2.length || 'All') +
          (this.albumLabelFilters2.length === 1 ? ' Label' : ' Labels') }}
        </mx-button>
        <mx-menu ref="labelMenu2">
          <mx-menu-item
            v-for="label in albumLabels"
            :key="label"
            multi-select
            :checked="albumLabelFilters2.includes(label)"
            @input="toggleLabelFilter2(label)"
          >
            {{ label }}
          </mx-menu-item>
        </mx-menu>
      </div>
      <div>
        <mx-table-row
          v-for="(row, i) in albumRows"
          :key="row.album"
          :row-id="row.album"
          :actions.prop="[
            { value: 'Like', icon: 'ph-heart', onClick: () => clickHandler(row) },
            { value: 'Delete', icon: 'ph-trash', onClick: () => clickHandler(row) },
          ]"
        >
          <mx-table-cell>{{ row.entertainer }}</mx-table-cell>
          <mx-table-cell>{{ row.album }}</mx-table-cell>
          <mx-table-cell>{{ new Date(row.releasedate).toLocaleDateString() }}</mx-table-cell>
          <mx-table-cell>{{ row.label }}</mx-table-cell>
        </mx-table-row>
      </div>
    </mx-table>
    <!-- #endregion advanced -->
  </div>
</section>

<<< @/vuepress/components/tables.md#advanced

### Table Properties

| Property              | Attribute               | Description                                                                                                                                                                             | Type                                    | Default     |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `autoWidth`           | `auto-width`            | Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens                                                                                               | `boolean`                               | `false`     |
| `checkOnRowClick`     | `check-on-row-click`    | Set to `false` to prevent checking rows by clicking on them (outside the checkboxes).                                                                                                   | `boolean`                               | `true`      |
| `checkable`           | `checkable`             | Make rows checkable. You must either provide a `getRowId` getter (for generated rows), or provide a `rowId` for every `mx-table-row` if creating the rows manually in the table's slot. | `boolean`                               | `false`     |
| `columns`             | --                      | An array of [`ITableColumn`](#itablecolumn) column definitions. If not specified, a column will be generated for each property on the row object.                                       | [`ITableColumn[]`](#itablecolumn)       | `[]`        |
| `disableNextPage`     | `disable-next-page`     | Disable the next-page button. Useful when using server-side pagination and the total number of rows is unknown.                                                                         | `boolean`                               | `false`     |
| `disablePagination`   | `disable-pagination`    | Disable the pagination buttons (i.e. while loading results)                                                                                                                             | `boolean`                               | `false`     |
| `draggableRows`       | `draggable-rows`        | Enables reordering of rows via drag and drop.                                                                                                                                           | `boolean`                               | `false`     |
| `getMultiRowActions`  | --                      |                                                                                                                                                                                         | `(rows: string[]) => ITableRowAction[]` | `undefined` |
| `getRowActions`       | --                      |                                                                                                                                                                                         | `(row: Object) => ITableRowAction[]`    | `undefined` |
| `getRowId`            | --                      | A function that returns the `rowId` prop for each generated `mx-table-row`. This is only required if the table is `checkable` and is auto-generating rows (not using the default slot). | `(row: Object) => string`               | `undefined` |
| `hoverable`           | `hoverable`             |                                                                                                                                                                                         | `boolean`                               | `true`      |
| `page`                | `page`                  | The page to display                                                                                                                                                                     | `number`                                | `1`         |
| `paginate`            | `paginate`              | Show the pagination component. Setting this to `false` will show all rows.                                                                                                              | `boolean`                               | `true`      |
| `progressAppearDelay` | `progress-appear-delay` | Delay the appearance of the progress bar for this many milliseconds                                                                                                                     | `number`                                | `0`         |
| `progressValue`       | `progress-value`        | The progress bar percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress bar will be displayed.                                                         | `number`                                | `null`      |
| `rows`                | --                      | An array of objects that defines the table's dataset.                                                                                                                                   | `Object[]`                              | `[]`        |
| `rowsPerPage`         | `rows-per-page`         |                                                                                                                                                                                         | `number`                                | `10`        |
| `rowsPerPageOptions`  | --                      |                                                                                                                                                                                         | `number[]`                              | `undefined` |
| `serverPaginate`      | `server-paginate`       | Do not sort or paginate client-side. Use events to send server requests instead.                                                                                                        | `boolean`                               | `false`     |
| `showCheckAll`        | `show-check-all`        | Set to `false` to hide the (un)check all checkbox at the top of the table.                                                                                                              | `boolean`                               | `true`      |
| `showProgressBar`     | `show-progress-bar`     | Show a progress bar below the header row                                                                                                                                                | `boolean`                               | `false`     |
| `sortAscending`       | `sort-ascending`        |                                                                                                                                                                                         | `boolean`                               | `true`      |
| `sortBy`              | `sort-by`               | The property on the row objects that will be used for sorting                                                                                                                           | `string`                                | `undefined` |
| `totalRows`           | `total-rows`            | The total number of unpaginated rows. This is ignored for client-side pagination. For server-side pagination, omitting this prop will remove the last-page button.                      | `number`                                | `undefined` |

### ITableColumn

The `ITableColumn` interface describes the objects passed to the `columns` prop.

| Property      | Description                                                                                                                                                                                                                                                                                       | Type                                                    | Default                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------- |
| `property`    | The property on each row object that will supply the column's cell values (as HTML). You may also supply a `getValue` function for the value. If both are provided, the `property` will only be used for sorting.                                                                                 | `string`                                                | `undefined`                             |
| `heading`     | The displayed column heading                                                                                                                                                                                                                                                                      | `string`                                                | `undefined`                             |
| `type`        | The value type, which may affect sorting and how the value is displayed                                                                                                                                                                                                                           | `'string' | 'number' | 'date' | 'dateTime' | 'boolean'` | `string`                                |
| `align`       |                                                                                                                                                                                                                                                                                                   | `'left' | 'center' | 'right'`                           | `left` for strings, `right` for numbers |
| `sortable`    | Whether the column may be sorted by clicking the header. The column must specify a `property` to be sortable.                                                                                                                                                                                     | `boolean`                                               | `true`                                  |
| `getValue`    | A getter function for the column cells' inner HTML. Note that a `property` is required to make a column with a value getter sortable. If sorting client-side, the property does not necessarily have to exist on the row objects; it is simply a unique identifier for the table's `sortBy` prop. | `(row: Object, rowIndex?: number) => any`               | `undefined`                             |
| `sortCompare` | A custom compare function for sorting by this column (if sorting client-side)                                                                                                                                                                                                                     | `(rowA: Object, rowB: Object) => number`                | `undefined`                             |
| `headerClass` | Additional classes to add to the header cell for this column                                                                                                                                                                                                                                      | `string`                                                | `undefined`                             |
| `cellClass`   | Additional classes to add to the body cells in this column                                                                                                                                                                                                                                        | `string`                                                | `undefined`                             |

### Table Row Properties

| Property  | Attribute | Description                                                                                                           | Type                | Default     |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `actions` | --        | An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. | `ITableRowAction[]` | `[]`        |
| `checked` | `checked` |                                                                                                                       | `boolean`           | `false`     |
| `rowId`   | `row-id`  | This is required for checkable rows in order to persist the checked state through sorting and pagination.             | `string`            | `undefined` |

### Table Events

| Event                 | Description                                                                                                                                                                                                    | Type                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `mxRowCheck`          | Emitted when a row is (un)checked. The `Event.detail` will be the array of checked `rowId`s.                                                                                                                   | `CustomEvent<string[]>`                                    |
| `mxRowMove`           | Emitted when a row is dragged to a new position. The `Event.detail` object will contain the `rowId` (if set), `oldIndex`, and `newIndex`.                                                                      | `CustomEvent<any>`                                         |
| `mxSortChange`        | Emitted when a sortable column's header is clicked.                                                                                                                                                            | `CustomEvent<{ sortBy: string; sortAscending: boolean; }>` |
| `mxVisibleRowsChange` | Emitted when the sorting, pagination, or rows data changes. The `Event.detail` will contain the sorted, paginated array of visible rows. This is useful for building a custom row layout via the default slot. | `CustomEvent<Object[]>`                                    |

### Table Row Events

| Event            | Description                                                                                      | Type                                                |
| ---------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `mxCheck`        | Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked | `CustomEvent<{ rowId: string; checked: boolean; }>` |
| `mxRowDragEnd`   | Emits the `rowId` when row dragging ends                                                         | `CustomEvent<string>`                               |
| `mxRowDragStart` | Emits the `rowId` when dragging starts                                                           | `CustomEvent<string>`                               |

### Table Methods

#### `checkAll() => Promise<void>`

Check all rows. For server-side pagination, only the visible rows will be checked since the unique identifiers for rows on other pages are not yet known.

#### `checkNone() => Promise<void>`

Uncheck all rows.

#### `getCheckedRowIds() => Promise<string[]>`

Returns an array of IDs for all checked rows.

#### `setCheckedRowIds(checkedRowIds?: string[]) => Promise<void>`

Sets which rows are checked by passing an array of row IDs.

### Table Row Methods

#### `collapse() => Promise<void>`

Collapses the row (on mobile)

#### `expand() => Promise<void>`

Expands the row (on mobile)

<script>
// #region beatles
const beatles = [
  {
    firstName: 'John',
    lastName: 'Lennon',
    credits: 90,
    birthdate: new Date(1940, 9, 9),
    isLeftHanded: false,
    eyeColor: 'Brown',
  },
  {
    firstName: 'Paul',
    lastName: 'McCartney',
    credits: 88,
    birthdate: new Date(1942, 5, 18),
    isLeftHanded: true,
    eyeColor: 'Hazel',
  },
  {
    firstName: 'George',
    lastName: 'Harrison',
    credits: 22,
    birthdate: new Date(1943, 1, 25),
    isLeftHanded: false,
    eyeColor: 'Brown',
  },
  {
    firstName: 'Ringo',
    lastName: 'Starr',
    credits: 2,
    birthdate: new Date(1940, 6, 7),
    isLeftHanded: false,
    eyeColor: 'Blue',
  }
]
// #endregion beatles

const albums = [
  {
    "id": 36,
    "album": "Love",
    "entertainer": "The Beatles",
    "releasedate": "2006-11-20T00:00:00",
    "label": "Apple"
  },
  {
    "id": 34,
    "album": "Let It Be... Naked",
    "entertainer": "The Beatles",
    "releasedate": "2003-11-17T00:00:00",
    "label": "Apple"
  },
  {
    "id": 33,
    "album": "1",
    "entertainer": "The Beatles",
    "releasedate": "2000-11-13T00:00:00",
    "label": "Apple"
  },
  {
    "id": 32,
    "album": "Anthology 3",
    "entertainer": "The Beatles",
    "releasedate": "1996-10-28T00:00:00",
    "label": "Apple"
  },
  {
    "id": 31,
    "album": "Anthology 2",
    "entertainer": "The Beatles",
    "releasedate": "1996-03-18T00:00:00",
    "label": "Apple"
  },
  {
    "id": 9,
    "album": "Rock 'n' Roll Music",
    "entertainer": "The Beatles",
    "releasedate": "1976-06-10T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 35,
    "album": "Capitol Albums Vol.1, The",
    "entertainer": "The Beatles",
    "releasedate": "2004-11-15T00:00:00",
    "label": "E.M.I."
  },
  {
    "id": 30,
    "album": "Anthology 1",
    "entertainer": "The Beatles",
    "releasedate": "1995-11-21T00:00:00",
    "label": "Apple"
  },
  {
    "id": 29,
    "album": "Live at the BBC",
    "entertainer": "The Beatles",
    "releasedate": "1994-11-30T00:00:00",
    "label": "Apple"
  },
  {
    "id": 15,
    "album": "Past Masters Vol. 1",
    "entertainer": "The Beatles",
    "releasedate": "1988-03-08T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 16,
    "album": "Past Masters Vol. 2",
    "entertainer": "The Beatles",
    "releasedate": "1988-03-08T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 14,
    "album": "Beatles Box, The",
    "entertainer": "The Beatles",
    "releasedate": "1980-11-03T00:00:00",
    "label": "World Records"
  },
  {
    "id": 28,
    "album": "Beatles Ballads, The",
    "entertainer": "The Beatles",
    "releasedate": "1980-10-13T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 13,
    "album": "Hey Jude",
    "entertainer": "The Beatles",
    "releasedate": "1979-05-11T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 11,
    "album": "Rarities",
    "entertainer": "The Beatles",
    "releasedate": "1978-12-02T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 12,
    "album": "The Beatles Collection",
    "entertainer": "The Beatles",
    "releasedate": "1978-12-02T00:00:00",
    "label": "E.M.I."
  },
  {
    "id": 27,
    "album": "Love Songs",
    "entertainer": "The Beatles",
    "releasedate": "1977-11-19T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 10,
    "album": "Live at the Hollywood Bowl",
    "entertainer": "The Beatles",
    "releasedate": "1977-05-06T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 26,
    "album": "Magical Mystery Tour",
    "entertainer": "The Beatles",
    "releasedate": "1976-11-19T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 24,
    "album": "1962-1966 (The Red  Album)",
    "entertainer": "The Beatles",
    "releasedate": "1973-04-19T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 25,
    "album": "1967-1970 (The Blue Album)",
    "entertainer": "The Beatles",
    "releasedate": "1973-04-19T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 23,
    "album": "From Then To You",
    "entertainer": "The Beatles",
    "releasedate": "1970-12-18T00:00:00",
    "label": "Apple"
  },
  {
    "id": 8,
    "album": "Let it Be",
    "entertainer": "The Beatles",
    "releasedate": "1970-11-06T00:00:00",
    "label": "Apple"
  },
  {
    "id": 22,
    "album": "Abbey Road",
    "entertainer": "The Beatles",
    "releasedate": "1969-09-26T00:00:00",
    "label": "Apple"
  },
  {
    "id": 21,
    "album": "Yellow Submarine",
    "entertainer": "The Beatles",
    "releasedate": "1969-01-17T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 20,
    "album": "The White Album",
    "entertainer": "The Beatles",
    "releasedate": "1968-11-22T00:00:00",
    "label": "Apple"
  },
  {
    "id": 7,
    "album": "Sgt. Pepper's Lonely Hearts Club Band",
    "entertainer": "The Beatles",
    "releasedate": "1967-06-01T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 6,
    "album": "A Collection of Beatles Oldies",
    "entertainer": "The Beatles",
    "releasedate": "1966-12-10T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 5,
    "album": "Revolver",
    "entertainer": "The Beatles",
    "releasedate": "1966-08-05T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 3,
    "album": "Rubber Soul",
    "entertainer": "The Beatles",
    "releasedate": "1965-12-03T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 4,
    "album": "Help !",
    "entertainer": "The Beatles",
    "releasedate": "1965-08-06T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 2,
    "album": "A Hard Day's Night",
    "entertainer": "The Beatles",
    "releasedate": "1964-07-10T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 19,
    "album": "The Beatles First",
    "entertainer": "The Beatles",
    "releasedate": "1964-06-19T00:00:00",
    "label": "Polydor"
  },
  {
    "id": 1,
    "album": "Beatles For Sale",
    "entertainer": "The Beatles",
    "releasedate": "1964-04-12T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 18,
    "album": "With the Beatles",
    "entertainer": "The Beatles",
    "releasedate": "1963-11-22T00:00:00",
    "label": "Parlophone"
  },
  {
    "id": 17,
    "album": "Please Please Me (Mono)",
    "entertainer": "The Beatles",
    "releasedate": "1963-03-22T00:00:00",
    "label": "Parlophone"
  }
]

export default {
  data() {
    return {
      albums,
      beatles,
      visibleRows: beatles,
      draggableBeatles: beatles.slice(),
      albumRows: albums,
      albumSearch: '',
      albumSearch2: '',
      albumLabelFilters: [],
      albumLabelFilters2: [],
      beatlesSearch: '',
      apiHouses: [],
      apiPage: 1,
      apiPageSize: 5,
      apiLoading: false,
      apiDisableNextPage: false,
      apiSlowRequest: false,
    }
  },
  computed: {
    // #region filtered-albums
    albumLabels() {
      return [...new Set(this.albums.map(album => album.label))].sort()
    },
    filteredAlbums() {
      if (!this.albumSearch && !this.albumLabelFilters.length) return this.albums
      let filteredAlbums = this.albums
      if (this.albumSearch) {
        const albumSearch = this.albumSearch.toLocaleLowerCase()
        filteredAlbums = filteredAlbums.filter(row => 
          row.album.toLocaleLowerCase().includes(albumSearch)
        )
      }
      if (this.albumLabelFilters.length) {
        filteredAlbums = filteredAlbums.filter(row => 
          this.albumLabelFilters.includes(row.label)
        )
      }
      return filteredAlbums
    },
    // #endregion filtered-albums
    filteredAlbums2() {
      if (!this.albumSearch2 && !this.albumLabelFilters2.length) return this.albums
      let filteredAlbums = this.albums
      if (this.albumSearch2) {
        const albumSearch2 = this.albumSearch2.toLocaleLowerCase()
        filteredAlbums = filteredAlbums.filter(row => 
          row.album.toLocaleLowerCase().includes(albumSearch2)
        )
      }
      if (this.albumLabelFilters2.length) {
        filteredAlbums = filteredAlbums.filter(row => 
          this.albumLabelFilters2.includes(row.label)
        )
      }
      return filteredAlbums
    },
    filteredBeatles() {
      if (!this.beatlesSearch) return this.beatles
      else {
        const beatlesSearch = this.beatlesSearch.toLocaleLowerCase()
        return this.beatles.filter(row => (
          row.firstName.toLocaleLowerCase().includes(beatlesSearch) ||
          row.lastName.toLocaleLowerCase().includes(beatlesSearch)
        ))
      }
    }
  },
  // #region seed-data
  mounted() {
    this.getApiData()
    // ...
  // #endregion seed-data
    this.$refs.labelMenu.anchorEl = this.$refs.labelMenuButton
    this.$refs.labelMenu2.anchorEl = this.$refs.labelMenuButton2
    this.$refs.multitable1.setCheckedRowIds(['John', 'Paul'])
    this.$refs.multitable2.setCheckedRowIds(['John', 'Paul'])
  },
  methods: {
    // #region build-html
    buildBadge(row) {
      const handedness = row.isLeftHanded ? 'Left' : 'Right'
      const color = row.isLeftHanded ? 'bg-purple-300' : 'bg-blue-300'
      return `<mx-badge squared badge-class="${color}" value="${handedness}"></mx-badge>`
    },
    // #endregion build-html
    clickHandler(row) {
      console.log(`Action for ${row.firstName} clicked!`)
    },
    getEyeColorHex(eyeColor) {
      const colors = {
        Blue: '#85abce',
        Hazel: '#c9c789',
        Brown: '#9e6b4a'
      }
      return colors[eyeColor]
    },
    // #region multi-row-click-handler
    async multiRowClickHandler(rowIds) {
      console.log(`Action selected with ${rowIds.length} row(s)!`)
      this.$refs.multitable1.checkNone()
      this.$refs.multitable2.checkNone()
    },
    // #endregion multi-row-click-handler
    toggleLabelFilter(label) {
      if (this.albumLabelFilters.includes(label)) {
        this.albumLabelFilters = this.albumLabelFilters.filter(l => l !== label)
      } else {
        this.albumLabelFilters = [...this.albumLabelFilters, label]
      }
    },
    toggleLabelFilter2(label) {
      if (this.albumLabelFilters2.includes(label)) {
        this.albumLabelFilters2 = this.albumLabelFilters2.filter(l => l !== label)
      } else {
        this.albumLabelFilters2 = [...this.albumLabelFilters2, label]
      }
    },
    // #region row-move
    onRowMove(e) {
      const { oldIndex, newIndex } = e.detail
      const beatles = this.draggableBeatles.slice()
      const row = beatles.splice(oldIndex, 1)[0]
      beatles.splice(newIndex, 0, row)
      this.draggableBeatles = beatles
    },
    // #endregion row-move
    // #region api-request
    async getApiData() {
      this.apiLoading = true
      let url = 'https://www.anapioficeandfire.com/api/houses?'
      url += 'page=' + this.apiPage
      url += '&pageSize=' + this.apiPageSize
      const response = await fetch(url)
      // Parse last page number from "link" header since API does not give us total row count
      const pages = response.headers.get('link').match(/page\=[0-9]+/g)
      const lastPage = +/[0-9]+/.exec(pages[pages.length - 1])[0]
      // Disable next-page button if this is the last page
      this.apiDisableNextPage = lastPage === this.apiPage
      setTimeout(async () => {
        this.apiHouses = await response.json()
        this.apiLoading = false
      }, this.apiSlowRequest ? 1500 : 0)
    },
    onPageChange(e) {
      this.apiPage = e.detail.page
      this.apiPageSize = e.detail.rowsPerPage
      this.getApiData()
    }
    // #endregion api-request
  }
}
</script>
