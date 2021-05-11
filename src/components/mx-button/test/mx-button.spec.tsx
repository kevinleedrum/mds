import { newSpecPage } from '@stencil/core/testing';
import { MxButton } from '../mx-button';

describe('mx-button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button icon-left="ph-apple-logo" btn-type="contained" value="foo">button</mx-button>`,
    });
    root = page.root;
  });

  it('renders a "contained" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('contained');
  });

  it('has teh correct default type', async () => {
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
    const icon = root.querySelector('button');
    expect(icon).not.toBeNull();
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
    expect(btn.getAttribute('disabled')).not.toBeNull();
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

  it('is a disabled button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('full');
    expect(btn.getAttribute('class')).toContain('xl');
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
    expect(btn.getAttribute('class')).toContain('outlined');
  });
});

describe('mx-button as an action button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="action" value="foo">button</mx-button>`,
    });
    root = page.root;
  });

  it('is an "outlined" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('action');
  });
});

describe('mx-button as a text button', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxButton],
      html: `<mx-button btn-type="text" value="foo">button</mx-button>`,
    });
    root = page.root;
  });

  it('is an "outlined" button', async () => {
    const btn = root.querySelector('button');
    expect(btn.getAttribute('class')).toContain('text');
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

  it('is an "outlined" button', async () => {
    const btn = root.querySelector('a');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('target')).toBeDefined();
  });
});
