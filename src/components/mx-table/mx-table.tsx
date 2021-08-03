import { Component, Host, h, Prop, Element, Event, EventEmitter, Watch, Listen, Method } from '@stencil/core';
import { capitalize, isDateObject } from '../../utils/utils';
import arrowSvg from '../../assets/svg/arrow-triangle-down.svg';

/** Defines a data table column */
export interface ITableColumn {
  /** The property on each row object that will supply the column's cell values (as HTML).
   * You may also supply a `getValue` function for the value.  If both are provided,
   * the `property` will only be used for sorting.
   */
  property?: string;
  /** The displayed column heading */
  heading?: string;
  /** The value type, which may affect sorting and how the value is displayed
   * @default 'string'
   */
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean';
  align?: 'left' | 'center' | 'right';
  /** Whether the column may be sorted by clicking the header.  The column must specify a `property`
   * to be sortable.
   * @default true
   */
  sortable?: boolean;
  /** A getter function for the column cells' inner HTML.
   *
   * Note that a `property` is required to make a column with a value getter sortable.  If sorting
   * client-side, the property does not necessarily have to exist on the row objects; it is simply a
   * unique identifier for the table's `sortBy` prop.
   */
  getValue?: (row: Object, rowIndex?: number) => any;
  /** A custom compare function for sorting by this column (if sorting client-side) */
  sortCompare?: (rowA: Object, rowB: Object) => number;
  /** Additional classes to add to the header cell for this column */
  headerClass?: string;
  /** Additional classes to add to the body cells in this column */
  cellClass?: string;
}

@Component({
  tag: 'mx-table',
  shadow: false,
})
export class MxTable {
  hasSlot: boolean = false;
  hasAccessoryRow: boolean = false;

  /** An array of objects that defines the table's dataset. */
  @Prop() rows: Object[] = [];
  /** An array of column definitions.  If not specified, a column will be generated for each property on the row object. */
  @Prop() columns: ITableColumn[] = [];
  /** Additional classes for the `table` element */
  @Prop() tableClass: string;
  @Prop() checkable: boolean = false;
  @Prop() hoverable: boolean = true;
  /** Set to `true` to allow smaller tables to shrink to less than 100% width */
  @Prop() autoWidth: boolean = false;
  /** The property on the row objects that will be used for sorting */
  @Prop({ mutable: true }) sortBy: string;
  @Prop({ mutable: true }) sortAscending: boolean = true;
  /** Set to `true` to render the table in a loading state */
  @Prop() isLoading: boolean = false; // TODO: needed?
  /** Show the pagination component.  Setting this to `false` will show all rows. */
  @Prop() paginate: boolean = true;
  /** The zero-based index of the page to display */
  @Prop({ mutable: true }) page: number = 0;
  @Prop({ mutable: true }) rowsPerPage: number = 10;
  @Prop() rowsPerPageOptions: number[] = [10, 25, 50, 100];
  /** Do not sort or paginate client-side. Use events to send server requests instead. */
  @Prop() serverPaginate: boolean = false;

  @Element() element: HTMLMxTableElement;

  @Event() mxVisibleRowsChange: EventEmitter<Object[]>;

  // @Listen('mxCheck')
  // onMxCheck(e: CustomEvent) {
  //   this.mxRowCheck.emit(this.getCheckedRows())
  // }

  @Watch('sortBy')
  @Watch('sortAscending')
  @Watch('page')
  @Watch('rowsPerPage')
  @Watch('rows')
  onVisibleRowsChange() {
    this.mxVisibleRowsChange.emit(this.visibleRows);
  }

  @Watch('checkable')
  setRowsCheckable() {
    const rowElements = this.element.querySelectorAll('mx-table-row:not(.header-row, .pagination-row)') as NodeListOf<
      HTMLMxTableRowElement
    >;
    rowElements.forEach(row => (row.checkable = this.checkable));
  }

  componentWillLoad() {
    this.hasSlot = !!this.element.children.length;
    this.hasAccessoryRow = !!this.element.querySelector('[slot="accessory-row"]');
  }

  componentDidLoad() {
    // Emit paginated rows right away.
    this.onVisibleRowsChange();
    this.setRowsCheckable();
  }

  // @Method()
  // getCheckedRows(): Object[] {

  // }

  get cols(): ITableColumn[] {
    // If `columns` prop is not provided, create a column for each row object property
    if (!this.columns.length && this.rows.length) {
      return Object.keys(this.rows[0]).map(property => ({ property, heading: capitalize(property), sortable: true }));
    }
    return this.columns.map(col => ({
      ...col,
      sortable: col.sortable === false ? false : true, // Default sortable to true if not specified
    }));
  }

  get visibleRows(): Object[] {
    if (this.serverPaginate || (!this.paginate && !this.sortBy)) return this.rows;
    // TODO: paginate
    const rows = this.rows.slice();
    if (this.sortBy) this.sortRows(rows);
    return rows;
  }

  get gridStyle(): any {
    const display = this.autoWidth ? 'inline-grid' : 'grid';
    let gridTemplateColumns = this.checkable ? 'min-content ' : '';
    gridTemplateColumns += `repeat(${this.cols.length}, minmax(0, 1fr))`;
    return { display, gridTemplateColumns };
  }

  sortRows(rows: Object[]) {
    const sortByColumn = this.cols.find(c => c.property === this.sortBy);
    if (!sortByColumn) return;
    let sortCompare = sortByColumn.sortCompare;
    if (!sortCompare) {
      sortCompare = (a, b) => {
        const valueA = this.getCellSortableValue(a, sortByColumn);
        const valueB = this.getCellSortableValue(b, sortByColumn);
        if (typeof valueA === 'number' && typeof valueB === 'number') return valueB - valueA;
        return (valueA as string).localeCompare(valueB as string);
      };
    }
    rows.sort(sortCompare);
    if (!this.sortAscending) rows.reverse();
  }

  getCellSortableValue(row: Object, col: ITableColumn): number | string {
    if (col.getValue) return col.getValue(row);
    const val = row[col.property];
    if (['date', 'dateTime'].includes(col.type) || isDateObject(val)) return new Date(val).getTime();
    if (col.type === 'boolean') return val ? 1 : 0;
    return val;
  }

  getCellValue(row: Object, col: ITableColumn, rowIndex: number) {
    if (col.getValue) return col.getValue(row, rowIndex);
    const val = row[col.property];
    if (col.type === 'date' || isDateObject(val)) return new Date(val).toLocaleDateString();
    if (col.type === 'dateTime' || isDateObject(val)) return new Date(val).toLocaleString();
    if (col.type === 'boolean') return val ? 'Yes' : ''; // TODO: verify
    return val;
  }

  getHeaderClass(col: ITableColumn) {
    let str = 'flex items-center subtitle2 px-16 py-18 ' + this.getAlignClass(col);
    if (col.sortable && col.property) str += ' group cursor-pointer';
    if (col.headerClass) str += col.headerClass;
    return str;
  }

  getHeaderArrowClass(col: ITableColumn) {
    let str = 'ml-12';
    if (col.property !== this.sortBy) str += ' opacity-0 group-hover:opacity-40 transform rotate-180';
    else if (this.sortAscending) str += ' transform rotate-180';
    return str;
  }

  getAlignClass(col: ITableColumn) {
    let alignment = col.align || (col.type === 'number' ? 'right' : 'left');
    return alignment === 'right' ? 'justify-end' : alignment === 'center' ? 'justify-center' : 'justify-start';
  }

  onHeaderClick(col: ITableColumn) {
    if (!col.sortable || !col.property) return;
    if (this.sortBy !== col.property) {
      this.sortBy = col.property;
      this.sortAscending = true;
    } else {
      if (this.sortAscending) this.sortAscending = false;
      else {
        this.sortBy = null;
        this.sortAscending = true;
      }
    }
  }

  render() {
    return (
      <Host class={'mx-table block' + (this.hoverable ? ' hoverable' : '')}>
        <slot name="accessory-row"></slot>
        <div style={this.gridStyle}>
          {/* Header Row */}
          <mx-table-row class="header-row">
            {this.checkable && <mx-checkbox></mx-checkbox>}
            {this.cols.map((col: ITableColumn, colIndex: number) => {
              return (
                <div
                  id={`column-header-${colIndex}`}
                  role="columnheader"
                  class={this.getHeaderClass(col)}
                  onClick={this.onHeaderClick.bind(this, col)}
                >
                  <div class="inline-flex items-center whitespace-nowrap select-none">
                    <span innerHTML={col.heading}></span>
                    {col.sortable && col.property && (
                      <div class={this.getHeaderArrowClass(col)} data-testid="arrow" innerHTML={arrowSvg}></div>
                    )}
                  </div>
                </div>
              );
            })}
          </mx-table-row>

          <slot></slot>
          {/* HACK: Stencil refuses to render this as default slot content. :( */}
          {!this.hasSlot &&
            this.visibleRows.map((row, rowIndex) => (
              <mx-table-row>
                {this.cols.map((col: ITableColumn, colIndex: number) => (
                  <mx-table-cell
                    aria-describedby={`column-header-${colIndex}`}
                    class={[this.getAlignClass(col), col.cellClass].join(' ')}
                    innerHTML={this.getCellValue(row, col, rowIndex)}
                  ></mx-table-cell>
                ))}
              </mx-table-row>
            ))}
          {this.paginate && (
            <mx-table-row class="pagination-row">
              <div class="col-span-full">PAGINATION GOES HERE</div>
            </mx-table-row>
          )}
        </div>
      </Host>
    );
  }
}
