import { newSpecPage } from '@stencil/core/testing';
import { MxChipGroup } from '../mx-chip-group';
import { MxChip } from '../../mx-chip/mx-chip';

describe('mx-chip-group', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxChipGroup, MxChip],
      html: `
      <mx-chip-group value="b">
        <mx-chip value="a">A</mx-chip>
        <mx-chip value="b">B</mx-chip>
      </mx-chip-group>`,
    });
    root = page.root;
  });

  it('renders the host element', async () => {
    expect(root.tagName).toBe('mx-chip-group'.toUpperCase());
  });

  it('selects the correct chip by default', async () => {
    const chipA = root.querySelector('mx-chip[value="a"]') as HTMLMxChipElement;
    const chipB = root.querySelector('mx-chip[value="b"]') as HTMLMxChipElement;
    expect(chipA.selected).toBe(false);
    expect(chipB.selected).toBe(true);
  });

  it('selects the correct chip when a chip is clicked', async () => {
    const chipA = root.querySelector('mx-chip[value="a"]') as HTMLMxChipElement;
    const chipB = root.querySelector('mx-chip[value="b"]') as HTMLMxChipElement;
    chipA.click();
    await page.waitForChanges();
    expect(chipA.selected).toBe(true);
    expect(chipB.selected).toBe(false);
  });

  it('selects the correct chip when the value prop changes', async () => {
    root.value = 'a';
    await page.waitForChanges();
    const chipA = root.querySelector('mx-chip[value="a"]') as HTMLMxChipElement;
    const chipB = root.querySelector('mx-chip[value="b"]') as HTMLMxChipElement;
    expect(chipA.selected).toBe(true);
    expect(chipB.selected).toBe(false);
  });

  it('emits an mxInput event when a chip is clicked', async () => {
    let emittedValue;
    root.addEventListener('mxInput', e => (emittedValue = e.detail));
    const chipA = root.querySelector('mx-chip[value="a"]') as HTMLMxChipElement;
    chipA.click();
    expect(emittedValue).toBe('a');
  });
});
