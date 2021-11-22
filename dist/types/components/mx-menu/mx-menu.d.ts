import { EventEmitter } from '../../stencil-public-runtime';
import { PopoverInstance, PopoverPlacement, PopoverOffset } from '../../utils/popover';
export declare class MxMenu {
  popoverInstance: PopoverInstance;
  menuElem: HTMLElement;
  scrollElem: HTMLElement;
  inputEl: HTMLInputElement;
  isClosing: boolean;
  /** The element to which the menu's position will be anchored */
  anchorEl: HTMLElement;
  /** If the anchor element contains an `input`, setting this to `true` will always select the first menu item when Enter is pressed inside the input.  */
  autocompleteOnly: boolean;
  /** The element that will open the menu when clicked.  If not provided, the `anchorEl' will be used. */
  triggerEl: HTMLElement;
  /** An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`.  The second is the distance from the `anchorEl`. */
  offset: PopoverOffset;
  /** The placement of the menu, relative to the `anchorEl`. */
  placement: PopoverPlacement;
  /** This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes. */
  isOpen: boolean;
  element: HTMLMxMenuElement;
  /** Emitted when the menu closes. */
  mxClose: EventEmitter<void>;
  /** Emitted when the menu opens. */
  mxOpen: EventEmitter<void>;
  onMenuItemClick(): void;
  onClick(e: MouseEvent): void;
  onFocus(e: FocusEvent): void;
  onDocumentKeyDown(e: KeyboardEvent): void;
  onKeydown(e: KeyboardEvent): void;
  /** Open the menu.  Returns a promise that resolves to false if the menu was already open. */
  openMenu(): Promise<boolean>;
  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  closeMenu(): Promise<boolean>;
  connectedCallback(): void;
  componentDidLoad(): void;
  componentWillUpdate(): void;
  setInputEl(): void;
  get menuItems(): HTMLMxMenuItemElement[];
  get isSubMenu(): boolean;
  get hostClass(): string;
  render(): any;
}
