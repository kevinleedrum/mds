import{r as s,h as t,H as i,g as e}from"./p-f1ddf482.js";import{p as l}from"./p-f5db2eb6.js";const a=class{constructor(t){s(this,t),this.dataAttributes={},this.name="",this.value="",this.labelClass="",this.labelName="",this.checked=!1,this.disabled=!1,this.componentWillRender=l}onInput(s){this.checked=s.target.checked}get labelClassNames(){let s="relative inline-flex flex-nowrap align-center items-center text-4";return this.disabled||(s+=" cursor-pointer"),this.labelClass&&(s+=" "+this.labelClass),s}render(){return t(i,{class:"mx-radio inline-block"},t("label",{class:this.labelClassNames},t("input",Object.assign({class:"absolute h-0 w-0 opacity-0",type:"radio",name:this.name,value:this.value,checked:this.checked,disabled:this.disabled},this.dataAttributes,{onInput:this.onInput.bind(this)})),t("span",{class:"flex h-20 w-20 flex-shrink-0 rounded-full"+(this.disabled?"":" cursor-pointer")}),t("div",{class:"radio-label ml-16 inline-block","data-testid":"labelName"},this.labelName)))}get element(){return e(this)}};export{a as mx_radio}