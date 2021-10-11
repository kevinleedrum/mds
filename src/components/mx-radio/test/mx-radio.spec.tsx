import { newSpecPage } from '@stencil/core/testing';
import { MxRadio } from '../mx-radio';

describe('mx-checkbox', () => {
  let page;
  let root;
  let input;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxRadio],
      html: `<mx-radio name="foo" label-name="Premier" checked="true" data-test="test" />`,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('is a radio', async () => {
    expect(input.type).toBe('radio');
  });

  it('has the proper name and label', async () => {
    const labelName = root.querySelector('[data-testid="labelName"]');
    expect(input.getAttribute('name')).toBe('foo');
    expect(labelName.innerText).toBe('Premier');
  });

  it('is checked', async () => {
    expect(input.checked).toBeTruthy();
  });

  it('applies any data attributes to the input element', async () => {
    expect(input.getAttribute('data-test')).toBe('test');
  });
});
