# Data Tables

## Basic data-driven table

To create a basic data table with auto-generated rows, provide a `rows` prop containing your data, as well as a `columns` prop, which is an array of `ITableColumn` objects that define the tables columns.

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
        {} // Row actions header (Only add this empty object when using the table slot.)
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
        { property: 'label', heading: 'Label' },
      ]"
    >
      <mx-search
        slot="search"
        :value="albumSearch"
        class="w-240"
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

## Advanced usage

<section class="mds">
  <div class="mt-20">
    <!-- #region advanced -->
    <mx-table
      ref="table"
      checkable
      :get-row-id.prop="row => row.firstName"
      :rows.prop="filteredBeatles"
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
    >
      <mx-search
        slot="search"
        :value="beatlesSearch"
        class="w-240"
        dense
        placeholder="Search"
        @input="beatlesSearch = $event.target.value"
      />
    </mx-table>
    <!-- #endregion advanced -->
  </div>
</section>

<<< @/vuepress/components/tables.md#advanced
<<< @/vuepress/components/tables.md#multi-row-click-handler

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
      albumSearch: '',
      albumLabelFilters: [],
      beatlesSearch: '',
      draggingRowId: null,
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
  mounted() {
    this.$refs.labelMenu.anchorEl = this.$refs.labelMenuButton
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
    }
  }
}
</script>
