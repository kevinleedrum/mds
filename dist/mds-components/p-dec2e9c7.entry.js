import{r as s,h as t,H as e,g as i}from"./p-0d0438ba.js";import{p as r}from"./p-0d6b3f5b.js";const a=class{constructor(t){s(this,t),this.dataAttributes={},this.name="",this.value="",this.labelName="",this.checked=!1,this.componentWillRender=r}onInput(s){this.checked=s.target.checked}render(){return t(e,{class:"mx-radio"},t("label",{class:"relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4"},t("input",Object.assign({class:"absolute h-0 w-0 opacity-0",type:"radio",name:this.name,value:this.value,checked:this.checked},this.dataAttributes,{onInput:this.onInput.bind(this)})),t("span",{class:"flex h-20 w-20 cursor-pointer flex-shrink-0 rounded-full"}),t("div",{class:"ml-16 inline-block","data-testid":"labelName"},this.labelName)))}get element(){return i(this)}};export{a as mx_radio}