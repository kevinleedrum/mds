/* MdsComponents custom elements bundle */

import type { Components, JSX } from "../types/components";

interface MxBadge extends Components.MxBadge, HTMLElement {}
export const MxBadge: {
  prototype: MxBadge;
  new (): MxBadge;
};

interface MxButton extends Components.MxButton, HTMLElement {}
export const MxButton: {
  prototype: MxButton;
  new (): MxButton;
};

interface MxCheckbox extends Components.MxCheckbox, HTMLElement {}
export const MxCheckbox: {
  prototype: MxCheckbox;
  new (): MxCheckbox;
};

interface MxChip extends Components.MxChip, HTMLElement {}
export const MxChip: {
  prototype: MxChip;
  new (): MxChip;
};

interface MxChipGroup extends Components.MxChipGroup, HTMLElement {}
export const MxChipGroup: {
  prototype: MxChipGroup;
  new (): MxChipGroup;
};

interface MxCircularProgress extends Components.MxCircularProgress, HTMLElement {}
export const MxCircularProgress: {
  prototype: MxCircularProgress;
  new (): MxCircularProgress;
};

interface MxDropdownMenu extends Components.MxDropdownMenu, HTMLElement {}
export const MxDropdownMenu: {
  prototype: MxDropdownMenu;
  new (): MxDropdownMenu;
};

interface MxFab extends Components.MxFab, HTMLElement {}
export const MxFab: {
  prototype: MxFab;
  new (): MxFab;
};

interface MxIconButton extends Components.MxIconButton, HTMLElement {}
export const MxIconButton: {
  prototype: MxIconButton;
  new (): MxIconButton;
};

interface MxImageUpload extends Components.MxImageUpload, HTMLElement {}
export const MxImageUpload: {
  prototype: MxImageUpload;
  new (): MxImageUpload;
};

interface MxInput extends Components.MxInput, HTMLElement {}
export const MxInput: {
  prototype: MxInput;
  new (): MxInput;
};

interface MxLinearProgress extends Components.MxLinearProgress, HTMLElement {}
export const MxLinearProgress: {
  prototype: MxLinearProgress;
  new (): MxLinearProgress;
};

interface MxMenu extends Components.MxMenu, HTMLElement {}
export const MxMenu: {
  prototype: MxMenu;
  new (): MxMenu;
};

interface MxMenuItem extends Components.MxMenuItem, HTMLElement {}
export const MxMenuItem: {
  prototype: MxMenuItem;
  new (): MxMenuItem;
};

interface MxModal extends Components.MxModal, HTMLElement {}
export const MxModal: {
  prototype: MxModal;
  new (): MxModal;
};

interface MxPageHeader extends Components.MxPageHeader, HTMLElement {}
export const MxPageHeader: {
  prototype: MxPageHeader;
  new (): MxPageHeader;
};

interface MxPagination extends Components.MxPagination, HTMLElement {}
export const MxPagination: {
  prototype: MxPagination;
  new (): MxPagination;
};

interface MxRadio extends Components.MxRadio, HTMLElement {}
export const MxRadio: {
  prototype: MxRadio;
  new (): MxRadio;
};

interface MxSearch extends Components.MxSearch, HTMLElement {}
export const MxSearch: {
  prototype: MxSearch;
  new (): MxSearch;
};

interface MxSelect extends Components.MxSelect, HTMLElement {}
export const MxSelect: {
  prototype: MxSelect;
  new (): MxSelect;
};

interface MxSnackbar extends Components.MxSnackbar, HTMLElement {}
export const MxSnackbar: {
  prototype: MxSnackbar;
  new (): MxSnackbar;
};

interface MxSwitch extends Components.MxSwitch, HTMLElement {}
export const MxSwitch: {
  prototype: MxSwitch;
  new (): MxSwitch;
};

interface MxTab extends Components.MxTab, HTMLElement {}
export const MxTab: {
  prototype: MxTab;
  new (): MxTab;
};

interface MxTabContent extends Components.MxTabContent, HTMLElement {}
export const MxTabContent: {
  prototype: MxTabContent;
  new (): MxTabContent;
};

interface MxTable extends Components.MxTable, HTMLElement {}
export const MxTable: {
  prototype: MxTable;
  new (): MxTable;
};

interface MxTableCell extends Components.MxTableCell, HTMLElement {}
export const MxTableCell: {
  prototype: MxTableCell;
  new (): MxTableCell;
};

interface MxTableRow extends Components.MxTableRow, HTMLElement {}
export const MxTableRow: {
  prototype: MxTableRow;
  new (): MxTableRow;
};

interface MxTabs extends Components.MxTabs, HTMLElement {}
export const MxTabs: {
  prototype: MxTabs;
  new (): MxTabs;
};

interface MxTimePicker extends Components.MxTimePicker, HTMLElement {}
export const MxTimePicker: {
  prototype: MxTimePicker;
  new (): MxTimePicker;
};

interface MxToggleButton extends Components.MxToggleButton, HTMLElement {}
export const MxToggleButton: {
  prototype: MxToggleButton;
  new (): MxToggleButton;
};

interface MxToggleButtonGroup extends Components.MxToggleButtonGroup, HTMLElement {}
export const MxToggleButtonGroup: {
  prototype: MxToggleButtonGroup;
  new (): MxToggleButtonGroup;
};

/**
 * Utility to define all custom elements within this package using the tag name provided in the component's source. 
 * When defining each custom element, it will also check it's safe to define by:
 *
 * 1. Ensuring the "customElements" registry is available in the global context (window).
 * 2. The component tag name is not already defined.
 *
 * Use the standard [customElements.define()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) 
 * method instead to define custom elements individually, or to provide a different tag name.
 */
export declare const defineCustomElements: (opts?: any) => void;

/**
 * Used to manually set the base path where assets can be found.
 * If the script is used as "module", it's recommended to use "import.meta.url",
 * such as "setAssetPath(import.meta.url)". Other options include
 * "setAssetPath(document.currentScript.src)", or using a bundler's replace plugin to
 * dynamically set the path at build time, such as "setAssetPath(process.env.ASSET_PATH)".
 * But do note that this configuration depends on how your script is bundled, or lack of
 * bunding, and where your assets can be loaded from. Additionally custom bundling
 * will have to ensure the static assets are copied to its build directory.
 */
export declare const setAssetPath: (path: string) => void;

export interface SetPlatformOptions {
  raf?: (c: FrameRequestCallback) => number;
  ael?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
  rel?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
  ce?: (eventName: string, opts?: any) => CustomEvent;
}
export declare const setPlatformOptions: (opts: SetPlatformOptions) => void;

export type { Components, JSX };

export * from '../types';
