import { Component, Host, h, Prop, Element, Watch, Method } from '@stencil/core';
import { Chart, ChartType, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...(registerables || []));

// These interfaces prevent the Stencil documentation generator from expanding these type aliases (resulting in realllly long type definitions)
export interface ChartJsData extends ChartData {}
export interface ChartJsOptions extends ChartOptions {}

@Component({
  tag: 'mx-chart',
  shadow: false,
})
export class MxChart {
  canvasEl: HTMLCanvasElement;
  chart: Chart;

  /** The labels and datasets to render. See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/). */
  @Prop() data: ChartJsData;
  /** The aria-label attribute for the inner canvas element. */
  @Prop() elAriaLabel: string = 'Chart';
  /** Explicit height in pixels */
  @Prop() height: number;
  /** See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/). */
  @Prop() options: ChartJsOptions;
  /** The type of chart to render. For mixed charts, set the `type` in the dataset instead. */
  @Prop() type: ChartType;
  /** Explicit width in pixels */
  @Prop() width: number;

  @Element() element: HTMLMxChartElement;

  @Watch('data')
  @Watch('options')
  @Watch('type')
  onDataChange() {
    this.update();
  }

  componentDidLoad() {
    this.update();
  }

  /** Force the chart to rerender. */
  @Method()
  async update() {
    if (!this.canvasEl) return;
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.canvasEl, {
      type: this.type,
      data: this.data,
      options: this.options,
    });
  }

  get chartStyle() {
    return { width: this.width && this.width + 'px', height: this.height && this.height + 'px' };
  }

  render() {
    return (
      <Host class="mx-chart relative block" style={this.chartStyle}>
        <canvas ref={el => (this.canvasEl = el)} role="img" aria-label={this.elAriaLabel} style={this.chartStyle} />
      </Host>
    );
  }
}
