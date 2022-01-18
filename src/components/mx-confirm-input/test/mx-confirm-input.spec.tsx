import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxInput } from '../../mx-input/mx-input';
import { MxConfirmInput } from '../mx-confirm-input';

describe('mx-confirm-input', () => {
  let page: SpecPage;
  let root: HTMLMxConfirmInputElement;
  let mxInput: HTMLMxInputElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxConfirmInput, MxInput],
      html: `
        <mx-confirm-input el-aria-label="aria label" />
      `,
    });
    root = page.root as HTMLMxConfirmInputElement;
    mxInput = root.querySelector('mx-input');
    input = root.querySelector('input');
  });

  it('assigns the value prop to the input', async () => {
    expect(input.value).toBe('');
    root.value = 'bingo';
    await page.waitForChanges();
    expect(input.value).toBe('bingo');
  });

  it('updates the value and emits an input event when pressing Enter inside the input', async () => {
    const listener = jest.fn();
    root.addEventListener('input', listener);
    mxInput.value = 'bingo';
    await page.waitForChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(listener).toHaveBeenCalled();
    expect(root.value).toBe('bingo');
  });

  it('does not update the value or emit an input event on Escape', async () => {
    const listener = jest.fn();
    root.addEventListener('input', listener);
    mxInput.value = 'bingo';
    await page.waitForChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();
    expect(listener).not.toHaveBeenCalled();
    expect(root.value).toBeFalsy();
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(input.getAttribute('aria-label')).toBe('aria label');
  });
});
