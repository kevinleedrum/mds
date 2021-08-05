import { newSpecPage } from '@stencil/core/testing';
import { MxCheckbox } from '../mx-checkbox';

describe('mx-checkbox', () => {
  let page;
  let root: HTMLMxCheckboxElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCheckbox],
      html: `<mx-checkbox name="foo" label-name="Premier" checked="true" />`,
    });
    root = page.root;
  });

  it('is a checkbox', async () => {
    const input = root.querySelector('input');
    expect(input.type).toBe('checkbox');
  });

  it('has the proper name and label', async () => {
    const input = root.querySelector('input');
    const labelName = root.querySelector('[data-testid="labelName"]') as HTMLElement;
    expect(input.getAttribute('name')).toBe('foo');
    expect(labelName.innerText).toBe('Premier');
  });

  it('is checked', async () => {
    const input = root.querySelector('input');
    expect(input.checked).toBeTruthy();
  });

  it('disables the input when the disabled prop is set', async () => {
    root.disabled = true;
    await page.waitForChanges();
    const input = root.querySelector('input');
    expect(input.disabled).toBeTruthy();
  });

  it('adds an indeterminate class when the indeterminate prop is set', async () => {
    root.indeterminate = true;
    await page.waitForChanges();
    const input = root.querySelector('input');
    expect(input.getAttribute('class').includes('indeterminate')).toBe(true);
  });
});
