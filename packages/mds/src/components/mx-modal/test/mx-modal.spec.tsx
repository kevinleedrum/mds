import '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxModal } from '../mx-modal';

describe('mx-modal', () => {
  let page: SpecPage;
  let root: HTMLMxModalElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxModal],
      html: `
      <mx-modal
        description="Test Description"
        is-open
        previous-page-url="https://moxiworks.com/"
        previous-page-title="MoxiWorks"
      >
        <div slot="header-left">Test Heading</div>
        This is the content
        <p slot="card">This is the card content</p>
      </mx-modal>
      `,
    });
    root = page.root as HTMLMxModalElement;
    root.buttons = [{ label: 'Primary' }, { label: 'Secondary' }, { label: 'Tertiary' }];
    await page.waitForChanges();
  });

  it('has aria-modal set to true and a role of dialog', () => {
    expect(root.getAttribute('role')).toBe('dialog');
    expect(root.getAttribute('aria-modal')).toBe('true');
  });

  it('has aria-labelledby set to the header-text element', () => {
    expect(root.getAttribute('aria-labelledby')).toContain('header-text');
  });

  it('renders the header-left slot content', () => {
    const headerText = root.querySelector('[data-testid="header-text"]') as HTMLElement;
    expect(headerText.innerText).toContain('Test Heading');
  });

  it('renders the default slot content', () => {
    const content = root.querySelector('[data-testid="modal-content"]') as HTMLElement;
    expect(content.innerText).toContain('This is the content');
  });

  it('renders the card slot content', () => {
    const card = root.querySelector('[data-testid="modal-card"]') as HTMLElement;
    expect(card.innerText).toContain('This is the card content');
  });

  it('renders the description text', () => {
    const description = root.querySelector('[data-testid="modal-description"]') as HTMLElement;
    expect(description.innerText).toContain('Test Description');
  });

  it('has a Close button by default', () => {
    expect(root.querySelector('[data-testid="close-button"]')).not.toBeNull();
  });

  it('renders the previous-page link', () => {
    const previousPageLink = root.querySelector('[data-testid="previous-page"]') as HTMLAnchorElement;
    expect(previousPageLink.href).toBe('https://moxiworks.com/');
    expect(previousPageLink.innerText).toBe('MoxiWorks');
  });

  it('renders the buttons specified by the buttons prop', () => {
    const buttons = root.querySelectorAll('[data-testid="buttons"] mx-button') as NodeListOf<HTMLMxButtonElement>;
    expect(buttons.length).toBe(3);
    expect(buttons[0].innerText).toBe('Primary');
    expect(buttons[0].getAttribute('btn-type')).toBe('contained');
    expect(buttons[1].innerText).toBe('Secondary');
    expect(buttons[1].getAttribute('btn-type')).toBe('outlined');
    expect(buttons[2].innerText).toBe('Tertiary');
    expect(buttons[2].getAttribute('btn-type')).toBe('text');
  });

  it('emits an mxClose event when Close is clicked', () => {
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    (root.querySelector('[data-testid="close-button"]') as HTMLMxButtonElement).click();
    expect(listener).toHaveBeenCalled();
  });

  it('emits an mxClose event when the backdrop is clicked', () => {
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    (root.querySelector('[data-testid="backdrop"]') as HTMLElement).click();
    expect(listener).toHaveBeenCalled();
  });

  it('does not emit an mxClose event when the backdrop is clicked and closeOnOutsideClick is false', async () => {
    root.closeOnOutsideClick = false;
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    (root.querySelector('[data-testid="backdrop"]') as HTMLElement).click();
    expect(listener).not.toHaveBeenCalled();
  });

  it('emits an mxClose event when Escape is pressed', () => {
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    const escape = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escape);
    expect(listener).toHaveBeenCalled();
  });

  it('does not emit an mxClose event when Escape is pressed and closeOnEscape is false', async () => {
    root.closeOnEscape = false;
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    const escape = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escape);
    expect(listener).not.toHaveBeenCalled();
  });

  it('closes when isOpen is set to false', async () => {
    root.isOpen = false;
    await page.waitForChanges();
    expect(root.getAttribute('class')).toContain('hidden');
  });
});

describe('mx-modal (custom slot content)', () => {
  let page: SpecPage;
  let root: HTMLMxModalElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxModal],
      html: `
      <mx-modal is-open>
        <div slot="header-right">Header Right</div>
        <div slot="header-bottom">Header Bottom</div>
        <div slot="footer-left">Footer Left</div>
        <div slot="footer-right">Footer Right</div>
      </mx-modal>
      `,
    });
    root = page.root as HTMLMxModalElement;
    await page.waitForChanges();
  });

  it('renders the header-right slot content', () => {
    expect((root.querySelector('[slot="header-right"]') as HTMLElement).innerText).toContain('Header Right');
  });

  it('renders the header-bottom slot content', () => {
    expect((root.querySelector('[slot="header-bottom"]') as HTMLElement).innerText).toContain('Header Bottom');
  });

  it('renders the footer-left slot content', () => {
    expect((root.querySelector('[slot="footer-left"]') as HTMLElement).innerText).toContain('Footer Left');
  });

  it('renders the footer-right slot content', () => {
    expect((root.querySelector('[slot="footer-right"]') as HTMLElement).innerText).toContain('Footer Right');
  });
});
