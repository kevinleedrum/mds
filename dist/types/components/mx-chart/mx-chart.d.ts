import { Chart, ChartType, ChartData, ChartOptions } from 'chart.js';
export interface ChartJsData extends ChartData {
}
export interface ChartJsOptions extends ChartOptions {
}
export declare class MxChart {
  canvasEl: HTMLCanvasElement;
  chart: Chart;
  /** The labels and datasets to render. See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/). */
  data: ChartJsData;
  /** Explicit height in pixels */
  height: number;
  /** See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/). */
  options: ChartJsOptions;
  /** The type of chart to render. For mixed charts, set the `type` in the dataset instead. */
  type: ChartType;
  /** Explicit width in pixels */
  width: number;
  element: HTMLMxChartElement;
  onDataChange(): void;
  componentDidLoad(): void;
  /** Force the chart to rerender. */
  update(): Promise<void>;
  get chartStyle(): {
    width: string;
    height: string;
  };
  render(): any;
}
