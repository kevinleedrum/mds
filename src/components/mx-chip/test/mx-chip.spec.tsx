import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxChip } from '../mx-chip';

describe('mx-chip', () => {
  let page;
  let root: HTMLMxChipElement;
  let innerDiv: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxChip],
      html: `<mx-chip>Label</mx-chip>`,
    });
    root = page.root;
    innerDiv = root.querySelector('div');
  });

  it('renders the slot content', async () => {
    expect(root.innerHTML).toContain('Label');
  });

  it('displays a checkmark when selected is set', async () => {
    expect(root.querySelector('[data-testid="check"]')).toBeNull();
    root.selected = true;
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="check"]')).not.toBeNull();
  });

  it('displays an icon if the icon class is set', async () => {
    expect(root.querySelector('i')).toBeNull();
    root.icon = 'ph-apple-logo';
    await page.waitForChanges();
    expect(root.querySelector('i')).not.toBeNull();
  });

  it('displays the passed avatarUrl image', async () => {
    expect(root.querySelector('[data-testid="left-icon"]')).toBeNull();
    root.avatarUrl = 'avatar.png';
    await page.waitForChanges();
    const leftIcon = root.querySelector('[data-testid="left-icon"]') as HTMLElement;
    expect(leftIcon).not.toBeNull();
    expect(leftIcon.getAttribute('style')).toContain('background: url(avatar.png)');
  });

  it('displays a remove button when removable is set', async () => {
    expect(root.querySelector('[data-testid="remove"]')).toBeNull();
    root.removable = true;
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="remove"]')).not.toBeNull();
  });

  it('emits an mxRemove event when the remove button is clicked', async () => {
    root.removable = true;
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('mxRemove', listener);
    (root.querySelector('[data-testid="remove"]') as HTMLButtonElement).click();
    expect(listener).toHaveBeenCalled();
  });

  it('does not emit a click event when the remove button is clicked', async () => {
    root.removable = true;
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('click', listener);
    (root.querySelector('[data-testid="remove"]') as HTMLButtonElement).click();
    expect(listener).not.toHaveBeenCalled();
  });

  it('adds an outlined class when outlined is set to true', async () => {
    expect(innerDiv.getAttribute('class')).not.toContain('outlined');
    root.outlined = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('class')).toContain('outlined');
  });

  it('adds a choice class when the choice prop is set', async () => {
    expect(innerDiv.getAttribute('class')).not.toContain('choice');
    root.choice = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('class')).toContain('choice');
  });

  it('adds a filter class when the filter prop is set', async () => {
    expect(innerDiv.getAttribute('class')).not.toContain('filter');
    root.filter = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('class')).toContain('filter');
  });

  it('adds the aria-disabled attribute and prevents event propagation when disabled', async () => {
    const listener = jest.fn();
    root.addEventListener('click', listener);
    innerDiv.click();
    expect(listener).toHaveBeenCalled();
    expect(innerDiv.getAttribute('aria-disabled')).not.toBe('true');
    root.disabled = true;
    await page.waitForChanges();
    listener.mockReset();
    innerDiv.click();
    expect(listener).not.toHaveBeenCalled();
    expect(innerDiv.getAttribute('aria-disabled')).toBe('true');
  });

  it('sets the role attribute appropriately', async () => {
    expect(innerDiv.getAttribute('role')).toBeNull();
    root.clickable = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('role')).toBe('button');
    root.filter = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('role')).toBe('checkbox');
    root.filter = false;
    root.choice = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('role')).toBe('radio');
  });

  it('sets the tabindex attribute appropriately', async () => {
    expect(innerDiv.getAttribute('tabindex')).toBe('-1');
    root.clickable = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('tabindex')).toBe('0');
    root.clickable = false;
    root.filter = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('tabindex')).toBe('0');
    root.filter = false;
    root.choice = true;
    await page.waitForChanges();
    expect(innerDiv.getAttribute('tabindex')).toBe('0');
  });

  it('triggers a click event on Enter or space', async () => {
    root.clickable = true;
    await page.waitForChanges();
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    const nonClickKeyboardEvent = new KeyboardEvent('keydown', { key: 'a' });
    const listener = jest.fn();
    root.addEventListener('click', listener);
    innerDiv.dispatchEvent(enterEvent);
    innerDiv.dispatchEvent(spaceEvent);
    innerDiv.dispatchEvent(nonClickKeyboardEvent);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
