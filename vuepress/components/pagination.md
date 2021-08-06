# Pagination

<!-- #region pagination -->
<section class="mds">
  <div class="space-y-20">
    <p><strong>Standard</strong></p>
    <mx-pagination
      :current-page="listA.currentPage"
      :results-per-page="listA.resultsPerPage"
      total-results="200"
      @mxChange="e => listA = e.detail"
    />
    <mx-pagination
      :current-page="listB.currentPage"
      :results-per-page="listB.resultsPerPage"
      total-results="100"
      @mxChange="e => listB = e.detail"
    />
    <mx-pagination
      :current-page="listC.currentPage"
      :results-per-page="listC.resultsPerPage"
      total-results="85"
      @mxChange="e => listC = e.detail"
    />
    <p><strong>Simple</strong></p>
    <mx-pagination
      simple
      :current-page="listA.currentPage"
      :results-per-page="listA.resultsPerPage"
      total-results="200"
      @mxChange="e => listA = e.detail"
    />
    <mx-pagination
      simple
      :current-page="listB.currentPage"
      :results-per-page="listB.resultsPerPage"
      total-results="100"
      @mxChange="e => listB = e.detail"
    />
    <mx-pagination
      simple
      :current-page="listC.currentPage"
      :results-per-page="listC.resultsPerPage"
      total-results="85"
      @mxChange="e => listC = e.detail"
    />
  </div>
</section>
<!-- #endregion pagination -->

<<< @/vuepress/components/pagination.md#pagination

<script>
export default {
  data() {
    return {
      listA: {
        currentPage: 0,
        resultsPerPage: 100
      },
      listB: {
        currentPage: 1,
        resultsPerPage: 10
      },
      listC: {
        currentPage: 8,
        resultsPerPage: 10
      },
    }
  }
}
</script>
