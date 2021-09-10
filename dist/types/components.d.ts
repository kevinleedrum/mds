/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
import { BtnType, ButtonTypeAttribute } from "./components/mx-button/mx-button";
import { PopoverOffset, PopoverPlacement } from "./utils/popover";
import { IPageHeaderButton } from "./components/mx-page-header/mx-page-header";
import { PageChangeEventDetail } from "./components/mx-pagination/mx-pagination";
import { IMxTabProps } from "./components/mx-tab/mx-tab";
export namespace Components {
    interface MxBadge {
        /**
          * Additional classes to add to the badge itself
         */
        "badgeClass": string;
        /**
          * Anchor the badge to the bottom of the wrapped content
         */
        "bottom": boolean;
        /**
          * Class name of icon
         */
        "icon": string;
        /**
          * Render as a small indicator shape with no inner text.  If the prop is present, but no string value is passed, the shape will default to `circle`.
         */
        "indicator": boolean | 'square' | 'triangle-up' | 'hexagon' | 'triangle-down' | 'star';
        /**
          * Anchor the badge to the left of the wrapped content
         */
        "left": boolean;
        /**
          * Offset badge inward by this many pixels (e.g. 10 for icon buttons)
         */
        "offset": number;
        /**
          * Make the corners a little more square (best for standalone text)
         */
        "squared": boolean;
        /**
          * The value to display inside the badge
         */
        "value": any;
    }
    interface MxButton {
        "btnType": BtnType;
        "disabled": boolean;
        /**
          * Show chevron icon
         */
        "dropdown": boolean;
        /**
          * Sets display to flex instead of inline-flex
         */
        "full": boolean;
        /**
          * Create button as link
         */
        "href": string;
        /**
          * Class name of icon
         */
        "icon": string;
        /**
          * Only for link buttons
         */
        "target": string;
        "type": ButtonTypeAttribute;
        "value": string;
        "xl": boolean;
    }
    interface MxCheckbox {
        "checked": boolean;
        "disabled": boolean;
        /**
          * Hide the label text visually, but still make it accessible for screen readers
         */
        "hideLabel": boolean;
        "indeterminate": boolean;
        "labelClass": string;
        "labelLeft": boolean;
        "labelName": string;
        "name": string;
        "value": string;
    }
    interface MxChip {
        /**
          * URL of image to show on the left
         */
        "avatarUrl": string;
        /**
          * Style as a choice chip when selected. This is set internally when the chip is wrapped with an `mx-chip-group`.
         */
        "choice": boolean;
        /**
          * Use the pointer cursor and show a ripple animation. This does not need to be explicitly set for `choice` or `filter` chips.
         */
        "clickable": boolean;
        "disabled": boolean;
        /**
          * Style as a filter chip when selected
         */
        "filter": boolean;
        /**
          * Class name of icon to show on the left
         */
        "icon": string;
        "outlined": boolean;
        /**
          * Show the remove icon on the right
         */
        "removable": boolean;
        /**
          * Display a checkmark on the left side of the chip
         */
        "selected": boolean;
        /**
          * The value associated with a choice chip (used with `mx-chip-group`)
         */
        "value": any;
    }
    interface MxChipGroup {
        "value": any;
    }
    interface MxCircularProgress {
        /**
          * Delay the appearance of the indicator for this many milliseconds
         */
        "appearDelay": number;
        /**
          * The value to use for the width and height
         */
        "size": string;
        /**
          * The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed.
         */
        "value": number;
    }
    interface MxDropdownMenu {
        "ariaLabel": string;
        "dense": boolean;
        /**
          * The `id` attribute for the internal input element
         */
        "dropdownId": string;
        /**
          * Style as a filter dropdown with a 1dp elevation
         */
        "elevated": boolean;
        /**
          * Style as a filter dropdown with a "flat" border color
         */
        "flat": boolean;
        "label": string;
        "name": string;
        /**
          * Text shown to the left of the arrow
         */
        "suffix": string;
        "value": any;
    }
    interface MxFab {
        "ariaLabel": string;
        /**
          * Class name of icon
         */
        "icon": string;
        /**
          * Style as a secondary action
         */
        "secondary": boolean;
        "value": string;
    }
    interface MxIconButton {
        /**
          * An aria-label is highly recommended
         */
        "ariaLabel": string;
        /**
          * Show downward chevron icon
         */
        "chevronDown": boolean;
        /**
          * Show left-pointing chevron icon
         */
        "chevronLeft": boolean;
        /**
          * Show right-pointing chevron icon
         */
        "chevronRight": boolean;
        "disabled": boolean;
        /**
          * Class name of icon (for icon font)
         */
        "icon": string;
        "type": 'button' | 'submit' | 'reset';
        "value": string;
    }
    interface MxInput {
        "assistiveText": string;
        "dense": boolean;
        "disabled": boolean;
        "error": boolean;
        "floatLabel": boolean;
        /**
          * The `id` attribute for the text input
         */
        "inputId": string;
        "label": string;
        "labelClass": string;
        /**
          * The class name of the icon to show on the left side of the input
         */
        "leftIcon": string;
        "maxlength": number;
        /**
          * The `name` attribute for the text input
         */
        "name": string;
        "outerContainerClass": string;
        "readonly": boolean;
        /**
          * The class name of the icon to show on the right side of the input
         */
        "rightIcon": string;
        /**
          * Text shown to the right of the input value
         */
        "suffix": string;
        /**
          * Display a multi-line `textarea` instead of an `input`
         */
        "textarea": boolean;
        "textareaHeight": string;
        /**
          * The `type` attribute for the text input
         */
        "type": string;
        "value": string;
    }
    interface MxLinearProgress {
        /**
          * Delay the appearance of the indicator for this many milliseconds
         */
        "appearDelay": number;
        /**
          * The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed.
         */
        "value": number;
    }
    interface MxMenu {
        /**
          * The element that will open the menu when clicked
         */
        "anchorEl": HTMLElement;
        /**
          * Close the menu.  Returns a promise that resolves to false if the menu was already closed.
         */
        "closeMenu": () => Promise<boolean>;
        /**
          * This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes.
         */
        "isOpen": boolean;
        /**
          * An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`.  The second is the distance from the `anchorEl`.
         */
        "offset": PopoverOffset;
        /**
          * Open the menu.  Returns a promise that resolves to false if the menu was already open.
         */
        "openMenu": () => Promise<boolean>;
        /**
          * The placement of the menu, relative to the `anchorEl`.
         */
        "placement": PopoverPlacement;
    }
    interface MxMenuItem {
        /**
          * If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked.
         */
        "checked": boolean;
        /**
          * Close the item's submenu.
         */
        "closeSubMenu": () => Promise<boolean>;
        "disabled": boolean;
        /**
          * Focuses the menu item.
         */
        "focusMenuItem": () => Promise<void>;
        /**
          * The class name of the icon to display on the left. This is sometimes automatically set to `null` to add an empty icon for alignment purposes (when a sibling menu item has an icon).
         */
        "icon": string;
        /**
          * A label to display above the menu item
         */
        "label": string;
        /**
          * Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right.
         */
        "multiSelect": boolean;
    }
    interface MxPageHeader {
        /**
          * An array of prop objects for each button.  Use the `label` property to specify the button's inner text.
         */
        "buttons": IPageHeaderButton[];
        /**
          * When set to true, the Page Header will use the themed background pattern.
         */
        "pattern": boolean;
        /**
          * The text to display for the previous page link
         */
        "previousPageTitle": string;
        /**
          * The URL for the previous page link
         */
        "previousPageUrl": string;
    }
    interface MxPagination {
        /**
          * Disable the next page button (i.e. when the last page was loaded from an API)
         */
        "disableNextPage": boolean;
        /**
          * Disable the page buttons (i.e. when loading results)
         */
        "disabled": boolean;
        "page": number;
        "rowsPerPage": number;
        "rowsPerPageOptions": number[];
        /**
          * Reduce the UI to only a page
         */
        "simple": boolean;
        "totalRows": number;
    }
    interface MxRadio {
        "checked": boolean;
        "labelName": string;
        "name": string;
        "value": string;
    }
    interface MxSearch {
        /**
          * If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search".
         */
        "ariaLabel": string;
        "dense": boolean;
        "flat": boolean;
        "name": string;
        "placeholder": string;
        "value": string;
    }
    interface MxSelect {
        "ariaLabel": string;
        /**
          * Helpful text to show below the select
         */
        "assistiveText": string;
        "dense": boolean;
        "disabled": boolean;
        /**
          * Style with a 1dp elevation
         */
        "elevated": boolean;
        "error": boolean;
        /**
          * Style with a "flat" border color
         */
        "flat": boolean;
        "floatLabel": boolean;
        "label": string;
        /**
          * Additional classes for the label
         */
        "labelClass": string;
        "name": string;
        /**
          * The `id` attribute for the select element
         */
        "selectId": string;
        /**
          * Text shown to the left of the arrow
         */
        "suffix": string;
        "value": any;
    }
    interface MxSwitch {
        "checked": boolean;
        "labelName": string;
        "name": string;
        "value": string;
    }
    interface MxTab {
        /**
          * If you are not providing a `label`, this should be provided instead for accessibility
         */
        "ariaLabel": string;
        /**
          * Display a circular badge
         */
        "badge": boolean;
        /**
          * Additional classes for the badge
         */
        "badgeClass": string;
        /**
          * Class name of icon to display
         */
        "icon": string;
        /**
          * Label text to display
         */
        "label": string;
        /**
          * Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop
         */
        "selected": boolean;
    }
    interface MxTabContent {
        /**
          * The index of the tab that corresponds to this content
         */
        "index": number;
        /**
          * The index of the selected tab
         */
        "value": number;
    }
    interface MxTabs {
        /**
          * Stretch tabs to fill the entire width
         */
        "fill": boolean;
        /**
          * An array of objects for each tab (see Tab Properties)
         */
        "tabs": IMxTabProps[];
        /**
          * The index of the selected tab
         */
        "value": number;
    }
    interface MxToggleButton {
        "ariaLabel": string;
        "disabled": boolean;
        "icon": string;
        "selected": boolean;
        /**
          * Only used inside a toggle button group
         */
        "value": any;
    }
    interface MxToggleButtonGroup {
        "value": any;
    }
}
declare global {
    interface HTMLMxBadgeElement extends Components.MxBadge, HTMLStencilElement {
    }
    var HTMLMxBadgeElement: {
        prototype: HTMLMxBadgeElement;
        new (): HTMLMxBadgeElement;
    };
    interface HTMLMxButtonElement extends Components.MxButton, HTMLStencilElement {
    }
    var HTMLMxButtonElement: {
        prototype: HTMLMxButtonElement;
        new (): HTMLMxButtonElement;
    };
    interface HTMLMxCheckboxElement extends Components.MxCheckbox, HTMLStencilElement {
    }
    var HTMLMxCheckboxElement: {
        prototype: HTMLMxCheckboxElement;
        new (): HTMLMxCheckboxElement;
    };
    interface HTMLMxChipElement extends Components.MxChip, HTMLStencilElement {
    }
    var HTMLMxChipElement: {
        prototype: HTMLMxChipElement;
        new (): HTMLMxChipElement;
    };
    interface HTMLMxChipGroupElement extends Components.MxChipGroup, HTMLStencilElement {
    }
    var HTMLMxChipGroupElement: {
        prototype: HTMLMxChipGroupElement;
        new (): HTMLMxChipGroupElement;
    };
    interface HTMLMxCircularProgressElement extends Components.MxCircularProgress, HTMLStencilElement {
    }
    var HTMLMxCircularProgressElement: {
        prototype: HTMLMxCircularProgressElement;
        new (): HTMLMxCircularProgressElement;
    };
    interface HTMLMxDropdownMenuElement extends Components.MxDropdownMenu, HTMLStencilElement {
    }
    var HTMLMxDropdownMenuElement: {
        prototype: HTMLMxDropdownMenuElement;
        new (): HTMLMxDropdownMenuElement;
    };
    interface HTMLMxFabElement extends Components.MxFab, HTMLStencilElement {
    }
    var HTMLMxFabElement: {
        prototype: HTMLMxFabElement;
        new (): HTMLMxFabElement;
    };
    interface HTMLMxIconButtonElement extends Components.MxIconButton, HTMLStencilElement {
    }
    var HTMLMxIconButtonElement: {
        prototype: HTMLMxIconButtonElement;
        new (): HTMLMxIconButtonElement;
    };
    interface HTMLMxInputElement extends Components.MxInput, HTMLStencilElement {
    }
    var HTMLMxInputElement: {
        prototype: HTMLMxInputElement;
        new (): HTMLMxInputElement;
    };
    interface HTMLMxLinearProgressElement extends Components.MxLinearProgress, HTMLStencilElement {
    }
    var HTMLMxLinearProgressElement: {
        prototype: HTMLMxLinearProgressElement;
        new (): HTMLMxLinearProgressElement;
    };
    interface HTMLMxMenuElement extends Components.MxMenu, HTMLStencilElement {
    }
    var HTMLMxMenuElement: {
        prototype: HTMLMxMenuElement;
        new (): HTMLMxMenuElement;
    };
    interface HTMLMxMenuItemElement extends Components.MxMenuItem, HTMLStencilElement {
    }
    var HTMLMxMenuItemElement: {
        prototype: HTMLMxMenuItemElement;
        new (): HTMLMxMenuItemElement;
    };
    interface HTMLMxPageHeaderElement extends Components.MxPageHeader, HTMLStencilElement {
    }
    var HTMLMxPageHeaderElement: {
        prototype: HTMLMxPageHeaderElement;
        new (): HTMLMxPageHeaderElement;
    };
    interface HTMLMxPaginationElement extends Components.MxPagination, HTMLStencilElement {
    }
    var HTMLMxPaginationElement: {
        prototype: HTMLMxPaginationElement;
        new (): HTMLMxPaginationElement;
    };
    interface HTMLMxRadioElement extends Components.MxRadio, HTMLStencilElement {
    }
    var HTMLMxRadioElement: {
        prototype: HTMLMxRadioElement;
        new (): HTMLMxRadioElement;
    };
    interface HTMLMxSearchElement extends Components.MxSearch, HTMLStencilElement {
    }
    var HTMLMxSearchElement: {
        prototype: HTMLMxSearchElement;
        new (): HTMLMxSearchElement;
    };
    interface HTMLMxSelectElement extends Components.MxSelect, HTMLStencilElement {
    }
    var HTMLMxSelectElement: {
        prototype: HTMLMxSelectElement;
        new (): HTMLMxSelectElement;
    };
    interface HTMLMxSwitchElement extends Components.MxSwitch, HTMLStencilElement {
    }
    var HTMLMxSwitchElement: {
        prototype: HTMLMxSwitchElement;
        new (): HTMLMxSwitchElement;
    };
    interface HTMLMxTabElement extends Components.MxTab, HTMLStencilElement {
    }
    var HTMLMxTabElement: {
        prototype: HTMLMxTabElement;
        new (): HTMLMxTabElement;
    };
    interface HTMLMxTabContentElement extends Components.MxTabContent, HTMLStencilElement {
    }
    var HTMLMxTabContentElement: {
        prototype: HTMLMxTabContentElement;
        new (): HTMLMxTabContentElement;
    };
    interface HTMLMxTabsElement extends Components.MxTabs, HTMLStencilElement {
    }
    var HTMLMxTabsElement: {
        prototype: HTMLMxTabsElement;
        new (): HTMLMxTabsElement;
    };
    interface HTMLMxToggleButtonElement extends Components.MxToggleButton, HTMLStencilElement {
    }
    var HTMLMxToggleButtonElement: {
        prototype: HTMLMxToggleButtonElement;
        new (): HTMLMxToggleButtonElement;
    };
    interface HTMLMxToggleButtonGroupElement extends Components.MxToggleButtonGroup, HTMLStencilElement {
    }
    var HTMLMxToggleButtonGroupElement: {
        prototype: HTMLMxToggleButtonGroupElement;
        new (): HTMLMxToggleButtonGroupElement;
    };
    interface HTMLElementTagNameMap {
        "mx-badge": HTMLMxBadgeElement;
        "mx-button": HTMLMxButtonElement;
        "mx-checkbox": HTMLMxCheckboxElement;
        "mx-chip": HTMLMxChipElement;
        "mx-chip-group": HTMLMxChipGroupElement;
        "mx-circular-progress": HTMLMxCircularProgressElement;
        "mx-dropdown-menu": HTMLMxDropdownMenuElement;
        "mx-fab": HTMLMxFabElement;
        "mx-icon-button": HTMLMxIconButtonElement;
        "mx-input": HTMLMxInputElement;
        "mx-linear-progress": HTMLMxLinearProgressElement;
        "mx-menu": HTMLMxMenuElement;
        "mx-menu-item": HTMLMxMenuItemElement;
        "mx-page-header": HTMLMxPageHeaderElement;
        "mx-pagination": HTMLMxPaginationElement;
        "mx-radio": HTMLMxRadioElement;
        "mx-search": HTMLMxSearchElement;
        "mx-select": HTMLMxSelectElement;
        "mx-switch": HTMLMxSwitchElement;
        "mx-tab": HTMLMxTabElement;
        "mx-tab-content": HTMLMxTabContentElement;
        "mx-tabs": HTMLMxTabsElement;
        "mx-toggle-button": HTMLMxToggleButtonElement;
        "mx-toggle-button-group": HTMLMxToggleButtonGroupElement;
    }
}
declare namespace LocalJSX {
    interface MxBadge {
        /**
          * Additional classes to add to the badge itself
         */
        "badgeClass"?: string;
        /**
          * Anchor the badge to the bottom of the wrapped content
         */
        "bottom"?: boolean;
        /**
          * Class name of icon
         */
        "icon"?: string;
        /**
          * Render as a small indicator shape with no inner text.  If the prop is present, but no string value is passed, the shape will default to `circle`.
         */
        "indicator"?: boolean | 'square' | 'triangle-up' | 'hexagon' | 'triangle-down' | 'star';
        /**
          * Anchor the badge to the left of the wrapped content
         */
        "left"?: boolean;
        /**
          * Offset badge inward by this many pixels (e.g. 10 for icon buttons)
         */
        "offset"?: number;
        /**
          * Make the corners a little more square (best for standalone text)
         */
        "squared"?: boolean;
        /**
          * The value to display inside the badge
         */
        "value"?: any;
    }
    interface MxButton {
        "btnType"?: BtnType;
        "disabled"?: boolean;
        /**
          * Show chevron icon
         */
        "dropdown"?: boolean;
        /**
          * Sets display to flex instead of inline-flex
         */
        "full"?: boolean;
        /**
          * Create button as link
         */
        "href"?: string;
        /**
          * Class name of icon
         */
        "icon"?: string;
        /**
          * Only for link buttons
         */
        "target"?: string;
        "type"?: ButtonTypeAttribute;
        "value"?: string;
        "xl"?: boolean;
    }
    interface MxCheckbox {
        "checked"?: boolean;
        "disabled"?: boolean;
        /**
          * Hide the label text visually, but still make it accessible for screen readers
         */
        "hideLabel"?: boolean;
        "indeterminate"?: boolean;
        "labelClass"?: string;
        "labelLeft"?: boolean;
        "labelName"?: string;
        "name"?: string;
        "value"?: string;
    }
    interface MxChip {
        /**
          * URL of image to show on the left
         */
        "avatarUrl"?: string;
        /**
          * Style as a choice chip when selected. This is set internally when the chip is wrapped with an `mx-chip-group`.
         */
        "choice"?: boolean;
        /**
          * Use the pointer cursor and show a ripple animation. This does not need to be explicitly set for `choice` or `filter` chips.
         */
        "clickable"?: boolean;
        "disabled"?: boolean;
        /**
          * Style as a filter chip when selected
         */
        "filter"?: boolean;
        /**
          * Class name of icon to show on the left
         */
        "icon"?: string;
        /**
          * Emitted when the remove icon is clicked
         */
        "onMxRemove"?: (event: CustomEvent<MouseEvent>) => void;
        "outlined"?: boolean;
        /**
          * Show the remove icon on the right
         */
        "removable"?: boolean;
        /**
          * Display a checkmark on the left side of the chip
         */
        "selected"?: boolean;
        /**
          * The value associated with a choice chip (used with `mx-chip-group`)
         */
        "value"?: any;
    }
    interface MxChipGroup {
        /**
          * Emits the updated value as event.detail
         */
        "onMxInput"?: (event: CustomEvent<any>) => void;
        "value"?: any;
    }
    interface MxCircularProgress {
        /**
          * Delay the appearance of the indicator for this many milliseconds
         */
        "appearDelay"?: number;
        /**
          * The value to use for the width and height
         */
        "size"?: string;
        /**
          * The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed.
         */
        "value"?: number;
    }
    interface MxDropdownMenu {
        "ariaLabel"?: string;
        "dense"?: boolean;
        /**
          * The `id` attribute for the internal input element
         */
        "dropdownId"?: string;
        /**
          * Style as a filter dropdown with a 1dp elevation
         */
        "elevated"?: boolean;
        /**
          * Style as a filter dropdown with a "flat" border color
         */
        "flat"?: boolean;
        "label"?: string;
        "name"?: string;
        /**
          * Text shown to the left of the arrow
         */
        "suffix"?: string;
        "value"?: any;
    }
    interface MxFab {
        "ariaLabel"?: string;
        /**
          * Class name of icon
         */
        "icon"?: string;
        /**
          * Style as a secondary action
         */
        "secondary"?: boolean;
        "value"?: string;
    }
    interface MxIconButton {
        /**
          * An aria-label is highly recommended
         */
        "ariaLabel"?: string;
        /**
          * Show downward chevron icon
         */
        "chevronDown"?: boolean;
        /**
          * Show left-pointing chevron icon
         */
        "chevronLeft"?: boolean;
        /**
          * Show right-pointing chevron icon
         */
        "chevronRight"?: boolean;
        "disabled"?: boolean;
        /**
          * Class name of icon (for icon font)
         */
        "icon"?: string;
        "type"?: 'button' | 'submit' | 'reset';
        "value"?: string;
    }
    interface MxInput {
        "assistiveText"?: string;
        "dense"?: boolean;
        "disabled"?: boolean;
        "error"?: boolean;
        "floatLabel"?: boolean;
        /**
          * The `id` attribute for the text input
         */
        "inputId"?: string;
        "label"?: string;
        "labelClass"?: string;
        /**
          * The class name of the icon to show on the left side of the input
         */
        "leftIcon"?: string;
        "maxlength"?: number;
        /**
          * The `name` attribute for the text input
         */
        "name"?: string;
        "outerContainerClass"?: string;
        "readonly"?: boolean;
        /**
          * The class name of the icon to show on the right side of the input
         */
        "rightIcon"?: string;
        /**
          * Text shown to the right of the input value
         */
        "suffix"?: string;
        /**
          * Display a multi-line `textarea` instead of an `input`
         */
        "textarea"?: boolean;
        "textareaHeight"?: string;
        /**
          * The `type` attribute for the text input
         */
        "type"?: string;
        "value"?: string;
    }
    interface MxLinearProgress {
        /**
          * Delay the appearance of the indicator for this many milliseconds
         */
        "appearDelay"?: number;
        /**
          * The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed.
         */
        "value"?: number;
    }
    interface MxMenu {
        /**
          * The element that will open the menu when clicked
         */
        "anchorEl"?: HTMLElement;
        /**
          * This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes.
         */
        "isOpen"?: boolean;
        /**
          * An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`.  The second is the distance from the `anchorEl`.
         */
        "offset"?: PopoverOffset;
        /**
          * Emitted when the menu closes.
         */
        "onMxClose"?: (event: CustomEvent<void>) => void;
        /**
          * The placement of the menu, relative to the `anchorEl`.
         */
        "placement"?: PopoverPlacement;
    }
    interface MxMenuItem {
        /**
          * If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked.
         */
        "checked"?: boolean;
        "disabled"?: boolean;
        /**
          * The class name of the icon to display on the left. This is sometimes automatically set to `null` to add an empty icon for alignment purposes (when a sibling menu item has an icon).
         */
        "icon"?: string;
        /**
          * A label to display above the menu item
         */
        "label"?: string;
        /**
          * Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right.
         */
        "multiSelect"?: boolean;
        /**
          * Fired when an enabled menu item without a submenu is clicked. Used interally to close all ancestor menus.
         */
        "onMxClick"?: (event: CustomEvent<MouseEvent>) => void;
    }
    interface MxPageHeader {
        /**
          * An array of prop objects for each button.  Use the `label` property to specify the button's inner text.
         */
        "buttons"?: IPageHeaderButton[];
        /**
          * When set to true, the Page Header will use the themed background pattern.
         */
        "pattern"?: boolean;
        /**
          * The text to display for the previous page link
         */
        "previousPageTitle"?: string;
        /**
          * The URL for the previous page link
         */
        "previousPageUrl"?: string;
    }
    interface MxPagination {
        /**
          * Disable the next page button (i.e. when the last page was loaded from an API)
         */
        "disableNextPage"?: boolean;
        /**
          * Disable the page buttons (i.e. when loading results)
         */
        "disabled"?: boolean;
        "onMxPageChange"?: (event: CustomEvent<PageChangeEventDetail>) => void;
        "page"?: number;
        "rowsPerPage"?: number;
        "rowsPerPageOptions"?: number[];
        /**
          * Reduce the UI to only a page
         */
        "simple"?: boolean;
        "totalRows"?: number;
    }
    interface MxRadio {
        "checked"?: boolean;
        "labelName"?: string;
        "name"?: string;
        "value"?: string;
    }
    interface MxSearch {
        /**
          * If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search".
         */
        "ariaLabel"?: string;
        "dense"?: boolean;
        "flat"?: boolean;
        "name"?: string;
        "placeholder"?: string;
        "value"?: string;
    }
    interface MxSelect {
        "ariaLabel"?: string;
        /**
          * Helpful text to show below the select
         */
        "assistiveText"?: string;
        "dense"?: boolean;
        "disabled"?: boolean;
        /**
          * Style with a 1dp elevation
         */
        "elevated"?: boolean;
        "error"?: boolean;
        /**
          * Style with a "flat" border color
         */
        "flat"?: boolean;
        "floatLabel"?: boolean;
        "label"?: string;
        /**
          * Additional classes for the label
         */
        "labelClass"?: string;
        "name"?: string;
        /**
          * The `id` attribute for the select element
         */
        "selectId"?: string;
        /**
          * Text shown to the left of the arrow
         */
        "suffix"?: string;
        "value"?: any;
    }
    interface MxSwitch {
        "checked"?: boolean;
        "labelName"?: string;
        "name"?: string;
        "value"?: string;
    }
    interface MxTab {
        /**
          * If you are not providing a `label`, this should be provided instead for accessibility
         */
        "ariaLabel"?: string;
        /**
          * Display a circular badge
         */
        "badge"?: boolean;
        /**
          * Additional classes for the badge
         */
        "badgeClass"?: string;
        /**
          * Class name of icon to display
         */
        "icon"?: string;
        /**
          * Label text to display
         */
        "label"?: string;
        /**
          * Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop
         */
        "selected"?: boolean;
    }
    interface MxTabContent {
        /**
          * The index of the tab that corresponds to this content
         */
        "index"?: number;
        /**
          * The index of the selected tab
         */
        "value"?: number;
    }
    interface MxTabs {
        /**
          * Stretch tabs to fill the entire width
         */
        "fill"?: boolean;
        /**
          * Emits the newly selected tab's index as `Event.detail`
         */
        "onMxChange"?: (event: CustomEvent<number>) => void;
        /**
          * An array of objects for each tab (see Tab Properties)
         */
        "tabs": IMxTabProps[];
        /**
          * The index of the selected tab
         */
        "value"?: number;
    }
    interface MxToggleButton {
        "ariaLabel"?: string;
        "disabled"?: boolean;
        "icon"?: string;
        "selected"?: boolean;
        /**
          * Only used inside a toggle button group
         */
        "value"?: any;
    }
    interface MxToggleButtonGroup {
        /**
          * Emits the updated value as event.detail
         */
        "onMxInput"?: (event: CustomEvent<any>) => void;
        "value"?: any;
    }
    interface IntrinsicElements {
        "mx-badge": MxBadge;
        "mx-button": MxButton;
        "mx-checkbox": MxCheckbox;
        "mx-chip": MxChip;
        "mx-chip-group": MxChipGroup;
        "mx-circular-progress": MxCircularProgress;
        "mx-dropdown-menu": MxDropdownMenu;
        "mx-fab": MxFab;
        "mx-icon-button": MxIconButton;
        "mx-input": MxInput;
        "mx-linear-progress": MxLinearProgress;
        "mx-menu": MxMenu;
        "mx-menu-item": MxMenuItem;
        "mx-page-header": MxPageHeader;
        "mx-pagination": MxPagination;
        "mx-radio": MxRadio;
        "mx-search": MxSearch;
        "mx-select": MxSelect;
        "mx-switch": MxSwitch;
        "mx-tab": MxTab;
        "mx-tab-content": MxTabContent;
        "mx-tabs": MxTabs;
        "mx-toggle-button": MxToggleButton;
        "mx-toggle-button-group": MxToggleButtonGroup;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mx-badge": LocalJSX.MxBadge & JSXBase.HTMLAttributes<HTMLMxBadgeElement>;
            "mx-button": LocalJSX.MxButton & JSXBase.HTMLAttributes<HTMLMxButtonElement>;
            "mx-checkbox": LocalJSX.MxCheckbox & JSXBase.HTMLAttributes<HTMLMxCheckboxElement>;
            "mx-chip": LocalJSX.MxChip & JSXBase.HTMLAttributes<HTMLMxChipElement>;
            "mx-chip-group": LocalJSX.MxChipGroup & JSXBase.HTMLAttributes<HTMLMxChipGroupElement>;
            "mx-circular-progress": LocalJSX.MxCircularProgress & JSXBase.HTMLAttributes<HTMLMxCircularProgressElement>;
            "mx-dropdown-menu": LocalJSX.MxDropdownMenu & JSXBase.HTMLAttributes<HTMLMxDropdownMenuElement>;
            "mx-fab": LocalJSX.MxFab & JSXBase.HTMLAttributes<HTMLMxFabElement>;
            "mx-icon-button": LocalJSX.MxIconButton & JSXBase.HTMLAttributes<HTMLMxIconButtonElement>;
            "mx-input": LocalJSX.MxInput & JSXBase.HTMLAttributes<HTMLMxInputElement>;
            "mx-linear-progress": LocalJSX.MxLinearProgress & JSXBase.HTMLAttributes<HTMLMxLinearProgressElement>;
            "mx-menu": LocalJSX.MxMenu & JSXBase.HTMLAttributes<HTMLMxMenuElement>;
            "mx-menu-item": LocalJSX.MxMenuItem & JSXBase.HTMLAttributes<HTMLMxMenuItemElement>;
            "mx-page-header": LocalJSX.MxPageHeader & JSXBase.HTMLAttributes<HTMLMxPageHeaderElement>;
            "mx-pagination": LocalJSX.MxPagination & JSXBase.HTMLAttributes<HTMLMxPaginationElement>;
            "mx-radio": LocalJSX.MxRadio & JSXBase.HTMLAttributes<HTMLMxRadioElement>;
            "mx-search": LocalJSX.MxSearch & JSXBase.HTMLAttributes<HTMLMxSearchElement>;
            "mx-select": LocalJSX.MxSelect & JSXBase.HTMLAttributes<HTMLMxSelectElement>;
            "mx-switch": LocalJSX.MxSwitch & JSXBase.HTMLAttributes<HTMLMxSwitchElement>;
            "mx-tab": LocalJSX.MxTab & JSXBase.HTMLAttributes<HTMLMxTabElement>;
            "mx-tab-content": LocalJSX.MxTabContent & JSXBase.HTMLAttributes<HTMLMxTabContentElement>;
            "mx-tabs": LocalJSX.MxTabs & JSXBase.HTMLAttributes<HTMLMxTabsElement>;
            "mx-toggle-button": LocalJSX.MxToggleButton & JSXBase.HTMLAttributes<HTMLMxToggleButtonElement>;
            "mx-toggle-button-group": LocalJSX.MxToggleButtonGroup & JSXBase.HTMLAttributes<HTMLMxToggleButtonGroupElement>;
        }
    }
}
