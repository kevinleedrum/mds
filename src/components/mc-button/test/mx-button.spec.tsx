import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { McBtnType, McButton } from '../mc-button';

describe('mc-button', () => {
  let page: SpecPage;
  let root: HTMLMcButtonElement;
  let btn: HTMLButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [McButton],
      html: `
      <mc-button
        btn-type="normal"
        el-aria-label="aria label"
        form="bar"
        formaction="/foo"
        value="foo"
        data-admin--a--b-c="test"
      >
        button
      </mc-button>`,
    });
    root = page.root as HTMLMcButtonElement;
    btn = root.querySelector('button');
  });

  it('renders the "normal" btn-type', async () => {
    expect(btn.getAttribute('class')).toContain('normal-button');
  });

  it('has the correct default type', async () => {
    expect(btn.getAttribute('type')).toBe('button');
  });

  it('has the correct inner text', async () => {
    const { innerText } = btn;
    expect(innerText.trim()).toBe('button');
  });

  it('has the correct value, form, and formaction', async () => {
    expect(btn.getAttribute('value')).toBe('foo');
    expect(btn.getAttribute('form')).toBe('bar');
    expect(btn.getAttribute('formaction')).toBe('/foo');
  });

  it('renders a left icon', async () => {
    root.iconLeft = 'ph-apple-logo';
    await page.waitForChanges();
    const icon = root.querySelector('button i.ph-apple-logo');
    expect(icon).not.toBeNull();
    expect(btn.getAttribute('class')).toContain('px-15');
  });

  it('renders a right icon', async () => {
    root.iconRight = 'mds-check';
    await page.waitForChanges();
    const icon = root.querySelector('button i.mds-check');
    expect(icon).not.toBeNull();
    expect(btn.getAttribute('class')).toContain('px-15');
  });

  it('has a min-height of 40px by default', async () => {
    expect(btn.getAttribute('class')).toContain('min-h-40');
  });

  it('has a min-width of 150px by default', async () => {
    expect(root.getAttribute('class')).toContain('min-w-150');
  });

  it('has 20px of horizontal padding by default', async () => {
    expect(btn.getAttribute('class')).toContain('px-20');
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(btn.getAttribute('aria-label')).toBe('aria label');
  });

  it('applies any data attributes to the button element', async () => {
    expect(btn.getAttribute('data-admin--a--b-c')).toBe('test');
  });

  it('is disabled when the disabled prop is set', async () => {
    root.disabled = true;
    await page.waitForChanges();
    expect(btn.disabled).not.toBeNull();
  });

  it('lowers the min-height, min-width, and horizontal padding when the small prop is set', async () => {
    root.small = true;
    await page.waitForChanges();
    expect(btn.getAttribute('class')).toContain('min-h-30');
    expect(root.getAttribute('class')).toContain('min-w-100');
    expect(btn.getAttribute('class')).toContain('px-15');
  });

  it('is an inline-flex element when the full prop is not set', async () => {
    expect(root.getAttribute('class')).toContain('inline-flex');
  });

  it('is a flex container when the full prop is set', async () => {
    root.full = true;
    await page.waitForChanges();
    expect(root.getAttribute('class')).toContain('flex');
  });

  ['normal', 'ghost', 'transparent', 'action', 'alt', 'error', 'warning'].forEach(btnType => {
    it(`renders the "${btnType}" btn-type`, async () => {
      root.btnType = btnType as McBtnType;
      await page.waitForChanges();
      expect(btn.getAttribute('class')).toContain(`${btnType}-button`);
      if (btnType === 'ghost') {
        expect(btn.getAttribute('class')).toContain('border');
      }
    });
  });

  it('renders a dropdown icon if the dropdown prop is set', async () => {
    root.dropdown = true;
    await page.waitForChanges();
    const icon = root.querySelector('button [data-testid="dropdown-icon"]');
    expect(icon).not.toBeNull();
    expect(btn.getAttribute('class')).toContain('px-15');
  });

  it('does not have a min-width if the hug prop is set', async () => {
    root.hug = true;
    await page.waitForChanges();
    expect(root.getAttribute('class')).not.toContain('min-w-');
  });

  it('has three grid columns if hug is not set and an icon is present', async () => {
    root.iconLeft = 'ph-apple-logo';
    await page.waitForChanges();
    const gridEl = btn.firstElementChild as HTMLElement;
    expect(gridEl.style.gridTemplateColumns.trim()).toBe('1fr auto 1fr');
  });

  it('only has two grid columns if hug is set and an icon is present', async () => {
    root.iconLeft = 'ph-apple-logo';
    root.hug = true;
    await page.waitForChanges();
    const gridEl = btn.firstElementChild as HTMLElement;
    expect(gridEl.style.gridTemplateColumns.trim()).toBe('1fr auto');
  });
});

describe('mc-button with slot content', () => {
  let root: HTMLMcButtonElement;
  beforeEach(async () => {
    const page = await newSpecPage({
      components: [McButton],
      html: `<mc-button btn-type="normal">
        <span slot="left">lefty</span>
        button
        <span slot="right">righty</span>
      </mc-button>`,
    });
    root = page.root as HTMLMcButtonElement;
  });

  it('renders the left slot', async () => {
    const left = root.querySelector('button [data-testid="left-content"] [slot="left"]');
    expect(left).not.toBeNull();
  });

  it('renders the right slot', async () => {
    const right = root.querySelector('button [data-testid="right-content"] [slot="right"]');
    expect(right).not.toBeNull();
  });

  it('lowers the horizontal padding if there is left or right slot content', async () => {
    expect(root.querySelector('button').getAttribute('class')).toContain('px-15');
  });
});

describe('mc-button as link', () => {
  let root: HTMLMcButtonElement;
  beforeEach(async () => {
    const page = await newSpecPage({
      components: [McButton],
      html: `<mc-button href="https://google./com" target="_blank" btn-type="transparent" data-admin--a--b-c="test">button</mc-button>`,
    });
    root = page.root as HTMLMcButtonElement;
  });

  it('is an anchor element', async () => {
    const btn = root.querySelector('a');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('target')).toBeDefined();
  });

  it('applies any data attributes to the <a> element', async () => {
    const btn = root.querySelector('a');
    expect(btn.getAttribute('data-admin--a--b-c')).toBe('test');
  });
});
