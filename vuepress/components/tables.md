# Data Tables

## Basic Data-Driven Table

<section class="mds">
  <div class="mt-20">
    <!-- #region basic -->
    <mx-table
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name', sortable: true },
        { property: 'lastName', heading: 'Last Name', sortable: true },
        { property: 'credits', heading: 'Song Credits', type: 'number', sortable: true },
        { property: 'birthdate', heading: 'Birthdate', type: 'date', sortable: true },
        { property: 'eyeColor', heading: 'Eye Color', sortable: false}
      ]"
    />
    <!-- #endregion basic -->
  </div>
</section>

<<< @/vuepress/components/tables.md#basic
<<< @/vuepress/components/tables.md#beatles

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
        { property: 'firstName', heading: 'First Name', sortable: true },
        { property: 'lastName', heading: 'Last Name', sortable: true },
        { property: 'isLeftHanded', heading: 'Handedness', getValue: buildBadge, sortable: true },
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
      auto-width
      checkable
      row-id-property="firstName"
      :rows.prop="beatles"
      :columns.prop="[
        { property: 'firstName', heading: 'First Name', sortable: true },
        { property: 'lastName', heading: 'Last Name', sortable: true },
        { property: 'credits', heading: 'Song Credits', type: 'number', sortable: true }
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
        { property: 'firstName', heading: 'First Name', sortable: true },
        { property: 'lastName', heading: 'Last Name', sortable: true },
        { property: 'credits', heading: 'Song Credits', type: 'number', sortable: true }
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
        { property: 'firstName', heading: 'First Name', sortable: true },
        { property: 'lastName', heading: 'Last Name', sortable: true },
        { property: 'birthdate', heading: 'Birthdate', type: 'date', sortable: true },
        {}
      ]"
      @mxVisibleRowsChange="e => visibleRows = e.detail"
    >
      <mx-table-row v-for="(row, i) in visibleRows" :key="i" :row-id="row.firstName" :actions.prop="getRowActions(row)">
        <mx-table-cell>{{ row.firstName }}</mx-table-cell>
        <mx-table-cell>{{ row.lastName }}</mx-table-cell>
        <mx-table-cell>{{ row.birthdate.toLocaleDateString() }}</mx-table-cell>
      </mx-table-row>
    </mx-table>
    <!-- #endregion slot -->
  </div>
</section>

<<< @/vuepress/components/tables.md#slot
<<< @/vuepress/components/tables.md#get-row-actions

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
export default {
  data() {
    return {
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
    // #region get-row-actions
    getRowActions(row) {
      return [
        { value: 'Edit ' + row.firstName, onClick: () => this.clickHandler(row) },
        { value: 'Delete', onClick: () => this.clickHandler(row) }
      ]
    },
    // #endregion get-row-actions
    // #endregion build-html
    clickHandler(row) {
      console.log(`Menu item for ${row.firstName} clicked!`)
    },
  }
}
</script>
