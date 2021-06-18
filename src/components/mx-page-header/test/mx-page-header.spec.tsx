import '../../../utils/matchMedia.mock';
import '../../../utils/resizeObserver.mock';
import { newSpecPage } from '@stencil/core/testing';
import { MxPageHeader } from '../mx-page-header';
import { MxButton } from '../../mx-button/mx-button';

jest.useFakeTimers(); // Prevent setTimeout from blowing up tests

describe('mx-page-header', () => {
  let page;
  let root: HTMLMxPageHeaderElement;
  let heading: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxPageHeader, MxButton],
      html: `<mx-page-header>Page Header</mx-page-header>`,
    });
    root = page.root;
    heading = root.querySelector('h1');
  });

  it('renders the slot text as an h1', async () => {
    expect(heading.innerText).toBe('Page Header');
  });

  it('renders the previous page link', async () => {
    expect(root.querySelector('a')).toBeNull();
    root.previousPageUrl = '/';
    root.previousPageTitle = 'Home';
    await page.waitForChanges();
    const link = root.querySelector('a');
    expect(link.getAttribute('href')).toBe('/');
    expect(link.innerText).toContain('Home');
  });

  it('renders the primary, secondary, and tertiary buttons', async () => {
    expect(root.querySelectorAll('mx-button').length).toBe(0);
    root.buttons = [{ label: 'Primary' }, { label: 'Secondary' }, { label: 'Tertiary' }];
    await page.waitForChanges();
    const [primaryButton, secondaryButton, tertiaryButton] = Array.from(
      root.querySelectorAll('mx-button'),
    ) as HTMLMxButtonElement[];
    expect(primaryButton.btnType).toBe('contained');
    expect(secondaryButton.btnType).toBe('outlined');
    expect(tertiaryButton.btnType).toBe('text');
  });

  it('applies the background pattern if the pattern prop is set', async () => {
    expect(root.getAttribute('class')).not.toContain('bg-pattern');
    root.pattern = true;
    await page.waitForChanges();
    expect(root.getAttribute('class')).toContain('bg-pattern');
  });
});

describe('mx-page-header (with tabs)', () => {
  let page;
  let root: HTMLMxPageHeaderElement;
  let tabs: HTMLMxTabsElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxPageHeader, MxButton],
      html: `<mx-page-header>
        Page Header
        <mx-tabs slot="tabs" />
      </mx-page-header>`,
    });
    root = page.root;
    tabs = root.querySelector('mx-tabs');
    tabs.tabs = [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }];
    await page.waitForChanges();
  });

  it('renders the tabs slot', async () => {
    expect(tabs).not.toBeNull();
  });
});
