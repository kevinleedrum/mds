import { newSpecPage } from '@stencil/core/testing';
import { MxToggleButton } from '../mx-toggle-button';

describe('mx-toggle-button', () => {
  let page;
  let root;
  let btn;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxToggleButton],
      html: `<mx-toggle-button el-aria-label="aria label" icon="ph-apple-logo" data-test="test"></mx-toggle-button>`,
    });
    root = page.root;
    btn = root.querySelector('button');
  });

  it('renders a toggle button', async () => {
    expect(btn).not.toBeNull();
  });

  it('is not selected by default', async () => {
    expect(btn.getAttribute('class')).not.toContain('selected');
    expect(btn.getAttribute('aria-checked')).not.toBe('true');
  });

  it('has a switch role by default', async () => {
    expect(btn.getAttribute('role')).toBe('switch');
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(btn.getAttribute('aria-label')).toBe('aria label');
  });

  it('applies any data attributes to the button element', async () => {
    expect(btn.getAttribute('data-test')).toBe('test');
  });
});

describe('mx-toggle-button as disabled and selected', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxToggleButton],
      html: `<mx-toggle-button icon="ph-apple-logo" disabled selected></mx-toggle-button>`,
    });
    root = page.root;
  });

  it('is disabled', async () => {
    const btn = root.querySelector('button');
    expect(btn.disabled).not.toBeNull();
  });

  it('is selected', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('selected');
    expect(btn.getAttribute('aria-checked')).toBe('true');
  });
});

describe('mx-toggle-button as radio button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxToggleButton],
      html: `<mx-toggle-button icon="ph-apple-logo" value="foo"></mx-toggle-button>`,
    });
    root = page.root;
  });

  it('has a role of "radio"', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('role')).toBe('radio');
  });
});

describe('mx-toggle-button with string value', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxToggleButton],
      html: `<mx-toggle-button text-str="Test" value="foo"></mx-toggle-button>`,
    });
    root = page.root;
  });

  it('has string value of "Test"', async () => {
    const btn = root.querySelector('.mx-toggle-btn-str');
    expect(btn.innerText).toBe('Test');
  });
});
