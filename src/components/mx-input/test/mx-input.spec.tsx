import { newSpecPage } from '@stencil/core/testing';
import { MxInput } from '../mx-input';

describe('mx-input', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxInput],
      html: `
        <mx-input
          label="Placeholder"
          left-icon="ph-apple-logo"
          name="testInput"
          value="foo"
          type="email"
          dense="true"
          assistive-text="Enter your test input"
        />
      `,
      supportsShadowDom: true,
    });
    root = page.root;
  });

  it('assigns proper value for placeholder', async () => {
    const placeholder = root.querySelector('label');
    expect(placeholder.textContent).toBe('Placeholder');
  });

  it('has the right name, value and type', async () => {
    const input = root.querySelector('input');
    expect(input.getAttribute('name')).toBe('testInput');
    expect(input.getAttribute('value')).toBe('foo');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('has a visible left icon', async () => {
    const icon = root.querySelector('.ph-apple-logo');
    expect(icon).not.toBeNull();
  });

  it('is a dense input represented by the class', async () => {
    const elem = root.querySelector('.mx-input-wrapper');
    expect(elem.getAttribute('class')).toContain('dense');
  });

  it('should have proper assistive text', async () => {
    const assitive = root.querySelector('.assistive-text');
    expect(assitive.textContent).toBe('Enter your test input');
  });
});

describe('mx-input as a textarea', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxInput],
      html: `
        <mx-input
          label="Placeholder"
          textarea="true"
          name="testInput"
          value="foo"
          assistive-text="Enter your test input"
        />
      `,
      supportsShadowDom: true,
    });
    root = page.root;
  });

  it('assigns proper value for placeholder', async () => {
    const tarea = root.querySelector('textarea');
    expect(tarea).not.toBeNull();
  });
});
