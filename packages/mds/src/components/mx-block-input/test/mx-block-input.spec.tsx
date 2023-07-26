import { newSpecPage } from '@stencil/core/testing';
import { MxBlockInput } from '../mx-block-input';

describe('mx-block-input', () => {
  let page;
  let root: HTMLMxBlockInputElement;
  let input: HTMLInputElement;
  let label: HTMLLabelElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBlockInput],
      html: `
        <mx-block-input
          assistive-text="testAssistiveText"
          colspan="2"
          inputId="testId"
          label="testLabel"
          maxlength="10"
          name="testName"
          placeholder="testPlaceholder"
          type="email"
          value="testValue"
          data-test="testData"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
    label = root.querySelector('label');
  });

  it('assigns proper value for label', async () => {
    const placeholder = root.querySelector('label');
    expect(placeholder.textContent).toContain('testLabel');
  });

  it('associates the label with the input', async () => {
    expect(label.getAttribute('htmlFor')).toBe(input.getAttribute('id'));
  });

  it('has the right name, value, placeholder and type', async () => {
    expect(input.getAttribute('name')).toBe('testName');
    expect(input.value).toBe('testValue');
    expect(input.placeholder).toBe('testPlaceholder');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('updates the value prop when the input value is changed', async () => {
    input.value = 'bar';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(root.value).toBe('bar');
  });

  it('should have proper assistive text', async () => {
    const assitive = label.querySelector('span');
    expect(assitive.textContent).toBe('testAssistiveText');
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
    expect(input.getAttribute('maxlength')).toBe('10');
  });

  it('applies any data attributes to the input element', async () => {
    expect(input.getAttribute('data-test')).toBe('testData');
  });

  it('associates assistive text to the aria-describedby attribute', async () => {
    expect(input.getAttribute('aria-describedby')).toBe(label.querySelector('span').getAttribute('id'));
  });
});
