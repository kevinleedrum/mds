function t(t,p){const n=p.querySelector(".ripple");n&&n.remove();const o=document.createElement("span");o.classList.add("ripple"),p.prepend(o);const s=Math.max(p.clientWidth,p.clientHeight);o.style.width=o.style.height=s+"px";const c=p.getBoundingClientRect(),e=Math.max(t.clientX-c.left,0),a=Math.max(t.clientY-c.top,0);o.style.left=e-s/2+"px",o.style.top=a-s/2+"px",setTimeout((()=>{o.remove()}),300)}export{t as r}