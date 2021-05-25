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

  it('renders a badge', async () => {
    expect(badge).not.toBeNull();
  });

  it('displays the icon', async () => {
    const icon = badge.querySelector('i');
    expect(icon).not.toBeNull();
  });

  it('displays the value', async () => {
    expect(badge.innerText).toBe('Apple');
  });

  it('has square-ish corners', async () => {
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

  it('is positioned in the top right corner by default', async () => {
    expect(badge.getAttribute('class')).toContain('top-0');
    expect(badge.getAttribute('class')).toContain('right-0');
  });

  it('has rounded sides by default', async () => {
    expect(badge.getAttribute('class')).toContain('rounded-xl');
  });
});

describe('mx-badge (anchored, icon, bottom left, snug)', () => {
  let page;
  let root;
  let badge;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge icon="ph-apple-logo" bottom left snug><div></div></mx-badge>`,
    });
    root = page.root;
    badge = root.querySelector('.badge');
  });

  it('is positioned snugly in the bottom left corner', async () => {
    expect(badge.getAttribute('class')).toContain('bottom-10');
    expect(badge.getAttribute('class')).toContain('left-10');
  });

  it('is fully rounded', async () => {
    expect(badge.getAttribute('class')).toContain('rounded-full');
  });
});

describe('mx-badge (anchored, dot, tight)', () => {
  let page;
  let root;
  let badge;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge dot tight><div></div></mx-badge>`,
    });
    root = page.root;
    badge = root.querySelector('.badge');
  });

  it('is positioned tightly in the top right corner', async () => {
    expect(badge.getAttribute('class')).toContain('top-4');
    expect(badge.getAttribute('class')).toContain('right-4');
  });

  it('is a 12px circle', async () => {
    expect(badge.getAttribute('class')).toContain('rounded-full');
    expect(badge.getAttribute('class')).toContain('w-12');
    expect(badge.getAttribute('class')).toContain('h-12');
  });
});
