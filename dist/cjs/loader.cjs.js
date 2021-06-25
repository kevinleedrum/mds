'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2d451529.js');

/*
 Stencil Client Patch Esm v2.6.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["mx-tabs.cjs",[[0,"mx-tabs",{"fill":[4],"value":[2],"tabs":[16],"minWidths":[32]},[[0,"click","onClick"]]]]],["mx-page-header.cjs",[[4,"mx-page-header",{"buttons":[16],"previousPageUrl":[1,"previous-page-url"],"previousPageTitle":[1,"previous-page-title"],"pattern":[4],"minWidths":[32],"renderTertiaryButtonAsMenu":[32]}]]],["mx-checkbox.cjs",[[0,"mx-checkbox",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-chip.cjs",[[4,"mx-chip",{"outlined":[4],"disabled":[4],"selected":[516],"clickable":[4],"removable":[4],"avatarUrl":[1,"avatar-url"],"icon":[1],"value":[8],"choice":[4],"filter":[4]}]]],["mx-chip-group.cjs",[[4,"mx-chip-group",{"value":[1032]},[[0,"click","onChipClick"]]]]],["mx-circular-progress.cjs",[[0,"mx-circular-progress",{"value":[2],"size":[1],"appearDelay":[2,"appear-delay"]}]]],["mx-fab.cjs",[[4,"mx-fab",{"icon":[1],"secondary":[4],"ariaLabel":[1,"aria-label"],"value":[1],"minWidths":[32],"isExtended":[32]}]]],["mx-input.cjs",[[0,"mx-input",{"name":[1],"label":[1],"value":[1],"type":[1],"dense":[4],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"isActive":[1028,"is-active"],"isFocused":[1028,"is-focused"],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"textarea":[4],"textareaHeight":[1025,"textarea-height"]}]]],["mx-linear-progress.cjs",[[0,"mx-linear-progress",{"value":[2],"appearDelay":[2,"appear-delay"]}]]],["mx-radio.cjs",[[0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-search.cjs",[[0,"mx-search",{"ariaLabel":[1,"aria-label"],"dense":[4],"flat":[4],"name":[1],"placeholder":[1],"value":[1]}]]],["mx-switch.cjs",[[0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-tab-content.cjs",[[4,"mx-tab-content",{"index":[2],"value":[2]}]]],["mx-toggle-button.cjs",[[0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"ariaLabel":[1,"aria-label"],"value":[8]}]]],["mx-toggle-button-group.cjs",[[4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]]],["mx-button.cjs",[[4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"disabled":[4],"xl":[4],"ariaLabel":[1,"aria-label"],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]]],["mx-badge.cjs",[[4,"mx-badge",{"value":[8],"squared":[4],"dot":[4],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]]],["mx-select_2.cjs",[[0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}],[4,"mx-select",{"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"elevated":[4],"flat":[4],"label":[1],"ariaLabel":[1,"aria-label"],"selectId":[1,"select-id"],"name":[1],"suffix":[1],"error":[1028],"labelClass":[1025,"label-class"],"value":[1032],"isFocused":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
