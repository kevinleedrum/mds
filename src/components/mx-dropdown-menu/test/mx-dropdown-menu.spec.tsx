import '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxDropdownMenu } from '../mx-dropdown-menu';
import { MxMenuItem } from '../../mx-menu-item/mx-menu-item';
import { list } from 'postcss';

// Behavior not tested due to spec page testing limitations:
// - opening the menu when the anchorEl is clicked (because `anchorEl.contains(e.target)` is always false)
// - full menu keyboard navigation (because `page.doc.activeElement` is always undefined)

describe('mx-menu', () => {
  let page: SpecPage;
  let root: HTMLMxDropdownMenuElement;
  let dropdownWrapper: HTMLElement;
  let input: HTMLInputElement;
  let menuItems: NodeListOf<HTMLMxMenuItemElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxDropdownMenu, MxMenuItem],
      html: `
      <mx-dropdown-menu
        value="1000-3000"
        label="Size"
        aria-label="size-aria-label"
        name="size-name"
        dropdown-id="size-id"
        suffix="SQFT"
      >
        <mx-menu-item>0-1000</mx-menu-item>
        <mx-menu-item>1000-3000</mx-menu-item>
        <mx-menu-item>3001+</mx-menu-item>
      </mx-dropdown-menu>
      `,
    });
    root = page.root as HTMLMxDropdownMenuElement;
    dropdownWrapper = root.querySelector('div');
    input = root.querySelector('input');
    menuItems = root.querySelectorAll('mx-menu-item');
    await page.waitForChanges();
  });

  it('uses the aria-label prop as an attribute on the input', () => {
    expect(input.getAttribute('aria-label')).toBe('size-aria-label');
  });

  it('uses the name prop as an attribute on the input', () => {
    expect(input.getAttribute('name')).toBe('size-name');
  });

  it('uses the dropdown-id prop as the id for the input', () => {
    expect(input.getAttribute('id')).toBe('size-id');
  });

  it('uses the label prop as the placeholder for the input', () => {
    expect(input.getAttribute('placeholder')).toBe('Size');
  });

  it('uses the value prop as the value of the input', () => {
    expect(input.value).toBe('1000-3000');
  });

  it('renders the suffix prop', () => {
    expect(root.innerText).toContain('SQFT');
  });

  it('displays an arrow SVG', () => {
    expect(root.querySelector('[data-testid="arrow"]')).not.toBeNull();
  });

  it('updates the value when a menu item is clicked', async () => {
    menuItems[0].click();
    await page.waitForChanges();
    expect(root.value).toBe('0-1000');
  });

  it('emits an input event when the selected value changes', async () => {
    const listener = jest.fn();
    root.addEventListener('input', listener);
    menuItems[0].click();
    expect(listener).toHaveBeenCalled();
  });

  it('adds an elevated class when the elevated prop is set', async () => {
    root.elevated = true;
    await page.waitForChanges();
    expect(dropdownWrapper.getAttribute('class')).toContain('elevated');
  });

  it('adds a flat class when the elevated prop is set', async () => {
    root.flat = true;
    await page.waitForChanges();
    expect(dropdownWrapper.getAttribute('class')).toContain('flat');
  });

  it('changes the height from 48px to 36px when the dense prop is set', async () => {
    expect(dropdownWrapper.getAttribute('class')).toContain('h-48');
    root.dense = true;
    await page.waitForChanges();
    expect(dropdownWrapper.getAttribute('class')).toContain('h-36');
  });
});
