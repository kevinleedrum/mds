import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-b9cec9f1.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.6.0 | MIT Licensed | https://stenciljs.com
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
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find(s => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE)
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
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-1b195079.js').then(() => opts);
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
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], { type: 'application/javascript' }));
                mod = new Promise(resolve => {
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
  return bootstrapLazy([["mx-page-header",[[4,"mx-page-header",{"buttons":[16],"previousPageUrl":[1,"previous-page-url"],"previousPageTitle":[1,"previous-page-title"],"pattern":[4],"minWidths":[32],"renderTertiaryButtonAsMenu":[32]}]]],["mx-tabs",[[0,"mx-tabs",{"fill":[4],"value":[2],"tabs":[16],"minWidths":[32]},[[0,"click","onClick"]]]]],["mx-dropdown-menu",[[4,"mx-dropdown-menu",{"ariaLabel":[1,"aria-label"],"dense":[4],"elevated":[4],"flat":[4],"label":[1],"dropdownId":[1,"dropdown-id"],"name":[1],"suffix":[1],"value":[1032],"isFocused":[32]},[[0,"click","onClick"]]]]],["mx-chip",[[4,"mx-chip",{"outlined":[4],"disabled":[4],"selected":[516],"clickable":[4],"removable":[4],"avatarUrl":[1,"avatar-url"],"icon":[1],"value":[8],"choice":[4],"filter":[4]}]]],["mx-chip-group",[[4,"mx-chip-group",{"value":[1032]},[[0,"click","onChipClick"]]]]],["mx-circular-progress",[[0,"mx-circular-progress",{"value":[2],"size":[1],"appearDelay":[2,"appear-delay"]}]]],["mx-fab",[[4,"mx-fab",{"icon":[1],"secondary":[4],"ariaLabel":[1,"aria-label"],"value":[1],"minWidths":[32],"isExtended":[32]}]]],["mx-input",[[0,"mx-input",{"name":[1],"inputId":[1,"input-id"],"label":[1],"value":[1],"type":[1],"dense":[4],"disabled":[4],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"isActive":[1028,"is-active"],"isFocused":[1028,"is-focused"],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"textarea":[4],"textareaHeight":[1025,"textarea-height"]}]]],["mx-linear-progress",[[0,"mx-linear-progress",{"value":[2],"appearDelay":[2,"appear-delay"]}]]],["mx-radio",[[0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-search",[[0,"mx-search",{"ariaLabel":[1,"aria-label"],"dense":[4],"flat":[4],"name":[1],"placeholder":[1],"value":[1]}]]],["mx-switch",[[0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]]],["mx-tab-content",[[4,"mx-tab-content",{"index":[2],"value":[2]}]]],["mx-toggle-button",[[0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"ariaLabel":[1,"aria-label"],"value":[8]}]]],["mx-toggle-button-group",[[4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]]],["mx-menu-item",[[4,"mx-menu-item",{"checked":[4],"disabled":[4],"icon":[1],"label":[1],"multiSelect":[4,"multi-select"],"minWidths":[32],"closeSubMenu":[64],"focusMenuItem":[64]},[[1,"mouseenter","onMouseEnter"],[1,"mouseleave","onMouseLeave"],[0,"focus","onFocus"],[0,"keydown","onKeyDown"]]]]],["mx-tab",[[0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}]]],["mx-button",[[4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]]],["mx-icon-button",[[4,"mx-icon-button",{"type":[1],"value":[1],"disabled":[4],"ariaLabel":[1,"aria-label"],"chevronDown":[4,"chevron-down"],"chevronLeft":[4,"chevron-left"],"chevronRight":[4,"chevron-right"],"icon":[1]}]]],["mx-select",[[4,"mx-select",{"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"elevated":[4],"flat":[4],"label":[1],"ariaLabel":[1,"aria-label"],"selectId":[1,"select-id"],"name":[1],"suffix":[1],"error":[1028],"labelClass":[1025,"label-class"],"value":[1032],"isFocused":[32]}]]],["mx-badge",[[4,"mx-badge",{"value":[8],"squared":[4],"dot":[4],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]]],["mx-checkbox",[[0,"mx-checkbox",{"name":[1],"value":[1],"labelLeft":[4,"label-left"],"labelName":[1,"label-name"],"labelClass":[1,"label-class"],"checked":[4]}]]],["mx-menu",[[4,"mx-menu",{"anchorEl":[16],"offset":[16],"placement":[1],"isOpen":[1540,"is-open"],"openMenu":[64],"closeMenu":[64]},[[0,"mxClick","onMenuItemClick"],[6,"click","onClick"],[4,"keydown","onDocumentKeyDown"],[0,"keydown","onKeydown"]]]]]], options);
});
