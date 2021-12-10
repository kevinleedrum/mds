# Charts

The `mx-chart` component provides chart generation via Chart.js.

## Line charts

<section class="mds">
  <div>
    <!-- #region line -->
    <mx-chart class="h-240 sm:h-320" type="line" :data.prop="lineData" />
    <!-- #endregion line -->
  </div>
  <div class="my-40">
    <strong class="block mb-20">Sparkline</strong>
    <!-- #region sparkline -->
    <mx-chart class="w-128 h-48" type="line" :data.prop="lineData" :options.prop="sparklineOptions" />
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
  <mx-chart class="h-320" type="bar" :data.prop="barData" />
  <!-- #endregion bar -->
</section>

<<< @/vuepress/components/charts.md#bar
<<< @/vuepress/components/charts.md#bar-data

## Pie and doughnut charts

<section class="mds">
  <!-- #region pie -->
  <mx-chart class="h-320" type="pie" :data.prop="pieData" />
  <mx-chart class="h-128" type="doughnut" :data.prop="pieData" />
  <!-- #endregion -->
</section>

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
            fill: true,
          },
        ]
      },
      // #endregion line-data
      // #region sparkline-options
      sparklineOptions: {
        responsive: false,
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            borderWidth: 2,
            borderColor: "#6a9"
          }
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
    }
  }
}
</script>
