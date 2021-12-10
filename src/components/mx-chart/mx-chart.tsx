import { Component, Host, h, Prop, Element } from '@stencil/core';
import { Chart, ChartType, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  tag: 'mx-chart',
  shadow: false,
})
export class MxChart {
  canvasEl: HTMLCanvasElement;
  chart: Chart;

  @Prop() type: ChartType = 'line';
  @Prop() data: ChartData;
  @Prop() options: ChartOptions;
  @Prop() width: number;
  @Prop() height: number;

  @Element() element: HTMLMxChartElement;

  componentDidLoad() {
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
        <canvas ref={el => (this.canvasEl = el)} role="img" style={this.chartStyle} />
      </Host>
    );
  }
}
