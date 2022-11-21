import { newSpecPage } from '@stencil/core/testing';
import { McRange } from '../mc-range';

describe('mc-range', () => {
  let page;
  let root: HTMLMcRangeElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [McRange],
      html: `
        <mc-range
          name="foo"
          value="50"
          min="10"
          max="100"
          step="5"
          input-id="bloop"
          label="Label"
          value-prefix="$"
          value-suffix="USD"
          value-class="test-class"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('renders', async () => {
    const elems = document.getElementsByTagName('mc-range');
    expect(elems.length).toBe(1);
  });

  it('has the right name, id, value, min, max, and step', async () => {
    expect(input.getAttribute('name')).toBe('foo');
    expect(input.getAttribute('id')).toBe('bloop');
    expect(input.value).toBe('50');
    expect(input.min).toBe('10');
    expect(input.max).toBe('100');
    expect(input.step).toBe('5');
  });

  it('sets the label properly', async () => {
    const label = root.querySelector('label');
    expect(label.textContent).toBe('Label');
  });

  it('renders the value-prefix and value-suffix', async () => {
    expect(root.textContent).toContain('$50USD');
  });

  it('applies the value-class to the value', async () => {
    const value = root.querySelector('input + span');
    expect(value.classList.contains('test-class')).toBe(true);
  });

  it('does not render the value text if hide-value is set', async () => {
    let valueEl = root.querySelector('input + span');
    expect(valueEl).not.toBeNull();
    root.hideValue = true;
    await page.waitForChanges();
    valueEl = root.querySelector('input + span');
    expect(valueEl).toBe(null);
  });

  it('updates the value prop when the input value is changed', async () => {
    input.value = '25';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(root.value).toBe(25);
  });

  it('disables the input based on the disabled prop', async () => {
    expect(input.getAttribute('disabled')).toBeNull();
    root.disabled = true;
    await page.waitForChanges();
    expect(input.getAttribute('disabled')).not.toBeNull();
  });
});
