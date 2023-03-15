var t,n=[],e="ResizeObserver loop completed with undelivered notifications.";!function(t){t.BORDER_BOX="border-box",t.CONTENT_BOX="content-box",t.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"}(t||(t={}));var i,r=function(t){return Object.freeze(t)},o=function(t,n){this.inlineSize=t,this.blockSize=n,r(this)},u=function(){function t(t,n,e,i){return this.x=t,this.y=n,this.width=e,this.height=i,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,r(this)}return t.prototype.toJSON=function(){var t=this;return{x:t.x,y:t.y,top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.width,height:t.height}},t.fromRect=function(n){return new t(n.x,n.y,n.width,n.height)},t}(),s=function(t){return t instanceof SVGElement&&"getBBox"in t},c=function(t){if(s(t)){var n=t.getBBox();return!n.width&&!n.height}return!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)},a=function(t){var n;if(t instanceof Element)return!0;var e=null===(n=null==t?void 0:t.ownerDocument)||void 0===n?void 0:n.defaultView;return!!(e&&t instanceof e.Element)},f="undefined"!=typeof window?window:{},h=new WeakMap,v=/auto|scroll/,d=/^tb|vertical/,l=/msie|trident/i.test(f.navigator&&f.navigator.userAgent),w=function(t){return parseFloat(t||"0")},b=function(t,n,e){return void 0===t&&(t=0),void 0===n&&(n=0),void 0===e&&(e=!1),new o((e?n:t)||0,(e?t:n)||0)},p=r({devicePixelContentBoxSize:b(),borderBoxSize:b(),contentBoxSize:b(),contentRect:new u(0,0,0,0)}),m=function(t,n){if(void 0===n&&(n=!1),h.has(t)&&!n)return h.get(t);if(c(t))return h.set(t,p),p;var e=getComputedStyle(t),i=s(t)&&t.ownerSVGElement&&t.getBBox(),o=!l&&"border-box"===e.boxSizing,a=d.test(e.writingMode||""),f=!i&&v.test(e.overflowY||""),m=!i&&v.test(e.overflowX||""),x=i?0:w(e.paddingTop),y=i?0:w(e.paddingRight),E=i?0:w(e.paddingBottom),z=i?0:w(e.paddingLeft),O=i?0:w(e.borderTopWidth),R=i?0:w(e.borderRightWidth),S=i?0:w(e.borderBottomWidth),g=z+y,B=x+E,M=(i?0:w(e.borderLeftWidth))+R,F=O+S,T=m?t.offsetHeight-F-t.clientHeight:0,k=f?t.offsetWidth-M-t.clientWidth:0,C=o?g+M:0,D=o?B+F:0,A=i?i.width:w(e.width)-C-k,I=i?i.height:w(e.height)-D-T,P=A+g+k+M,q=I+B+T+F,V=r({devicePixelContentBoxSize:b(Math.round(A*devicePixelRatio),Math.round(I*devicePixelRatio),a),borderBoxSize:b(P,q,a),contentBoxSize:b(A,I,a),contentRect:new u(z,x,A,I)});return h.set(t,V),V},x=function(n,e,i){var r=m(n,i),o=r.borderBoxSize,u=r.contentBoxSize,s=r.devicePixelContentBoxSize;switch(e){case t.DEVICE_PIXEL_CONTENT_BOX:return s;case t.BORDER_BOX:return o;default:return u}},y=function(t){var n=m(t);this.target=t,this.contentRect=n.contentRect,this.borderBoxSize=r([n.borderBoxSize]),this.contentBoxSize=r([n.contentBoxSize]),this.devicePixelContentBoxSize=r([n.devicePixelContentBoxSize])},E=function(t){if(c(t))return 1/0;for(var n=0,e=t.parentNode;e;)n+=1,e=e.parentNode;return n},z=function(){var t=1/0,e=[];n.forEach((function(n){if(0!==n.activeTargets.length){var i=[];n.activeTargets.forEach((function(n){var e=new y(n.target),r=E(n.target);i.push(e),n.lastReportedSize=x(n.target,n.observedBox),r<t&&(t=r)})),e.push((function(){n.callback.call(n.observer,i,n.observer)})),n.activeTargets.splice(0,n.activeTargets.length)}}));for(var i=0,r=e;i<r.length;i++)(0,r[i])();return t},O=function(t){n.forEach((function(n){n.activeTargets.splice(0,n.activeTargets.length),n.skippedTargets.splice(0,n.skippedTargets.length),n.observationTargets.forEach((function(e){e.isActive()&&(E(e.target)>t?n.activeTargets.push(e):n.skippedTargets.push(e))}))}))},R=[],S=0,g={attributes:!0,characterData:!0,childList:!0,subtree:!0},B=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],M=function(t){return void 0===t&&(t=0),Date.now()+t},F=!1,T=new(function(){function t(){var t=this;this.stopped=!0,this.listener=function(){return t.schedule()}}return t.prototype.run=function(t){var r=this;if(void 0===t&&(t=250),!F){F=!0;var o,u=M(t);o=function(){var i=!1;try{i=function(){var t,i=0;for(O(i);n.some((function(t){return t.activeTargets.length>0}));)i=z(),O(i);return n.some((function(t){return t.skippedTargets.length>0}))&&("function"==typeof ErrorEvent?t=new ErrorEvent("error",{message:e}):((t=document.createEvent("Event")).initEvent("error",!1,!1),t.message=e),window.dispatchEvent(t)),i>0}()}finally{if(F=!1,t=u-M(),!S)return;i?r.run(1e3):t>0?r.run(t):r.start()}},function(t){if(!i){var n=0,e=document.createTextNode("");new MutationObserver((function(){return R.splice(0).forEach((function(t){return t()}))})).observe(e,{characterData:!0}),i=function(){e.textContent="".concat(n?n--:n++)}}R.push(t),i()}((function(){requestAnimationFrame(o)}))}},t.prototype.schedule=function(){this.stop(),this.run()},t.prototype.observe=function(){var t=this,n=function(){return t.observer&&t.observer.observe(document.body,g)};document.body?n():f.addEventListener("DOMContentLoaded",n)},t.prototype.start=function(){var t=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),B.forEach((function(n){return f.addEventListener(n,t.listener,!0)})))},t.prototype.stop=function(){var t=this;this.stopped||(this.observer&&this.observer.disconnect(),B.forEach((function(n){return f.removeEventListener(n,t.listener,!0)})),this.stopped=!0)},t}()),k=function(t){!S&&t>0&&T.start(),!(S+=t)&&T.stop()},C=function(){function n(n,e){this.target=n,this.observedBox=e||t.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return n.prototype.isActive=function(){var t,n=x(this.target,this.observedBox,!0);return s(t=this.target)||function(t){switch(t.tagName){case"INPUT":if("image"!==t.type)break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1}(t)||"inline"!==getComputedStyle(t).display||(this.lastReportedSize=n),this.lastReportedSize.inlineSize!==n.inlineSize||this.lastReportedSize.blockSize!==n.blockSize},n}(),D=function(t,n){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=t,this.callback=n},A=new WeakMap,I=function(t,n){for(var e=0;e<t.length;e+=1)if(t[e].target===n)return e;return-1},P=function(){function t(){}return t.connect=function(t,n){var e=new D(t,n);A.set(t,e)},t.observe=function(t,e,i){var r=A.get(t),o=0===r.observationTargets.length;I(r.observationTargets,e)<0&&(o&&n.push(r),r.observationTargets.push(new C(e,i&&i.box)),k(1),T.schedule())},t.unobserve=function(t,e){var i=A.get(t),r=I(i.observationTargets,e);r>=0&&(1===i.observationTargets.length&&n.splice(n.indexOf(i),1),i.observationTargets.splice(r,1),k(-1))},t.disconnect=function(t){var n=this,e=A.get(t);e.observationTargets.slice().forEach((function(e){return n.unobserve(t,e.target)})),e.activeTargets.splice(0,e.activeTargets.length)},t}(),q=function(){function t(t){if(0===arguments.length)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if("function"!=typeof t)throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");P.connect(this,t)}return t.prototype.observe=function(t,n){if(0===arguments.length)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!a(t))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");P.observe(this,t,n)},t.prototype.unobserve=function(t){if(0===arguments.length)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!a(t))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");P.unobserve(this,t)},t.prototype.disconnect=function(){P.disconnect(this)},t.toString=function(){return"function ResizeObserver () { [polyfill code] }"},t}();export{q as R}