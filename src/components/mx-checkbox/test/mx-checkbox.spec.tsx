import { newSpecPage } from '@stencil/core/testing';
import { MxCheckbox } from '../mx-checkbox';

describe('mx-checkbox', () => {
  let page;
  let root: HTMLMxCheckboxElement;
  let input;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCheckbox],
      html: `<mx-checkbox name="foo" label-name="Premier" checked="true" data-test="test" />`,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('is a checkbox', async () => {
    expect(input.type).toBe('checkbox');
  });

  it('has the proper name and label', async () => {
    const labelName = root.querySelector('[data-testid="labelName"]') as HTMLElement;
    expect(input.getAttribute('name')).toBe('foo');
    expect(labelName.innerText).toBe('Premier');
  });

  it('is checked', async () => {
    expect(input.checked).toBeTruthy();
  });

  it('disables the input when the disabled prop is set', async () => {
    root.disabled = true;
    await page.waitForChanges();
    expect(input.disabled).toBeTruthy();
  });

  it('sets the indeterminate attribute on the input when the indeterminate prop is set', async () => {
    root.indeterminate = true;
    await page.waitForChanges();
    expect(input.getAttribute('indeterminate')).not.toBeNull();
  });

  it('applies any data attributes to the input element', async () => {
    expect(input.getAttribute('data-test')).toBe('test');
  });

  it('updates the checked prop when the checkbox is (un)checked', async () => {
    input.checked = false;
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(root.checked).toBe(false);
  });
});
