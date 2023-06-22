import '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxTable } from '../mx-table';
import { MxTableRow } from '../../mx-table-row/mx-table-row';
import { MxTableCell } from '../../mx-table-cell/mx-table-cell';
import { MxCheckbox } from '../../mx-checkbox/mx-checkbox';

describe('mx-table (mobile)', () => {
  let page: SpecPage;
  let root: HTMLMxTableElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTable, MxTableRow, MxTableCell, MxCheckbox],
      html: `
      <mx-table checkable>
        <input type="text" slot="search">
        <div slot="filter">
          <button>Filters</button>
        </div>
      </mx-table>
      `,
    });
    root = page.root as HTMLMxTableElement;
    root.getRowId = (row: any) => row.id;
    root.rows = [
      { id: 0, name: 'Alvin', age: 4 },
      { id: 1, name: 'Simon', age: 3 },
      { id: 2, name: 'Theodore', age: 2 },
    ];
    root.columns = [
      { property: 'name', heading: 'First Name' },
      { property: 'age', heading: 'Age' },
    ];
    await page.waitForChanges();
  });

  it('renders an arrow icon if the exposed column is sortable', async () => {
    let arrows = root.querySelectorAll('[data-testid="arrow"]');
    expect(arrows.length).toBe(1);
    root.columns = [
      { property: 'name', heading: 'First Name', sortable: false },
      { property: 'age', heading: 'Age' },
    ];
    await page.waitForChanges();
    arrows = root.querySelectorAll('[data-testid="arrow"]');
    expect(arrows.length).toBe(0);
  });

  it('updates the sortBy and sortAscending when a column header is clicked', async () => {
    const headers = root.querySelectorAll('[role="columnheader"]') as NodeListOf<HTMLElement>;
    headers[0].click();
    await page.waitForChanges();
    expect(root.sortBy).toBe('name');
    expect(root.sortAscending).toBe(true);
    headers[0].click();
    await page.waitForChanges();
    expect(root.sortAscending).toBe(false);
  });

  it('does not check the row on click by default', async () => {
    root.checkable = true;
    root.showCheckAll = false;
    root.getRowId = (row: any) => row.id;
    await page.waitForChanges();
    const row = root.querySelector('mx-table-row');
    const checkbox = root.querySelector('mx-checkbox');
    row.click();
    await page.waitForChanges();
    expect(checkbox.checked).toBe(false);
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

  it('changes the operations bar grid layout if mobileSearchOnTop is set', async () => {
    const search = root.querySelector('[data-testid="search-grid-item"]') as HTMLElement;
    const filter = root.querySelector('[data-testid="filter-grid-item"]') as HTMLElement;
    const checkAll = root.querySelector('[data-testid="check-all-grid-item"]') as HTMLElement;
    expect(search.style.gridColumnStart).toBe('2');
    expect(filter.classList.contains('col-span-full')).toBe(true);
    expect(checkAll.classList.contains('row-start-2')).toBe(false);
    root.mobileSearchOnTop = true;
    await page.waitForChanges();
    expect(search.style.gridColumnStart).toBe('1');
    expect(search.style.gridColumnEnd).toBe('-1');
    expect(filter.classList.contains('col-start-2')).toBe(true);
    expect(checkAll.classList.contains('row-start-2')).toBe(true);
  });
});
