import { newSpecPage } from '@stencil/core/testing';
import { MxButton } from '../mx-button';

describe('mx-button', () => {
  let page;
  let root;
  let btn;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `
      <mx-button
        el-aria-label="aria label"
        icon="ph-apple-logo"
        btn-type="contained"
        value="foo"
        formaction="/foo"
        data-test-test="test"
      >
        button
      </mx-button>`,
    });
    root = page.root;
    btn = root.querySelector('button');
  });

  it('renders a "contained" button', async () => {
    expect(btn.getAttribute('class')).toContain('contained');
  });

  it('has the correct default type', async () => {
    expect(btn.getAttribute('type')).toBe('button');
  });

  it('has the correct inner text', async () => {
    const { innerText } = btn;
    expect(innerText.trim()).toBe('button');
  });

  it('has the correct value and formaction', async () => {
    expect(btn.getAttribute('value')).toBe('foo');
    expect(btn.getAttribute('formaction')).toBe('/foo');
  });

  it('has a left icon', async () => {
    const icon = root.querySelector('button i');
    expect(icon).not.toBeNull();
  });

  it('has a min-height of 36px', async () => {
    expect(btn.getAttribute('class')).toContain('min-h-36');
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(btn.getAttribute('aria-label')).toBe('aria label');
  });

  it('applies any data attributes to the button element', async () => {
    expect(btn.getAttribute('data-test-test')).toBe('test');
  });
});

describe('mx-button as disabled', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="contained" value="foo" disabled>button</mx-button>`,
    });
    root = page.root;
  });

  it('is a disabled button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('mx-button as XL and full', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="contained" value="foo" xl full>button</mx-button>`,
    });
    root = page.root;
  });

  it('is a flex container and is 48px in min-height', async () => {
    const btn = root.querySelector('button');
    expect(root.getAttribute('class')).toContain('flex');
    expect(btn.getAttribute('class')).toContain('min-h-48');
  });
});

describe('mx-button as outlined', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="outlined" value="foo">button</mx-button>`,
    });
    root = page.root;
  });

  it('is an "outlined" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('border');
  });
});

describe('mx-button as a simple button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="simple" value="foo" dropdown>button</mx-button>`,
    });
    root = page.root;
  });

  it('is an "outlined" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('border');
  });

  it('is not uppercase', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).not.toContain('uppercase');
  });

  it('has a chevron icon', async () => {
    const icon = root.querySelector('button [data-testid="chevron"]');
    expect(icon).not.toBeNull();
  });
});

describe('mx-button as a text button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="text" value="foo" dropdown>button</mx-button>`,
    });
    root = page.root;
  });

  it('is a "text" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('text');
  });

  it('has a chevron icon', async () => {
    const icon = root.querySelector('button [data-testid="chevron"]');
    expect(icon).not.toBeNull();
  });
});

describe('mx-button as an anchor tag', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button href="https://google./com" target="_blank" btn-type="text" value="foo">button</mx-button>`,
    });
    root = page.root;
  });

  it('is an anchor element', async () => {
    const btn = root.querySelector('a');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('target')).toBeDefined();
  });
});
