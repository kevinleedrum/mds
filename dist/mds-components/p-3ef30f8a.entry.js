import{r as t,h as s,H as i,g as h}from"./p-0d0438ba.js";import{c as e,a as o}from"./p-4689defe.js";import{a,b as n}from"./p-d246709d.js";import{u as r}from"./p-0d6b3f5b.js";const l=class{constructor(s){t(this,s),this.uuid=r(),this.appearDelay=0,this.extended=!1,this.inverted=!1,this.maxWidth="10rem",this.isOpen=!1,this.placement="bottom"}onIsOpenChange(){this.isOpen?this.show():this.hide()}componentDidLoad(){let t=this.element.firstElementChild;t=this.element.firstElementChild.querySelector('button, input, [role="button"]')||t,t.setAttribute("aria-describedby",this.uuid),t.addEventListener("mouseenter",this.show.bind(this)),t.addEventListener("mouseleave",this.hide.bind(this)),-1===t.tabIndex&&(t.tabIndex=0),t.addEventListener("focus",this.show.bind(this)),t.addEventListener("blur",this.hide.bind(this))}async show(){clearTimeout(this.openTimeout),this.isOpen||(this.openTimeout=setTimeout((async()=>{this.isOpen=!0,this.popoverInstance=await e(this.element.firstElementChild,this.tooltipElem,this.placement,[0,4]),a(this.tooltipElem,void 0,o(this.popoverInstance.state.placement))}),this.appearDelay))}async hide(){clearTimeout(this.openTimeout),this.isOpen&&(await n(this.tooltipElem),this.isOpen=!1,this.popoverInstance&&(this.popoverInstance.destroy(),this.popoverInstance=null))}get tooltipClasses(){let t="mx-tooltip caption1 absolute pointer-events-none z-50";return this.isOpen||(t+=" hidden"),this.inverted&&(t+=" inverted"),t+=this.extended?" p-16 rounded-lg shadow-4":" px-12 py-4 rounded-2xl",this.tooltipClass&&(t+=" "+this.tooltipClass),t}render(){return s(i,{class:"inline-block"},s("slot",null),s("div",{ref:t=>this.tooltipElem=t,id:this.uuid,role:"tooltip",class:this.tooltipClasses,style:{maxWidth:this.maxWidth},"data-testid":"tooltip"},s("slot",{name:"tooltip"},this.value)))}get element(){return h(this)}static get watchers(){return{isOpen:["onIsOpenChange"]}}};export{l as mx_tooltip}