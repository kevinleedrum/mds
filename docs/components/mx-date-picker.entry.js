import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './_commonjsHelpers-8fe71198.js';
import { c as createPopover } from './popover-a2a2acc7.js';
import { u as uuidv4, p as propagateDataAttributes, i as isDateObject } from './utils-eee50014.js';
import { f as fadeIn, b as fadeOut } from './transitions-29f7f3e5.js';

var datepicker_min = createCommonjsModule(function (module, exports) {
!function(e,t){"object"=='object'&&"object"=='object'?module.exports=t():"function"==typeof undefined&&undefined.amd?undefined([],t):"object"=='object'?exports.datepicker=t():e.datepicker=t();}(window,(function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var a=[],r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=["January","February","March","April","May","June","July","August","September","October","November","December"],o={t:"top",r:"right",b:"bottom",l:"left",c:"centered"};function s(){}var l=["click","focusin","keydown","input"];function d(e){l.forEach((function(t){e.addEventListener(t,e===document?L:Y);}));}function c(e){return Array.isArray(e)?e.map(c):"[object Object]"===x(e)?Object.keys(e).reduce((function(t,n){return t[n]=c(e[n]),t}),{}):e}function u(e,t){var n=e.calendar.querySelector(".qs-overlay"),a=n&&!n.classList.contains("qs-hidden");t=t||new Date(e.currentYear,e.currentMonth),e.calendar.innerHTML=[h(t,e,a),f(t,e,a),v(e,a)].join(""),a&&window.requestAnimationFrame((function(){M(!0,e);}));}function h(e,t,n){return ['<div class="qs-controls'+(n?" qs-blur":"")+'">','<div class="qs-arrow qs-left"></div>','<div class="qs-month-year">','<span class="qs-month">'+t.months[e.getMonth()]+"</span>",'<span class="qs-year">'+e.getFullYear()+"</span>","</div>",'<div class="qs-arrow qs-right"></div>',"</div>"].join("")}function f(e,t,n){var a=t.currentMonth,r=t.currentYear,i=t.dateSelected,o=t.maxDate,s=t.minDate,l=t.showAllDates,d=t.days,c=t.disabledDates,u=t.startDay,h=t.weekendIndices,f=t.events,v=t.getRange?t.getRange():{},m=+v.start,y=+v.end,p=g(new Date(e).setDate(1)),w=p.getDay()-u,D=w<0?7:0;p.setMonth(p.getMonth()+1),p.setDate(0);var b=p.getDate(),q=[],S=D+7*((w+b)/7|0);S+=(w+b)%7?7:0;for(var M=1;M<=S;M++){var E=(M-1)%7,x=d[E],C=M-(w>=0?w:7+w),L=new Date(r,a,C),Y=f[+L],j=C<1||C>b,P=j?C<1?-1:1:0,k=j&&!l,O=k?"":L.getDate(),N=+L==+i,_=E===h[0]||E===h[1],I=m!==y,A="qs-square "+x;Y&&!k&&(A+=" qs-event"),j&&(A+=" qs-outside-current-month"),!l&&j||(A+=" qs-num"),N&&(A+=" qs-active"),(c[+L]||t.disabler(L)||_&&t.noWeekends||s&&+L<+s||o&&+L>+o)&&!k&&(A+=" qs-disabled"),+g(new Date)==+L&&(A+=" qs-current"),+L===m&&y&&I&&(A+=" qs-range-start"),+L>m&&+L<y&&(A+=" qs-range-middle"),+L===y&&m&&I&&(A+=" qs-range-end"),k&&(A+=" qs-empty",O=""),q.push('<div class="'+A+'" data-direction="'+P+'">'+O+"</div>");}var R=d.map((function(e){return '<div class="qs-square qs-day">'+e+"</div>"})).concat(q);return R.unshift('<div class="qs-squares'+(n?" qs-blur":"")+'">'),R.push("</div>"),R.join("")}function v(e,t){var n=e.overlayPlaceholder,a=e.overlayButton;return ['<div class="qs-overlay'+(t?"":" qs-hidden")+'">',"<div>",'<input class="qs-overlay-year" placeholder="'+n+'" inputmode="numeric" />','<div class="qs-close">&#10005;</div>',"</div>",'<div class="qs-overlay-month-container">'+e.overlayMonths.map((function(e,t){return '<div class="qs-overlay-month" data-month-num="'+t+'">'+e+"</div>"})).join("")+"</div>",'<div class="qs-submit qs-disabled">'+a+"</div>","</div>"].join("")}function m(e,t,n){var a=t.el,r=t.calendar.querySelector(".qs-active"),i=e.textContent,o=t.sibling;(a.disabled||a.readOnly)&&t.respectDisabledReadOnly||(t.dateSelected=n?void 0:new Date(t.currentYear,t.currentMonth,i),r&&r.classList.remove("qs-active"),n||e.classList.add("qs-active"),p(a,t,n),n||q(t),o&&(y({instance:t,deselect:n}),t.first&&!o.dateSelected&&(o.currentYear=t.currentYear,o.currentMonth=t.currentMonth,o.currentMonthName=t.currentMonthName),u(t),u(o)),t.onSelect(t,n?void 0:new Date(t.dateSelected)));}function y(e){var t=e.instance.first?e.instance:e.instance.sibling,n=t.sibling;t===e.instance?e.deselect?(t.minDate=t.originalMinDate,n.minDate=n.originalMinDate):n.minDate=t.dateSelected:e.deselect?(n.maxDate=n.originalMaxDate,t.maxDate=t.originalMaxDate):t.maxDate=n.dateSelected;}function p(e,t,n){if(!t.nonInput)return n?e.value="":t.formatter!==s?t.formatter(e,t.dateSelected,t):void(e.value=t.dateSelected.toDateString())}function w(e,t,n,a){n||a?(n&&(t.currentYear=+n),a&&(t.currentMonth=+a)):(t.currentMonth+=e.contains("qs-right")?1:-1,12===t.currentMonth?(t.currentMonth=0,t.currentYear++):-1===t.currentMonth&&(t.currentMonth=11,t.currentYear--)),t.currentMonthName=t.months[t.currentMonth],u(t),t.onMonthChange(t);}function D(e){if(!e.noPosition){var t=e.position.top,n=e.position.right;if(e.position.centered)return e.calendarContainer.classList.add("qs-centered");var a=e.positionedEl.getBoundingClientRect(),r=e.el.getBoundingClientRect(),i=e.calendarContainer.getBoundingClientRect(),o=r.top-a.top+(t?-1*i.height:r.height)+"px",s=r.left-a.left+(n?r.width-i.width:0)+"px";e.calendarContainer.style.setProperty("top",o),e.calendarContainer.style.setProperty("left",s);}}function b(e){return "[object Date]"===x(e)&&"Invalid Date"!==e.toString()}function g(e){if(b(e)||"number"==typeof e&&!isNaN(e)){var t=new Date(+e);return new Date(t.getFullYear(),t.getMonth(),t.getDate())}}function q(e){e.disabled||!e.calendarContainer.classList.contains("qs-hidden")&&!e.alwaysShow&&("overlay"!==e.defaultView&&M(!0,e),e.calendarContainer.classList.add("qs-hidden"),e.onHide(e));}function S(e){e.disabled||(e.calendarContainer.classList.remove("qs-hidden"),"overlay"===e.defaultView&&M(!1,e),D(e),e.onShow(e));}function M(e,t){var n=t.calendar,a=n.querySelector(".qs-overlay"),r=a.querySelector(".qs-overlay-year"),i=n.querySelector(".qs-controls"),o=n.querySelector(".qs-squares");e?(a.classList.add("qs-hidden"),i.classList.remove("qs-blur"),o.classList.remove("qs-blur"),r.value=""):(a.classList.remove("qs-hidden"),i.classList.add("qs-blur"),o.classList.add("qs-blur"),r.focus());}function E(e,t,n,a){var r=isNaN(+(new Date).setFullYear(t.value||void 0)),i=r?null:t.value;if(13===e.which||13===e.keyCode||"click"===e.type)a?w(null,n,i,a):r||t.classList.contains("qs-disabled")||w(null,n,i);else if(n.calendar.contains(t)){n.calendar.querySelector(".qs-submit").classList[r?"add":"remove"]("qs-disabled");}}function x(e){return {}.toString.call(e)}function C(e){a.forEach((function(t){t!==e&&q(t);}));}function L(e){if(!e.__qs_shadow_dom){var t=e.which||e.keyCode,n=e.type,r=e.target,o=r.classList,s=a.filter((function(e){return e.calendar.contains(r)||e.el===r}))[0],l=s&&s.calendar.contains(r);if(!(s&&s.isMobile&&s.disableMobile))if("click"===n){if(!s)return a.forEach(q);if(s.disabled)return;var d=s.calendar,c=s.calendarContainer,h=s.disableYearOverlay,f=s.nonInput,v=d.querySelector(".qs-overlay-year"),y=!!d.querySelector(".qs-hidden"),p=d.querySelector(".qs-month-year").contains(r),D=r.dataset.monthNum;if(s.noPosition&&!l)(c.classList.contains("qs-hidden")?S:q)(s);else if(o.contains("qs-arrow"))w(o,s);else if(p||o.contains("qs-close"))h||M(!y,s);else if(D)E(e,v,s,D);else {if(o.contains("qs-disabled"))return;if(o.contains("qs-num")){var b=r.textContent,g=+r.dataset.direction,x=new Date(s.currentYear,s.currentMonth+g,b);if(g){s.currentYear=x.getFullYear(),s.currentMonth=x.getMonth(),s.currentMonthName=i[s.currentMonth],u(s);for(var L,Y=s.calendar.querySelectorAll('[data-direction="0"]'),j=0;!L;){var P=Y[j];P.textContent===b&&(L=P),j++;}r=L;}return void(+x==+s.dateSelected?m(r,s,!0):r.classList.contains("qs-disabled")||m(r,s))}o.contains("qs-submit")?E(e,v,s):f&&r===s.el&&(S(s),C(s));}}else if("focusin"===n&&s)S(s),C(s);else if("keydown"===n&&9===t&&s)q(s);else if("keydown"===n&&s&&!s.disabled){var k=!s.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");13===t&&k&&l?E(e,r,s):27===t&&k&&l&&M(!0,s);}else if("input"===n){if(!s||!s.calendar.contains(r))return;var O=s.calendar.querySelector(".qs-submit"),N=r.value.split("").reduce((function(e,t){return e||"0"!==t?e+(t.match(/[0-9]/)?t:""):""}),"").slice(0,4);r.value=N,O.classList[4===N.length?"remove":"add"]("qs-disabled");}}}function Y(e){L(e),e.__qs_shadow_dom=!0;}function j(e,t){l.forEach((function(n){e.removeEventListener(n,t);}));}function P(){S(this);}function k(){q(this);}function O(e,t){var n=g(e),a=this.currentYear,r=this.currentMonth,i=this.sibling;if(null==e)return this.dateSelected=void 0,p(this.el,this,!0),i&&(y({instance:this,deselect:!0}),u(i)),u(this),this;if(!b(e))throw new Error("`setDate` needs a JavaScript Date object.");if(this.disabledDates[+n]||n<this.minDate||n>this.maxDate)throw new Error("You can't manually set a date that's disabled.");this.dateSelected=n,t&&(this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),this.currentMonthName=this.months[n.getMonth()]),p(this.el,this),i&&(y({instance:this}),u(i));var o=a===n.getFullYear()&&r===n.getMonth();return o||t?u(this,n):o||u(this,new Date(a,r,1)),this}function N(e){return I(this,e,!0)}function _(e){return I(this,e)}function I(e,t,n){var a=e.dateSelected,r=e.first,i=e.sibling,o=e.minDate,s=e.maxDate,l=g(t),d=n?"Min":"Max";function c(){return "original"+d+"Date"}function h(){return d.toLowerCase()+"Date"}function f(){return "set"+d}function v(){throw new Error("Out-of-range date passed to "+f())}if(null==t)e[c()]=void 0,i?(i[c()]=void 0,n?(r&&!a||!r&&!i.dateSelected)&&(e.minDate=void 0,i.minDate=void 0):(r&&!i.dateSelected||!r&&!a)&&(e.maxDate=void 0,i.maxDate=void 0)):e[h()]=void 0;else {if(!b(t))throw new Error("Invalid date passed to "+f());i?((r&&n&&l>(a||s)||r&&!n&&l<(i.dateSelected||o)||!r&&n&&l>(i.dateSelected||s)||!r&&!n&&l<(a||o))&&v(),e[c()]=l,i[c()]=l,(n&&(r&&!a||!r&&!i.dateSelected)||!n&&(r&&!i.dateSelected||!r&&!a))&&(e[h()]=l,i[h()]=l)):((n&&l>(a||s)||!n&&l<(a||o))&&v(),e[h()]=l);}return i&&u(i),u(e),e}function A(){var e=this.first?this:this.sibling,t=e.sibling;return {start:e.dateSelected,end:t.dateSelected}}function R(){var e=this.shadowDom,t=this.positionedEl,n=this.calendarContainer,r=this.sibling,i=this;this.inlinePosition&&(a.some((function(e){return e!==i&&e.positionedEl===t}))||t.style.setProperty("position",null));n.remove(),a=a.filter((function(e){return e!==i})),r&&delete r.sibling,a.length||j(document,L);var o=a.some((function(t){return t.shadowDom===e}));for(var s in e&&!o&&j(e,Y),this)delete this[s];a.length||l.forEach((function(e){document.removeEventListener(e,L);}));}function F(e,t){var n=new Date(e);if(!b(n))throw new Error("Invalid date passed to `navigate`");this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),u(this),t&&this.onMonthChange(this);}function B(){var e=!this.calendarContainer.classList.contains("qs-hidden"),t=!this.calendarContainer.querySelector(".qs-overlay").classList.contains("qs-hidden");e&&M(t,this);}t.default=function(e,t){var n=function(e,t){var n,l,d=function(e){var t=c(e);t.events&&(t.events=t.events.reduce((function(e,t){if(!b(t))throw new Error('"options.events" must only contain valid JavaScript Date objects.');return e[+g(t)]=!0,e}),{}));["startDate","dateSelected","minDate","maxDate"].forEach((function(e){var n=t[e];if(n&&!b(n))throw new Error('"options.'+e+'" needs to be a valid JavaScript Date object.');t[e]=g(n);}));var n=t.position,i=t.maxDate,l=t.minDate,d=t.dateSelected,u=t.overlayPlaceholder,h=t.overlayButton,f=t.startDay,v=t.id;if(t.startDate=g(t.startDate||d||new Date),t.disabledDates=(t.disabledDates||[]).reduce((function(e,t){var n=+g(t);if(!b(t))throw new Error('You supplied an invalid date to "options.disabledDates".');if(n===+g(d))throw new Error('"disabledDates" cannot contain the same date as "dateSelected".');return e[n]=1,e}),{}),t.hasOwnProperty("id")&&null==v)throw new Error("`id` cannot be `null` or `undefined`");if(null!=v){var m=a.filter((function(e){return e.id===v}));if(m.length>1)throw new Error("Only two datepickers can share an id.");m.length?(t.second=!0,t.sibling=m[0]):t.first=!0;}var y=["tr","tl","br","bl","c"].some((function(e){return n===e}));if(n&&!y)throw new Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');function p(e){throw new Error('"dateSelected" in options is '+(e?"less":"greater")+' than "'+(e||"max")+'Date".')}if(t.position=function(e){var t=e[0],n=e[1],a={};a[o[t]]=1,n&&(a[o[n]]=1);return a}(n||"bl"),i<l)throw new Error('"maxDate" in options is less than "minDate".');d&&(l>d&&p("min"),i<d&&p());if(["onSelect","onShow","onHide","onMonthChange","formatter","disabler"].forEach((function(e){"function"!=typeof t[e]&&(t[e]=s);})),["customDays","customMonths","customOverlayMonths"].forEach((function(e,n){var a=t[e],r=n?12:7;if(a){if(!Array.isArray(a)||a.length!==r||a.some((function(e){return "string"!=typeof e})))throw new Error('"'+e+'" must be an array with '+r+" strings.");t[n?n<2?"months":"overlayMonths":"days"]=a;}})),f&&f>0&&f<7){var w=(t.customDays||r).slice(),D=w.splice(0,f);t.customDays=w.concat(D),t.startDay=+f,t.weekendIndices=[w.length-1,w.length];}else t.startDay=0,t.weekendIndices=[6,0];"string"!=typeof u&&delete t.overlayPlaceholder;"string"!=typeof h&&delete t.overlayButton;var q=t.defaultView;if(q&&"calendar"!==q&&"overlay"!==q)throw new Error('options.defaultView must either be "calendar" or "overlay".');return t.defaultView=q||"calendar",t}(t||{startDate:g(new Date),position:"bl",defaultView:"calendar"}),u=e;if("string"==typeof u)u="#"===u[0]?document.getElementById(u.slice(1)):document.querySelector(u);else {if("[object ShadowRoot]"===x(u))throw new Error("Using a shadow DOM as your selector is not supported.");for(var h,f=u.parentNode;!h;){var v=x(f);"[object HTMLDocument]"===v?h=!0:"[object ShadowRoot]"===v?(h=!0,n=f,l=f.host):f=f.parentNode;}}if(!u)throw new Error("No selector / element found.");if(a.some((function(e){return e.el===u})))throw new Error("A datepicker already exists on that element.");var m=u===document.body,y=n?u.parentElement||n:m?document.body:u.parentElement,w=n?u.parentElement||l:y,D=document.createElement("div"),q=document.createElement("div");D.className="qs-datepicker-container qs-hidden",q.className="qs-datepicker";var M={shadowDom:n,customElement:l,positionedEl:w,el:u,parent:y,nonInput:"INPUT"!==u.nodeName,noPosition:m,position:!m&&d.position,startDate:d.startDate,dateSelected:d.dateSelected,disabledDates:d.disabledDates,minDate:d.minDate,maxDate:d.maxDate,noWeekends:!!d.noWeekends,weekendIndices:d.weekendIndices,calendarContainer:D,calendar:q,currentMonth:(d.startDate||d.dateSelected).getMonth(),currentMonthName:(d.months||i)[(d.startDate||d.dateSelected).getMonth()],currentYear:(d.startDate||d.dateSelected).getFullYear(),events:d.events||{},defaultView:d.defaultView,setDate:O,remove:R,setMin:N,setMax:_,show:P,hide:k,navigate:F,toggleOverlay:B,onSelect:d.onSelect,onShow:d.onShow,onHide:d.onHide,onMonthChange:d.onMonthChange,formatter:d.formatter,disabler:d.disabler,months:d.months||i,days:d.customDays||r,startDay:d.startDay,overlayMonths:d.overlayMonths||(d.months||i).map((function(e){return e.slice(0,3)})),overlayPlaceholder:d.overlayPlaceholder||"4-digit year",overlayButton:d.overlayButton||"Submit",disableYearOverlay:!!d.disableYearOverlay,disableMobile:!!d.disableMobile,isMobile:"ontouchstart"in window,alwaysShow:!!d.alwaysShow,id:d.id,showAllDates:!!d.showAllDates,respectDisabledReadOnly:!!d.respectDisabledReadOnly,first:d.first,second:d.second};if(d.sibling){var E=d.sibling,C=M,L=E.minDate||C.minDate,Y=E.maxDate||C.maxDate;C.sibling=E,E.sibling=C,E.minDate=L,E.maxDate=Y,C.minDate=L,C.maxDate=Y,E.originalMinDate=L,E.originalMaxDate=Y,C.originalMinDate=L,C.originalMaxDate=Y,E.getRange=A,C.getRange=A;}d.dateSelected&&p(u,M);var j=getComputedStyle(w).position;m||j&&"static"!==j||(M.inlinePosition=!0,w.style.setProperty("position","relative"));var I=a.filter((function(e){return e.positionedEl===M.positionedEl}));I.some((function(e){return e.inlinePosition}))&&(M.inlinePosition=!0,I.forEach((function(e){e.inlinePosition=!0;})));D.appendChild(q),y.appendChild(D),M.alwaysShow&&S(M);return M}(e,t);if(a.length||d(document),n.shadowDom&&(a.some((function(e){return e.shadowDom===n.shadowDom}))||d(n.shadowDom)),a.push(n),n.second){var l=n.sibling;y({instance:n,deselect:!n.dateSelected}),y({instance:l,deselect:!l.dateSelected}),u(l);}return u(n,n.startDate||n.dateSelected),n.alwaysShow&&D(n),n};}]).default}));
});

const datepicker = /*@__PURE__*/getDefaultExportFromCjs(datepicker_min);

const yyyymmdd = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const MxDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.uuid = uuidv4();
    this.dataAttributes = {};
    this.isDateInputSupported = false;
    this.allowFuture = true;
    this.allowPast = true;
    this.assistiveText = undefined;
    this.dense = false;
    this.disabled = false;
    this.elAriaLabel = undefined;
    this.error = false;
    this.floatLabel = false;
    this.inputId = undefined;
    this.label = undefined;
    this.min = undefined;
    this.max = undefined;
    this.name = undefined;
    this.value = undefined;
    this.isFocused = false;
    this.isInputDirty = false;
  }
  onValueChange() {
    if (this.value && !yyyymmdd.test(this.value))
      return;
    try {
      this.datepicker.setDate(this.value ? new Date(this.value + 'T00:00:00') : undefined, true);
    }
    catch (err) {
      // Ignore js-datepicker exceptions when entering date outside min/max
    }
  }
  /** Open/close the calendar.  We're not using the js-datepicker's popover behavior because its
   * placement is buggy. */
  onClick(e) {
    const calendarButtonWasClicked = this.calendarButton && this.calendarButton.contains(e.target);
    if (!this.isCalendarOpen && calendarButtonWasClicked) {
      // Open closed calendar when the button is clicked
      this.openCalendar();
      e.preventDefault();
    }
    else if (this.isCalendarOpen && !this.datepicker.calendarContainer.contains(e.target)) {
      // Close calendar when a click occurs outside the calendar
      this.closeCalendar();
    }
  }
  connectedCallback() {
    const validDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    if (this.value && !validDate.test(this.value)) {
      throw new Error('The date picker value must be in YYYY-MM-DD format.');
    }
  }
  componentWillRender() {
    if (!this.datepicker)
      this.componentDidLoad();
    propagateDataAttributes.call(this);
  }
  componentDidLoad() {
    if (!this.inputEl)
      return;
    this.isDateInputSupported = this.inputEl.type === 'date';
    try {
      const dateSelected = this.value ? new Date(this.value + 'T00:00:00') : undefined;
      this.datepicker = datepicker(this.inputEl, {
        alwaysShow: true,
        customDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        overlayButton: 'Confirm',
        overlayPlaceholder: 'Year (YYYY)',
        minDate: dateSelected < this.minDate ? undefined : this.minDate,
        maxDate: dateSelected > this.maxDate ? undefined : this.maxDate,
        dateSelected,
        formatter: (input, date) => {
          if (this.inputEl.contains(document.activeElement))
            return; // Do not reformat while typing in date
          input.value = date.toISOString().split('T')[0];
          this.value = input.value;
          input.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
          if (!this.isDateInputSupported)
            input.value = date.toLocaleDateString();
        },
        onSelect: () => {
          this.error = false;
          this.closeCalendar();
        },
      });
      this.datepicker.calendarContainer.classList.add('hidden');
      // HACK: Fix js-datepicker moving the calendar when interacting with the year/month selection.
      this.datepicker.calendarContainer.addEventListener('click', this.repositionCalendar.bind(this));
      this.datepicker.calendarContainer.addEventListener('focusin', this.repositionCalendar.bind(this));
      this.datepicker.calendarContainer.addEventListener('mousedown', this.repositionCalendar.bind(this));
    }
    catch (err) {
      // Ignore js-datepicker exceptions (e.g. inputEl is hidden)
    }
  }
  onBlur() {
    if (!this.isCalendarOpen) {
      // Style as focused/active while calendar is open
      this.isFocused = false;
    }
    if (this.isDateInputSupported && (this.inputEl.validity.rangeOverflow || this.inputEl.validity.rangeUnderflow)) {
      this.error = true;
    }
    else if (!this.isDateInputSupported && this.isInputDirty) {
      if (this.disabled)
        return;
      this.error = false;
      let date;
      if (!this.inputEl.value)
        this.value = null;
      else {
        date = new Date(Date.parse(this.inputEl.value));
        if (!isDateObject(date)) {
          this.error = true;
          return;
        }
        this.value = date.toISOString().split('T')[0];
      }
      this.inputEl.value = this.value;
      this.inputEl.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
      if (date)
        this.inputEl.value = date.toLocaleDateString();
    }
  }
  onFocus(e) {
    this.isFocused = true;
    this.error = false;
    this.isInputDirty = false;
    e.stopPropagation();
  }
  onInput(e) {
    const value = e.target.value;
    if (value && !yyyymmdd.test(value))
      e.stopPropagation();
    else if (this.datepicker && this.value !== value) {
      this.value = value;
      try {
        this.datepicker.setDate(value ? new Date(value + 'T00:00:00') : undefined);
      }
      catch (err) {
        // Ignore js-datepicker exceptions when entering date outside min/max
      }
    }
    if (!this.isDateInputSupported && this.isFocused)
      this.isInputDirty = true;
  }
  onKeyDown(e) {
    // Prevent the browser from opening its calendar when pressing Space or Enter
    if (e.key === ' ' || e.key === 'Enter')
      e.preventDefault();
  }
  onClickLabel() {
    this.inputEl.focus();
  }
  async openCalendar() {
    if (!this.datepicker)
      return;
    this.isFocused = true;
    this.datepicker.navigate(this.datepicker.dateSelected || new Date());
    this.datepicker.calendarContainer.classList.remove('hidden');
    this.popoverInstance = await createPopover(this.calendarButton, this.datepicker.calendarContainer, 'bottom', [-4, 0]);
    await fadeIn(this.datepicker.calendarContainer);
  }
  repositionCalendar() {
    requestAnimationFrame(this.popoverInstance.forceUpdate);
  }
  async closeCalendar() {
    if (!this.datepicker)
      return;
    await fadeOut(this.datepicker.calendarContainer);
    this.datepicker.calendarContainer.classList.add('hidden');
    if (!this.inputEl.contains(document.activeElement))
      this.isFocused = false;
    if (!this.popoverInstance)
      return;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
  }
  get minDate() {
    if (this.min)
      return new Date(this.min + 'T00:00:00');
    if (!this.allowPast) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
  }
  get maxDate() {
    if (this.max)
      return new Date(this.max + 'T00:00:00');
    if (!this.allowFuture)
      return new Date();
    return new Date(9999, 11, 31); // Default to Dec 31, 9999 to limit year entry to four digits
  }
  get minValue() {
    return this.minDate ? this.minDate.toISOString().split('T')[0] : null;
  }
  get maxValue() {
    return this.maxDate ? this.maxDate.toISOString().split('T')[0] : null;
  }
  get isCalendarOpen() {
    if (!this.datepicker)
      return false;
    return !this.datepicker.calendarContainer.classList.contains('hidden');
  }
  get labelClassNames() {
    let str = 'block';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4 min-w-1/2';
      if (this.dense)
        str += ' dense text-4';
      if (this.isFocused || this.inputHasText)
        str += ' floating';
      if (this.isFocused)
        str += ' -ml-1'; // prevent shifting due to border-width change
    }
    else {
      str += ' subtitle2 mb-4 pointer-events-none';
    }
    return str;
  }
  get inputHasText() {
    if (!this.inputEl)
      return false;
    // HTMLInputElement.validity.badInput is true if a partial date has been typed.
    return this.inputEl.value || this.inputEl.validity.badInput;
  }
  get pickerWrapperClass() {
    let str = 'picker-wrapper w-320 flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.disabled)
      str += ' disabled';
    if (this.isFocused)
      str += ' focused';
    return str;
  }
  get inputClass() {
    let str = 'absolute inset-0 w-full h-full pl-12 overflow-hidden outline-none appearance-none select-none bg-transparent';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    // Hide input placeholder while floating label is inside input
    if (this.floatLabel && !this.isFocused && !this.inputHasText)
      str += ' opacity-0';
    // HACK: Safari confusingly uses today's date as the placeholder, even when you've entered a partial date,
    // and it also does not like changing the placeholder text color, so we lower the opacity instead so the user
    // has a visual indication that the input does not actually have a value.
    else if (isSafari && !this.inputHasText)
      str += ' opacity-50';
    return str;
  }
  get calendarButtonClass() {
    let str = 'calendar-button cursor-pointer border-0 absolute flex items-center text-icon h-full right-12 space-x-8';
    if (this.disabled)
      str += ' pointer-events-none';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames, onClick: this.onClickLabel.bind(this) }, this.label));
    return (h(Host, { class: 'mx-date-picker block text-3' + (this.error ? ' error' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { ref: el => (this.pickerWrapper = el), class: this.pickerWrapperClass }, h("input", Object.assign({ ref: el => (this.inputEl = el), "aria-label": this.elAriaLabel || this.label, class: this.inputClass, disabled: this.disabled, id: this.inputId || this.uuid, name: this.name, type: "date", min: this.minValue, max: this.maxValue, onBlur: this.onBlur.bind(this), onClick: e => e.preventDefault() /* Prevent browser's native calender */, onKeyDown: this.onKeyDown.bind(this), onFocus: this.onFocus.bind(this), onFocusin: e => e.stopPropagation() /* Prevent js-datepicker popover behavior */, onInput: this.onInput.bind(this) }, this.dataAttributes)), this.label && this.floatLabel && labelJsx, h("button", { type: "button", "aria-label": "Open calendar", ref: el => (this.calendarButton = el), class: this.calendarButtonClass, "data-testid": "calendar-button", disabled: this.disabled }, h("i", { class: this.error ? 'mds-warning-circle' : 'mds-calendar' }))), this.assistiveText && (h("div", { class: "caption1 mt-4 ml-16" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText)))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxDatePicker as mx_date_picker };
