'use strict';

const index = require('./index-447342ec.js');

/*
 Stencil Client Patch Browser v2.6.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('mds-components.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["mx-page-header.cjs",[[4,"mx-page-header",{"buttons":[16],"previousPageUrl":[1,"previous-page-url"],"previousPageTitle":[1,"previous-page-title"],"pattern":[4],"minWidths":[32],"renderTertiaryButtonAsMenu":[32]}]]],["mx-pagination.cjs",[[4,"mx-pagination",{"page":[2],"rowsPerPageOptions":[16],"rowsPerPage":[2,"rows-per-page"],"simple":[4],"totalRows":[2,"total-rows"],"disabled":[4],"disableNextPage":[4,"disable-next-page"],"hideRowsPerPage":[32],"moveStatusToBottom":[32],"isXSmallMinWidth":[32],"isSmallMinWidth":[32]}]]],["mx-tabs.cjs",[[0,"mx-tabs",{"fill":[4],"value":[2],"tabs":[16],"minWidths":[32]},[[0,"click","onClick"]]]]],["mx-dropdown-menu.cjs",[[4,"mx-dropdown-menu",{"ariaLabel":[1,"aria-label"],"dense":[4],"elevated":[4],"flat":[4],"label":[1],"dropdownId":[1,"dropdown-id"],"name":[1],"suffix":[1],"value":[1032],"isFocused":[32]},[[0,"click","onClick"]]]]],["mx-chip.cjs",[[4,"mx-chip",{"outlined":[4],"disabled":[4],"selected":[516],"clickable":[4],"removable":[4],"avatarUrl":[1,"avatar-url"],"icon":[1],"value":[8],"choice":[4],"filter":[4]}]]],["mx-chip-group.cjs",[[4,"mx-chip-group",{"value":[1032]},[[0,"click","onChipClick"]]]]],["mx-circular-progress.cjs",[[0,"mx-circular-progress",{"value":[2],"size":[1],"appearDelay":[2,"appear-delay"]}]]],["mx-fab.cjs",[[4,"mx-fab",{"icon":[1],"secondary":[4],"ariaLabel":[1,"aria-label"],"value":[1],"minWidths":[32],"isExtended":[32]}]]],["mx-input.cjs",[[0,"mx-input",{"name":[1],"inputId":[1,"input-id"],"label":[1],"value":[1025],"type":[1],"dense":[4],"disabled":[4],"readonly":[4],"maxlength":[2],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"suffix":[1],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"floatLabel":[4,"float-label"],"textarea":[4],"textareaHeight":[1025,"textarea-height"],"isFocused":[32],"characterCount":[32]}]]],["mx-linear-progress.cjs",[[0,"mx-linear-progress",{"value":[2],"appearDelay":[2,"appear-delay"]}]]],["mx-radio.cjs",[[0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-search.cjs",[[0,"mx-search",{"ariaLabel":[1,"aria-label"],"dense":[4],"flat":[4],"name":[1],"placeholder":[1],"value":[1]}]]],["mx-switch.cjs",[[0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-tab-content.cjs",[[4,"mx-tab-content",{"index":[2],"value":[2]}]]],["mx-toggle-button.cjs",[[0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"ariaLabel":[1,"aria-label"],"value":[8]}]]],["mx-toggle-button-group.cjs",[[4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]]],["mx-button.cjs",[[4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]]],["mx-badge.cjs",[[4,"mx-badge",{"value":[8],"squared":[4],"indicator":[8],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]]],["mx-select_2.cjs",[[0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}],[4,"mx-select",{"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"elevated":[4],"flat":[4],"label":[1],"floatLabel":[4,"float-label"],"ariaLabel":[1,"aria-label"],"selectId":[1,"select-id"],"name":[1],"suffix":[1],"error":[1028],"labelClass":[1025,"label-class"],"value":[1032],"isFocused":[32]}]]],["mx-checkbox_4.cjs",[[4,"mx-menu-item",{"checked":[4],"disabled":[4],"icon":[1],"label":[1],"multiSelect":[4,"multi-select"],"minWidths":[32],"closeSubMenu":[64],"focusMenuItem":[64]},[[1,"mouseenter","onMouseEnter"],[1,"mouseleave","onMouseLeave"],[0,"focus","onFocus"],[0,"keydown","onKeyDown"]]],[4,"mx-icon-button",{"type":[1],"value":[1],"disabled":[516],"ariaLabel":[1,"aria-label"],"chevronDown":[4,"chevron-down"],"chevronLeft":[4,"chevron-left"],"chevronRight":[4,"chevron-right"],"icon":[1]}],[0,"mx-checkbox",{"name":[1],"value":[1],"labelLeft":[4,"label-left"],"labelName":[1,"label-name"],"labelClass":[1,"label-class"],"hideLabel":[4,"hide-label"],"checked":[4],"disabled":[4],"indeterminate":[4]}],[4,"mx-menu",{"anchorEl":[16],"offset":[16],"placement":[1],"isOpen":[1540,"is-open"],"openMenu":[64],"closeMenu":[64]},[[0,"mxClick","onMenuItemClick"],[6,"click","onClick"],[4,"keydown","onDocumentKeyDown"],[0,"keydown","onKeydown"]]]]]], options);
});
