import { newSpecPage } from '@stencil/core/testing';
import { MxBadge } from '../mx-badge';

describe('mx-badge (standalone, icon + value, squared)', () => {
  let page;
  let root;
  let badge;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge icon="ph-apple-logo" value="Apple" squared></mx-badge>`,
    });
    root = page.root;
    badge = root.querySelector('.badge');
  });

  it('renders a badge', () => {
    expect(badge).not.toBeNull();
  });

  it('displays the icon', () => {
    const icon = badge.querySelector('i');
    expect(icon).not.toBeNull();
  });

  it('displays the value', () => {
    expect(badge.innerText).toBe('Apple');
  });

  it('has square-ish corners', () => {
    expect(badge.getAttribute('class')).toContain('rounded');
  });
});

describe('mx-badge (anchored, value)', () => {
  let page;
  let root;
  let badge;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge value="3"><div></div></mx-badge>`,
    });
    root = page.root;
    badge = root.querySelector('.badge');
  });

  it('is positioned in the top right corner by default', () => {
    expect(badge.getAttribute('class')).toContain('top-0');
    expect(badge.getAttribute('class')).toContain('right-0');
  });

  it('has rounded sides by default', () => {
    expect(badge.getAttribute('class')).toContain('rounded-xl');
  });
});

describe('mx-badge (anchored, icon, bottom left, offset)', () => {
  let page;
  let root;
  let badge;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge icon="ph-apple-logo" bottom left offset="10"><div></div></mx-badge>`,
    });
    root = page.root;
    badge = root.querySelector('.badge');
  });

  it('is positioned in the bottom left corner with a 10px offset', () => {
    expect(badge.getAttribute('class')).toContain('bottom-10');
    expect(badge.getAttribute('class')).toContain('left-10');
  });

  it('is fully rounded', () => {
    expect(badge.getAttribute('class')).toContain('rounded-full');
  });
});

describe('mx-badge (anchored, indicator)', () => {
  let page;
  let root: HTMLMxBadgeElement;
  let badge;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge indicator><div></div></mx-badge>`,
    });
    root = page.root;
    badge = root.querySelector('.badge');
  });

  it('is positioned in the top right corner', () => {
    expect(badge.getAttribute('class')).toContain('top-0');
    expect(badge.getAttribute('class')).toContain('right-0');
  });

  it('is 12px', () => {
    expect(badge.getAttribute('class')).toContain('w-12');
    expect(badge.getAttribute('class')).toContain('h-12');
  });

  it('renders a circle SVG by default', () => {
    expect(root.querySelector('[data-testid=indicator-circle]')).not.toBeNull();
  });

  it('renders an explicitly set indicator shape SVG', async () => {
    root.indicator = 'star';
    await page.waitForChanges();
    expect(root.querySelector('[data-testid=indicator-star]')).not.toBeNull();
  });
});
