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

  @Element() element: HTMLMxChartElement;

  componentDidRender() {
    this.canvasEl.width = this.element.scrollWidth;
    this.canvasEl.height = this.element.scrollHeight;
  }

  componentDidLoad() {
    this.chart = new Chart(this.canvasEl, {
      type: this.type,
      data: this.data,
      options: this.options,
    });
  }

  render() {
    return (
      <Host class="mx-chart relative block">
        <canvas ref={el => (this.canvasEl = el)} role="img" class="w-full h-full" />
      </Host>
    );
  }
}
