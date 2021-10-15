import { newSpecPage } from '@stencil/core/testing';
import { MxTooltip } from '../mx-tooltip';

jest.useFakeTimers();

describe('mx-tooltip', () => {
  let page;
  let root: HTMLMxTooltipElement;
  let anchorEl: HTMLElement;
  let tooltip: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTooltip],
      html: `
      <mx-tooltip value="Test">
        <span>Button</span>
      </mx-tooltip>`,
    });
    root = page.root;
    anchorEl = root.firstElementChild as HTMLElement;
    tooltip = root.querySelector('[data-testid="tooltip"]');
  });

  it('shows the tooltip when isOpen is true', async () => {
    expect(tooltip.classList.contains('hidden'));
    root.isOpen = true;
    await page.waitForChanges();
    expect(tooltip.classList.contains('hidden')).toBe(false);
    root.isOpen = false;
    await page.waitForChanges();
    expect(tooltip.classList.contains('hidden'));
  });

  it('uses the value prop for the innerText of the tooltip', () => {
    expect(tooltip.innerText).toBe('Test');
  });

  it('opens when the anchorEl is hovered', async () => {
    expect(root.isOpen).toBe(false);
    anchorEl.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();
    jest.runAllTimers();
    expect(root.isOpen);
    anchorEl.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();
    jest.runAllTimers();
    expect(root.isOpen).toBe(false);
  });

  it('open when the anchorEl is focused', async () => {
    expect(root.isOpen).toBe(false);
    anchorEl.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    jest.runAllTimers();
    expect(root.isOpen);
    anchorEl.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    jest.runAllTimers();
    expect(root.isOpen).toBe(false);
  });

  it('changes the styling when the extended prop is set', async () => {
    expect(tooltip.classList.contains('py-4'));
    expect(tooltip.classList.contains('p-16')).toBe(false);
    expect(tooltip.classList.contains('shadow-4')).toBe(false);
    root.extended = true;
    await page.waitForChanges();
    expect(tooltip.classList.contains('py-4')).toBe(false);
    expect(tooltip.classList.contains('p-16'));
    expect(tooltip.classList.contains('shadow-4'));
  });

  it('adds an inverted class if the inverted prop is set', async () => {
    expect(tooltip.classList.contains('inverted')).toBe(false);
    root.inverted = true;
    await page.waitForChanges();
    expect(tooltip.classList.contains('inverted'));
  });

  it('adds the tooltipClass prop to the tooltip classList', async () => {
    root.tooltipClass = 'test-class';
    await page.waitForChanges();
    expect(tooltip.classList.contains('test-class'));
  });

  it('applies the madWidth prop value to the tooltip', async () => {
    root.maxWidth = '33rem';
    await page.waitForChanges();
    expect(tooltip.style.maxWidth).toBe('33rem');
  });
});

describe('mx-tooltip (tooltip slot)', () => {
  let page;
  let root: HTMLMxTooltipElement;
  let tooltip: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTooltip],
      html: `
      <mx-tooltip>
        <span>Button</span>
        <span slot="tooltip">Test</span>
      </mx-tooltip>`,
    });
    root = page.root;
    tooltip = root.querySelector('[data-testid="tooltip"]');
  });

  it('renders the tooltip slot content inside the tooltip', async () => {
    expect(tooltip.innerHTML.trim()).toBe('<span slot="tooltip">Test</span>');
  });
});
