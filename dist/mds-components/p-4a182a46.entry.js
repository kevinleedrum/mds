import{r as t,h as s,H as e,g as i,c as h}from"./p-0d0438ba.js";import{p as n}from"./p-0d6b3f5b.js";import{c as r,a as l}from"./p-4689defe.js";import{a as o,b as a}from"./p-d246709d.js";import{M as c,m as u}from"./p-8a252c56.js";import{c as m}from"./p-78de58ad.js";import{a as d}from"./p-3a6987fb.js";const f=class{constructor(s){t(this,s),this.dataAttributes={},this.name="",this.value="",this.labelLeft=!1,this.labelName="",this.labelClass="",this.hideLabel=!1,this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.componentWillRender=n}get checkClass(){let t="flex h-18 w-18 flex-shrink-0";return t+=this.labelLeft?" order-2":" order-1",this.labelLeft&&!this.hideLabel&&(t+=" ml-16"),t}get checkLabelClass(){let t="checkbox-label inline-block";return this.hideLabel&&(t+=" sr-only"),t+=this.labelLeft?" order-1 flex-1":" order-2",this.labelLeft||this.hideLabel||(t+=" ml-16"),t}onInput(t){this.checked=t.target.checked}render(){return s(e,{class:"mx-checkbox inline-flex items-center"},s("label",{class:["relative flex-1 inline-flex flex-nowrap align-center items-center text-4"+(this.disabled?"":" cursor-pointer"),this.labelClass].join(" ")},s("input",Object.assign({class:"absolute h-0 w-0 opacity-0"+(this.indeterminate?" indeterminate":""),type:"checkbox",name:this.name,value:this.value,checked:this.checked,disabled:this.disabled},this.dataAttributes,{onInput:this.onInput.bind(this)})),s("span",{class:this.checkClass}),s("div",{class:this.checkLabelClass,"data-testid":"labelName"},this.labelName)))}get element(){return i(this)}},p=class{constructor(s){t(this,s),this.mxClose=h(this,"mxClose",7),this.mxOpen=h(this,"mxOpen",7),this.placement="bottom-start",this.isOpen=!1}onMenuItemClick(){this.closeMenu()}onClick(t){const s=this.triggerEl||this.anchorEl,e=s&&s.contains(t.target);if(e&&t.preventDefault(),!this.isOpen&&e)this.openMenu(),t.preventDefault();else if(this.isOpen&&this.element&&!this.element.contains(t.target)){if(this.isSubMenu&&e)return;this.closeMenu()}}onDocumentKeyDown(t){if(["Enter"," "].includes(t.key)&&this.anchorEl&&this.anchorEl.contains(t.target))return t.preventDefault(),t.stopPropagation(),void document.activeElement.click();if(this.isOpen)if("Escape"===t.key)this.closeMenu();else if("ArrowDown"===t.key&&this.anchorEl.contains(t.target)){t.preventDefault(),t.stopPropagation();const s=this.menuItems.filter((t=>!t.disabled));s.length&&s[0].focusMenuItem()}}onKeydown(t){if(!this.isOpen)return;if(!["ArrowDown","ArrowUp"].includes(t.key))return;t.preventDefault(),t.stopPropagation();const s=this.menuItems.filter((t=>!t.disabled)),e=s.findIndex((t=>t.contains(document.activeElement)));"ArrowDown"===t.key&&e!==s.length-1?s[e+1].focusMenuItem():"ArrowUp"===t.key&&0!==e&&s[e-1].focusMenuItem()}async openMenu(){if(this.isOpen||!this.anchorEl)return!1;this.isOpen=!0,this.mxOpen.emit();const t=this.offset||(this.isSubMenu?[-8,0]:null);return this.popoverInstance=await r(this.anchorEl,this.element,this.placement,t),await o(this.menuElem,void 0,l(this.popoverInstance.state.placement)),!0}async closeMenu(){return!!this.isOpen&&(this.menuItems.forEach((t=>t.closeSubMenu())),await a(this.menuElem),this.mxClose.emit(),this.isOpen=!1,!this.popoverInstance||(this.popoverInstance.destroy(),this.popoverInstance=null,!0))}connectedCallback(){this.anchorEl&&this.anchorEl.setAttribute("aria-haspopup","true")}componentWillUpdate(){this.menuItems.some((t=>!!t.icon))&&this.menuItems.forEach((t=>{void 0===t.icon&&(t.icon=null)}))}get menuItems(){return Array.from(this.scrollElem.children).filter((t=>"MX-MENU-ITEM"===t.tagName))||[]}get isSubMenu(){return this.element.hasAttribute("slot")&&"submenu"===this.element.getAttribute("slot")}render(){return s(e,{class:"mx-menu block z-50 w-screen sm:w-auto"+(this.isOpen?"":" hidden"),role:"menu"},s("div",{ref:t=>this.menuElem=t,class:"flex flex-col py-8 shadow-9 rounded-lg"},s("div",{ref:t=>this.scrollElem=t,class:"scroll-wrapper overflow-y-auto overflow-x-hidden max-h-216 overscroll-contain"},s("slot",null))))}get element(){return i(this)}},b=class{constructor(s){t(this,s),this.mxClick=h(this,"mxClick",7),this.checked=!1,this.disabled=!1,this.multiSelect=!1,this.minWidths=new c}onMouseEnter(){this.closeSiblingSubMenus(),this.focusMenuItem(),this.submenu&&(clearTimeout(this.submenuDelayTimeout),this.submenuDelayTimeout=setTimeout(this.openSubMenu.bind(this),150))}onMouseLeave(){clearTimeout(this.submenuDelayTimeout),document.activeElement.blur()}onFocus(){this.closeSiblingSubMenus()}onKeyDown(t){if(this.submenu)return this.onKeyDownSubMenu(t);["Enter"," "].includes(t.key)&&(t.preventDefault(),t.stopPropagation(),document.activeElement.click())}componentWillLoad(){this.submenu=this.element.querySelector('[slot="submenu"]')}connectedCallback(){u.subscribeComponent(this)}disconnectedCallback(){u.unsubscribeComponent(this)}async closeSubMenu(){if(this.submenu)return clearTimeout(this.submenuDelayTimeout),await this.submenu.closeMenu()}async focusMenuItem(){if(this.multiSelect){const t=this.menuItemElem.querySelector("mx-checkbox label");t&&t.focus()}else this.menuItemElem.focus()}async onKeyDownSubMenu(t){if(["Enter"," ","ArrowRight"].includes(t.key)){if(t.preventDefault(),t.stopPropagation(),await this.openSubMenu()){const t=this.element.querySelector("mx-menu-item:not(:disabled)");t&&t.focusMenuItem()}}else"ArrowLeft"===t.key&&(t.preventDefault(),t.stopPropagation(),await this.closeSubMenu()?this.focusMenuItem():this.element.parentElement.dispatchEvent(new KeyboardEvent(t.type,t)))}closeSiblingSubMenus(){Array.from(this.element.parentElement.children).filter((t=>t!==this.element&&"MX-MENU-ITEM"===t.tagName)).forEach((t=>t.closeSubMenu()))}openSubMenu(){if(this.submenu)return this.submenu.placement="right-start",this.submenu.anchorEl=this.element,this.submenu.openMenu()}onClick(t){if(this.disabled||this.submenu)return t.stopPropagation(),void t.preventDefault();this.multiSelect||this.mxClick.emit(t)}get checkboxLabel(){return(this.slotWrapper||this.element).innerText}render(){return s(e,{class:"mx-menu-item block"+(this.submenu?" has-submenu":"")},s("div",{ref:t=>this.menuItemElem=t,role:"menuitem","aria-selected":this.checked,"aria-disabled":this.disabled,tabindex:this.disabled||this.multiSelect?"-1":"0",class:"block w-full cursor-pointer select-none text-4 outline-none",onClick:this.onClick.bind(this)},this.label&&s("p",{class:"item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5"},s("span",{class:"block -mb-4"},this.label)),s("div",{class:"flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap"+(this.multiSelect?" hidden":"")},s("div",{class:"flex items-center w-full h-full"},void 0!==this.icon&&s("i",{class:"inline-flex items-center justify-center text-1 w-20 mr-8 "+this.icon}),s("span",{ref:t=>this.slotWrapper=t,class:"overflow-hidden overflow-ellipsis"},s("slot",null))),this.checked&&!this.multiSelect&&s("span",{class:"check ml-12","data-testid":"check",innerHTML:m}),!!this.submenu&&s("span",{class:"transform -rotate-90","data-testid":"arrow",innerHTML:d})),this.multiSelect&&s("mx-checkbox",{class:"flex items-stretch w-full overflow-hidden h-48 sm:h-32","label-class":"pl-12 pr-16",checked:this.checked,"label-name":this.checkboxLabel,"label-left":!this.minWidths.sm})),s("slot",{name:"submenu"}))}get element(){return i(this)}};export{f as mx_checkbox,p as mx_menu,b as mx_menu_item}