# Data Tables

## Basic Data-Driven Table

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

## Paginated Table

<section class="mds">
  <div class="mt-20">
    <!-- #region paginated -->
    <mx-table
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

## Using HTML in Cells

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

## Row Selection

<section class="mds">
  <div class="mt-20">
    <!-- #region checkboxes -->
    <mx-table
      checkable
      row-id-property="id"
      rows-per-page="5"
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

## Row Action Menu

<section class="mds">
  <div class="mt-20">
    <!-- #region action-menu -->
    <mx-table
      row-id-property="firstName"
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
    <!-- #endregion action-menu -->
  </div>
</section>

<<< @/vuepress/components/tables.md#action-menu

## Advanced Slot Layout

<section class="mds">
  <div class="mt-20">
    <!-- #region slot -->
    <mx-table
      ref="table"
      checkable
      show-operations-bar
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name' },
        { property: 'lastName', heading: 'Last Name' },
        { property: 'birthdate', heading: 'Birthdate', type: 'date' },
        { property: 'eyeColor', heading: 'Eye Color' },
        {} // Row actions header (Only add this empty object when using the table slot.)
      ]"
      :get-multi-row-actions.prop="rows => ([
        {
          value: `Merge ${rows.length > 1 ? rows.length : ''} rows`,
          disabled: rows.length < 2,
          onClick: () => multiRowClickHandler(rows)
        },
        { value: 'Delete', onClick: () => multiRowClickHandler(rows) },
      ])"
      @mxVisibleRowsChange="e => visibleRows = e.detail"
    >
      <mx-table-row v-for="(row, i) in visibleRows" :key="i" :row-id="row.firstName" :actions.prop="getRowActions(row)">
        <mx-table-cell>{{ row.firstName }}</mx-table-cell>
        <mx-table-cell>{{ row.lastName }}</mx-table-cell>
        <mx-table-cell>{{ row.birthdate.toLocaleDateString() }}</mx-table-cell>
        <mx-table-cell>
          <mx-badge
            indicator="hexagon"
            :style="{ color: getEyeColorHex(row.eyeColor) }"
            :title="row.eyeColor"
          ></mx-badge>
        </mx-table-cell>
      </mx-table-row>
    </mx-table>
    <!-- #endregion slot -->
  </div>
</section>

<<< @/vuepress/components/tables.md#slot
<<< @/vuepress/components/tables.md#get-row-actions
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
    "label": "EMI"
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
      visibleRows: beatles
    }
  },
  // mounted() {
  //   this.
  // },
  methods: {
    // #region build-html
    buildBadge(row) {
      const handedness = row.isLeftHanded ? 'Left' : 'Right'
      const color = row.isLeftHanded ? 'bg-purple-300' : 'bg-blue-300'
      return `<mx-badge squared badge-class="${color}" value="${handedness}"></mx-badge>`
    },
      // #endregion build-html
    // #region get-row-actions
    getRowActions(row) {
      return [
        { value: 'Edit ' + row.firstName, onClick: () => this.clickHandler(row) },
        { value: 'Delete', onClick: () => this.clickHandler(row) }
      ]
    },
    // #endregion get-row-actions
    clickHandler(row) {
      console.log(`Menu item for ${row.firstName} clicked!`)
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
    async multiRowClickHandler() {
      const checkedRowIds = await this.$refs.table.getCheckedRowIds()
      console.log(`Action selected with ${checkedRowIds.length} row(s)!`)
    }
    // #endregion multi-row-click-handler
  }
}
</script>
