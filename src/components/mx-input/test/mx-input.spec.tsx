import { newSpecPage } from '@stencil/core/testing';
import { MxInput } from '../mx-input';

describe('mx-input', () => {
  let page;
  let root: HTMLMxInputElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxInput],
      html: `
        <mx-input
          label="Placeholder"
          left-icon="ph-apple-logo"
          name="testInput"
          value="foo"
          placeholder="bar"
          maxlength="10"
          suffix="BAR"
          type="email"
          dense="true"
          assistive-text="Enter your test input"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('assigns proper value for placeholder', async () => {
    const placeholder = root.querySelector('label');
    expect(placeholder.textContent).toBe('Placeholder');
  });

  it('has the right name, value, placeholder and type', async () => {
    expect(input.getAttribute('name')).toBe('testInput');
    expect(input.value).toBe('foo');
    expect(input.placeholder).toBe('bar');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('has a visible left icon', async () => {
    const icon = root.querySelector('.ph-apple-logo');
    expect(icon).not.toBeNull();
  });

  it('is a dense input with a height of 36px', async () => {
    const elem = root.querySelector('.mx-input-wrapper');
    expect(elem.getAttribute('class')).toContain('h-36');
  });

  it('should have proper assistive text', async () => {
    const assitive = root.querySelector('[data-testid="assistive-text"]');
    expect(assitive.textContent).toBe('Enter your test input');
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

  it('displays the suffix', async () => {
    const characterCount = root.querySelector('[data-testid="suffix"]');
    expect(characterCount.textContent).toBe('BAR');
  });

  it('sets the maxlength attribute on the input', async () => {
    expect(input.getAttribute('maxlength')).toBe('10');
  });

  it('displays a character count and limit', async () => {
    const characterCount = root.querySelector('[data-testid="character-count"]');
    expect(characterCount.textContent).toBe('3/10');
  });

  it('renders a floating label if the float-label prop is set', async () => {
    let label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(false);
    root.floatLabel = true;
    await page.waitForChanges();
    label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(true);
  });
});

describe('mx-input as a textarea', () => {
  let page;
  let root: HTMLMxInputElement;
  let tarea: HTMLTextAreaElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxInput],
      html: `
        <mx-input
          label="Placeholder"
          textarea="true"
          name="testInput"
          value="foo"
          maxlength="100"
          assistive-text="Enter your test input"
        />
      `,
      supportsShadowDom: true,
    });
    root = page.root;
    tarea = root.querySelector('textarea');
  });

  it('renders a textarea element', async () => {
    expect(tarea).not.toBeNull();
  });

  it('has the right name and value', async () => {
    expect(tarea.getAttribute('name')).toBe('testInput');
    expect(tarea.value).toBe('foo');
  });

  it('sets the maxlength attribute on the textarea', async () => {
    expect(tarea.getAttribute('maxlength')).toBe('100');
  });

  it('should have proper assistive text', async () => {
    const assitive = root.querySelector('[data-testid="assistive-text"]');
    expect(assitive.textContent).toBe('Enter your test input');
  });

  it('displays a character count and limit', async () => {
    const characterCount = root.querySelector('[data-testid="character-count"]');
    expect(characterCount.textContent).toBe('3/100');
  });
});
