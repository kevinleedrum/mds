'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-dc34efd9.js');

/*
 Stencil Client Patch Esm v2.5.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["mx-tab.cjs",[[0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}]]],["mx-button.cjs",[[4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]]],["mx-checkbox.cjs",[[0,"mx-checkbox",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-input.cjs",[[0,"mx-input",{"name":[1],"label":[1],"value":[1],"type":[1],"dense":[4],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"isActive":[1028,"is-active"],"isFocused":[1028,"is-focused"],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"textarea":[4],"textareaHeight":[1025,"textarea-height"]}]]],["mx-radio.cjs",[[0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-select.cjs",[[4,"mx-select",{"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"elevated":[4],"flat":[4],"label":[1],"ariaLabel":[1,"aria-label"],"selectId":[1,"select-id"],"name":[1],"suffix":[1],"error":[1028],"labelClass":[1025,"label-class"],"value":[1032],"isFocused":[32]}]]],["mx-switch.cjs",[[0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-tab-content.cjs",[[4,"mx-tab-content",{"index":[2],"value":[2]}]]],["mx-tabs.cjs",[[4,"mx-tabs",{"fill":[4],"value":[2]},[[0,"keyup","onKeyUp"],[1,"mouseup","onMouseUp"],[0,"click","onClick"]]]]],["mx-toggle-button.cjs",[[0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"value":[8]}]]],["mx-toggle-button-group.cjs",[[4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]]],["mx-badge.cjs",[[4,"mx-badge",{"value":[8],"squared":[4],"dot":[4],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
