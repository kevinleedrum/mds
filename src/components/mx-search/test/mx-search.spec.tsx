import { newSpecPage } from '@stencil/core/testing';
import { MxSearch } from '../mx-search';

describe('mx-search', () => {
  let page;
  let root: HTMLMxSearchElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxSearch],
      html: `<mx-search data-test="test" />`,
    });
    root = page.root;
    input = root.querySelector('input[type=search]');
  });

  it('renders an input[type=search]', async () => {
    expect(input).not.toBeNull();
  });

  it('sets the aria-label correctly', async () => {
    expect(input.getAttribute('aria-label')).toBe('Search');
    root.placeholder = 'Placeholder';
    await page.waitForChanges();
    expect(input.getAttribute('aria-label')).toBe('Placeholder');
    root.elAriaLabel = 'ARIA Label';
    await page.waitForChanges();
    expect(input.getAttribute('aria-label')).toBe('ARIA Label');
  });

  it('changes the height from 48px to 36px when the dense prop is set', async () => {
    expect(input.getAttribute('class')).toContain('h-48');
    root.dense = true;
    await page.waitForChanges();
    expect(input.getAttribute('class')).not.toContain('h-48');
    expect(input.getAttribute('class')).toContain('h-36');
  });

  it('adds a "flat" class when the flat prop is set', async () => {
    root.flat = true;
    await page.waitForChanges();
    expect(input.getAttribute('class')).toContain('flat');
  });

  it('applies the name prop as an attribute on the input', async () => {
    root.name = 'Name';
    await page.waitForChanges();
    expect(input.getAttribute('name')).toBe('Name');
  });

  it('applies the placeholder prop as an attribute on the input', async () => {
    root.placeholder = 'Placeholder';
    await page.waitForChanges();
    expect(input.getAttribute('placeholder')).toBe('Placeholder');
  });

  it('applies the value prop as an attribute on the input', async () => {
    root.value = 'Value';
    await page.waitForChanges();
    expect(input.getAttribute('value')).toBe('Value');
  });

  it('applies any data attributes to the input element', async () => {
    expect(input.getAttribute('data-test')).toBe('test');
  });

  it('updates the value prop when the input value is changed', async () => {
    input.value = 'bar';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(root.value).toBe('bar');
  });

  it('shows a clear button when there is a value', async () => {
    const button = root.querySelector('[data-testid="clear-button"]');
    expect(button.classList.contains('hidden'));
    root.value = 'boo';
    await page.waitForChanges();
    expect(button.classList.contains('hidden')).toBe(false);
  });

  it('clears the value when the clear button is clicked', async () => {
    root.value = 'boo';
    await page.waitForChanges();
    const button = root.querySelector('[data-testid="clear-button"]') as HTMLButtonElement;
    button.click();
    await page.waitForChanges();
    expect(root.value).toBe('');
  });

  it('does not show a clear button when showClear is false', async () => {
    expect(root.querySelector('[data-testid="clear-button"]')).not.toBeNull();
    root.showClear = false;
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="clear-button"]')).toBeNull();
  });
});
