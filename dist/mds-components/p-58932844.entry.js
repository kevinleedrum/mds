import{r as t,h as s,H as e}from"./p-0d0438ba.js";import{a as i}from"./p-3a6987fb.js";import{w as a}from"./p-dcb2b381.js";import{u as r}from"./p-61d8aa18.js";import{r as l}from"./p-80b3e177.js";const h=class{constructor(s){t(this,s),this.uuid=r(),this.dense=!1,this.disabled=!1,this.elevated=!1,this.flat=!1,this.floatLabel=!1,this.error=!1,this.labelClass="",this.isFocused=!1}componentDidLoad(){this.updateSelectValue()}onValueChange(){this.updateSelectValue()}updateSelectValue(){this.selectElem.value=this.value}onFocus(){this.isFocused=!0,this.error=!1}onBlur(){this.isFocused=!1}get hasValue(){return null!==this.value&&""!==this.value&&void 0!==this.value}get selectWrapperClass(){let t="mx-select-wrapper flex items-center relative border rounded-lg";return t+=this.dense?" h-36":" h-48",this.elevated&&(t+=" elevated shadow-1"),this.flat&&(t+=" flat"),(this.error||this.isFocused)&&(t+=" border-2"),this.error&&(t+=" error"),this.disabled&&(t+=" disabled"),t}get selectClass(){let t="absolute inset-0 w-full pl-16 overflow-hidden outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-auto";return this.isFocused&&(t+=" -m-1"),t}get labelClassNames(){let t="block pointer-events-none";return this.floatLabel?(t+=" absolute mt-0 left-12 px-4",this.dense&&(t+=" dense text-4"),(this.isFocused||this.hasValue)&&(t+=" floating"),this.isFocused&&(t+=" -ml-1")):t+=" subtitle2 mb-4",t+" "+this.labelClass}get iconSuffixClass(){let t="icon-suffix absolute flex items-center h-full right-16 space-x-8 pointer-events-none";return this.isFocused&&(t+=" -mr-1"),t}get iconEl(){let t=s("span",{"data-testid":"arrow",innerHTML:i});return this.error&&(t=s("span",{"data-testid":"error-icon",innerHTML:a})),t}render(){const t=s("label",{htmlFor:this.selectId||this.uuid,class:this.labelClassNames},this.label);return s(e,{class:"mx-select"+(this.disabled?" disabled":"")},this.label&&!this.floatLabel&&t,s("div",{"data-testid":"select-wrapper",class:this.selectWrapperClass},s("select",{"aria-label":this.label||this.ariaLabel,class:this.selectClass,disabled:this.disabled,id:this.selectId||this.uuid,name:this.name,onFocus:this.onFocus.bind(this),onBlur:this.onBlur.bind(this),ref:t=>this.selectElem=t},s("slot",null)),this.label&&this.floatLabel&&t,s("span",{class:this.iconSuffixClass},this.suffix&&s("span",{class:"suffix flex items-center h-full px-4"},this.suffix),this.iconEl)),this.assistiveText&&s("div",{class:"assistive-text caption1 mt-4 ml-16"},this.assistiveText))}static get watchers(){return{value:["onValueChange"]}}},n=class{constructor(s){t(this,s),this.label="",this.ariaLabel="",this.icon="",this.selected=!1,this.badge=!1,this.badgeClass=""}componentDidLoad(){if(!this.label&&!this.ariaLabel)throw new Error("Please provide either a label or an aria-label for each tab.")}onClick(t){l(t,this.btnElem)}get tabClass(){let t="mx-tab relative inline-flex items-center justify-center min-w-full";return t+=this.label&&this.icon?" h-72":" h-48",this.badge&&this.label&&(t+=" wider"),t}get badgeEl(){return s("mx-badge",{indicator:!0,badgeClass:["w-8 h-8",this.badgeClass].join(" ")})}get isTextOnly(){return this.label&&!this.icon}render(){return s(e,{class:this.tabClass},s("button",{ref:t=>this.btnElem=t,role:"tab",type:"button","aria-selected":this.selected,"aria-label":this.label||this.ariaLabel,class:"relative overflow-hidden w-full h-full border border-transparent",onClick:this.onClick.bind(this)},s("div",{class:"relative flex flex-col items-center justify-center space-y-6 pointer-events-none"},!this.isTextOnly&&s("span",{class:"flex items-center space-x-6"},!this.label&&this.badge&&this.badgeEl,this.icon&&s("i",{class:this.icon+" text-1"+(this.label?"":" icon-only")})),this.label&&s("span",{class:"flex items-center uppercase text-4 font-semibold leading-4 tracking-1-25 space-x-6"},this.badge&&this.badgeEl,s("span",null,this.label)))),s("span",{class:"active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none"+(this.selected?"":" opacity-0")}))}};export{h as mx_select,n as mx_tab}