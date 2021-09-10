import '../../../utils/resizeObserver.mock';
import { mockLargeScreen } from '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxTable } from '../mx-table';
import { MxTableRow } from '../../mx-table-row/mx-table-row';
import { MxTableCell } from '../../mx-table-cell/mx-table-cell';
import { MxCheckbox } from '../../mx-checkbox/mx-checkbox';
import { MxPagination } from '../../mx-pagination/mx-pagination';

mockLargeScreen(); // Force all min-width checks to emulate a large screen

describe('mx-table (non-mobile)', () => {
  let page: SpecPage;
  let root: HTMLMxTableElement;
  let grid: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTable, MxTableRow, MxTableCell, MxCheckbox, MxPagination],
      html: `
      <mx-table />
      `,
    });
    root = page.root as HTMLMxTableElement;
    root.rows = [
      { id: 0, name: 'Alvin', age: 10 },
      { id: 1, name: 'Simon', age: 3 },
      { id: 2, name: 'Theodore', age: 2 },
    ];
    root.columns = [
      { property: 'name', heading: 'First Name', sortable: false },
      { property: 'age', heading: 'Age', type: 'number', sortable: true },
      { getValue: (row: any) => row.name.slice(0, 1), heading: 'First Letter' },
    ];
    await page.waitForChanges();
    grid = root.querySelector('[data-testid="grid"]');
  });

  it('renders all the rows if the row count is less than the rows-per-page', () => {
    const rows = root.querySelectorAll('mx-table-row');
    expect(rows.length).toBe(3);
  });

  it('limits rendered rows to the rows-per-page', async () => {
    root.rowsPerPage = 2;
    await page.waitForChanges();
    const rows = root.querySelectorAll('mx-table-row');
    expect(rows.length).toBe(2);
  });

  it('renders latter result pages', async () => {
    root.rowsPerPage = 2;
    root.page = 1;
    await page.waitForChanges();
    const rows = root.querySelectorAll('mx-table-row');
    expect(rows.length).toBe(1);
  });

  it('renders all rows if the paginate prop is set to false', async () => {
    root.rowsPerPage = 2;
    root.paginate = false;
    await page.waitForChanges();
    const rows = root.querySelectorAll('mx-table-row');
    expect(rows.length).toBe(3);
  });

  it('renders the mx-pagination only if paginate is true', async () => {
    let pagination = root.querySelector('mx-pagination');
    expect(pagination).not.toBeNull();
    root.paginate = false;
    await page.waitForChanges();
    pagination = root.querySelector('mx-pagination');
    expect(pagination).toBeNull();
  });

  it('sorts based on the sortBy and sortAscending props', async () => {
    root.sortBy = 'age';
    await page.waitForChanges();
    let row = root.querySelector('mx-table-row');
    expect(row.innerText).toContain('Theodore');
    root.sortAscending = false;
    await page.waitForChanges();
    row = root.querySelector('mx-table-row');
    expect(row.innerText).toContain('Alvin');
  });

  it('renders the column headings', async () => {
    const firstColumn = root.querySelector('[role="columnheader"]') as HTMLElement;
    expect(firstColumn.innerText).toBe('First Name');
  });

  it('renders an arrow icon in sortable column headers', async () => {
    let arrows = root.querySelectorAll('[data-testid="arrow"]');
    expect(arrows.length).toBe(1);
    root.columns = [
      { property: 'name', sortable: true },
      { property: 'age', sortable: true },
    ];
    await page.waitForChanges();
    arrows = root.querySelectorAll('[data-testid="arrow"]');
    expect(arrows.length).toBe(2);
  });

  it('evaluates ITableColumn.getValue for each row', async () => {
    const rows = root.querySelectorAll('mx-table-row');
    const cells = Array.from(rows).map(row => row.querySelectorAll('mx-table-cell'));
    expect(cells[0][2].innerText).toBe('A');
    expect(cells[1][2].innerText).toBe('S');
    expect(cells[2][2].innerText).toBe('T');
  });

  it('updates the sortBy and sortAscending when a column header is clicked', async () => {
    const headers = root.querySelectorAll('[role="columnheader"]') as NodeListOf<HTMLElement>;
    headers[1].click();
    await page.waitForChanges();
    expect(root.sortBy).toBe('age');
    expect(root.sortAscending).toBe(true);
    headers[1].click();
    await page.waitForChanges();
    expect(root.sortAscending).toBe(false);
  });

  it('set the grid to inline-grid if autoWidth is true', async () => {
    expect(grid.style.display).toBe('grid');
    root.autoWidth = true;
    await page.waitForChanges();
    expect(grid.style.display).toBe('inline-grid');
  });

  it('renders a progress bar if showProgressBar is true', async () => {
    root.showProgressBar = true;
    await page.waitForChanges();
    let progress = root.querySelector('mx-linear-progress');
    expect(progress).not.toBeNull();
  });

  it('renders an actions column if getRowActions is specified', async () => {
    const clickHandler = jest.fn();
    root.getRowActions = row => [{ value: 'Delete', onClick: clickHandler(row) }];
    await page.waitForChanges();
    const actionButtons = root.querySelectorAll('[data-testid="action-button"]') as NodeListOf<HTMLMxButtonElement>;
    expect(actionButtons.length).toBe(3);
    actionButtons[0].click();
    expect(clickHandler).toHaveBeenCalled();
    root.getRowActions = row => [
      { value: 'Edit', onClick: clickHandler(row) },
      { value: 'Delete', onClick: clickHandler(row) },
    ];
    await page.waitForChanges();
    const actionMenus = root.querySelectorAll('[data-testid="action-menu"]');
    expect(actionMenus.length).toBe(3);
  });

  it('emits an mxSortChange event when a sortable column header is clicked', async () => {
    let emitted;
    const listener = (e: CustomEvent) => (emitted = e.detail);
    root.addEventListener('mxSortChange', listener);
    const headers = root.querySelectorAll('[role="columnheader"]') as NodeListOf<HTMLElement>;
    headers[1].click();
    expect(JSON.stringify(emitted)).toBe('{"sortBy":"age","sortAscending":true}');
  });

  it('emits an mxVisibleRowsChange event when the sorting or pagination changes', async () => {
    root.rowsPerPage = 2;
    await page.waitForChanges();
    let emitted;
    const listener = (e: CustomEvent) => (emitted = e.detail);
    root.addEventListener('mxVisibleRowsChange', listener);
    const headers = root.querySelectorAll('[role="columnheader"]') as NodeListOf<HTMLElement>;
    headers[1].click();
    expect(emitted.map(row => row.name).join(',')).toBe('Theodore,Simon');
    await page.waitForChanges();
    const nextPageButton = root.querySelector('[aria-label="Next page"]') as HTMLMxIconButtonElement;
    nextPageButton.click();
    expect(emitted.map(row => row.name).join(',')).toBe('Alvin');
  });
});

describe('mx-table (checkable, non-mobile)', () => {
  let page: SpecPage;
  let root: HTMLMxTableElement;
  let checkboxes: NodeListOf<HTMLMxCheckboxElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTable, MxTableRow, MxTableCell, MxCheckbox, MxPagination],
      html: `
      <mx-table checkable />
      `,
    });
    root = page.root as HTMLMxTableElement;
    root.getRowId = (row: any) => row.id;
    root.rows = [
      { id: 0, name: 'Alvin', age: 10 },
      { id: 1, name: 'Simon', age: 3 },
      { id: 2, name: 'Theodore', age: 2 },
    ];
    root.columns = [
      { property: 'name', heading: 'First Name', sortable: false },
      { property: 'age', heading: 'Age', type: 'number', sortable: true },
      { getValue: (row: any) => row.name.slice(0, 1), heading: 'First Letter' },
    ];
    await page.waitForChanges();
    checkboxes = root.querySelectorAll('mx-checkbox');
  });

  it('renders checkboxes if checkable', async () => {
    expect(checkboxes.length).toBe(4); // Check all + 3 rows
  });

  it('checks the row on click by default', async () => {
    const row = root.querySelector('mx-table-row');
    row.click();
    await page.waitForChanges();
    expect(checkboxes[1].checked).toBe(true);
  });

  it('does not render a check-all checkbox if showCheckAll is false', async () => {
    root.showCheckAll = false;
    await page.waitForChanges();
    checkboxes = root.querySelectorAll('mx-checkbox');
    expect(checkboxes.length).toBe(3);
  });

  it('renders an action button/menu if getMultiRowActions is specified and rows are checked', async () => {
    const clickHandler = jest.fn();
    root.getMultiRowActions = rows => [{ value: 'Delete', onClick: clickHandler(rows) }];
    await page.waitForChanges();
    root.checkAll();
    await page.waitForChanges();
    const actionButton = root.querySelector('[data-testid="multi-action-button"]') as HTMLMxButtonElement;
    expect(actionButton).not.toBeNull();
    actionButton.click();
    expect(clickHandler).toHaveBeenCalled();
    root.getMultiRowActions = rows => [
      { value: 'Edit', onClick: clickHandler(rows) },
      { value: 'Delete', onClick: clickHandler(rows) },
    ];
    await page.waitForChanges();
    const actionMenu = root.querySelector('[data-testid="multi-action-menu"]');
    expect(actionMenu).not.toBeNull();
  });

  it('emits an mxRowCheck event when a row is checked or unchecked', async () => {
    let emitted;
    const listener = (e: CustomEvent) => (emitted = e.detail);
    root.addEventListener('mxRowCheck', listener);
    const row = root.querySelector('mx-table-row');
    row.click();
    expect(JSON.stringify(emitted)).toBe('["0"]');
    row.click();
    expect(JSON.stringify(emitted)).toBe('[]');
  });

  describe('HTMLMxTableElement.getCheckedRowIds', () => {
    it('returns an array of the checked row IDs', async () => {
      let checkedRowIds = await root.getCheckedRowIds();
      expect(checkedRowIds.length).toBe(0);
      const row = root.querySelector('mx-table-row');
      row.click();
      checkedRowIds = await root.getCheckedRowIds();
      expect(checkedRowIds.length).toBe(1);
      expect(checkedRowIds[0]).toBe('0');
    });
  });

  describe('HTMLMxTableElement.setCheckedRowIds', () => {
    it('sets the checked row IDs', async () => {
      await root.setCheckedRowIds(['1']);
      let checkedRowIds = await root.getCheckedRowIds();
      expect(checkedRowIds.length).toBe(1);
      expect(checkedRowIds[0]).toBe('1');
    });
  });

  describe('HTMLMxTableElement.checkAll', () => {
    it('adds all known row IDs to the checkedRowIds array', async () => {
      await root.checkAll();
      const checkedRowIds = await root.getCheckedRowIds();
      expect(checkedRowIds.length).toBe(3);
    });
  });

  describe('HTMLMxTableElement.checkNone', () => {
    it('empties the checkedRowIds array', async () => {
      await root.checkAll();
      let checkedRowIds = await root.getCheckedRowIds();
      expect(checkedRowIds.length).toBe(3);
      await root.checkNone();
      checkedRowIds = await root.getCheckedRowIds();
      expect(checkedRowIds.length).toBe(0);
    });
  });
});
