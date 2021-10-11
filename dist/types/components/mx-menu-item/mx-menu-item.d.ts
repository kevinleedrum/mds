import { EventEmitter } from '../../stencil-public-runtime';
import { MinWidths } from '../../utils/minWidthSync';
export interface IMxMenuItemProps {
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  label?: string;
  multiSelect?: boolean;
}
export declare class MxMenuItem implements IMxMenuItemProps {
  menuItemElem: HTMLElement;
  submenu: HTMLMxMenuElement;
  slotWrapper: HTMLElement;
  submenuDelayTimeout: any;
  /** If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. */
  checked: boolean;
  disabled: boolean;
  /** The class name of the icon to display on the left. This is sometimes automatically set to `null` to add an empty icon for alignment purposes (when a sibling menu item has an icon). */
  icon: string;
  /** A label to display above the menu item */
  label: string;
  /** Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right. */
  multiSelect: boolean;
  minWidths: MinWidths;
  element: HTMLMxMenuItemElement;
  /** Fired when an enabled menu item without a submenu is clicked. Used interally to close all ancestor menus. */
  mxClick: EventEmitter<MouseEvent>;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onFocus(): void;
  onKeyDown(e: KeyboardEvent): Promise<void>;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** Close the item's submenu. */
  closeSubMenu(): Promise<boolean>;
  /** Focuses the menu item. */
  focusMenuItem(): Promise<void>;
  onKeyDownSubMenu(e: KeyboardEvent): Promise<void>;
  closeSiblingSubMenus(): void;
  openSubMenu(): Promise<boolean>;
  onClick(e: MouseEvent): void;
  get checkboxLabel(): string;
  render(): any;
}
