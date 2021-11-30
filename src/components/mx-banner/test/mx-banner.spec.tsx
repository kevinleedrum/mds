import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxButton } from '../../mx-button/mx-button';
import { MxBanner } from '../mx-banner';

describe('mx-banner', () => {
  let page: SpecPage;
  let root: HTMLMxBannerElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBanner, MxButton],
      html: `
      <mx-banner is-open>
        Test message.
        <img slot="image">
        <div slot="actions">
          <mx-button btn-type="text">Action</mx-button>
        </div>
      </mx-banner>
      `,
    });
    root = page.root as HTMLMxBannerElement;
  });

  it('has a role of alert', () => {
    expect(root.getAttribute('role')).toBe('alert');
  });

  it('renders the default slot inside the banner', () => {
    expect(root.querySelector('[data-testid="message"]').textContent).toContain('Test message');
  });

  it('renders the image slot inside the banner', () => {
    expect(root.querySelector('[data-testid="message"] img')).not.toBeNull();
  });

  it('renders the actions slot', () => {
    expect(root.querySelector('[data-testid="actions"] mx-button')).not.toBeNull();
  });

  it('hides the banner if isOpen is false', async () => {
    root.isOpen = false;
    await page.waitForChanges();
    expect(root.classList.contains('hidden')).toBe(true);
  });

  it('uses sticky positioning if the sticky prop is passed', async () => {
    root.sticky = true;
    await page.waitForChanges();
    expect(root.classList.contains('sticky')).toBe(true);
  });

  it('adds an is-error class if the error prop is passed', async () => {
    root.error = true;
    await page.waitForChanges();
    expect(root.classList.contains('is-error')).toBe(true);
  });
});
