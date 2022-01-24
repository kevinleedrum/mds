import{r as t,h as s,H as i,g as e,c as h}from"./p-31bdeba9.js";import{p as n}from"./p-b9dc7528.js";import{c as r,a as l}from"./p-4689defe.js";import{d as o,b as a}from"./p-777f0b99.js";import{M as c,m as u}from"./p-8a252c56.js";const m=class{constructor(s){t(this,s),this.dataAttributes={},this.name="",this.value="",this.labelLeft=!1,this.labelName="",this.labelClass="",this.hideLabel=!1,this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.componentWillRender=n}get checkClass(){let t="flex h-18 w-18 flex-shrink-0";return t+=this.labelLeft?" order-2":" order-1",this.labelLeft&&!this.hideLabel&&(t+=" ml-16"),t}get checkLabelClass(){let t="checkbox-label inline-block";return this.hideLabel&&(t+=" sr-only"),t+=this.labelLeft?" order-1 flex-1":" order-2",this.labelLeft||this.hideLabel||(t+=" ml-16"),t}onInput(t){this.checked=t.target.checked}render(){return s(i,{class:"mx-checkbox inline-flex items-center"},s("label",{class:["relative flex-1 inline-flex flex-nowrap align-center items-center text-4"+(this.disabled?"":" cursor-pointer"),this.labelClass].join(" ")},s("input",Object.assign({class:"absolute h-0 w-0 opacity-0"+(this.indeterminate?" indeterminate":""),type:"checkbox","aria-label":this.elAriaLabel,name:this.name,value:this.value,checked:this.checked,disabled:this.disabled,indeterminate:this.indeterminate},this.dataAttributes,{onInput:this.onInput.bind(this)})),s("span",{class:this.checkClass}),s("div",{class:this.checkLabelClass,"data-testid":"labelName"},this.labelName)))}get element(){return e(this)}},d=class{constructor(s){t(this,s),this.dataAttributes={},this.type="button",this.disabled=!1,this.chevronDown=!1,this.chevronLeft=!1,this.chevronRight=!1,this.componentWillRender=n}onClick(t){if(this.disabled)return t.stopPropagation(),void t.preventDefault()}get isChevron(){return this.chevronDown||this.chevronLeft||this.chevronRight}render(){const t=this.href?"a":"button",e=s("div",{class:"flex justify-center items-center content-center relative"},this.icon&&s("i",{class:["text-icon",this.icon].join(" ")}),s("span",{class:"slot-content"},s("slot",null)),this.isChevron&&s("span",{class:"chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center text-icon shadow-1"},s("i",{"data-testid":"chevron",class:this.chevronLeft?"mds-chevron-left":this.chevronRight?"mds-chevron-right":"mds-chevron-down"})));return s(i,{class:"mx-icon-button inline-block appearance-none"},s(t,Object.assign({type:this.href?null:this.type,formaction:this.formaction,value:this.value,href:this.href,class:"flex appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto",ref:t=>this.btnElem=t,onClick:this.onClick.bind(this),"aria-disabled":this.disabled?"true":null,"aria-label":this.elAriaLabel},this.dataAttributes),e))}get element(){return e(this)}},f=class{constructor(s){t(this,s),this.mxClose=h(this,"mxClose",7),this.mxOpen=h(this,"mxOpen",7),this.isClosing=!1,this.autocompleteOnly=!1,this.placement="bottom-start",this.isOpen=!1}onMenuItemClick(){this.closeMenu()}onClick(t){const s=this.triggerEl||this.anchorEl,i=s&&s.contains(t.target);if(i&&t.preventDefault(),!this.isOpen&&i)this.openMenu(),t.preventDefault();else if(this.isOpen&&this.element&&!this.element.contains(t.target)){if(this.isSubMenu&&i)return;if(this.inputEl&&this.inputEl.contains(t.target))return;this.closeMenu()}}onFocus(t){this.anchorEl&&(!this.isOpen||this.anchorEl.contains(t.target)||this.element.contains(t.target)?this.inputEl&&this.inputEl.contains(t.target)&&!this.isOpen&&this.openMenu():this.closeMenu())}onDocumentKeyDown(t){const s=s=>s&&s.contains(t.target),i=this.menuItems.filter((t=>!t.disabled));if(this.autocompleteOnly&&this.inputEl&&this.isOpen&&"Enter"===t.key&&!s(this.element))return t.preventDefault(),i.length&&i[0].click(),void this.onMenuItemClick();const e=["Enter"];if(this.inputEl||e.push(" "),e.includes(t.key)&&this.anchorEl&&s(this.anchorEl))return(this.triggerEl||this.anchorEl).click(),t.preventDefault(),void t.stopPropagation();if(!this.isOpen&&this.inputEl&&s(this.inputEl)&&(this.triggerEl||this.anchorEl).click(),!this.isOpen)return;const h=1===t.key.length||["Backspace","Delete","ArrowLeft","ArrowRight"].includes(t.key);if(this.inputEl&&h&&!s(this.inputEl))this.inputEl.focus();else if("Escape"===t.key)this.closeMenu(),t.preventDefault();else if(["Tab","ArrowDown"].includes(t.key)&&s(this.anchorEl)&&i.length>0){if(t.shiftKey&&"Tab"===t.key)return;this.inputEl&&this.autocompleteOnly?this.autocompleteOnly&&i.length>=2&&i[1].focusMenuItem():i[0].focusMenuItem(),t.preventDefault(),t.stopPropagation()}else"ArrowUp"===t.key&&s(this.inputEl)?t.preventDefault():this.inputEl&&s(this.inputEl)&&(this.isOpen=!this.isOpen,this.isOpen=!this.isOpen)}onKeydown(t){if(!this.isOpen)return;if(!["ArrowDown","ArrowUp"].includes(t.key))return;t.preventDefault(),t.stopPropagation();const s=this.menuItems.filter((t=>!t.disabled)),i=s.findIndex((t=>t.contains(document.activeElement)));"ArrowDown"===t.key&&i!==s.length-1?s[i+1].focusMenuItem():"ArrowUp"===t.key&&0!==i&&s[i-1].focusMenuItem()}async openMenu(){if(this.isOpen||!this.anchorEl)return!1;this.isOpen=!0,this.mxOpen.emit();const t=this.offset||(this.isSubMenu?[-8,0]:[0,1]);return this.popoverInstance=await r(this.anchorEl,this.element,this.placement,t),await o(this.menuElem,void 0,l(this.popoverInstance.state.placement)),!0}async closeMenu(){return!(!this.isOpen||this.isClosing||(this.isClosing=!0,this.menuItems.forEach((t=>t.closeSubMenu())),await a(this.menuElem),this.isClosing=!1,this.mxClose.emit(),this.isOpen=!1,this.popoverInstance&&(this.popoverInstance.destroy(),this.popoverInstance=null,0)))}connectedCallback(){const t=this.element.querySelector('[role="option"]')?"listbox":"menu";this.element.setAttribute("role",t),this.anchorEl&&this.anchorEl.setAttribute("aria-haspopup","true")}componentDidLoad(){this.setInputEl()}componentWillUpdate(){this.setInputEl(),this.inputEl&&(this.element.style.width=this.anchorEl.getBoundingClientRect().width+"px"),this.menuItems.some((t=>!!t.icon))&&this.menuItems.forEach((t=>{void 0===t.icon&&(t.icon=null)})),this.inputEl&&this.menuItems.forEach((async t=>{t.selected=this.inputEl.value===await t.getValue()}))}setInputEl(){this.anchorEl&&!this.inputEl&&(this.inputEl=this.anchorEl.querySelector('input[type="text"], input[type="search"]'),this.inputEl&&this.inputEl.setAttribute("autocomplete","off"))}get menuItems(){return Array.from(this.scrollElem.children).filter((t=>"MX-MENU-ITEM"===t.tagName))||[]}get isSubMenu(){return this.element.hasAttribute("slot")&&"submenu"===this.element.getAttribute("slot")}get hostClass(){let t="mx-menu block z-50 w-screen sm:w-auto";return this.isOpen||(t+=" hidden"),this.autocompleteOnly&&(t+=" autocomplete-only"),t}render(){return s(i,{class:this.hostClass},s("div",{ref:t=>this.menuElem=t,class:"flex flex-col shadow-9 rounded-lg"},s("div",{ref:t=>this.scrollElem=t,class:"scroll-wrapper overflow-y-auto overflow-x-hidden max-h-216 overscroll-contain"},s("slot",null))))}get element(){return e(this)}},p=class{constructor(s){t(this,s),this.mxClick=h(this,"mxClick",7),this.checked=!1,this.disabled=!1,this.multiSelect=!1,this.selected=!1,this.minWidths=new c}onMouseEnter(){this.closeSiblingSubMenus(),this.focusMenuItem(),this.submenu&&(clearTimeout(this.submenuDelayTimeout),this.submenuDelayTimeout=setTimeout(this.openSubMenu.bind(this),150))}onMouseLeave(){clearTimeout(this.submenuDelayTimeout),document.activeElement.blur()}onFocus(){this.closeSiblingSubMenus()}onKeyDown(t){if(this.submenu)return this.onKeyDownSubMenu(t);const s=["Enter"];this.multiSelect&&s.push(" "),s.includes(t.key)&&(t.preventDefault(),t.stopPropagation(),document.activeElement.click())}componentWillLoad(){this.submenu=this.element.querySelector('[slot="submenu"]')}connectedCallback(){this.role=this.element.closest("mx-dropdown-menu")?"option":"menuitem",u.subscribeComponent(this)}disconnectedCallback(){u.unsubscribeComponent(this)}async closeSubMenu(){if(this.submenu)return clearTimeout(this.submenuDelayTimeout),await this.submenu.closeMenu()}async getValue(){return this.slotWrapper&&this.slotWrapper.innerText.trim()}async focusMenuItem(){if(this.multiSelect){const t=this.menuItemElem.querySelector("mx-checkbox label");t&&t.focus()}else this.menuItemElem.focus()}async onKeyDownSubMenu(t){if(["Enter"," ","ArrowRight"].includes(t.key)){if(t.preventDefault(),t.stopPropagation(),await this.openSubMenu()){const t=this.element.querySelector("mx-menu-item:not(:disabled)");t&&t.focusMenuItem()}}else"ArrowLeft"===t.key&&(t.preventDefault(),t.stopPropagation(),await this.closeSubMenu()?this.focusMenuItem():this.element.parentElement.dispatchEvent(new KeyboardEvent(t.type,t)))}closeSiblingSubMenus(){Array.from(this.element.parentElement.children).filter((t=>t!==this.element&&"MX-MENU-ITEM"===t.tagName)).forEach((t=>t.closeSubMenu()))}openSubMenu(){if(this.submenu)return this.submenu.placement="right-start",this.submenu.anchorEl=this.element,this.submenu.openMenu()}onClick(t){if(this.disabled||this.submenu)return t.stopPropagation(),void t.preventDefault();this.multiSelect||this.mxClick.emit(t)}get checkboxLabel(){return(this.slotWrapper||this.element).innerText}render(){return s(i,{class:"mx-menu-item block"+(this.submenu?" has-submenu":"")},s("div",{ref:t=>this.menuItemElem=t,role:this.role,"aria-checked":"menuitem"===this.role?null:this.checked?"true":"false","aria-disabled":this.disabled?"true":null,"aria-selected":this.selected?"true":null,tabindex:this.disabled||this.multiSelect?"-1":"0",class:"block w-full cursor-pointer select-none text-4 outline-none",onClick:this.onClick.bind(this)},this.label&&s("p",{class:"item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5"},s("span",{class:"block -mb-4"},this.label)),s("div",{class:"flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap"+(this.multiSelect?" hidden":"")},s("div",{class:"flex items-center w-full h-full"},void 0!==this.icon&&s("i",{class:"inline-flex items-center justify-center text-1 w-20 mr-8 "+this.icon}),s("span",{ref:t=>this.slotWrapper=t,class:"truncate"},s("slot",null))),this.checked&&!this.multiSelect&&s("i",{class:"check mds-check text-icon ml-12","data-testid":"check"}),!!this.submenu&&s("i",{class:"mds-arrow-triangle-down text-icon transform -rotate-90","data-testid":"arrow"})),this.subtitle&&s("p",{class:"item-subtitle flex items-start py-0 px-12 my-0 h-16 caption2"},s("span",{class:"block -mt-4 truncate"},this.subtitle)),this.multiSelect&&s("mx-checkbox",{class:"flex items-stretch w-full overflow-hidden h-48 sm:h-32","label-class":"pl-12 pr-16",checked:this.checked,"label-name":this.checkboxLabel,"label-left":!this.minWidths.sm})),s("slot",{name:"submenu"}))}get element(){return e(this)}};export{m as mx_checkbox,d as mx_icon_button,f as mx_menu,p as mx_menu_item}