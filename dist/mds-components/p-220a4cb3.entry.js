import{r as s,h as t,H as i}from"./p-0e08c6b8.js";const h=class{constructor(t){s(this,t),this.type="text",this.dense=!1,this.isActive=!1,this.isFocused=!1,this.outerContainerClass="",this.labelClass="",this.error=!1,this.textarea=!1,this.textareaHeight="250px"}connectedCallback(){this.error?(this.isActive=!0,this.labelClass+=" active error"):this.setLabelClass()}setLabelClass(s){this.labelClass="",(this.leftIcon&&!this.isActive||this.leftIcon&&s&&""===s.value)&&this.setIndentedLabel(),s&&""!==s.value&&(this.labelClass+=" active")}setIndentedLabel(){this.labelClass+=" indented"}makeTypeClass(){return"mx-input-wrapper "+(this.dense?"dense":"standard")}handleFocus(){this.isActive=!0,this.isFocused=!0,this.labelClass=" active focus",this.removeError()}handleBlur(){const s=this.textarea?this.textArea:this.textInput;this.isFocused=!1,this.setLabelClass(s)}focusOnInput(){(this.textarea?this.textArea:this.textInput).focus()}removeError(){this.error=!1,this.containerElem.classList.remove("error")}returnTaHeight(){return{height:this.textareaHeight}}overrideTextArea(){return this.textarea?{alignItems:"start"}:{}}isTextarea(){return this.textarea?"textarea":""}render(){return t(i,{class:"mx-input"},t("div",{class:`${this.makeTypeClass()} ${this.isFocused?"focused":""} ${this.error?"error":""}`,ref:s=>this.containerElem=s},t("div",{class:`mx-input-inner-wrapper ${this.isTextarea()}`,style:this.overrideTextArea()},this.leftIcon&&t("div",{class:"mds-input-left-content"},t("i",{class:this.leftIcon})),this.label&&t("label",{class:this.labelClass,onClick:()=>this.focusOnInput()},this.label),this.textarea?t("textarea",{style:this.returnTaHeight(),name:this.name,onFocus:()=>this.handleFocus(),onBlur:()=>this.handleBlur(),ref:s=>this.textArea=s},this.value):t("div",{class:"mds-input"},t("input",{type:this.type,name:this.name,value:this.value,onFocus:()=>this.handleFocus(),onBlur:()=>this.handleBlur(),ref:s=>this.textInput=s})),(this.rightIcon||this.error)&&t("div",{class:"mds-input-right-content"},t("i",this.error?{class:"ph-warning-circle"}:{class:this.rightIcon})))),this.assistiveText&&t("div",{class:"assistive-text"},this.assistiveText))}};export{h as mx_input}