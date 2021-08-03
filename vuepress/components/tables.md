# Data Tables

## Basic Data-Driven Table

<section class="mds">
<!-- #region basic -->
<mx-table
  class="mt-20"
  :rows.prop="beatles"
  :columns.prop="[
    { property: 'firstName', heading: 'First Name', sortable: true },
    { property: 'lastName', heading: 'Last Name', sortable: true },
    { property: 'credits', heading: 'Song Credits', type: 'number', sortable: true },
    { property: 'birthdate', heading: 'Birthdate', type: 'date', sortable: true },
    { property: 'eyeColor', heading: 'Eye Color', sortable: false}
  ]"
></mx-table>
<!-- #endregion basic -->
</section>

<<< @/vuepress/components/tables.md#basic
<<< @/vuepress/components/tables.md#beatles

## Using HTML in Cells

<section class="mds">
<!-- #region components -->
<mx-table
  auto-width
  hoverable="false"
  :rows.prop="beatles"
  :columns.prop="[
    { property: 'firstName', heading: 'First Name', sortable: true },
    { property: 'lastName', heading: 'Last Name', sortable: true },
    { property: 'isLeftHanded', heading: 'Handedness', getValue: buildBadge, sortable: true },
  ]"
/>
<!-- #endregion components -->
</section>

<<< @/vuepress/components/tables.md#components
<<< @/vuepress/components/tables.md#build-html

## Checkboxes

<section class="mds">
<!-- #region checkboxes -->
<mx-table
  auto-width
  checkable
  :rows.prop="beatles"
  :columns.prop="[
    { property: 'firstName', heading: 'First Name', sortable: true },
    { property: 'lastName', heading: 'Last Name', sortable: true },
    { property: 'credits', heading: 'Song Credits', type: 'number', sortable: true }
  ]"
/>
<!-- #endregion checkboxes -->
</section>

<<< @/vuepress/components/tables.md#checkboxes

## Advanced Slot Layout

<section class="mds">
<!-- #region slot -->
<mx-table
  ref="table"
  checkable
  auto-width
  :rows.prop="beatles"  
  :columns.prop="[
    { property: 'firstName', heading: 'First Name', sortable: true },
    { property: 'lastName', heading: 'Last Name', sortable: true },
    { property: 'birthdate', heading: 'Birthdate', type: 'date', sortable: true },
    {}
  ]"
  @mxVisibleRowsChange="e => visibleRows = e.detail"
>
  <mx-table-row v-for="(row, i) in visibleRows" :key="i">
    <mx-table-cell>{{ row.firstName }}</mx-table-cell>
    <mx-table-cell>{{ row.lastName }}</mx-table-cell>
    <mx-table-cell>{{ row.birthdate.toLocaleDateString() }}</mx-table-cell>
    <mx-table-cell class="p-0">
      <mx-icon-button :id="'button-' + i" icon="ph-dots-three-outline"></mx-icon-button>
      <mx-menu :anchor-el-selector="'#button-' + i">
        <mx-menu-item @click="clickHandler(row)" icon="ph-pencil">Edit {{ row.firstName }}</mx-menu-item>
      </mx-menu>
    </mx-table-cell>
  </mx-table-row>
</mx-table>
<!-- #endregion slot -->
</section>

<<< @/vuepress/components/tables.md#slot

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
    methods: {
      // #region build-html
      buildBadge(row) {
        const handedness = row.isLeftHanded ? 'Left' : 'Right'
        const color = row.isLeftHanded ? 'bg-purple-300' : 'bg-blue-300'
        return `<mx-badge squared badge-class="${color}" value="${handedness}"></mx-badge>`
      },
      // #endregion build-html
      clickHandler(row) {
        console.log(`Menu item for ${row.firstName} clicked!`)
      },
    }
  }
</script>
