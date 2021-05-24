import { newSpecPage } from '@stencil/core/testing';
import { MxButton } from '../mx-button';

describe('mx-button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button icon="ph-apple-logo" btn-type="contained" value="foo">button</mx-button>`,
    });
    root = page.root;
  });

  it('renders a "contained" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('contained');
  });

  it('has the correct default type', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('type')).toBe('button');
  });

  it('has the correct inner text', async () => {
    const btn = root.querySelector('button');
    const { innerText } = btn;
    expect(innerText).toBe('button');
  });

  it('has the correct value', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('value')).toBe('foo');
  });

  it('has a left icon', async () => {
    const icon = root.querySelector('button i');
    expect(icon).not.toBeNull();
  });

  it('has a height of 36px', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('h-36');
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
    expect(btn.getAttribute('aria-disabled')).not.toBeNull();
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

  it('is a flex container and is 48px in height', async () => {
    const btn = root.querySelector('button');
    expect(root.getAttribute('class')).toContain('flex');
    expect(btn.getAttribute('class')).toContain('h-48');
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

describe('mx-button as an action button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="action" value="foo" dropdown>button</mx-button>`,
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
    const icon = root.querySelector('button svg.chevron-icon');
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
    const icon = root.querySelector('button svg.chevron-icon');
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

describe('mx-button as an icon button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="icon" icon="ph-apple-logo"></mx-button>`,
    });
    root = page.root;
  });

  it('is an "icon" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('icon');
  });

  it('is a 48px-wide circle', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('w-48');
    expect(btn.getAttribute('class')).toContain('h-48');
    expect(btn.getAttribute('class')).toContain('rounded-full');
  });
});

describe('mx-button as a dropdown icon button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="icon" dropdown></mx-button>`,
    });
    root = page.root;
  });

  it('has a chevron icon', async () => {
    const icon = root.querySelector('button svg.chevron-icon');
    expect(icon).not.toBeNull();
  });
});
