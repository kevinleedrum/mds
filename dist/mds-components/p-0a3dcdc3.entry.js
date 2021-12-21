import{r as t,h as e,H as s,g as i}from"./p-3fc6e8e8.js";const l=44,r=(l-3.6)/2,n=2*Math.PI*r,a=class{constructor(e){t(this,e),this.value=null,this.size="3rem",this.appearDelay=0}connectedCallback(){this.appearDelay&&(this.element.classList.remove("block"),this.element.classList.add("hidden"),this.delayTimeout=setTimeout((()=>{this.element.classList.remove("hidden"),this.element.classList.add("block")}),this.appearDelay))}disconnectedCallback(){clearTimeout(this.delayTimeout)}get hostStyle(){const t={width:this.size,height:this.size};return null!=this.value?t.transform="rotate(-90deg)":t.animation="spin 1.4s linear infinite",t}get circleStyle(){const t={stroke:"currentColor"};return null!=this.value?(t.transition="stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)",t.strokeDasharray=n.toFixed(3),t.strokeDashoffset=((100-this.value)/100*n).toFixed(3)+"px"):(t.strokeDasharray="80px, 200px",t.strokeDashoffset="0",t.animation="indeterminate 1.4s ease-in-out infinite"),t}render(){return e(s,{style:this.hostStyle,class:"mx-circular-progress inline-block pointer-events-none",role:"progressbar","aria-valuenow":null!=this.value?Math.round(this.value):null,"aria-valuemin":null!=this.value?0:null,"aria-valuemax":null!=this.value?100:null},e("div",{class:"flex items-center justify-center relative h-full p-2"},e("svg",{class:"absolute",viewBox:[l/2,l/2,l,l].join(" ")},e("circle",{style:this.circleStyle,cx:l,cy:l,r,"stroke-width":3.6,fill:"none"}))))}get element(){return i(this)}};export{a as mx_circular_progress}