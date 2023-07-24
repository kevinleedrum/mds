/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@moxiworks/mds';


@ProxyCmp({
  inputs: ['badgeClass', 'bottom', 'icon', 'indicator', 'left', 'offset', 'squared', 'value']
})
@Component({
  selector: 'mx-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['badgeClass', 'bottom', 'icon', 'indicator', 'left', 'offset', 'squared', 'value'],
})
export class MxBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxBadge extends Components.MxBadge {}


@ProxyCmp({
  inputs: ['error', 'isOpen', 'sticky']
})
@Component({
  selector: 'mx-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['error', 'isOpen', 'sticky'],
})
export class MxBanner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxBanner extends Components.MxBanner {}


@ProxyCmp({
  inputs: ['btnType', 'disabled', 'dropdown', 'elAriaLabel', 'form', 'formaction', 'full', 'href', 'icon', 'target', 'type', 'value', 'xl']
})
@Component({
  selector: 'mx-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['btnType', 'disabled', 'dropdown', 'elAriaLabel', 'form', 'formaction', 'full', 'href', 'icon', 'target', 'type', 'value', 'xl'],
})
export class MxButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxButton extends Components.MxButton {}


@ProxyCmp({
  inputs: ['data', 'elAriaLabel', 'height', 'options', 'type', 'width'],
  methods: ['update']
})
@Component({
  selector: 'mx-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['data', 'elAriaLabel', 'height', 'options', 'type', 'width'],
})
export class MxChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxChart extends Components.MxChart {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'elAriaLabel', 'hideLabel', 'indeterminate', 'labelClass', 'labelLeft', 'labelName', 'name', 'value']
})
@Component({
  selector: 'mx-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'elAriaLabel', 'hideLabel', 'indeterminate', 'labelClass', 'labelLeft', 'labelName', 'name', 'value'],
})
export class MxCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxCheckbox extends Components.MxCheckbox {}


@ProxyCmp({
  inputs: ['avatarUrl', 'choice', 'clickable', 'disabled', 'filter', 'icon', 'outlined', 'removable', 'selected', 'value']
})
@Component({
  selector: 'mx-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['avatarUrl', 'choice', 'clickable', 'disabled', 'filter', 'icon', 'outlined', 'removable', 'selected', 'value'],
})
export class MxChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxRemove']);
  }
}


export declare interface MxChip extends Components.MxChip {
  /**
   * Emitted when the remove icon is clicked
   */
  mxRemove: EventEmitter<CustomEvent<MouseEvent>>;
}


@ProxyCmp({
  inputs: ['value']
})
@Component({
  selector: 'mx-chip-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['value'],
})
export class MxChipGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxInput']);
  }
}


export declare interface MxChipGroup extends Components.MxChipGroup {
  /**
   * Emits the updated value as event.detail
   */
  mxInput: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['appearDelay', 'simulateProgressDuration', 'size', 'value']
})
@Component({
  selector: 'mx-circular-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearDelay', 'simulateProgressDuration', 'size', 'value'],
})
export class MxCircularProgress {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxCircularProgress extends Components.MxCircularProgress {}


@ProxyCmp({
  inputs: ['code', 'language', 'lineNumberStart', 'showLineNumbers']
})
@Component({
  selector: 'mx-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['code', 'language', 'lineNumberStart', 'showLineNumbers'],
})
export class MxCode {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxCode extends Components.MxCode {}


@ProxyCmp({
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'hideCharacterCount', 'inputId', 'label', 'labelClass', 'leftIcon', 'maxlength', 'name', 'outerContainerClass', 'placeholder', 'readonly', 'rightIcon', 'step', 'suffix', 'textarea', 'textareaHeight', 'type', 'value']
})
@Component({
  selector: 'mx-confirm-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'hideCharacterCount', 'inputId', 'label', 'labelClass', 'leftIcon', 'maxlength', 'name', 'outerContainerClass', 'placeholder', 'readonly', 'rightIcon', 'step', 'suffix', 'textarea', 'textareaHeight', 'type', 'value'],
})
export class MxConfirmInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxConfirmInput extends Components.MxConfirmInput {}


@ProxyCmp({
  inputs: ['allowFuture', 'allowPast', 'assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'inputId', 'label', 'max', 'min', 'name', 'value']
})
@Component({
  selector: 'mx-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowFuture', 'allowPast', 'assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'inputId', 'label', 'max', 'min', 'name', 'value'],
})
export class MxDatePicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxDatePicker extends Components.MxDatePicker {}


@ProxyCmp({
  inputs: ['isOpen', 'modalClass'],
  methods: ['alert', 'confirm']
})
@Component({
  selector: 'mx-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['isOpen', 'modalClass'],
})
export class MxDialog {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxClose']);
  }
}


export declare interface MxDialog extends Components.MxDialog {

  mxClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['assistiveText', 'dense', 'disabled', 'dropdownClass', 'dropdownId', 'elAriaLabel', 'elevated', 'error', 'flat', 'label', 'name', 'readonly', 'suffix', 'value']
})
@Component({
  selector: 'mx-dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['assistiveText', 'dense', 'disabled', 'dropdownClass', 'dropdownId', 'elAriaLabel', 'elevated', 'error', 'flat', 'label', 'name', 'readonly', 'suffix', 'value'],
})
export class MxDropdownMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxDropdownMenu extends Components.MxDropdownMenu {}


@ProxyCmp({
  inputs: ['elAriaLabel', 'icon', 'secondary', 'value']
})
@Component({
  selector: 'mx-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['elAriaLabel', 'icon', 'secondary', 'value'],
})
export class MxFab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxFab extends Components.MxFab {}


@ProxyCmp({
  inputs: ['chevronDown', 'chevronLeft', 'chevronRight', 'chevronUp', 'disabled', 'elAriaLabel', 'form', 'formaction', 'href', 'icon', 'target', 'type', 'value']
})
@Component({
  selector: 'mx-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['chevronDown', 'chevronLeft', 'chevronRight', 'chevronUp', 'disabled', 'elAriaLabel', 'form', 'formaction', 'href', 'icon', 'target', 'type', 'value'],
})
export class MxIconButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxIconButton extends Components.MxIconButton {}


@ProxyCmp({
  inputs: ['acceptImage', 'acceptPdf', 'assetName', 'assistiveText', 'avatar', 'elAriaLabel', 'error', 'height', 'icon', 'inputId', 'isUploaded', 'isUploading', 'name', 'removeButtonLabel', 'showButton', 'showDropzoneText', 'showIcon', 'thumbnailSize', 'thumbnailUrl', 'uploadBtnType', 'uploadButtonLabel', 'width'],
  methods: ['removeFile', 'selectFile']
})
@Component({
  selector: 'mx-image-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['acceptImage', 'acceptPdf', 'assetName', 'assistiveText', 'avatar', 'elAriaLabel', 'error', 'height', 'icon', 'inputId', 'isUploaded', 'isUploading', 'name', 'removeButtonLabel', 'showButton', 'showDropzoneText', 'showIcon', 'thumbnailSize', 'thumbnailUrl', 'uploadBtnType', 'uploadButtonLabel', 'width'],
})
export class MxImageUpload {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxThumbnailChange']);
  }
}


export declare interface MxImageUpload extends Components.MxImageUpload {
  /**
   * Emits the thumbnail url as `CustomEvent.detail` whenever it changes (i.e. after generating a data URI)
   */
  mxThumbnailChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'hideCharacterCount', 'inputId', 'label', 'labelClass', 'leftIcon', 'maxlength', 'name', 'outerContainerClass', 'placeholder', 'readonly', 'rightIcon', 'step', 'suffix', 'textarea', 'textareaHeight', 'type', 'value']
})
@Component({
  selector: 'mx-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'hideCharacterCount', 'inputId', 'label', 'labelClass', 'leftIcon', 'maxlength', 'name', 'outerContainerClass', 'placeholder', 'readonly', 'rightIcon', 'step', 'suffix', 'textarea', 'textareaHeight', 'type', 'value'],
})
export class MxInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxInput extends Components.MxInput {}


@ProxyCmp({
  inputs: ['appearDelay', 'simulateProgressDuration', 'value']
})
@Component({
  selector: 'mx-linear-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearDelay', 'simulateProgressDuration', 'value'],
})
export class MxLinearProgress {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxLinearProgress extends Components.MxLinearProgress {}


@ProxyCmp({
  inputs: ['anchorEl', 'autocompleteOnly', 'isOpen', 'offset', 'placement', 'triggerEl'],
  methods: ['openMenu', 'closeMenu']
})
@Component({
  selector: 'mx-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['anchorEl', 'autocompleteOnly', 'isOpen', 'offset', 'placement', 'triggerEl'],
})
export class MxMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxClose', 'mxOpen']);
  }
}


export declare interface MxMenu extends Components.MxMenu {
  /**
   * Emitted when the menu closes.
   */
  mxClose: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the menu opens.
   */
  mxOpen: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'icon', 'label', 'multiSelect', 'selected', 'subtitle'],
  methods: ['closeSubMenu', 'getValue', 'focusMenuItem']
})
@Component({
  selector: 'mx-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'icon', 'label', 'multiSelect', 'selected', 'subtitle'],
})
export class MxMenuItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxClick']);
  }
}


export declare interface MxMenuItem extends Components.MxMenuItem {
  /**
   * Fired when an enabled menu item without a submenu is clicked. Used interally to close all ancestor menus.
   */
  mxClick: EventEmitter<CustomEvent<MouseEvent>>;
}


@ProxyCmp({
  inputs: ['buttons', 'closeOnEscape', 'closeOnOutsideClick', 'contentClass', 'description', 'fromLeft', 'fromRight', 'isOpen', 'large', 'previousPageTitle', 'previousPageUrl']
})
@Component({
  selector: 'mx-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['buttons', 'closeOnEscape', 'closeOnOutsideClick', 'contentClass', 'description', 'fromLeft', 'fromRight', 'isOpen', 'large', 'previousPageTitle', 'previousPageUrl'],
})
export class MxModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxClose']);
  }
}


export declare interface MxModal extends Components.MxModal {

  mxClose: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['buttons', 'modal', 'pattern', 'previousPageTitle', 'previousPageUrl'],
  methods: ['resetResizeObserver']
})
@Component({
  selector: 'mx-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['buttons', 'modal', 'pattern', 'previousPageTitle', 'previousPageUrl'],
})
export class MxPageHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxPageHeader extends Components.MxPageHeader {}


@ProxyCmp({
  inputs: ['disableNextPage', 'disabled', 'page', 'rowsPerPage', 'rowsPerPageOptions', 'simple', 'totalRows']
})
@Component({
  selector: 'mx-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disableNextPage', 'disabled', 'page', 'rowsPerPage', 'rowsPerPageOptions', 'simple', 'totalRows'],
})
export class MxPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxPageChange']);
  }
}


import type { PageChangeEventDetail as IMxPaginationPageChangeEventDetail } from '@moxiworks/mds';

export declare interface MxPagination extends Components.MxPagination {

  mxPageChange: EventEmitter<CustomEvent<IMxPaginationPageChangeEventDetail>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'labelClass', 'labelName', 'name', 'value']
})
@Component({
  selector: 'mx-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'labelClass', 'labelName', 'name', 'value'],
})
export class MxRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxRadio extends Components.MxRadio {}


@ProxyCmp({
  inputs: ['dense', 'elAriaLabel', 'flat', 'name', 'placeholder', 'showClear', 'value']
})
@Component({
  selector: 'mx-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dense', 'elAriaLabel', 'flat', 'name', 'placeholder', 'showClear', 'value'],
})
export class MxSearch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxClear']);
  }
}


export declare interface MxSearch extends Components.MxSearch {
  /**
   * Emitted when the clear button is clicked.
   */
  mxClear: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'elevated', 'error', 'flat', 'floatLabel', 'label', 'labelClass', 'name', 'selectClass', 'selectId', 'suffix', 'value']
})
@Component({
  selector: 'mx-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'elevated', 'error', 'flat', 'floatLabel', 'label', 'labelClass', 'name', 'selectClass', 'selectId', 'suffix', 'value'],
})
export class MxSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxSelect extends Components.MxSelect {}


@ProxyCmp({
  inputs: ['duration', 'isOpen']
})
@Component({
  selector: 'mx-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['duration', 'isOpen'],
})
export class MxSnackbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxClose']);
  }
}


export declare interface MxSnackbar extends Components.MxSnackbar {
  /**
   * Emitted after the snackbar closes (by any means).
   */
  mxClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'labelClass', 'labelName', 'name', 'value']
})
@Component({
  selector: 'mx-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'labelClass', 'labelName', 'name', 'value'],
})
export class MxSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxSwitch extends Components.MxSwitch {}


@ProxyCmp({
  inputs: ['badge', 'badgeClass', 'elAriaLabel', 'icon', 'label', 'selected']
})
@Component({
  selector: 'mx-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['badge', 'badgeClass', 'elAriaLabel', 'icon', 'label', 'selected'],
})
export class MxTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxTab extends Components.MxTab {}


@ProxyCmp({
  inputs: ['index', 'value']
})
@Component({
  selector: 'mx-tab-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['index', 'value'],
})
export class MxTabContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxTabContent extends Components.MxTabContent {}


@ProxyCmp({
  inputs: ['autoWidth', 'checkOnRowClick', 'checkable', 'columns', 'disableNextPage', 'disablePagination', 'draggableRows', 'getGroupByHeading', 'getMultiRowActions', 'getRowActions', 'getRowId', 'groupBy', 'hoverable', 'mobileSearchOnTop', 'mutateOnDrag', 'operationsBarClass', 'page', 'paginate', 'progressAppearDelay', 'progressValue', 'rows', 'rowsPerPage', 'rowsPerPageOptions', 'serverPaginate', 'showCheckAll', 'showProgressBar', 'sortAscending', 'sortBy', 'totalRows'],
  methods: ['getCheckedRowIds', 'setCheckedRowIds', 'checkAll', 'checkNone']
})
@Component({
  selector: 'mx-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoWidth', 'checkOnRowClick', 'checkable', 'columns', 'disableNextPage', 'disablePagination', 'draggableRows', 'getGroupByHeading', 'getMultiRowActions', 'getRowActions', 'getRowId', 'groupBy', 'hoverable', 'mobileSearchOnTop', 'mutateOnDrag', 'operationsBarClass', 'page', 'paginate', 'progressAppearDelay', 'progressValue', 'rows', 'rowsPerPage', 'rowsPerPageOptions', 'serverPaginate', 'showCheckAll', 'showProgressBar', 'sortAscending', 'sortBy', 'totalRows'],
})
export class MxTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxSortChange', 'mxRowCheck', 'mxCheckAll', 'mxVisibleRowsChange', 'mxRowMove']);
  }
}


import type { SortChangeEventDetail as IMxTableSortChangeEventDetail } from '@moxiworks/mds';

export declare interface MxTable extends Components.MxTable {
  /**
   * Emitted when a sortable column's header is clicked.
   */
  mxSortChange: EventEmitter<CustomEvent<IMxTableSortChangeEventDetail>>;
  /**
   * Emitted when a row is (un)checked.  The `Event.detail` will be the array of checked `rowId`s.
   */
  mxRowCheck: EventEmitter<CustomEvent<string[]>>;
  /**
   * Emitted when the (un)check-all checkbox is clicked.  The `Event.detail` will be the new `checked` value.
   */
  mxCheckAll: EventEmitter<CustomEvent<boolean>>;
  /**
   * Emitted when the sorting, pagination, or rows data changes.
The `Event.detail` will contain the sorted, paginated array of visible rows.  This is useful
for building a custom row layout via the default slot.
   */
  mxVisibleRowsChange: EventEmitter<CustomEvent<unknown[]>>;
  /**
   * Emitted when a row is dragged to a new position.
The `Event.detail` object will contain the `rowId` (if set), `oldIndex`, and `newIndex`.
   */
  mxRowMove: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['columnIndex', 'heading', 'isExposedMobileColumn']
})
@Component({
  selector: 'mx-table-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columnIndex', 'heading', 'isExposedMobileColumn'],
})
export class MxTableCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxTableCell extends Components.MxTableCell {}


@ProxyCmp({
  inputs: ['actions', 'checked', 'collapseNestedRows', 'doNotCollapse', 'doNotDrag', 'rowId', 'rowIndex', 'subheader'],
  methods: ['translateRow', 'toggle', 'collapse', 'expand', 'focusDragHandle', 'getChildren', 'getNestedRowIndexes', 'getHeight']
})
@Component({
  selector: 'mx-table-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'checked', 'collapseNestedRows', 'doNotCollapse', 'doNotDrag', 'rowId', 'rowIndex', 'subheader'],
})
export class MxTableRow {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxCheck', 'mxRowDragStart', 'mxRowDragEnd', 'mxDragKeyDown', 'mxRowAccordion']);
  }
}


export declare interface MxTableRow extends Components.MxTableRow {
  /**
   * Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked
   */
  mxCheck: EventEmitter<CustomEvent<{ rowId: string; checked: boolean }>>;
  /**
   * Emitted when dragging starts.  Handled by the parent table.
   */
  mxRowDragStart: EventEmitter<CustomEvent<{ isKeyboard: boolean }>>;
  /**
   * Emitted when dragging ends.  Handled by the parent table.
   */
  mxRowDragEnd: EventEmitter<CustomEvent<{ isKeyboard: boolean; isCancel: boolean }>>;
  /**
   * Emits the `KeyboardEvent.key` when a key is pressed while keyboard dragging.  Handled by the parent table.
   */
  mxDragKeyDown: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when a row is collapsed or expanded.  Handled by the parent table.
   */
  mxRowAccordion: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['fill', 'tabs', 'value']
})
@Component({
  selector: 'mx-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fill', 'tabs', 'value'],
})
export class MxTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxChange']);
  }
}


export declare interface MxTabs extends Components.MxTabs {
  /**
   * Emits the newly selected tab's index as `Event.detail`
   */
  mxChange: EventEmitter<CustomEvent<number>>;
}


@ProxyCmp({
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'inputId', 'label', 'name', 'value']
})
@Component({
  selector: 'mx-time-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['assistiveText', 'dense', 'disabled', 'elAriaLabel', 'error', 'floatLabel', 'inputId', 'label', 'name', 'value'],
})
export class MxTimePicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxTimePicker extends Components.MxTimePicker {}


@ProxyCmp({
  inputs: ['disabled', 'elAriaLabel', 'icon', 'selected', 'value']
})
@Component({
  selector: 'mx-toggle-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'elAriaLabel', 'icon', 'selected', 'value'],
})
export class MxToggleButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxToggleButton extends Components.MxToggleButton {}


@ProxyCmp({
  inputs: ['required', 'value']
})
@Component({
  selector: 'mx-toggle-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['required', 'value'],
})
export class MxToggleButtonGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['mxInput']);
  }
}


export declare interface MxToggleButtonGroup extends Components.MxToggleButtonGroup {
  /**
   * Emits the updated value as event.detail
   */
  mxInput: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['appearDelay', 'extended', 'inverted', 'isOpen', 'maxWidth', 'placement', 'tooltipClass', 'value']
})
@Component({
  selector: 'mx-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearDelay', 'extended', 'inverted', 'isOpen', 'maxWidth', 'placement', 'tooltipClass', 'value'],
})
export class MxTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MxTooltip extends Components.MxTooltip {}


