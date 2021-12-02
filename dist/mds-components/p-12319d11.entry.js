import{r as t,h as s,H as e}from"./p-70d5d065.js";import{a as i}from"./p-3a6987fb.js";const n=class{constructor(s){t(this,s),this.dense=!1,this.elevated=!1,this.flat=!1,this.isFocused=!1}async onClick(t){this.menu.style.width=this.dropdownWrapper.getBoundingClientRect().width+"px";const s=t.target.closest("mx-menu-item");s&&(this.value=await s.getValue(),this.inputElem.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})))}componentDidLoad(){this.updateInputValue(),this.menu.anchorEl=this.dropdownWrapper}onValueChange(){this.updateInputValue()}onBlur(){this.menu&&this.menu.isOpen||(this.isFocused=!1)}onFocus(){this.isFocused=!0}onMenuClose(){this.inputElem.contains(document.activeElement)||(this.isFocused=!1)}updateInputValue(){this.inputElem.value=this.value}get dropdownWrapperClass(){let t="dropdown-wrapper flex items-center relative rounded-lg";return t+=this.dense?" h-36":" h-48",this.elevated&&(t+=" elevated shadow-1"),this.flat&&(t+=" flat"),t+=this.isFocused?" focused border-2":" border",t}get inputClass(){let t="absolute inset-0 w-full h-full pl-16 overflow-hidden outline-none appearance-none select-none bg-transparent cursor-pointer disabled:cursor-auto";return this.isFocused&&(t+=" -ml-1"),t}get suffixClass(){let t="icon-suffix absolute flex items-center h-full right-16 space-x-8 pointer-events-none";return this.isFocused&&(t+=" -mr-1"),t}render(){return s(e,{class:"mx-dropdown-menu"},s("div",{ref:t=>this.dropdownWrapper=t,class:this.dropdownWrapperClass},s("input",{"aria-label":this.ariaLabel||this.label,class:this.inputClass,id:this.dropdownId,name:this.name,onBlur:this.onBlur.bind(this),onFocus:this.onFocus.bind(this),placeholder:this.label,readonly:!0,ref:t=>this.inputElem=t,tabindex:"0",type:"text"}),s("span",{class:this.suffixClass},this.suffix&&s("span",{class:"suffix flex items-center h-full px-4"},this.suffix),s("span",{"data-testid":"arrow",innerHTML:i}))),s("mx-menu",{ref:t=>this.menu=t,placement:"bottom",offset:[0,1],onMxClose:this.onMenuClose.bind(this)},s("slot",null)))}static get watchers(){return{value:["onValueChange"]}}};export{n as mx_dropdown_menu}