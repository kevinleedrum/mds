import { p as promiseResolve, b as bootstrapLazy } from './index-5775867f.js';

/*
 Stencil Client Patch Esm v2.5.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["mx-tabs",[[0,"mx-tabs",{"fill":[4],"value":[2],"tabs":[16],"renderAsSelect":[32]},[[0,"click","onClick"]]]]],["mx-button",[[4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]]],["mx-checkbox",[[0,"mx-checkbox",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-input",[[0,"mx-input",{"name":[1],"label":[1],"value":[1],"type":[1],"dense":[4],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"isActive":[1028,"is-active"],"isFocused":[1028,"is-focused"],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"textarea":[4],"textareaHeight":[1025,"textarea-height"]}]]],["mx-radio",[[0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-switch",[[0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-tab-content",[[4,"mx-tab-content",{"index":[2],"value":[2]}]]],["mx-toggle-button",[[0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"value":[8]}]]],["mx-toggle-button-group",[[4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]]],["mx-badge",[[4,"mx-badge",{"value":[8],"squared":[4],"dot":[4],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]]],["mx-select_2",[[0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}],[4,"mx-select",{"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"elevated":[4],"flat":[4],"label":[1],"ariaLabel":[1,"aria-label"],"selectId":[1,"select-id"],"name":[1],"suffix":[1],"error":[1028],"labelClass":[1025,"label-class"],"value":[1032],"isFocused":[32]}]]]], options);
  });
};

export { defineCustomElements };
