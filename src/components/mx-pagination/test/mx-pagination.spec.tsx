import '../../../utils/resizeObserver.mock';
import '../../../utils/matchMedia.mock';
import { newSpecPage } from '@stencil/core/testing';
import { MxPagination, PageChangeEventDetail } from '../mx-pagination';
import { MxIconButton } from '../../mx-icon-button/mx-icon-button';
import { MxMenu } from '../../mx-menu/mx-menu';
import { MxMenuItem } from '../../mx-menu-item/mx-menu-item';

describe('mx-pagination (standard)', () => {
  let page;
  let root: HTMLMxPaginationElement;
  let firstPageButton: HTMLMxIconButtonElement;
  let prevPageButton: HTMLMxIconButtonElement;
  let nextPageButton: HTMLMxIconButtonElement;
  let lastPageButton: HTMLMxIconButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxPagination, MxIconButton, MxMenu, MxMenuItem],
      html: `<mx-pagination
        page="3"
        rows-per-page="25"
        total-rows="100"
      >
        <div slot="status">Status</div>
      </mx-pagination>`,
    });
    root = page.root;
    firstPageButton = root.querySelector('[aria-label="First page"]');
    prevPageButton = root.querySelector('[aria-label="Previous page"]');
    nextPageButton = root.querySelector('[aria-label="Next page"]');
    lastPageButton = root.querySelector('[aria-label="Last page"]');
  });

  it('renders the status slot content', () => {
    const statusSlot = root.querySelector('[data-testid="status"]') as HTMLElement;
    expect(statusSlot.innerText).toBe('Status');
  });

  it('sets the rowsPerPage based on the prop', () => {
    const rowsPerPage = root.querySelector('[data-testid="rows-per-page"]') as HTMLElement;
    expect(rowsPerPage.innerText).toBe('25');
  });

  it('displays the row range', () => {
    const rowRange = root.querySelector('[data-testid="row-range"]') as HTMLElement;
    expect(rowRange.innerText).toBe('51–75 of 100');
  });

  it('disables the first-page and previous-page buttons for the first page', async () => {
    expect(firstPageButton.getAttribute('disabled')).toBeNull();
    expect(prevPageButton.getAttribute('disabled')).toBeNull();
    root.page = 1;
    await page.waitForChanges();
    expect(firstPageButton.getAttribute('disabled')).not.toBeNull();
    expect(prevPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('disables the last-page and next-page buttons for the last page', async () => {
    expect(lastPageButton.getAttribute('disabled')).toBeNull();
    expect(nextPageButton.getAttribute('disabled')).toBeNull();
    root.page = 4;
    await page.waitForChanges();
    expect(lastPageButton.getAttribute('disabled')).not.toBeNull();
    expect(nextPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('disables the buttons when the disabled prop is set', async () => {
    root.disabled = true;
    await page.waitForChanges();
    expect(firstPageButton.getAttribute('disabled')).not.toBeNull();
    expect(prevPageButton.getAttribute('disabled')).not.toBeNull();
    expect(lastPageButton.getAttribute('disabled')).not.toBeNull();
    expect(nextPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('disables the next-page button when the disableNextPage prop is set', async () => {
    root.disableNextPage = true;
    await page.waitForChanges();
    expect(lastPageButton.getAttribute('disabled')).toBeNull();
    expect(nextPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('sets the rows-per-page options based on the rowsPerPageOptions prop', async () => {
    root.rowsPerPageOptions = [3, 9];
    root.rowsPerPage = 3;
    await page.waitForChanges();
    const rowsPerPageMenuItems = root.querySelectorAll('mx-menu-item');
    expect(rowsPerPageMenuItems.length).toBe(2);
    expect(rowsPerPageMenuItems[0].innerText).toBe('3');
    expect(rowsPerPageMenuItems[1].innerText).toBe('9');
  });

  it('emits an mxPageChange event when the rows-per-page is changed', async () => {
    let emittedValue: PageChangeEventDetail;
    root.addEventListener('mxPageChange', (e: CustomEvent) => (emittedValue = e.detail));
    const firstMenuItem = root.querySelector('mx-menu-item');
    firstMenuItem.click();
    expect(emittedValue.page).toBe(1);
    expect(emittedValue.rowsPerPage).toBe(10);
  });

  it('emits an mxPageChange event when the page is changed', async () => {
    let emittedValue: PageChangeEventDetail;
    root.addEventListener('mxPageChange', (e: CustomEvent) => (emittedValue = e.detail));
    nextPageButton.click();
    expect(emittedValue.page).toBe(4);
    expect(emittedValue.rowsPerPage).toBe(25);
  });
});

describe('mx-pagination (simple)', () => {
  let page;
  let root: HTMLMxPaginationElement;
  let prevPageButton: HTMLMxIconButtonElement;
  let nextPageButton: HTMLMxIconButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxPagination, MxIconButton, MxMenu, MxMenuItem],
      html: `<mx-pagination
        page="3"
        rows-per-page="25"
        total-rows="100"
        simple
      />`,
    });
    root = page.root;
    prevPageButton = root.querySelector('[aria-label="Previous page"]');
    nextPageButton = root.querySelector('[aria-label="Next page"]');
  });

  it('renders only previous-page and next-page buttons', () => {
    expect(root.querySelector('[aria-label="First page"]')).toBeNull();
    expect(root.querySelector('[aria-label="Last page"]')).toBeNull();
    expect(prevPageButton).not.toBeNull();
    expect(nextPageButton).not.toBeNull();
  });

  it('displays the page range', () => {
    expect(root.innerText).toBe('3 of 4');
  });

  it('disables the previous-page buttons for the first page', async () => {
    expect(prevPageButton.getAttribute('disabled')).toBeNull();
    root.page = 1;
    await page.waitForChanges();
    expect(prevPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('disables the next-page buttons for the last page', async () => {
    expect(nextPageButton.getAttribute('disabled')).toBeNull();
    root.page = 4;
    await page.waitForChanges();
    expect(nextPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('disables the buttons when the disabled prop is set', async () => {
    root.disabled = true;
    await page.waitForChanges();
    expect(prevPageButton.getAttribute('disabled')).not.toBeNull();
    expect(nextPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('disables the next-page button when the disableNextPage prop is set', async () => {
    root.disableNextPage = true;
    await page.waitForChanges();
    expect(nextPageButton.getAttribute('disabled')).not.toBeNull();
  });

  it('emits an mxPageChange event when the page is changed', async () => {
    let emittedValue: PageChangeEventDetail;
    root.addEventListener('mxPageChange', (e: CustomEvent) => (emittedValue = e.detail));
    nextPageButton.click();
    expect(emittedValue.page).toBe(4);
    expect(emittedValue.rowsPerPage).toBe(25);
  });
});
