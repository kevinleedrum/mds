import { newSpecPage } from '@stencil/core/testing';
import { MxRadio } from '../mx-radio';

describe('mx-checkbox', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxRadio],
      html: `<mx-radio name="foo" label-name="Premier" checked="true" />`,
    });
    root = page.root;
  });

  it('is a radio', async () => {
    const input = root.querySelector('input');
    expect(input.type).toBe('radio');
  });

  it('has the proper name and label', async () => {
    const input = root.querySelector('input');
    const labelName = root.querySelector('[data-testid="labelName"]');
    expect(input.getAttribute('name')).toBe('foo');
    expect(labelName.innerText).toBe('Premier');
  });

  it('is checked', async () => {
    const input = root.querySelector('input');
    expect(input.checked).toBeTruthy();
  });
});
