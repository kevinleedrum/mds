import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-1ef0feab.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.15.1 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-1d32cb7b.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"mx-table\",[[4,\"mx-table\",{\"autoWidth\":[4,\"auto-width\"],\"checkable\":[4],\"checkOnRowClick\":[4,\"check-on-row-click\"],\"columns\":[16],\"disableNextPage\":[4,\"disable-next-page\"],\"disablePagination\":[4,\"disable-pagination\"],\"draggableRows\":[4,\"draggable-rows\"],\"getGroupByHeading\":[16],\"getMultiRowActions\":[16],\"getRowActions\":[16],\"getRowId\":[16],\"groupBy\":[1,\"group-by\"],\"hoverable\":[4],\"mobileSearchOnTop\":[4,\"mobile-search-on-top\"],\"mutateOnDrag\":[4,\"mutate-on-drag\"],\"operationsBarClass\":[1,\"operations-bar-class\"],\"page\":[1026],\"paginate\":[4],\"progressAppearDelay\":[2,\"progress-appear-delay\"],\"progressValue\":[2,\"progress-value\"],\"rows\":[1040],\"rowsPerPage\":[1026,\"rows-per-page\"],\"rowsPerPageOptions\":[16],\"serverPaginate\":[4,\"server-paginate\"],\"showCheckAll\":[4,\"show-check-all\"],\"showProgressBar\":[4,\"show-progress-bar\"],\"sortAscending\":[1028,\"sort-ascending\"],\"sortBy\":[1025,\"sort-by\"],\"totalRows\":[2,\"total-rows\"],\"minWidths\":[32],\"checkedRowIds\":[32],\"exposedMobileColumnIndex\":[32],\"hasActionsColumnFromSlot\":[32],\"getCheckedRowIds\":[64],\"setCheckedRowIds\":[64],\"checkAll\":[64],\"checkNone\":[64]},[[0,\"mxCheck\",\"onMxCheck\"],[0,\"mxRowDragStart\",\"onMxRowDragStart\"],[0,\"mxDragKeyDown\",\"onDragKeyDown\"],[0,\"mxRowDragEnd\",\"onMxRowDragEnd\"],[0,\"mxRowAccordion\",\"setLastRowClass\"]]]]],[\"mx-modal\",[[4,\"mx-modal\",{\"buttons\":[16],\"closeOnEscape\":[4,\"close-on-escape\"],\"closeOnOutsideClick\":[4,\"close-on-outside-click\"],\"contentClass\":[1,\"content-class\"],\"description\":[1],\"fromLeft\":[4,\"from-left\"],\"fromRight\":[4,\"from-right\"],\"isOpen\":[4,\"is-open\"],\"previousPageTitle\":[1,\"previous-page-title\"],\"previousPageUrl\":[1,\"previous-page-url\"],\"large\":[4],\"minWidths\":[32],\"isVisible\":[32]},[[0,\"keydown\",\"onKeyDown\"],[4,\"keydown\",\"onDocumentKeyDown\"]]]]],[\"mx-tabs\",[[0,\"mx-tabs\",{\"fill\":[4],\"value\":[2],\"tabs\":[16],\"minWidths\":[32]},[[0,\"click\",\"onClick\"]]]]],[\"mx-time-picker\",[[0,\"mx-time-picker\",{\"assistiveText\":[1,\"assistive-text\"],\"dense\":[4],\"disabled\":[4],\"elAriaLabel\":[1,\"el-aria-label\"],\"error\":[1540],\"floatLabel\":[4,\"float-label\"],\"inputId\":[1,\"input-id\"],\"label\":[1],\"name\":[1],\"value\":[1025],\"isFocused\":[32],\"isInputDirty\":[32]},[[0,\"click\",\"onClick\"]]]]],[\"mx-image-upload\",[[4,\"mx-image-upload\",{\"acceptImage\":[4,\"accept-image\"],\"acceptPdf\":[4,\"accept-pdf\"],\"assetName\":[1,\"asset-name\"],\"assistiveText\":[1,\"assistive-text\"],\"avatar\":[4],\"error\":[1540],\"elAriaLabel\":[1,\"el-aria-label\"],\"uploadBtnType\":[1,\"upload-btn-type\"],\"thumbnailSize\":[1,\"thumbnail-size\"],\"height\":[1],\"icon\":[1],\"inputId\":[1,\"input-id\"],\"isUploaded\":[1540,\"is-uploaded\"],\"isUploading\":[1540,\"is-uploading\"],\"name\":[1],\"removeButtonLabel\":[1,\"remove-button-label\"],\"showButton\":[4,\"show-button\"],\"showIcon\":[4,\"show-icon\"],\"showDropzoneText\":[4,\"show-dropzone-text\"],\"thumbnailUrl\":[1,\"thumbnail-url\"],\"uploadButtonLabel\":[1,\"upload-button-label\"],\"width\":[1],\"isDraggingOver\":[32],\"isFileSelected\":[32],\"thumbnailDataUri\":[32],\"removeFile\":[64],\"selectFile\":[64]}]]],[\"mx-confirm-input\",[[0,\"mx-confirm-input\",{\"name\":[1],\"inputId\":[1,\"input-id\"],\"label\":[1],\"placeholder\":[1],\"value\":[1025],\"type\":[1],\"dense\":[4],\"disabled\":[4],\"readonly\":[4],\"maxlength\":[2],\"leftIcon\":[1,\"left-icon\"],\"rightIcon\":[1025,\"right-icon\"],\"suffix\":[1],\"outerContainerClass\":[1,\"outer-container-class\"],\"labelClass\":[1025,\"label-class\"],\"error\":[1540],\"assistiveText\":[1,\"assistive-text\"],\"floatLabel\":[4,\"float-label\"],\"textarea\":[4],\"textareaHeight\":[1025,\"textarea-height\"],\"elAriaLabel\":[1,\"el-aria-label\"],\"hideCharacterCount\":[4,\"hide-character-count\"],\"isFocused\":[32],\"isHovered\":[32]}]]],[\"mx-dialog\",[[4,\"mx-dialog\",{\"isOpen\":[4,\"is-open\"],\"modalClass\":[1,\"modal-class\"],\"isVisible\":[32],\"alert\":[64],\"confirm\":[64]},[[16,\"keydown\",\"onKeyDown\"]]]]],[\"mx-dropdown-menu\",[[4,\"mx-dropdown-menu\",{\"elAriaLabel\":[1,\"el-aria-label\"],\"disabled\":[4],\"readonly\":[4],\"dense\":[4],\"elevated\":[4],\"flat\":[4],\"label\":[1],\"dropdownClass\":[1,\"dropdown-class\"],\"dropdownId\":[1,\"dropdown-id\"],\"name\":[1],\"suffix\":[1],\"value\":[1032],\"error\":[1540],\"assistiveText\":[1,\"assistive-text\"],\"isFocused\":[32]},[[0,\"click\",\"onClick\"]]]]],[\"mx-banner\",[[4,\"mx-banner\",{\"error\":[4],\"isOpen\":[4,\"is-open\"],\"sticky\":[4],\"isVisible\":[32]}]]],[\"mx-chart\",[[0,\"mx-chart\",{\"data\":[16],\"elAriaLabel\":[1,\"el-aria-label\"],\"height\":[2],\"options\":[16],\"type\":[1],\"width\":[2],\"update\":[64]}]]],[\"mx-chip\",[[4,\"mx-chip\",{\"outlined\":[4],\"disabled\":[4],\"selected\":[1540],\"clickable\":[4],\"removable\":[4],\"avatarUrl\":[1,\"avatar-url\"],\"icon\":[1],\"value\":[8],\"choice\":[4],\"filter\":[4]}]]],[\"mx-chip-group\",[[4,\"mx-chip-group\",{\"value\":[1032]},[[0,\"click\",\"onChipClick\"]]]]],[\"mx-code\",[[4,\"mx-code\",{\"code\":[1],\"language\":[1],\"lineNumberStart\":[2,\"line-number-start\"],\"showLineNumbers\":[4,\"show-line-numbers\"]}]]],[\"mx-date-picker\",[[0,\"mx-date-picker\",{\"allowFuture\":[4,\"allow-future\"],\"allowPast\":[4,\"allow-past\"],\"assistiveText\":[1,\"assistive-text\"],\"dense\":[4],\"disabled\":[4],\"elAriaLabel\":[1,\"el-aria-label\"],\"error\":[1540],\"floatLabel\":[4,\"float-label\"],\"inputId\":[1,\"input-id\"],\"label\":[1],\"min\":[1],\"max\":[1],\"name\":[1],\"value\":[1025],\"isFocused\":[32],\"isInputDirty\":[32]},[[6,\"click\",\"onClick\"]]]]],[\"mx-fab\",[[4,\"mx-fab\",{\"icon\":[1],\"secondary\":[4],\"elAriaLabel\":[1,\"el-aria-label\"],\"value\":[1],\"minWidths\":[32],\"isExtended\":[32]}]]],[\"mx-radio\",[[0,\"mx-radio\",{\"name\":[1],\"value\":[1],\"labelClass\":[1,\"label-class\"],\"labelName\":[1,\"label-name\"],\"checked\":[1028],\"disabled\":[4]}]]],[\"mx-search\",[[0,\"mx-search\",{\"dense\":[4],\"elAriaLabel\":[1,\"el-aria-label\"],\"flat\":[4],\"name\":[1],\"placeholder\":[1],\"showClear\":[4,\"show-clear\"],\"value\":[1025]}]]],[\"mx-snackbar\",[[4,\"mx-snackbar\",{\"duration\":[2],\"isOpen\":[1540,\"is-open\"],\"isVisible\":[32]}]]],[\"mx-switch\",[[0,\"mx-switch\",{\"name\":[1],\"value\":[1],\"labelClass\":[1,\"label-class\"],\"labelName\":[1,\"label-name\"],\"checked\":[1028],\"disabled\":[4]}]]],[\"mx-tab-content\",[[4,\"mx-tab-content\",{\"index\":[2],\"value\":[2]}]]],[\"mx-toggle-button\",[[0,\"mx-toggle-button\",{\"icon\":[1],\"selected\":[516],\"disabled\":[4],\"elAriaLabel\":[1,\"el-aria-label\"],\"value\":[8]}]]],[\"mx-toggle-button-group\",[[4,\"mx-toggle-button-group\",{\"value\":[1032],\"required\":[4]},[[0,\"click\",\"onToggleButtonClick\"]]]]],[\"mx-tooltip\",[[4,\"mx-tooltip\",{\"appearDelay\":[2,\"appear-delay\"],\"extended\":[4],\"inverted\":[4],\"maxWidth\":[1,\"max-width\"],\"isOpen\":[1540,\"is-open\"],\"placement\":[1],\"tooltipClass\":[1,\"tooltip-class\"],\"value\":[1]}]]],[\"mx-icon-button\",[[4,\"mx-icon-button\",{\"type\":[1],\"form\":[1],\"formaction\":[1],\"value\":[1],\"href\":[1],\"target\":[1],\"disabled\":[516],\"elAriaLabel\":[1,\"el-aria-label\"],\"chevronDown\":[4,\"chevron-down\"],\"chevronLeft\":[4,\"chevron-left\"],\"chevronRight\":[4,\"chevron-right\"],\"icon\":[1]}]]],[\"mx-checkbox\",[[0,\"mx-checkbox\",{\"name\":[1],\"value\":[1],\"labelLeft\":[4,\"label-left\"],\"labelName\":[1,\"label-name\"],\"labelClass\":[1,\"label-class\"],\"hideLabel\":[4,\"hide-label\"],\"checked\":[1028],\"disabled\":[4],\"indeterminate\":[4],\"elAriaLabel\":[1,\"el-aria-label\"]}]]],[\"mx-menu-item\",[[4,\"mx-menu-item\",{\"checked\":[4],\"disabled\":[4],\"icon\":[1],\"label\":[1],\"subtitle\":[1],\"multiSelect\":[4,\"multi-select\"],\"selected\":[4],\"minWidths\":[32],\"closeSubMenu\":[64],\"getValue\":[64],\"focusMenuItem\":[64]},[[1,\"mouseenter\",\"onMouseEnter\"],[1,\"mouseleave\",\"onMouseLeave\"],[0,\"focus\",\"onFocus\"],[0,\"keydown\",\"onKeyDown\"]]]]],[\"mx-menu\",[[4,\"mx-menu\",{\"anchorEl\":[16],\"autocompleteOnly\":[4,\"autocomplete-only\"],\"triggerEl\":[16],\"offset\":[16],\"placement\":[1],\"isOpen\":[1540,\"is-open\"],\"openMenu\":[64],\"closeMenu\":[64]},[[0,\"mxClick\",\"onMenuItemClick\"],[6,\"click\",\"onClick\"],[6,\"focus\",\"onFocus\"],[4,\"keydown\",\"onDocumentKeyDown\"],[0,\"keydown\",\"onKeydown\"]]]]],[\"mx-page-header\",[[4,\"mx-page-header\",{\"buttons\":[16],\"modal\":[4],\"previousPageUrl\":[1,\"previous-page-url\"],\"previousPageTitle\":[1,\"previous-page-title\"],\"pattern\":[4],\"minWidths\":[32],\"renderTertiaryButtonAsMenu\":[32],\"resetResizeObserver\":[64]}]]],[\"mx-table-row\",[[4,\"mx-table-row\",{\"rowId\":[1,\"row-id\"],\"actions\":[16],\"doNotCollapse\":[516,\"do-not-collapse\"],\"doNotDrag\":[4,\"do-not-drag\"],\"rowIndex\":[2,\"row-index\"],\"checked\":[1028],\"collapseNestedRows\":[1540,\"collapse-nested-rows\"],\"subheader\":[4],\"minWidths\":[32],\"checkable\":[32],\"checkOnRowClick\":[32],\"isDraggable\":[32],\"isDragging\":[32],\"isMobileExpanded\":[32],\"isMobileCollapsing\":[32],\"translateRow\":[64],\"toggle\":[64],\"collapse\":[64],\"expand\":[64],\"focusDragHandle\":[64],\"getChildren\":[64],\"getNestedRowIndexes\":[64],\"getHeight\":[64]}]]],[\"mx-pagination\",[[4,\"mx-pagination\",{\"page\":[2],\"rowsPerPageOptions\":[16],\"rowsPerPage\":[2,\"rows-per-page\"],\"simple\":[4],\"totalRows\":[2,\"total-rows\"],\"disabled\":[4],\"disableNextPage\":[4,\"disable-next-page\"],\"hideRowsPerPage\":[32],\"moveStatusToBottom\":[32],\"isXSmallMinWidth\":[32],\"isSmallMinWidth\":[32]}]]],[\"mx-tab\",[[0,\"mx-tab\",{\"label\":[1],\"elAriaLabel\":[1,\"el-aria-label\"],\"icon\":[1],\"selected\":[516],\"badge\":[4],\"badgeClass\":[1,\"badge-class\"]}]]],[\"mx-circular-progress\",[[0,\"mx-circular-progress\",{\"value\":[2],\"size\":[1],\"appearDelay\":[2,\"appear-delay\"]}]]],[\"mx-input\",[[0,\"mx-input\",{\"name\":[1],\"inputId\":[1,\"input-id\"],\"label\":[1],\"placeholder\":[1],\"value\":[1025],\"type\":[1],\"dense\":[4],\"disabled\":[4],\"readonly\":[4],\"maxlength\":[2],\"leftIcon\":[1,\"left-icon\"],\"rightIcon\":[1,\"right-icon\"],\"suffix\":[1],\"outerContainerClass\":[1,\"outer-container-class\"],\"labelClass\":[1025,\"label-class\"],\"error\":[1540],\"assistiveText\":[1,\"assistive-text\"],\"floatLabel\":[4,\"float-label\"],\"textarea\":[4],\"textareaHeight\":[1025,\"textarea-height\"],\"elAriaLabel\":[1,\"el-aria-label\"],\"hideCharacterCount\":[4,\"hide-character-count\"],\"isFocused\":[32],\"characterCount\":[32]}]]],[\"mx-linear-progress\",[[0,\"mx-linear-progress\",{\"value\":[2],\"appearDelay\":[2,\"appear-delay\"]}]]],[\"mx-select\",[[4,\"mx-select\",{\"assistiveText\":[1,\"assistive-text\"],\"dense\":[4],\"disabled\":[4],\"elevated\":[4],\"flat\":[4],\"label\":[1],\"floatLabel\":[4,\"float-label\"],\"elAriaLabel\":[1,\"el-aria-label\"],\"selectClass\":[1,\"select-class\"],\"selectId\":[1,\"select-id\"],\"name\":[1],\"suffix\":[1],\"error\":[1540],\"labelClass\":[1025,\"label-class\"],\"value\":[1032],\"isFocused\":[32]}]]],[\"mx-table-cell\",[[4,\"mx-table-cell\",{\"isExposedMobileColumn\":[516,\"is-exposed-mobile-column\"],\"columnIndex\":[514,\"column-index\"],\"heading\":[1],\"minWidths\":[32]}]]],[\"mx-badge\",[[4,\"mx-badge\",{\"value\":[8],\"squared\":[4],\"indicator\":[8],\"badgeClass\":[1,\"badge-class\"],\"icon\":[1],\"offset\":[2],\"bottom\":[4],\"left\":[4]}]]],[\"mx-button\",[[4,\"mx-button\",{\"btnType\":[1025,\"btn-type\"],\"elAriaLabel\":[1,\"el-aria-label\"],\"type\":[1],\"value\":[1],\"form\":[1],\"formaction\":[1],\"disabled\":[4],\"xl\":[4],\"href\":[1],\"target\":[1],\"full\":[4],\"dropdown\":[4],\"icon\":[1]}]]]]"), options);
});
