import '../../../utils/matchMedia.mock';
import { newSpecPage } from '@stencil/core/testing';
import { MxFab } from '../mx-fab';

describe('mx-fab', () => {
  let page;
  let root: HTMLMxFabElement;
  let button: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxFab],
      html: `<mx-fab icon="ph-heart" value="liked" el-aria-label="Like" />`,
    });
    root = page.root;
    button = root.querySelector('button');
  });

  it('renders a button', async () => {
    expect(button).not.toBeNull();
  });

  it('adds a secondary class if the secondary prop is set', async () => {
    expect(button.getAttribute('class')).not.toContain('secondary');
    root.secondary = true;
    await page.waitForChanges();
    expect(button.getAttribute('class')).toContain('secondary');
  });

  it('applies the value and aria-label props to the button attributes', async () => {
    expect(button.getAttribute('value')).toBe('liked');
    expect(button.getAttribute('aria-label')).toBe('Like');
  });
});

describe('mx-fab (extended)', () => {
  let page;
  let root: HTMLMxFabElement;
  let button: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxFab],
      html: `<mx-fab>Add</mx-fab>`,
    });
    root = page.root;
    button = root.querySelector('button');
  });

  it('renders the slot content as the button label', async () => {
    expect(button.innerText).toBe('Add');
  });
});
