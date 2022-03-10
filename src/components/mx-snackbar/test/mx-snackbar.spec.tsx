import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxSnackbar } from '../mx-snackbar';
import { MxButton } from '../../mx-button/mx-button';

jest.useFakeTimers();

describe('mx-snackbar', () => {
  let page: SpecPage;
  let root: HTMLMxSnackbarElement;
  let snackbarAlert: HTMLElement;
  let button: HTMLMxButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxSnackbar, MxButton],
      html: `<mx-snackbar>
        Test
        <mx-button btn-type="text" slot="action">Dismiss</mx-button>
      </mx-snackbar>`,
    });
    root = page.root as HTMLMxSnackbarElement;
    snackbarAlert = root.querySelector('.mx-snackbar-alert');
    button = root.querySelector('mx-button');
  });

  it('has a role of alert', () => {
    expect(snackbarAlert.getAttribute('role')).toBe('alert');
  });

  it('is shown when isOpen is set', async () => {
    expect(root.getAttribute('class').includes('hidden')).toBe(true);
    root.isOpen = true;
    await page.waitForChanges();
    expect(root.getAttribute('class').includes('hidden')).toBe(false);
  });

  it('closes when the action button is clicked', async () => {
    root.isOpen = true;
    await page.waitForChanges();
    button.click();
    await page.waitForChanges();
    expect(root.isOpen).toBe(false);
  });

  it('emits an mxClose event when it closes', async () => {
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    root.isOpen = true;
    await page.waitForChanges();
    button.click();
    await page.waitForChanges();
    expect(listener).toHaveBeenCalled();
  });
});
