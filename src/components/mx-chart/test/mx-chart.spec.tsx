jest.mock('chart.js');
import ChartJs from 'chart.js';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxChart } from '../mx-chart';

describe('mx-chart (code prop)', () => {
  let page: SpecPage;
  let root: HTMLMxChartElement;
  let canvas: HTMLCanvasElement;
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Example data',
        data: [435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397],
        borderColor: '#d93b65',
      },
    ],
  };
  const chartOptions = {
    maintainAspectRatio: false,
  };

  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxChart],
      html: `<mx-chart type="line" width="640" height="320" />`,
    });
    root = page.root as HTMLMxChartElement;
    root.data = chartData;
    root.options = chartOptions;
    await page.waitForChanges();
    await page.waitForChanges();
    canvas = root.querySelector('canvas');
  });

  it('renders a canvas element', () => {
    expect(canvas).not.toBeNull();
  });

  it('sets the width and height on the root and canvas elements', async () => {
    expect(root.style.width).toBe('640px');
    expect(root.style.height).toBe('320px');
    expect(canvas.style.width).toBe('640px');
    expect(canvas.style.height).toBe('320px');
  });

  it('creates a new Chart of the provided type', async () => {
    expect((ChartJs as any).mock.calls[0][1].type).toBe('line');
  });
});
