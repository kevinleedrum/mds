import { newSpecPage } from '@stencil/core/testing';
import { MxCircularProgress } from '../mx-circular-progress';

jest.useFakeTimers();

describe('mx-circular-progress (indeterminate)', () => {
  let page;
  let root: HTMLMxCircularProgressElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCircularProgress],
      html: `<mx-circular-progress />`,
    });
    root = page.root;
  });

  it('renders an svg circle', async () => {
    expect(root.querySelector('svg circle')).not.toBeNull();
  });

  it('uses the indeterminate animation', async () => {
    const circle = root.querySelector('circle');
    expect(circle.getAttribute('style')).toContain('animation: indeterminate');
  });

  it('uses the size prop for the width and height', async () => {
    root.size = '2rem';
    await page.waitForChanges();
    expect(root.getAttribute('style')).toContain('width: 2rem');
    expect(root.getAttribute('style')).toContain('height: 2rem');
  });

  it('has a progressbar ARIA role', async () => {
    expect(root.getAttribute('role')).toBe('progressbar');
  });

  it('does not have any ARIA value attributes', async () => {
    expect(root.getAttribute('aria-valuenow')).toBeNull();
    expect(root.getAttribute('aria-valuemin')).toBeNull();
    expect(root.getAttribute('aria-valuemax')).toBeNull();
  });
});

describe('mx-circular-progress (determinate)', () => {
  let page;
  let root: HTMLMxCircularProgressElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCircularProgress],
      html: `<mx-circular-progress value="25" />`,
    });
    root = page.root;
  });

  it('sets the stroke-dashoffset to render the correct percentage', async () => {
    const circle = root.querySelector('circle');
    expect(circle.getAttribute('style')).toContain('stroke-dashoffset: 95.190px');
  });

  it('sets the appropriate ARIA value attributes', async () => {
    expect(root.getAttribute('aria-valuenow')).toBe('25');
    expect(root.getAttribute('aria-valuemin')).toBe('0');
    expect(root.getAttribute('aria-valuemax')).toBe('100');
  });
});

describe('mx-circular-progress (appear-delay)', () => {
  let page;
  let root: HTMLMxCircularProgressElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCircularProgress],
      html: `<mx-circular-progress appear-delay="500" />`,
    });
    root = page.root;
  });

  it('waits to render if an appear-delay is provided', async () => {
    expect(root.classList.contains('hidden')).toBe(true);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
    jest.runAllTimers();
    expect(root.classList.contains('hidden')).toBe(false);
  });
});
