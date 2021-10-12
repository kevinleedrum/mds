import{r as t,c as s,h as i,H as e,g as h}from"./p-0d0438ba.js";import{M as n,m as r}from"./p-8a252c56.js";import{g as o,c as a,i as l,a as c}from"./p-0d6b3f5b.js";import{a as d}from"./p-3a6987fb.js";const C=class{constructor(i){t(this,i),this.mxSortChange=s(this,"mxSortChange",7),this.mxRowCheck=s(this,"mxRowCheck",7),this.mxVisibleRowsChange=s(this,"mxVisibleRowsChange",7),this.mxRowMove=s(this,"mxRowMove",7),this.hasDefaultSlot=!1,this.hasSearch=!1,this.hasFilter=!1,this.showOperationsBar=!1,this.rows=[],this.columns=[],this.checkable=!1,this.checkOnRowClick=!0,this.showCheckAll=!0,this.draggableRows=!1,this.hoverable=!0,this.autoWidth=!1,this.sortAscending=!0,this.paginate=!0,this.page=0,this.rowsPerPage=10,this.disableNextPage=!1,this.serverPaginate=!1,this.showProgressBar=!1,this.disablePagination=!1,this.progressValue=null,this.progressAppearDelay=0,this.minWidths=new n,this.checkedRowIds=[],this.exposedMobileColumnIndex=0,this.hasActionsColumnFromSlot=!1}onMxCheck(t){const{rowId:s,checked:i}=t.detail;!i&&this.checkedRowIds.includes(s)?this.checkedRowIds=this.checkedRowIds.filter((t=>t!==s)):i&&!this.checkedRowIds.includes(s)&&(this.checkedRowIds=[...this.checkedRowIds,s]),this.mxRowCheck.emit(this.checkedRowIds)}onMxRowDragStart(t){const s=t.target.closest("mx-table-row"),i=this.getTableRows();this.dragRowIndex=i.indexOf(s),this.dragOverRowIndex=this.dragRowIndex,this.dragMoveHandler=this.onDragMove.bind(this),i.forEach((i=>{(t.detail.isKeyboard||i!==s)&&Array.from(i.children).forEach((t=>{t.classList.add("transition-transform","pointer-events-none")}))})),t.detail.isKeyboard||(document.addEventListener("touchmove",this.dragMoveHandler),document.addEventListener("mousemove",this.dragMoveHandler))}onDragKeyDown(t){let s;const i=t.detail;if(["ArrowUp","ArrowLeft"].includes(i)&&(s=-1),["ArrowDown","ArrowRight"].includes(i)&&(s=1),!s)return;if(-1===s&&0===this.dragOverRowIndex)return;const e=this.getTableRows();if(1===s&&this.dragOverRowIndex===e.length-1)return;this.dragOverRowIndex+=s;const h=e[this.dragRowIndex];h.translateRow(0,h.children[0].offsetHeight*(this.dragOverRowIndex-this.dragRowIndex)),this.onDragMove()}onMxRowDragEnd(t){document.removeEventListener("mousemove",this.dragMoveHandler),document.removeEventListener("touchmove",this.dragMoveHandler);const s=this.getTableRows();t.detail.isCancel||this.dragOverRowIndex===this.dragRowIndex||(this.mxRowMove.emit({rowId:t.detail,oldIndex:this.dragRowIndex,newIndex:this.dragOverRowIndex}),t.detail.isKeyboard&&s[this.dragOverRowIndex].focusDragHandle()),this.dragRowIndex=null,s.forEach((t=>{Array.from(t.children).forEach((t=>{t.classList.remove("transition-transform","pointer-events-none"),t.style.transform=""}))})),document.body.style.cursor=""}onVisibleRowsChange(){this.getTableRows().forEach((t=>t.collapse())),this.mxVisibleRowsChange.emit(this.visibleRows)}onPageChange(){this.element.getBoundingClientRect().top<0&&this.element.scrollIntoView()}resetPage(){this.serverPaginate||(this.page=0)}async getCheckedRowIds(){return this.checkedRowIds}async setCheckedRowIds(t=[]){this.checkedRowIds=t}async checkAll(){this.checkedRowIds=this.getRowId?this.rows.map(this.getRowId).map((t=>t.toString())):this.getTableRows().map((t=>t.rowId))}async checkNone(){this.checkedRowIds=[]}getTableRows(){return Array.from(this.element.querySelectorAll("mx-table-row"))}onCheckAllClick(t){t.preventDefault(),0===this.checkedRowIds.length?this.checkAll():this.checkNone()}onDragMove(t){requestAnimationFrame((()=>{if(null==this.dragRowIndex)return;const s=this.getTableRows(),i=s[this.dragRowIndex].children[0].offsetHeight;s.forEach(((s,e)=>{let{top:h,bottom:n}=o(s.children[0]);const r=Array.from(s.children);if(t){const{pageY:s}=c(t);s>=h&&s<=n&&(this.dragOverRowIndex=e)}e!==this.dragRowIndex&&r.forEach(e<=this.dragOverRowIndex&&e>this.dragRowIndex?t=>t.style.transform=`translateY(-${i}px)`:e>=this.dragOverRowIndex&&e<this.dragRowIndex?t=>t.style.transform=`translateY(${i}px)`:t=>t.style.transform="")}))}))}setCellProps(){const t=this.element.querySelectorAll("mx-table-cell");let s=0;t.forEach((t=>{t.columnIndex=s,t.isExposedMobileColumn=s===this.exposedMobileColumnIndex,t.heading=this.cols[s].heading,s===this.cols.length-1?s=0:s++}))}setRowsChecked(){this.getTableRows().forEach((t=>t.checked=this.checkedRowIds.includes(t.rowId)))}connectedCallback(){r.subscribeComponent(this)}componentWillLoad(){this.hasDefaultSlot=Array.from(this.element.children).some((t=>!t.getAttribute("slot")))}componentWillRender(){this.hasFilter=!!this.element.querySelector('[slot="filter"]'),this.hasSearch=!!this.element.querySelector('[slot="search"]'),this.showOperationsBar=!!this.getMultiRowActions||this.hasFilter||this.hasSearch,this.hasActionsColumnFromSlot=this.hasDefaultSlot&&this.getTableRows().some((t=>t.actions&&t.actions.length)),requestAnimationFrame(this.setCellProps.bind(this))}componentDidRender(){this.actionMenu&&!this.actionMenu.anchorEl&&(this.actionMenu.anchorEl=this.actionMenuButton),this.checkable&&this.setRowsChecked()}componentDidLoad(){this.onVisibleRowsChange()}disconnectedCallback(){r.unsubscribeComponent(this)}get cols(){return!this.columns.length&&this.rows.length?Object.keys(this.rows[0]).map((t=>({property:t,heading:a(t),sortable:!0}))):this.columns.map((t=>Object.assign(Object.assign({},t),{sortable:!1!==t.sortable})))}get exposedMobileColumn(){return this.cols[this.exposedMobileColumnIndex]||{}}get visibleRows(){if(this.serverPaginate||!this.paginate&&!this.sortBy)return this.rows;const t=this.page*this.rowsPerPage;let s=this.rows.slice();return this.sortBy&&this.sortRows(s),s=s.slice(t,t+this.rowsPerPage),s}get allRowsChecked(){return this.rows.length&&this.rows.length===this.checkedRowIds.length}get someRowsChecked(){return this.checkedRowIds.length>0&&this.checkedRowIds.length<this.rows.length}get multiRowActions(){return this.getMultiRowActions?this.getMultiRowActions(this.checkedRowIds):[]}get hasActionsColumn(){return!!this.getRowActions||this.hasActionsColumnFromSlot}get operationsBarStyle(){return this.minWidths.sm?{gridTemplateColumns:"max-content 1fr max-content"}:this.checkable&&this.showCheckAll?{gridTemplateColumns:"minmax(0, max-content) 1fr"}:{gridTemplateColumns:"1fr"}}get searchStyle(){return this.minWidths.sm?{width:"240px",gridColumnStart:"-1"}:this.checkable&&this.showCheckAll?{width:"100%",maxWidth:"240px",gridColumnStart:"2"}:{width:"100%",gridColumnStart:"1"}}get gridStyle(){if(!this.minWidths.sm)return{display:"flex",flexDirection:"column"};let t=this.checkable?"minmax(0, 48px) ":"";return this.draggableRows&&(t+="minmax(0, 48px) "),t+=`repeat(${this.cols.length+(this.hasActionsColumn?1:0)}, minmax(0, auto))`,{display:this.autoWidth?"inline-grid":"grid",gridTemplateColumns:t}}get emptyStateClass(){let t="empty-state";return(this.rows.length>0||this.getTableRows().length>0)&&(t+=" hidden"),t}sortRows(t){const s=this.cols.find((t=>t.property===this.sortBy));if(!s)return;let i=s.sortCompare;i||(i=(t,i)=>{const e=this.getCellSortableValue(t,s),h=this.getCellSortableValue(i,s);return"number"==typeof e&&"number"==typeof h?e-h:e.localeCompare(h)}),t.sort(i),this.sortAscending||t.reverse()}getCellSortableValue(t,s){if(s.getValue)return s.getValue(t);const i=t[s.property];return["date","dateTime"].includes(s.type)||l(i)?-new Date(i).getTime():"boolean"===s.type?i?1:0:i}getCellValue(t,s,i){if(s.getValue)return s.getValue(t,i);const e=t[s.property];return"date"===s.type||l(e)?new Date(e).toLocaleDateString():"dateTime"===s.type||l(e)?new Date(e).toLocaleString():"boolean"===s.type?e?"Yes":"":e}getHeaderClass(t,s){if(!t)return"";let i="flex items-center subtitle2 py-18 "+this.getAlignClass(t);i+=this.minWidths.sm?" px-16":" flex-1";const e=this.showCheckAll&&!this.showOperationsBar;let h=1;return this.minWidths.sm&&0===s&&this.draggableRows&&h++,this.minWidths.sm&&0===s&&this.checkable&&!e&&h++,i+=" col-span-"+h,!this.minWidths.sm&&s===this.exposedMobileColumnIndex&&this.checkable&&e&&(i+=" px-16"),!this.draggableRows&&t.sortable&&t.property&&(i+=" group cursor-pointer"),t.headerClass&&(i+=t.headerClass),i}getHeaderArrowClass(t){let s="ml-12 transform scale-75";return t.property!==this.sortBy?s+=" opacity-30 sm:opacity-0 sm:group-hover:opacity-30 rotate-180":this.sortAscending&&(s+=" rotate-180"),s}getAlignClass(t){if(!this.minWidths.sm)return"justify-start";let s=t.align||("number"===t.type?"right":"left");return"right"===s?"justify-end":"center"===s?"justify-center":"justify-start"}onHeaderClick(t){!this.draggableRows&&t&&t.sortable&&t.property&&(this.sortBy!==t.property?(this.sortBy=t.property,this.sortAscending=!0):this.sortAscending?this.sortAscending=!1:(this.sortBy=null,this.sortAscending=!0),this.mxSortChange.emit({sortBy:this.sortBy,sortAscending:this.sortAscending}))}changeExposedColumnIndex(t){const s=this.exposedMobileColumnIndex+t;s<0||s>=this.cols.length||(this.exposedMobileColumnIndex=s)}onMxPageChange(t){this.serverPaginate||(this.page=t.detail.page,this.rowsPerPage=t.detail.rowsPerPage)}render(){const t=this.checkable&&this.showCheckAll&&i("mx-checkbox",{checked:this.allRowsChecked,class:this.showOperationsBar?"ml-24":"pr-4",indeterminate:this.someRowsChecked,onClick:this.onCheckAllClick.bind(this),"label-name":"Select all rows","hide-label":!0});let s;this.checkable&&(s=1===this.multiRowActions.length?i("mx-button",Object.assign({"data-testid":"multi-action-button","btn-type":"outlined"},this.multiRowActions[0],{class:"whitespace-nowrap"+(this.checkedRowIds.length?"":" hidden")}),this.multiRowActions[0].value):i("span",{class:this.checkedRowIds.length?null:"hidden"},i("mx-button",{ref:t=>this.actionMenuButton=t,"btn-type":"text",dropdown:!0},i("span",{class:"h-full flex items-center px-2"},i("span",{innerHTML:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" fill="#333333"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95058 1.96137C9.16383 1.8994 9.38813 1.88522 9.6075 1.91982C9.82576 1.95425 10.0338 2.03613 10.2169 2.15968L11.4772 2.9998H12.523L13.7833 2.15968C13.9664 2.03615 14.1744 1.95428 14.3927 1.91986C14.6121 1.88527 14.8364 1.89946 15.0496 1.96144L15.0535 1.96257C16.5923 2.41876 18.0015 3.23235 19.166 4.33691L19.1689 4.33971C19.3292 4.49341 19.4537 4.68057 19.5334 4.88785C19.6127 5.09406 19.6458 5.31514 19.6304 5.5355C19.6303 5.53664 19.6302 5.53779 19.6301 5.53894L19.5329 7.04702L20.0558 7.95276L21.4104 8.62261C21.4115 8.6231 21.4125 8.62359 21.4135 8.62409C21.612 8.72093 21.787 8.86015 21.9259 9.03197C22.0656 9.20465 22.1654 9.406 22.2184 9.62167L22.2193 9.62558C22.5937 11.1864 22.5937 12.8135 22.2193 14.3743L22.2184 14.3782C22.1654 14.5939 22.0656 14.7952 21.9259 14.9679C21.787 15.1397 21.612 15.279 21.4134 15.3758C21.4124 15.3763 21.4114 15.3768 21.4104 15.3773L20.0558 16.0471L19.5329 16.9529L19.6301 18.4609C19.6301 18.4621 19.6302 18.4632 19.6303 18.4644C19.6457 18.6847 19.6126 18.9058 19.5333 19.112C19.4536 19.3193 19.3291 19.5064 19.1688 19.6601L19.1659 19.6629C18.0014 20.7675 16.5922 21.5811 15.0534 22.0373L15.0495 22.0384C14.8363 22.1004 14.612 22.1146 14.3926 22.08C14.1743 22.0455 13.9663 21.9637 13.7832 21.8401C13.7822 21.8395 13.7813 21.8388 13.7803 21.8382L12.5229 21H11.4771L10.2197 21.8382C10.2188 21.8388 10.2179 21.8394 10.217 21.84C10.0338 21.9636 9.8257 22.0455 9.6074 22.0799C9.38804 22.1145 9.16374 22.1003 8.95047 22.0383L8.94661 22.0372C7.40778 21.581 5.99861 20.7674 4.83411 19.6629L4.83117 19.6601C4.67087 19.5064 4.54643 19.3192 4.46672 19.1119C4.38741 18.9057 4.3543 18.6846 4.36972 18.4642L4.46717 16.9528L3.94424 16.047L2.58663 15.3757C2.38804 15.2789 2.21311 15.1396 2.07417 14.9678C1.93452 14.7951 1.83467 14.5938 1.78171 14.3781L1.78075 14.3742C1.40642 12.8134 1.40642 11.1863 1.78074 9.62551L1.78169 9.62155C1.83466 9.40588 1.93453 9.20454 2.07418 9.03187C2.21312 8.86007 2.38804 8.72086 2.5866 8.62402L3.9443 7.95267L4.46723 7.04693L4.3698 5.53551C4.35438 5.31512 4.38749 5.09402 4.46681 4.8878C4.54653 4.68052 4.67098 4.49336 4.83128 4.33967L4.83419 4.33688C5.99868 3.23231 7.40784 2.41873 8.94667 1.96252L8.95058 1.96137ZM9.36956 3.40168C8.05996 3.79052 6.86062 4.48298 5.86908 5.42272C5.8681 5.42374 5.86733 5.42495 5.86682 5.42627C5.86626 5.42773 5.86603 5.4293 5.86614 5.43086L5.86656 5.43663L5.97873 7.17704C5.98826 7.32479 5.95383 7.47206 5.8798 7.60028L5.1298 8.89932C5.05577 9.02755 4.94544 9.131 4.81272 9.19662L3.24415 9.97224C3.24273 9.97293 3.24148 9.9739 3.24049 9.97512C3.2396 9.97622 3.23893 9.97749 3.23854 9.97886C2.9205 11.3074 2.92049 12.6922 3.23853 14.0207C3.23892 14.0222 3.23959 14.0235 3.24051 14.0246C3.2415 14.0258 3.24274 14.0268 3.24415 14.0275L3.24935 14.03L4.81266 14.8031C4.94539 14.8687 5.05571 14.9721 5.12974 15.1004L5.87974 16.3994C5.95378 16.5276 5.9882 16.6749 5.97867 16.8227L5.86609 18.5689C5.86598 18.5705 5.86619 18.572 5.86675 18.5735C5.86726 18.5748 5.86802 18.576 5.869 18.5771C6.86059 19.5168 8.06 20.2093 9.36967 20.5981C9.37099 20.5984 9.37237 20.5984 9.37373 20.5982C9.37457 20.5981 9.37539 20.5979 9.37617 20.5975C9.37683 20.5973 9.37745 20.5969 9.37805 20.5965L9.38283 20.5933L10.834 19.6259C10.9572 19.5438 11.1019 19.5 11.25 19.5H12.75C12.8981 19.5 13.0428 19.5438 13.166 19.6259L14.622 20.5966C14.6233 20.5974 14.6248 20.598 14.6263 20.5983C14.6277 20.5985 14.6291 20.5984 14.6305 20.5981C15.9401 20.2093 17.1394 19.5169 18.1309 18.5772C18.1319 18.5761 18.1327 18.5749 18.1333 18.5735C18.1338 18.5721 18.1341 18.5705 18.1339 18.5689L18.1335 18.5632L18.0214 16.8228C18.0118 16.675 18.0463 16.5277 18.1203 16.3995L18.8703 15.1005C18.9443 14.9722 19.0546 14.8688 19.1874 14.8032L20.7559 14.0276C20.7574 14.0269 20.7586 14.0259 20.7596 14.0247C20.7602 14.024 20.7606 14.0232 20.761 14.0225M20.7616 14.0209C21.0799 12.6912 21.0796 11.3051 20.7607 9.97543L21.49 9.80051L20.7616 9.97934C20.7613 9.97782 20.7606 9.97639 20.7596 9.97518C20.7586 9.97396 20.7574 9.97297 20.7559 9.97229L20.7507 9.96977L19.1874 9.19671C19.0547 9.13108 18.9444 9.02764 18.8703 8.89941L18.1203 7.60037C18.0463 7.47214 18.0119 7.32487 18.0214 7.17712L18.134 5.43088C18.1341 5.42931 18.1339 5.42774 18.1333 5.42628C18.1328 5.42495 18.1321 5.42374 18.1311 5.42272C17.1387 4.48217 15.9381 3.78935 14.6271 3.40071L14.8403 2.68164L14.631 3.40184C14.6295 3.40141 14.6279 3.40131 14.6264 3.40155C14.6248 3.40179 14.6233 3.40238 14.622 3.40326L14.6173 3.4065L13.1661 4.37384C13.0429 4.45597 12.8982 4.4998 12.7501 4.4998H11.2501C11.102 4.4998 10.9573 4.45597 10.8341 4.37384L9.3781 3.40323C9.37679 3.40234 9.37533 3.40174 9.37378 3.4015C9.37237 3.40128 9.37094 3.40134 9.36956 3.40168" fill="currentColor"/>\n</svg>\n'}))),i("mx-menu",{"data-testid":"multi-action-menu",ref:t=>this.actionMenu=t},this.multiRowActions.map((t=>i("mx-menu-item",Object.assign({},t),t.value))))));const h=i("div",{class:"grid gap-x-16 gap-y-12 pb-12",style:this.operationsBarStyle},this.checkable&&this.showCheckAll&&i("div",{class:"col-start-1 flex items-center min-h-36 space-x-16"},t,s),this.hasFilter&&i("div",{class:"flex items-center flex-wrap row-start-2 col-span-full sm:row-start-auto sm:col-span-1"},i("slot",{name:"filter"})),this.hasSearch&&i("div",{class:"justify-self-end",style:this.searchStyle},i("slot",{name:"search"})));return i(e,{class:"mx-table block"+(this.hoverable?" hoverable":"")+(this.paginate?" paginated":"")},this.showOperationsBar&&h,i("div",{"data-testid":"grid",class:"table-grid relative",style:this.gridStyle},i("div",{class:"header-row"},this.minWidths.sm&&!this.showOperationsBar&&t,this.minWidths.sm?this.cols.map(((t,s)=>i("div",{id:`column-header-${s}`,role:"columnheader",class:this.getHeaderClass(t,s),onClick:this.onHeaderClick.bind(this,t)},i("div",{class:"inline-flex items-center overflow-hidden whitespace-nowrap select-none"},i("span",{class:"truncate flex-shrink",innerHTML:t.heading}),!this.draggableRows&&t.sortable&&t.property&&i("div",{class:this.getHeaderArrowClass(t),"data-testid":"arrow",innerHTML:d}))))):i("div",{class:"flex items-stretch"},!this.showOperationsBar&&t,i("div",{id:`column-header-${this.exposedMobileColumnIndex}`,role:"columnheader",class:this.getHeaderClass(this.exposedMobileColumn,this.exposedMobileColumnIndex),onClick:this.onHeaderClick.bind(this,this.exposedMobileColumn)},i("div",{class:"inline-flex items-center overflow-hidden whitespace-nowrap select-none"},i("span",{class:"truncate flex-shrink",innerHTML:this.exposedMobileColumn.heading}),!this.draggableRows&&this.exposedMobileColumn.sortable&&this.exposedMobileColumn.property&&i("div",{class:this.getHeaderArrowClass(this.exposedMobileColumn),"data-testid":"arrow",innerHTML:d}))),i("div",{class:"flex items-center"},i("mx-icon-button",{"data-testid":"previous-column-button",chevronLeft:!0,disabled:0===this.exposedMobileColumnIndex,onClick:this.changeExposedColumnIndex.bind(this,-1)}),i("mx-icon-button",{"data-testid":"next-column-button",chevronRight:!0,disabled:this.exposedMobileColumnIndex===this.cols.length-1,onClick:this.changeExposedColumnIndex.bind(this,1)}))),this.minWidths.sm&&this.hasActionsColumn&&i("div",null)),this.showProgressBar&&i("div",null,i("div",{class:"block h-0 col-span-full"},i("mx-linear-progress",{class:"transform -translate-y-1/2",value:this.progressValue,"appear-delay":this.progressAppearDelay}))),i("slot",null),!this.hasDefaultSlot&&i("div",null,this.visibleRows.map(((t,s)=>i("mx-table-row",{"row-id":this.getRowId?this.getRowId(t):null,actions:this.getRowActions?this.getRowActions(t):void 0},this.cols.map((e=>i("mx-table-cell",{class:[this.getAlignClass(e),e.cellClass].join(" ")},i("div",{innerHTML:this.getCellValue(t,e,s)})))))))),i("div",{"data-testid":"empty-state",class:this.emptyStateClass},i("div",{class:"col-span-full p-16 text-4"},i("slot",{name:"empty-state"},i("span",null,"No results found.")))),this.paginate&&i("div",{class:"pagination-row"},i("mx-pagination",{page:this.page,"rows-per-page":this.rowsPerPage,rowsPerPageOptions:this.rowsPerPageOptions,"total-rows":this.serverPaginate?this.totalRows:this.rows.length,class:"col-span-full p-0 rounded-b-2xl",onMxPageChange:this.onMxPageChange.bind(this),disabled:this.disablePagination,disableNextPage:this.disableNextPage}))))}get element(){return h(this)}static get watchers(){return{sortBy:["onVisibleRowsChange","resetPage"],sortAscending:["onVisibleRowsChange","resetPage"],page:["onVisibleRowsChange","onPageChange"],rowsPerPage:["onVisibleRowsChange","resetPage"],rows:["onVisibleRowsChange","resetPage"]}}};export{C as mx_table}