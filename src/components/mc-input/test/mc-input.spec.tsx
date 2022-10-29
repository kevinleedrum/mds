import { newSpecPage } from '@stencil/core/testing';
import { McInput } from '../mc-input';

describe('mc-input', () => {
  let page;
  let root: HTMLMcInputElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [McInput],
      html: `
        <mc-input
          type="text"
          name="foo"
          value="bar"
          inputId="bloop"
          label="Enter Something"
          placeholder="Enter Something"
          instructions="Enter something into the input, ya heard?"
          el-aria-label="Input for Something"
          maxlength="255"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('renders', async () => {
    const elems = document.getElementsByTagName('mc-input');
    expect(elems.length).toBe(1);
  });

  it('assigns proper value for placeholder', async () => {
    const placeholder = input.getAttribute('placeholder');
    expect(placeholder).toBe('Enter Something');
  });

  it('has the right name, value and type', async () => {
    expect(input.getAttribute('name')).toBe('foo');
    expect(input.value).toBe('bar');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('updates the value prop when the input value is changed', async () => {
    root.value = 'bop';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(input.value).toBe('bop');
  });

  it('should have proper instruction text', async () => {
    const instructions = root.querySelector('[data-test-id="instructions"]');
    expect(instructions.textContent).toBe('Enter something into the input, ya heard?');
  });

  it('disables the input based on the disabled prop', async () => {
    expect(input.getAttribute('disabled')).toBeNull();
    root.disabled = true;
    await page.waitForChanges();
    expect(input.getAttribute('disabled')).not.toBeNull();
  });

  it('sets the inputs to read-only if the readonly prop is set', async () => {
    expect(input.getAttribute('readonly')).toBeNull();
    root.readonly = true;
    await page.waitForChanges();
    expect(input.getAttribute('readonly')).not.toBeNull();
  });

  it('sets the maxlength attribute on the input', async () => {
    expect(input.getAttribute('maxlength')).toBe('255');
  });

  it('sets the label properly', async () => {
    const label = root.querySelector('[data-test-id="label"]');
    expect(label.textContent).toBe('Enter Something');
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(input.getAttribute('aria-label')).toBe('Input for Something');
  });
});
