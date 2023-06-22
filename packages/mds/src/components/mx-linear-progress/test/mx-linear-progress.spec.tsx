import { newSpecPage } from '@stencil/core/testing';
import { MxLinearProgress } from '../mx-linear-progress';

jest.useFakeTimers();

describe('mx-linear-progress (indeterminate)', () => {
  let page;
  let root: HTMLMxLinearProgressElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxLinearProgress],
      html: `<mx-linear-progress />`,
    });
    root = page.root;
  });

  it('renders two inner indeterminate bars', async () => {
    const indeterminate1 = root.querySelector('[data-testid="indeterminate1"]');
    const indeterminate2 = root.querySelector('[data-testid="indeterminate2"]');
    expect(indeterminate1).not.toBeNull();
    expect(indeterminate2).not.toBeNull();
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

describe('mx-linear-progress (determinate)', () => {
  let page;
  let root: HTMLMxLinearProgressElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxLinearProgress],
      html: `<mx-linear-progress value="25" />`,
    });
    root = page.root;
  });

  it('positions an inner bar to render the correct percentage', async () => {
    const determinate = root.querySelector('[data-testid="determinate"]');
    expect(determinate.getAttribute('style')).toContain('translateX(-75%)');
  });

  it('sets the appropriate ARIA value attributes', async () => {
    expect(root.getAttribute('aria-valuenow')).toBe('25');
    expect(root.getAttribute('aria-valuemin')).toBe('0');
    expect(root.getAttribute('aria-valuemax')).toBe('100');
  });
});

describe('mx-linear-progress (appear-delay)', () => {
  let page;
  let root: HTMLMxLinearProgressElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxLinearProgress],
      html: `<mx-linear-progress appear-delay="500" />`,
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
