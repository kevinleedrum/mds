# mx-chart



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                                                                                               | Type                                                                                        | Default     |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `data`        | --              | The labels and datasets to render. See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/). | `ChartJsData`                                                                               | `undefined` |
| `elAriaLabel` | `el-aria-label` | The aria-label attribute for the inner canvas element.                                                    | `string`                                                                                    | `'Chart'`   |
| `height`      | `height`        | Explicit height in pixels                                                                                 | `number`                                                                                    | `undefined` |
| `options`     | --              | See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/).                                    | `ChartJsOptions`                                                                            | `undefined` |
| `type`        | `type`          | The type of chart to render. For mixed charts, set the `type` in the dataset instead.                     | `"bar" \| "bubble" \| "doughnut" \| "line" \| "pie" \| "polarArea" \| "radar" \| "scatter"` | `undefined` |
| `width`       | `width`         | Explicit width in pixels                                                                                  | `number`                                                                                    | `undefined` |


## Methods

### `update() => Promise<void>`

Force the chart to rerender.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
