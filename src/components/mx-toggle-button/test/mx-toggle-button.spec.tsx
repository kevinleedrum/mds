import { newSpecPage } from '@stencil/core/testing';
import { MxToggleButton } from '../mx-toggle-button';

describe('mx-toggle-button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxToggleButton],
      html: `<mx-toggle-button icon="ph-apple-logo"></mx-toggle-button>`,
    });
    root = page.root;
  });

  it('renders a toggle button', async () => {
    const btn = root.querySelector('button');
    expect(btn).not.toBeNull();
  });

  it('is not selected by default', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).not.toContain('selected');
    expect(btn.getAttribute('aria-checked')).toBeNull();
  });

  it('has a switch role by default', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('role')).toBe('switch');
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
    expect(btn.getAttribute('aria-disabled')).not.toBeNull();
    expect(btn.getAttribute('aria-disabled')).not.toBe('false');
  });

  it('is selected', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('selected');
    expect(btn.getAttribute('aria-checked')).not.toBeNull();
    expect(btn.getAttribute('aria-checked')).not.toBe('false');
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
