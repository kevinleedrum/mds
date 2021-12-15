# Grid System

Example of how the grid system works. The examples use rows, but they coould just as easily be interchanged or mixed with `.grid-rows-{n}`. For more information on rows and columns, visit [the grid definition](/css-documentation/grid/grid-template-columns.html).

## Non-Responsive Grid

<section class="mds">
  <!-- #region non-responsive -->
  <div class="grid grid-flow-row grid-cols-3 gap-4 text-center mt-20">
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">1</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">2</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">3</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">4</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">5</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">6</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">7</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">8</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">9</div>
  </div>
  <!-- #endregion non-responsive -->
</section>

Below is the code example of the above non-responsive grid above.

<<< @/vuepress/examples/grid.md#non-responsive

## Responsive Grid

<section class="mds">
  <!-- #region responsive -->
  <div
    class="grid grid-flow-row grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-20"
  >
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">1</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">2</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">3</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">4</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">5</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">6</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">7</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">8</div>
    <div class="rounded py-4 text-center bg-primary-inverted text-primary-inverted">9</div>
  </div>
  <!-- #endregion responsive -->
</section>

Below is the code example of a responsive grid system. The grid system works in a "mobile first" paradigm. This means that the initial defenition is the base behavior for the grid. In this instance that base bahavior is `grid-cols-1` or one column grid by default which will work on a phone. From there, you will define the column count using the responsive prefix of `sm:`, `md:`, `lg:`, `xl:` and `2xl` respectivly. This example goes from 1 column to 6 depending on the screen size.

<<< @/vuepress/examples/grid.md#responsive

### Example of a 2-column responsive grid system

<section class="mds">
  <div class="mt-40">
    <!-- #region two-column -->
    <div class="grid grid-cols-1 gap-0 sm:grid-cols-5 sm:gap-56">
      <div class="col-span-2 border-b-2 mb-20 text-center border-primary-bg-dark bg-white sm:border-2 sm:rounded">
        <img src="https://picsum.photos/320" class="w-full h-full object-cover">
      </div>
      <div class="col-span-3">
        <h2 class="mt-0">Another Thing</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
      </div>
    </div>
    <!-- #endregion two-column -->
  </div>
</section>

<<< @/vuepress/examples/grid.md#two-column

### Dashboard Grid Example

This is an example of a full page layout for a dashboard. The number of columns increases with the
viewport width, as does the grid gap and padding around the grid.

<section class="mds full-width">
  <div class="my-40 shadow-24 w-screen">
    <!-- #region dashboard-grid -->
    <mx-page-header pattern class="shadow-2">Dashboard</mx-page-header>
    <div class="p-24 md:p-40 xl:p-72">
      <div class="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 2xl:grid-cols-3 2xl:gap-40">
        <div class="shadow-8 rounded-3xl px-24 pb-24 bg-white" v-for="n in 5" :key="'chart-' + n">
          <h5 class="emphasis">Chart</h5>
          <mx-chart type="line" :data.prop="chartData" :options.prop="chartOptions" />
        </div>
      </div>
    </div>
    <!-- #endregion dashboard-grid -->
  </div>
</section>

<<< @/vuepress/examples/grid.md#dashboard-grid

<script>
export default {
  data() {
    return {
      chartData: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Example data',
            data: [340, 930, 732, 321, 451, 482, 513, 397],
            borderColor: '#0457af'
          },
        ]
      },
      chartOptions: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
div.theme-default-content:not(.custom) {
    max-width: 100%;
}
div.theme-default-content:not(.custom) > *:not(.full-width) {
    max-width: 920px;
}
</style>
