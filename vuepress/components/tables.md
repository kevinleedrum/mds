# Data Tables

## Basic Data-Driven Table

<section class="mds">
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
    { getValue: buildButton, cellClass: 'p-0 w-0' }
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
  hoverable="false"
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
  auto-width
  hoverable="false"
  :rows.prop="beatles"  
  :columns.prop="[
    { property: 'firstName', heading: 'First Name', sortable: true },
    { property: 'lastName', heading: 'Last Name', sortable: true },
    { property: 'birthdate', heading: 'Birthdate', type: 'date', sortable: true },
    { cellClass: 'p-0 w-0' }
  ]"
  @mxVisibleRowsChange="e => visibleRows = e.detail"
>
  <tbody>
    <tr v-for="(row, i) in visibleRows" :key="row.firstName">
      <td>{{ row.firstName }}</td>
      <td>{{ row.lastName }}</td>
      <td>{{ row.birthdate.toLocaleDateString() }}</td>
      <td>
        <mx-icon-button :id="'button-' + i" icon="ph-dots-three-outline"></mx-icon-button>
        <mx-menu :anchor-el-selector="'#button-' + i">
          <mx-menu-item @click="clickHandler(row)" icon="ph-pencil">Edit {{ row.firstName }}</mx-menu-item>
        </mx-menu>
      </td>
    </tr>
  </tbody>
</mx-table>
<!-- #endregion slot -->
</section>

<<< @/vuepress/components/tables.md#slot

<script>
  export default {
    data() {
      return {
        // #region beatles
        beatles: [
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
        ],
        visibleRows: []
        // #endregion beatles
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
      buildButton(row, rowIndex) {
        const buttonId = 'button-' + rowIndex
        return `
        `
      },
      clickHandler(row) {
        console.log(`Menu item for ${row.firstName} clicked!`)
      },
    }
  }
</script>
