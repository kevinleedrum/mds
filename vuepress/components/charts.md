# Charts

The `mx-chart` component provides chart generation via [Chart.js](https://www.chartjs.org/docs/3.6.2/).
The `type`, `data`, and `options` are all passed via three props of the same name.

By default, the charts are sized to the container width, and the chart's height is determined by its
aspect ratio. The `width` and `height` props may be used to set an explicit size in pixels. Be sure to
set the `maintainAspectRatio` option to `false` if necessary when setting an explicit height.

## Line charts

<section class="mds">
  <div>
    <!-- #region line -->
    <mx-chart type="line" :data.prop="lineData" />
    <!-- #endregion line -->
  </div>
  <div class="my-40">
    <strong class="block mb-20">Sparkline</strong>
    <!-- #region sparkline -->
    <mx-chart width="128" height="48" type="line" :data.prop="lineData" :options.prop="sparklineOptions" />
    <!-- #endregion sparkline -->
  </div>
</section>

<<< @/vuepress/components/charts.md#line
<<< @/vuepress/components/charts.md#sparkline
<<< @/vuepress/components/charts.md#line-data
<<< @/vuepress/components/charts.md#sparkline-options

## Bar charts

<section class="mds">
  <!-- #region bar -->
  <mx-chart type="bar" :data.prop="barData" />
  <!-- #endregion bar -->
</section>

<<< @/vuepress/components/charts.md#bar
<<< @/vuepress/components/charts.md#bar-data

## Pie and doughnut charts

<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 my-40">
    <!-- #region pie -->
    <mx-chart width="320" type="pie" :data.prop="pieData" />
    <mx-chart width="320" type="doughnut" :data.prop="pieData" />
    <!-- #endregion pie -->
  </div>
</section>

<<< @/vuepress/components/charts.md#pie
<<< @/vuepress/components/charts.md#pie-data

## Mixed charts

It is possible to combine chart types. Instead of setting the `type` prop, set the `type` within each
dataset individually.

<section class="mds">
  <!-- #region mixed -->
  <mx-chart :data.prop="mixedData" />
  <!-- #endregion mixed -->
</section>

<<< @/vuepress/components/charts.md#mixed
<<< @/vuepress/components/charts.md#mixed-data

### Properties

| Property  | Attribute | Description                                                                                               | Type                                                                                        | Default     |
| --------- | --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `data`    | --        | The labels and datasets to render. See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/). | `ChartJsData`                                                                               | `undefined` |
| `height`  | `height`  | Explicit height in pixels                                                                                 | `number`                                                                                    | `undefined` |
| `options` | --        | See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/).                                    | `ChartJsOptions`                                                                            | `undefined` |
| `type`    | `type`    | The type of chart to render. For mixed charts, set the `type` in the dataset instead.                     | `"bar" \| "bubble" \| "doughnut" \| "line" \| "pie" \| "polarArea" \| "radar" \| "scatter"` | `undefined` |
| `width`   | `width`   | Explicit width in pixels                                                                                  | `number`                                                                                    | `undefined` |

<script>
export default {
  data() {
    return {
      // #region line-data
      lineData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Example data',
            data: [435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397],
            borderColor: '#d93b65'
          },
        ]
      },
      // #endregion line-data
      // #region sparkline-options
      sparklineOptions: {
        maintainAspectRactio: false,
        elements: {
          point: {
            radius: 0
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false
          }
        },
        plugins: {
          legend: false,
          title: false,
          tooltip: false
        },
      },
      // #endregion sparkline-options
      // #region bar-data
      barData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Example data',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
          },
        ]
      },
      // #endregion bar-data
      // #region pie-data
      pieData: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'Example data',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }]
      },
      // #endregion pie-data
      // #region mixed-data
      mixedData: {
        labels: ['January', 'Febrary', 'March', 'April'],
        datasets: [{
          type: 'line',
          label: 'Line data',
          data: [10, 15, 55, 40],
        }, {
          type: 'bar',
          label: 'Bar data',
          data: [10, 30, 60, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(20, 205, 86, 0.2)',
          ]
        }]
      }
      // #endregion mixed-data
    }
  }
}
</script>
