var t="top",n="bottom",e="right",r="left",o=[t,n,e,r],i=o.reduce((function(t,n){return t.concat([n+"-start",n+"-end"])}),[]),a=[].concat(o,["auto"]).reduce((function(t,n){return t.concat([n,n+"-start",n+"-end"])}),[]),f=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function u(t){return t?(t.nodeName||"").toLowerCase():null}function c(t){if(null==t)return window;if("[object Window]"!==t.toString()){var n=t.ownerDocument;return n&&n.defaultView||window}return t}function p(t){return t instanceof c(t).Element||t instanceof Element}function s(t){return t instanceof c(t).HTMLElement||t instanceof HTMLElement}function d(t){return"undefined"!=typeof ShadowRoot&&(t instanceof c(t).ShadowRoot||t instanceof ShadowRoot)}function l(t){return t.split("-")[0]}function v(t){var n=t.getBoundingClientRect();return{width:n.width,height:n.height,top:n.top,right:n.right,bottom:n.bottom,left:n.left,x:n.left,y:n.top}}function b(t){var n=v(t),e=t.offsetWidth,r=t.offsetHeight;return Math.abs(n.width-e)<=1&&(e=n.width),Math.abs(n.height-r)<=1&&(r=n.height),{x:t.offsetLeft,y:t.offsetTop,width:e,height:r}}function m(t,n){var e=n.getRootNode&&n.getRootNode();if(t.contains(n))return!0;if(e&&d(e)){var r=n;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function h(t){return c(t).getComputedStyle(t)}function y(t){return["table","td","th"].indexOf(u(t))>=0}function g(t){return((p(t)?t.ownerDocument:t.document)||window.document).documentElement}function w(t){return"html"===u(t)?t:t.assignedSlot||t.parentNode||(d(t)?t.host:null)||g(t)}function O(t){return s(t)&&"fixed"!==h(t).position?t.offsetParent:null}function x(t){for(var n=c(t),e=O(t);e&&y(e)&&"static"===h(e).position;)e=O(e);return e&&("html"===u(e)||"body"===u(e)&&"static"===h(e).position)?n:e||function(t){var n=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&s(t)&&"fixed"===h(t).position)return null;for(var e=w(t);s(e)&&["html","body"].indexOf(u(e))<0;){var r=h(e);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||n&&"filter"===r.willChange||n&&r.filter&&"none"!==r.filter)return e;e=e.parentNode}return null}(t)||n}function j(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}var M=Math.max,k=Math.min,P=Math.round;function q(t,n,e){return M(t,k(n,e))}function E(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function B(t,n){return n.reduce((function(n,e){return n[e]=t,n}),{})}var R={top:"auto",right:"auto",bottom:"auto",left:"auto"};function S(o){var i,a=o.popper,f=o.popperRect,u=o.placement,p=o.offsets,s=o.position,d=o.gpuAcceleration,l=o.adaptive,v=o.roundOffsets,b=!0===v?function(t){var n=t.y,e=window.devicePixelRatio||1;return{x:P(P(t.x*e)/e)||0,y:P(P(n*e)/e)||0}}(p):"function"==typeof v?v(p):p,m=b.x,y=void 0===m?0:m,w=b.y,O=void 0===w?0:w,j=p.hasOwnProperty("x"),M=p.hasOwnProperty("y"),k=r,q=t,E=window;if(l){var B=x(a),S="clientHeight",W="clientWidth";B===c(a)&&"static"!==h(B=g(a)).position&&(S="scrollHeight",W="scrollWidth"),B=B,u===t&&(q=n,O-=B[S]-f.height,O*=d?1:-1),u===r&&(k=e,y-=B[W]-f.width,y*=d?1:-1)}var L,T=Object.assign({position:s},l&&R);return Object.assign({},T,d?((L={})[q]=M?"0":"",L[k]=j?"0":"",L.transform=(E.devicePixelRatio||1)<2?"translate("+y+"px, "+O+"px)":"translate3d("+y+"px, "+O+"px, 0)",L):((i={})[q]=M?O+"px":"",i[k]=j?y+"px":"",i.transform="",i))}var W={passive:!0},L={left:"right",right:"left",bottom:"top",top:"bottom"};function T(t){return t.replace(/left|right|bottom|top/g,(function(t){return L[t]}))}var A={start:"end",end:"start"};function H(t){return t.replace(/start|end/g,(function(t){return A[t]}))}function I(t){var n=c(t);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function z(t){return v(g(t)).left+I(t).scrollLeft}function C(t){var n=h(t);return/auto|scroll|overlay|hidden/.test(n.overflow+n.overflowY+n.overflowX)}function D(t){return["html","body","#document"].indexOf(u(t))>=0?t.ownerDocument.body:s(t)&&C(t)?t:D(w(t))}function F(t,n){var e;void 0===n&&(n=[]);var r=D(t),o=r===(null==(e=t.ownerDocument)?void 0:e.body),i=c(r),a=o?[i].concat(i.visualViewport||[],C(r)?r:[]):r,f=n.concat(a);return o?f:f.concat(F(w(a)))}function U(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function V(t,n){return"viewport"===n?U(function(t){var n=c(t),e=g(t),r=n.visualViewport,o=e.clientWidth,i=e.clientHeight,a=0,f=0;return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,f=r.offsetTop)),{width:o,height:i,x:a+z(t),y:f}}(t)):s(n)?function(t){var n=v(t);return n.top=n.top+t.clientTop,n.left=n.left+t.clientLeft,n.bottom=n.top+t.clientHeight,n.right=n.left+t.clientWidth,n.width=t.clientWidth,n.height=t.clientHeight,n.x=n.left,n.y=n.top,n}(n):U(function(t){var n,e=g(t),r=I(t),o=null==(n=t.ownerDocument)?void 0:n.body,i=M(e.scrollWidth,e.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=M(e.scrollHeight,e.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+z(t),u=-r.scrollTop;return"rtl"===h(o||e).direction&&(f+=M(e.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:f,y:u}}(g(t)))}function _(t){return t.split("-")[1]}function G(o){var i,a=o.reference,f=o.element,u=o.placement,c=u?l(u):null,p=u?_(u):null,s=a.x+a.width/2-f.width/2,d=a.y+a.height/2-f.height/2;switch(c){case t:i={x:s,y:a.y-f.height};break;case n:i={x:s,y:a.y+a.height};break;case e:i={x:a.x+a.width,y:d};break;case r:i={x:a.x-f.width,y:d};break;default:i={x:a.x,y:a.y}}var v=c?j(c):null;if(null!=v){var b="y"===v?"height":"width";switch(p){case"start":i[v]=i[v]-(a[b]/2-f[b]/2);break;case"end":i[v]=i[v]+(a[b]/2-f[b]/2)}}return i}function J(r,i){void 0===i&&(i={});var a=i.placement,f=void 0===a?r.placement:a,c=i.boundary,d=void 0===c?"clippingParents":c,l=i.rootBoundary,b=void 0===l?"viewport":l,y=i.elementContext,O=void 0===y?"popper":y,j=i.altBoundary,P=void 0!==j&&j,q=i.padding,R=void 0===q?0:q,S=E("number"!=typeof R?R:B(R,o)),W=r.elements.reference,L=r.rects.popper,T=r.elements[P?"popper"===O?"reference":"popper":O],A=function(t,n,e){var r="clippingParents"===n?function(t){var n=F(w(t)),e=["absolute","fixed"].indexOf(h(t).position)>=0&&s(t)?x(t):t;return p(e)?n.filter((function(t){return p(t)&&m(t,e)&&"body"!==u(t)})):[]}(t):[].concat(n),o=[].concat(r,[e]),i=o.reduce((function(n,e){var r=V(t,e);return n.top=M(r.top,n.top),n.right=k(r.right,n.right),n.bottom=k(r.bottom,n.bottom),n.left=M(r.left,n.left),n}),V(t,o[0]));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}(p(T)?T:T.contextElement||g(r.elements.popper),d,b),H=v(W),I=G({reference:H,element:L,strategy:"absolute",placement:f}),z=U(Object.assign({},L,I)),C="popper"===O?z:H,D={top:A.top-C.top+S.top,bottom:C.bottom-A.bottom+S.bottom,left:A.left-C.left+S.left,right:C.right-A.right+S.right},_=r.modifiersData.offset;if("popper"===O&&_){var J=_[f];Object.keys(D).forEach((function(r){var o=[e,n].indexOf(r)>=0?1:-1,i=[t,n].indexOf(r)>=0?"y":"x";D[r]+=J[i]*o}))}return D}function K(t,n){void 0===n&&(n={});var e=n.boundary,r=n.rootBoundary,f=n.padding,u=n.flipVariations,c=n.allowedAutoPlacements,p=void 0===c?a:c,s=_(n.placement),d=s?u?i:i.filter((function(t){return _(t)===s})):o,v=d.filter((function(t){return p.indexOf(t)>=0}));0===v.length&&(v=d);var b=v.reduce((function(n,o){return n[o]=J(t,{placement:o,boundary:e,rootBoundary:r,padding:f})[l(o)],n}),{});return Object.keys(b).sort((function(t,n){return b[t]-b[n]}))}function N(t,n,e){return void 0===e&&(e={x:0,y:0}),{top:t.top-n.height-e.y,right:t.right-n.width+e.x,bottom:t.bottom-n.height+e.y,left:t.left-n.width-e.x}}function Q(o){return[t,e,n,r].some((function(t){return o[t]>=0}))}function X(t,n,e){void 0===e&&(e=!1);var r,o,i=g(n),a=v(t),f=s(n),p={scrollLeft:0,scrollTop:0},d={x:0,y:0};return(f||!f&&!e)&&(("body"!==u(n)||C(i))&&(p=(r=n)!==c(r)&&s(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:I(r)),s(n)?((d=v(n)).x+=n.clientLeft,d.y+=n.clientTop):i&&(d.x=z(i))),{x:a.left+p.scrollLeft-d.x,y:a.top+p.scrollTop-d.y,width:a.width,height:a.height}}function Y(t){var n=new Map,e=new Set,r=[];function o(t){e.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!e.has(t)){var r=n.get(t);r&&o(r)}})),r.push(t)}return t.forEach((function(t){n.set(t.name,t)})),t.forEach((function(t){e.has(t.name)||o(t)})),r}var Z={placement:"bottom",modifiers:[],strategy:"absolute"};function $(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return!n.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function tt(t){void 0===t&&(t={});var n=t.defaultModifiers,e=void 0===n?[]:n,r=t.defaultOptions,o=void 0===r?Z:r;return function(t,n,r){void 0===r&&(r=o);var i,a,u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Z,o),modifiersData:{},elements:{reference:t,popper:n},attributes:{},styles:{}},c=[],s=!1,d={state:u,setOptions:function(r){l(),u.options=Object.assign({},o,u.options,r),u.scrollParents={reference:p(t)?F(t):t.contextElement?F(t.contextElement):[],popper:F(n)};var i,a,s=function(t){var n=Y(t);return f.reduce((function(t,e){return t.concat(n.filter((function(t){return t.phase===e})))}),[])}((i=[].concat(e,u.options.modifiers),a=i.reduce((function(t,n){var e=t[n.name];return t[n.name]=e?Object.assign({},e,n,{options:Object.assign({},e.options,n.options),data:Object.assign({},e.data,n.data)}):n,t}),{}),Object.keys(a).map((function(t){return a[t]}))));return u.orderedModifiers=s.filter((function(t){return t.enabled})),u.orderedModifiers.forEach((function(t){var n=t.options,e=t.effect;if("function"==typeof e){var r=e({state:u,name:t.name,instance:d,options:void 0===n?{}:n});c.push(r||function(){})}})),d.update()},forceUpdate:function(){if(!s){var t=u.elements,n=t.reference,e=t.popper;if($(n,e)){u.rects={reference:X(n,x(e),"fixed"===u.options.strategy),popper:b(e)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach((function(t){return u.modifiersData[t.name]=Object.assign({},t.data)}));for(var r=0;r<u.orderedModifiers.length;r++)if(!0!==u.reset){var o=u.orderedModifiers[r],i=o.fn,a=o.options;"function"==typeof i&&(u=i({state:u,options:void 0===a?{}:a,name:o.name,instance:d})||u)}else u.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(t){d.forceUpdate(),t(u)}))},function(){return a||(a=new Promise((function(t){Promise.resolve().then((function(){a=void 0,t(i())}))}))),a}),destroy:function(){l(),s=!0}};if(!$(t,n))return d;function l(){c.forEach((function(t){return t()})),c=[]}return d.setOptions(r).then((function(t){!s&&r.onFirstUpdate&&r.onFirstUpdate(t)})),d}}var nt=tt({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var n=t.state,e=t.instance,r=t.options,o=r.scroll,i=void 0===o||o,a=r.resize,f=void 0===a||a,u=c(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return i&&p.forEach((function(t){t.addEventListener("scroll",e.update,W)})),f&&u.addEventListener("resize",e.update,W),function(){i&&p.forEach((function(t){t.removeEventListener("scroll",e.update,W)})),f&&u.removeEventListener("resize",e.update,W)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var n=t.state;n.modifiersData[t.name]=G({reference:n.rects.reference,element:n.rects.popper,strategy:"absolute",placement:n.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var n=t.state,e=t.options,r=e.gpuAcceleration,o=void 0===r||r,i=e.adaptive,a=void 0===i||i,f=e.roundOffsets,u=void 0===f||f,c={placement:l(n.placement),popper:n.elements.popper,popperRect:n.rects.popper,gpuAcceleration:o};null!=n.modifiersData.popperOffsets&&(n.styles.popper=Object.assign({},n.styles.popper,S(Object.assign({},c,{offsets:n.modifiersData.popperOffsets,position:n.options.strategy,adaptive:a,roundOffsets:u})))),null!=n.modifiersData.arrow&&(n.styles.arrow=Object.assign({},n.styles.arrow,S(Object.assign({},c,{offsets:n.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),n.attributes.popper=Object.assign({},n.attributes.popper,{"data-popper-placement":n.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var n=t.state;Object.keys(n.elements).forEach((function(t){var e=n.styles[t]||{},r=n.attributes[t]||{},o=n.elements[t];s(o)&&u(o)&&(Object.assign(o.style,e),Object.keys(r).forEach((function(t){var n=r[t];!1===n?o.removeAttribute(t):o.setAttribute(t,!0===n?"":n)})))}))},effect:function(t){var n=t.state,e={popper:{position:n.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(n.elements.popper.style,e.popper),n.styles=e,n.elements.arrow&&Object.assign(n.elements.arrow.style,e.arrow),function(){Object.keys(n.elements).forEach((function(t){var r=n.elements[t],o=n.attributes[t]||{},i=Object.keys(n.styles.hasOwnProperty(t)?n.styles[t]:e[t]).reduce((function(t,n){return t[n]="",t}),{});s(r)&&u(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(t){r.removeAttribute(t)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(n){var o=n.state,i=n.name,f=n.options.offset,u=void 0===f?[0,0]:f,c=a.reduce((function(n,i){return n[i]=function(n,o,i){var a=l(n),f=[r,t].indexOf(a)>=0?-1:1,u="function"==typeof i?i(Object.assign({},o,{placement:n})):i,c=u[0],p=u[1];return c=c||0,p=(p||0)*f,[r,e].indexOf(a)>=0?{x:p,y:c}:{x:c,y:p}}(i,o.rects,u),n}),{}),p=c[o.placement],s=p.y;null!=o.modifiersData.popperOffsets&&(o.modifiersData.popperOffsets.x+=p.x,o.modifiersData.popperOffsets.y+=s),o.modifiersData[i]=c}},{name:"flip",enabled:!0,phase:"main",fn:function(o){var i=o.state,a=o.options,f=o.name;if(!i.modifiersData[f]._skip){for(var u=a.mainAxis,c=void 0===u||u,p=a.altAxis,s=void 0===p||p,d=a.fallbackPlacements,v=a.padding,b=a.boundary,m=a.rootBoundary,h=a.altBoundary,y=a.flipVariations,g=void 0===y||y,w=a.allowedAutoPlacements,O=i.options.placement,x=l(O),j=d||(x!==O&&g?function(t){if("auto"===l(t))return[];var n=T(t);return[H(t),n,H(n)]}(O):[T(O)]),M=[O].concat(j).reduce((function(t,n){return t.concat("auto"===l(n)?K(i,{placement:n,boundary:b,rootBoundary:m,padding:v,flipVariations:g,allowedAutoPlacements:w}):n)}),[]),k=i.rects.reference,P=i.rects.popper,q=new Map,E=!0,B=M[0],R=0;R<M.length;R++){var S=M[R],W=l(S),L="start"===_(S),A=[t,n].indexOf(W)>=0,I=A?"width":"height",z=J(i,{placement:S,boundary:b,rootBoundary:m,altBoundary:h,padding:v}),C=A?L?e:r:L?n:t;k[I]>P[I]&&(C=T(C));var D=T(C),F=[];if(c&&F.push(z[W]<=0),s&&F.push(z[C]<=0,z[D]<=0),F.every((function(t){return t}))){B=S,E=!1;break}q.set(S,F)}if(E)for(var U=function(t){var n=M.find((function(n){var e=q.get(n);if(e)return e.slice(0,t).every((function(t){return t}))}));if(n)return B=n,"break"},V=g?3:1;V>0&&"break"!==U(V);V--);i.placement!==B&&(i.modifiersData[f]._skip=!0,i.placement=B,i.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(o){var i=o.state,a=o.options,f=o.name,u=a.mainAxis,c=void 0===u||u,p=a.altAxis,s=void 0!==p&&p,d=a.tether,v=void 0===d||d,m=a.tetherOffset,h=void 0===m?0:m,y=J(i,{boundary:a.boundary,rootBoundary:a.rootBoundary,padding:a.padding,altBoundary:a.altBoundary}),g=l(i.placement),w=_(i.placement),O=!w,P=j(g),E="x"===P?"y":"x",B=i.modifiersData.popperOffsets,R=i.rects.reference,S=i.rects.popper,W="function"==typeof h?h(Object.assign({},i.rects,{placement:i.placement})):h,L={x:0,y:0};if(B){if(c||s){var T="y"===P?t:r,A="y"===P?n:e,H="y"===P?"height":"width",I=B[P],z=B[P]+y[T],C=B[P]-y[A],D=v?-S[H]/2:0,F="start"===w?R[H]:S[H],U="start"===w?-S[H]:-R[H],V=i.elements.arrow,G=v&&V?b(V):{width:0,height:0},K=i.modifiersData["arrow#persistent"]?i.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},N=K[T],Q=K[A],X=q(0,R[H],G[H]),Y=O?R[H]/2-D-X-N-W:F-X-N-W,Z=O?-R[H]/2+D+X+Q+W:U+X+Q+W,$=i.elements.arrow&&x(i.elements.arrow),tt=i.modifiersData.offset?i.modifiersData.offset[i.placement][P]:0,nt=B[P]+Y-tt-($?"y"===P?$.clientTop||0:$.clientLeft||0:0),et=B[P]+Z-tt;if(c){var rt=q(v?k(z,nt):z,I,v?M(C,et):C);B[P]=rt,L[P]=rt-I}if(s){var ot=B[E],it=ot+y["x"===P?t:r],at=ot-y["x"===P?n:e],ft=q(v?k(it,nt):it,ot,v?M(at,et):at);B[E]=ft,L[E]=ft-ot}}i.modifiersData[f]=L}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(i){var a,f=i.state,u=i.name,c=i.options,p=f.elements.arrow,s=f.modifiersData.popperOffsets,d=l(f.placement),v=j(d),m=[r,e].indexOf(d)>=0?"height":"width";if(p&&s){var h=function(t,n){return E("number"!=typeof(t="function"==typeof t?t(Object.assign({},n.rects,{placement:n.placement})):t)?t:B(t,o))}(c.padding,f),y=b(p),g="y"===v?t:r,w="y"===v?n:e,O=f.rects.reference[m]+f.rects.reference[v]-s[v]-f.rects.popper[m],M=s[v]-f.rects.reference[v],k=x(p),P=k?"y"===v?k.clientHeight||0:k.clientWidth||0:0,R=P/2-y[m]/2+(O/2-M/2),S=q(h[g],R,P-y[m]-h[w]);f.modifiersData[u]=((a={})[v]=S,a.centerOffset=S-R,a)}},effect:function(t){var n=t.state,e=t.options.element,r=void 0===e?"[data-popper-arrow]":e;null!=r&&("string"!=typeof r||(r=n.elements.popper.querySelector(r)))&&m(n.elements.popper,r)&&(n.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var n=t.state,e=t.name,r=n.rects.reference,o=n.rects.popper,i=n.modifiersData.preventOverflow,a=J(n,{elementContext:"reference"}),f=J(n,{altBoundary:!0}),u=N(a,r),c=N(f,o,i),p=Q(u),s=Q(c);n.modifiersData[e]={referenceClippingOffsets:u,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:s},n.attributes.popper=Object.assign({},n.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":s})}}]});async function et(t,n,e,r){"componentOnReady"in n&&await n.componentOnReady();const o=nt(t,n,{placement:e,modifiers:rt(e,r),strategy:"fixed"});return new Promise((t=>{requestAnimationFrame((()=>{o.update(),t(o)}))}))}function rt(t,n){const e=[{name:"flip",options:{fallbackPlacements:[it(t),"auto"],boundary:document.body}},{name:"preventOverflow",options:{padding:{top:32,bottom:32},boundary:document.body}}];return n&&e.push({name:"offset",options:{offset:n}}),e}function ot(t){return{"bottom-end":"top right","bottom-start":"top left",bottom:"top","left-end":"bottom right","left-start":"top right",left:"right","right-end":"bottom left","right-start":"top left",right:"left","top-end":"bottom right","top-start":"bottom left",top:"bottom"}[t]||"center"}function it(t){return t.replace(/start|end/g,(t=>"start"===t?"end":"start"))}export{ot as a,et as c}