import { newSpecPage } from '@stencil/core/testing';
import { MxSwitch } from '../mx-switch';

describe('mx-checkbox', () => {
  let page;
  let root;
  let input;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxSwitch],
      html: `<mx-switch name="foo" label-name="Premier" value="dog" checked="true" data-test="test" />`,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('is a checkbox', async () => {
    expect(input.type).toBe('checkbox');
  });

  it('has the proper name, value, and label', async () => {
    const labelName = root.querySelector('[data-testid="labelName"]');
    expect(input.getAttribute('name')).toBe('foo');
    expect(input.getAttribute('value')).toBe('dog');
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
