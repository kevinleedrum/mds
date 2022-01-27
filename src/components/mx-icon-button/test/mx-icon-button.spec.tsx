import { newSpecPage } from '@stencil/core/testing';
import { MxIconButton } from '../mx-icon-button';

describe('mx-icon-button', () => {
  let page;
  let root: HTMLMxIconButtonElement;
  let button: HTMLButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxIconButton],
      html: `<mx-icon-button data-test="test"></mx-icon-button>`,
    });
    root = page.root;
    button = root.querySelector('button');
  });

  it('renders a round 48px button', async () => {
    expect(button).not.toBeNull();
    expect(button.getAttribute('class')).toContain('w-48');
    expect(button.getAttribute('class')).toContain('h-48');
    expect(button.getAttribute('class')).toContain('rounded-full');
  });

  it('uses the icon prop as a class name on an <i> element', async () => {
    root.icon = 'ph-apple-logo';
    await page.waitForChanges();
    const icon = root.querySelector('i');
    expect(icon.getAttribute('class')).toContain('ph-apple-logo');
  });

  it('renders a chevron SVG if any of the chevron props is set', async () => {
    root.chevronDown = true;
    await page.waitForChanges();
    const chevron = root.querySelector('[data-testid=chevron]');
    expect(chevron).not.toBeNull();
    root.chevronDown = false;
    root.chevronLeft = true;
    await page.waitForChanges();
    expect(chevron).not.toBeNull();
    expect(chevron.getAttribute('class')).toContain('chevron-left');
    root.chevronLeft = false;
    root.chevronRight = true;
    await page.waitForChanges();
    expect(chevron.getAttribute('class')).toContain('chevron-right');
  });

  it('does not emit a click event when disabled is true', async () => {
    const listener = jest.fn();
    root.addEventListener('click', listener);
    button.click();
    expect(listener).toHaveBeenCalled();
    listener.mockReset();
    root.disabled = true;
    page.waitForChanges();
    button.click();
    expect(listener).not.toHaveBeenCalled();
  });

  it('uses the elAriaLabel prop for the aria-label attribute on the button', async () => {
    root.elAriaLabel = 'Open';
    await page.waitForChanges();
    expect(button.getAttribute('aria-label')).toBe('Open');
  });

  it('uses the value prop as an attribute on the button', async () => {
    root.value = 'Open';
    await page.waitForChanges();
    expect(button.getAttribute('value')).toBe('Open');
  });

  it('uses the form and formaction props as attributes on the button', async () => {
    root.form = 'the-form';
    root.formaction = '/login';
    await page.waitForChanges();
    expect(button.getAttribute('form')).toBe('the-form');
    expect(button.getAttribute('formaction')).toBe('/login');
  });

  it('uses the type prop as an attribute on the button', async () => {
    root.type = 'submit';
    await page.waitForChanges();
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('applies any data attributes to the button element', async () => {
    expect(button.getAttribute('data-test')).toBe('test');
  });
});

describe('mx-icon-button (as link)', () => {
  let page;
  let root: HTMLMxIconButtonElement;
  let button: HTMLAnchorElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxIconButton],
      html: `<mx-icon-button href="/" icon="icon"></mx-icon-button>`,
    });
    root = page.root;
    button = root.querySelector('a');
  });

  it('renders an <a>', async () => {
    expect(button).not.toBeNull();
    expect(button.getAttribute('class')).toContain('w-48');
    expect(button.getAttribute('class')).toContain('h-48');
    expect(button.getAttribute('class')).toContain('rounded-full');
  });
});
