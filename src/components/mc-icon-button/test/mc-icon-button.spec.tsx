import { newSpecPage } from '@stencil/core/testing';
import { McIconButton } from '../mc-icon-button';

describe('mc-icon-button', () => {
  let page;
  let root: HTMLMcIconButtonElement;
  let button: HTMLButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [McIconButton],
      html: `<mc-icon-button data-test="test"></mc-icon-button>`,
    });
    root = page.root;
    button = root.querySelector('button');
  });

  it('renders a round 40px button by default', async () => {
    expect(button).not.toBeNull();
    expect(button.getAttribute('class')).toContain('w-40');
    expect(button.getAttribute('class')).toContain('h-40');
    expect(button.getAttribute('class')).toContain('rounded-full');
  });

  it('renders a 30px button is the btn-type is set to small', async () => {
    root.btnType = 'small';
    await page.waitForChanges();
    expect(button.getAttribute('class')).toContain('w-30');
    expect(button.getAttribute('class')).toContain('h-30');
  });

  it('uses the icon prop as a class name on an <i> element', async () => {
    root.icon = 'ph-apple-logo';
    await page.waitForChanges();
    const icon = root.querySelector('i');
    expect(icon.getAttribute('class')).toContain('ph-apple-logo');
  });

  it('renders a close icon if the btn-type is set to close', async () => {
    root.btnType = 'close';
    await page.waitForChanges();
    const icon = root.querySelector('i');
    expect(button.getAttribute('class')).toContain('w-30');
    expect(button.getAttribute('class')).toContain('h-30');
    expect(icon.getAttribute('class')).toContain('mds-x-close');
  });

  it('does not emit a click event when disabled is true', async () => {
    const listener = jest.fn();
    root.addEventListener('click', listener);
    button.click();
    expect(listener).toHaveBeenCalled();
    listener.mockReset();
    root.disabled = true;
    await page.waitForChanges();
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

describe('mc-icon-button (as link)', () => {
  let page;
  let root: HTMLMcIconButtonElement;
  let button: HTMLAnchorElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [McIconButton],
      html: `<mc-icon-button href="/" icon="icon"></mc-icon-button>`,
    });
    root = page.root;
    button = root.querySelector('a');
  });

  it('renders an <a>', async () => {
    expect(button).not.toBeNull();
  });

  it('uses the target prop as the target attribute on the link', async () => {
    root.target = '_blank';
    await page.waitForChanges();
    expect(button.getAttribute('target')).toBe('_blank');
  });
});
