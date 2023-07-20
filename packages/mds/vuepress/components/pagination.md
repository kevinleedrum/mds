# Pagination

The `mx-pagination` component is designed to provide pagination controls within [Data Tables](/tables.html), as well as cards, etc. The component has both a standard and a "simple" mode (via the `simple` prop).

The standard UI provides a `status` slot, ideally for short textual content. Some elements of the standard UI are removed or relocated when the component width is too small to accomodate everything.

An `mxPageChange` event is emitted whenever the page or rows-per-page are changed. The `Event.detail` is an object containing the new `page` and `rowsPerPage`.

<!-- #region pagination -->
<section class="mds">
  <div class="space-y-20">
    <p><strong>Standard</strong></p>
    <mx-pagination
      :page="listA.page"
      :rows-per-page="listA.rowsPerPage"
      total-rows="100"
      @mxPageChange="e => listA = e.detail"
    />
    <mx-pagination
      :page="listB.page"
      :rows-per-page="listB.rowsPerPage"
      total-rows="200"
      @mxPageChange="e => listB = e.detail"
    />
    <mx-pagination
      :page="listC.page"
      :rows-per-page="listC.rowsPerPage"
      total-rows="85"
      @mxPageChange="e => listC = e.detail"
    >
    <div slot="status" class="italic">
      Last updated as of {{ new Date().toLocaleDateString() }}
    </div>
    </mx-pagination>
    </div>
</section>
<section class="mds">
  <div class="space-y-20">
    <p><strong>Simple</strong></p>
    <mx-pagination
      simple
      :page="listA.page"
      :rows-per-page="listA.rowsPerPage"
      total-rows="100"
      @mxPageChange="e => listA = e.detail"
    />
    <mx-pagination
      simple
      :page="listB.page"
      :rows-per-page="listB.rowsPerPage"
      total-rows="200"
      @mxPageChange="e => listB = e.detail"
    />
    <mx-pagination
      simple
      :page="listC.page"
      :rows-per-page="listC.rowsPerPage"
      total-rows="85"
      @mxPageChange="e => listC = e.detail"
    />
  </div>
</section>
<!-- #endregion pagination -->

<<< @/vuepress/components/pagination.md#pagination

### Properties

| Property             | Attribute           | Description                                                                   | Type       | Default             |
| -------------------- | ------------------- | ----------------------------------------------------------------------------- | ---------- | ------------------- |
| `disableNextPage`    | `disable-next-page` | Disable the next page button (i.e. when the last page was loaded from an API) | `boolean`  | `false`             |
| `disabled`           | `disabled`          | Disable the page buttons (i.e. when loading results)                          | `boolean`  | `false`             |
| `page`               | `page`              |                                                                               | `number`   | `1`                 |
| `rowsPerPage`        | `rows-per-page`     |                                                                               | `number`   | `100`               |
| `rowsPerPageOptions` | --                  |                                                                               | `number[]` | `[10, 25, 50, 100]` |
| `simple`             | `simple`            | Reduce the UI to only a page                                                  | `boolean`  | `false`             |
| `totalRows`          | `total-rows`        |                                                                               | `number`   | `undefined`         |

### Events

| Event          | Description | Type                                                  |
| -------------- | ----------- | ----------------------------------------------------- |
| `mxPageChange` |             | `CustomEvent<{ rowsPerPage: number; page: number; }>` |

<script>
export default {
  data() {
    return {
      listA: {
        page: 1,
        rowsPerPage: 10
      },
      listB: {
        page: 2,
        rowsPerPage: 100
      },
      listC: {
        page: 3,
        rowsPerPage: 10
      },
    }
  }
}
</script>
