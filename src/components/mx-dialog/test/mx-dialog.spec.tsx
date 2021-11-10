import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxButton } from '../../mx-button/mx-button';
import { MxDialog } from '../mx-dialog';

describe('mx-dialog', () => {
  let page: SpecPage;
  let root: HTMLMxDialogElement;
  let modal;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxDialog, MxButton],
      html: `<mx-dialog />`,
    });
    root = page.root as HTMLMxDialogElement;
    modal = root.querySelector('[data-testid="modal"]');
  });

  it('has aria-modal set to true and a role of alertdialog', async () => {
    expect(modal.getAttribute('role')).toBe('alertdialog');
    expect(modal.getAttribute('aria-modal')).toBe('true');
  });

  it('has aria-describedby set to the message element if a message is present', async () => {
    root.alert('test');
    await page.waitForChanges();
    await page.waitForChanges();
    expect(modal.getAttribute('aria-describedby')).toBe('dialog-message');
  });

  it('has aria-labelledby set to the heading element if a heading is present', async () => {
    root.alert('test', { heading: 'test' });
    await page.waitForChanges();
    await page.waitForChanges();
    expect(modal.getAttribute('aria-labelledby')).toBe('dialog-heading');
  });

  it('displays the specified message', async () => {
    root.alert('message');
    await page.waitForChanges();
    await page.waitForChanges();
    const message = root.querySelector('p').innerText;
    expect(message).toBe('message');
  });

  it('displays a heading if specified', async () => {
    root.alert('test', { heading: 'Heading' });
    await page.waitForChanges();
    await page.waitForChanges();
    const heading = root.querySelector('h1').innerText;
    expect(heading).toBe('Heading');
  });

  it('uses the confirmLabel and cancelLabel for the dialog buttons', async () => {
    root.confirm('test', { confirmLabel: 'Yes', cancelLabel: 'No' });
    await page.waitForChanges();
    await page.waitForChanges();
    const buttonText = Array.from(root.querySelectorAll('button')).map(button => button.innerText);
    expect(buttonText[0]).toBe('Yes');
    expect(buttonText[1]).toBe('No');
  });

  it('confirm() resolves to true when the Okay button is clicked', async () => {
    let resolved;
    root.confirm('test').then(confirmed => (resolved = confirmed));
    await page.waitForChanges();
    await page.waitForChanges();
    root.querySelectorAll('button')[0].click();
    await page.waitForChanges();
    expect(resolved).toBe(true);
  });

  it('confirm() resolves to false when the Cancel button is clicked', async () => {
    let resolved;
    root.confirm('test').then(confirmed => (resolved = confirmed));
    await page.waitForChanges();
    await page.waitForChanges();
    root.querySelectorAll('button')[1].click();
    await page.waitForChanges();
    expect(resolved).toBe(false);
  });

  it('confirm() resolves to false when Escape is pressed', async () => {
    let resolved;
    root.confirm('test').then(confirmed => (resolved = confirmed));
    await page.waitForChanges();
    await page.waitForChanges();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();
    expect(resolved).toBe(false);
  });

  it('confirm() resolves to true when Enter is pressed', async () => {
    let resolved;
    root.confirm('test').then(confirmed => (resolved = confirmed));
    await page.waitForChanges();
    await page.waitForChanges();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(resolved).toBe(true);
  });
});
