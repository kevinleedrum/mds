import{r as t,c as s,h as i,H as e,g as h}from"./p-f1ddf482.js";const n=class{constructor(i){t(this,i),this.mxThumbnailChange=s(this,"mxThumbnailChange",7),this.hasInstructions=!1,this.hasSuccess=!1,this.hasError=!1,this.acceptImage=!0,this.acceptPdf=!1,this.assetName="image",this.avatar=!1,this.error=!1,this.uploadBtnType="contained",this.thumbnailSize="cover",this.isUploaded=!1,this.isUploading=!1,this.removeButtonLabel="Remove",this.showButton=!0,this.showIcon=!0,this.showDropzoneText=!0,this.uploadButtonLabel="Upload",this.isDraggingOver=!1,this.isFileSelected=!1}onThumbnailUrlChange(){this.thumbnailUrl&&(this.isUploaded=!0),this.mxThumbnailChange.emit(this.thumbnailUrl)}connectedCallback(){this.onThumbnailUrlChange()}componentWillRender(){this.hasInstructions=!!this.element.querySelector('[slot="instructions"]'),this.hasSuccess=!!this.element.querySelector('[slot="success"]'),this.hasError=!!this.element.querySelector('[slot="error"]')}async removeFile(){this.hasFile&&!this.isUploading&&(this.isFileSelected=!1,this.isUploaded=!1,this.isUploading=!1,this.fileInput.value="",this.fileInput.dispatchEvent(new window.Event("change",{bubbles:!0,cancelable:!0})),this.fileInput.dispatchEvent(new window.Event("input",{bubbles:!0,cancelable:!0})),this.mxThumbnailChange.emit(null))}async selectFile(){this.hasFile||(this.isFileSelected=!1,this.fileInput.value="",this.fileInput.click())}onButtonClick(t){t.stopPropagation(),t.preventDefault(),this.isUploading||(this.hasFile?this.removeFile():this.selectFile())}onInput(t){this.error=!1,this.isFileSelected=t.target.files&&t.target.files.length>0,this.isFileSelected?this.setThumnailDataUri(t.target.files[0]):this.thumbnailDataUri=null}setThumnailDataUri(t){if(this.thumbnailDataUri=null,!/\.(jpe?g|png|gif)$/i.test(t.name))return;const s=new FileReader;s.onload=()=>{this.thumbnailDataUri=s.result,this.mxThumbnailChange.emit(this.thumbnailDataUri)},s.readAsDataURL(t)}onDragOver(){this.isDraggingOver=!0}onDragLeave(){this.isDraggingOver=!1}get accept(){const t=[];return this.acceptImage&&t.push("image/*"),this.acceptPdf&&t.push(".pdf"),t.join(",")||null}get dropzoneWidth(){return this.width?this.width:this.avatar?"80px":"308px"}get dropzoneHeight(){return this.height?this.height:this.avatar?"80px":"auto"}get dropzoneClass(){let t="dropzone relative w-full h-full px-16 rounded-2xl overflow-hidden";return this.hasFile&&(t+=" opacity-0"),this.isDraggingOver&&(t+=" drag-over"),t+=this.showIcon&&this.showDropzoneText?" py-24":" py-16",t}get hasFile(){return this.isFileSelected||this.isUploaded}get thumbnailBackgroundImage(){let t=this.thumbnailUrl;return this.isFileSelected&&(t=this.thumbnailDataUri),t?`url(${t})`:null}get thumbnailBackgroundSize(){return["contain","cover","auto","stretch"].includes(this.thumbnailSize)?"stretch"===this.thumbnailSize?"100% 100%":this.thumbnailSize:"cover"}render(){let t;return t=i("i",this.icon?{"data-testid":"upload-icon",class:"dropzone-icon "+this.icon}:this.avatar?{"data-testid":"avatar-icon",class:"mds-user-circle text-icon"}:{"data-testid":"image-icon",class:"mds-image text-icon"+(this.showDropzoneText?" mb-8":"")}),i(e,{class:"mx-image-upload block"},i("div",{"data-testid":"dropzone-wrapper",class:"dropzone-wrapper flex w-full items-center justify-center relative rounded-2xl text-3 overflow-hidden",style:{height:this.dropzoneHeight,width:this.dropzoneWidth}},i("div",{class:this.dropzoneClass},i("div",{class:"flex flex-col items-center justify-center w-full h-full"},this.showIcon&&t,i("slot",{name:"dropzone-text"},i("div",{"data-testid":"dropzone-text",class:"text-center"+(this.showDropzoneText&&!this.avatar?"":" hidden")},i("p",{class:"subtitle1 my-0"},"No ",this.assetName," to show"),i("p",{class:"text-4 my-0 mt-4"},"Click to add ",this.assetName)))),i("svg",{class:"dashed-border absolute inset-0 pointer-events-none",width:"100%",height:"100%"},i("rect",{width:"100%",height:"100%",fill:"none",rx:"16",ry:"16","stroke-width":"1","stroke-dasharray":"4,8"})),i("input",{ref:t=>this.fileInput=t,id:this.inputId,name:this.name,type:"file",accept:this.accept,"aria-label":this.elAriaLabel,class:"absolute inset-0 w-full h-full opacity-0 cursor-pointer",onInput:this.onInput.bind(this),onDragOver:this.onDragOver.bind(this),onDragLeave:this.onDragLeave.bind(this),onDrop:this.onDragLeave.bind(this)})),this.hasFile&&this.thumbnailBackgroundImage&&i("div",{"data-testid":"thumbnail",class:"thumbnail absolute inset-0 bg-center bg-no-repeat pointer-events-none",style:{backgroundImage:this.thumbnailBackgroundImage,backgroundSize:this.thumbnailBackgroundSize}}),i("div",{"data-testid":"uploaded",class:"flex items-center justify-center absolute inset-0 pointer-events-none "+(this.isUploaded?"":" hidden")},i("slot",{name:"uploaded"})),this.isUploading&&i("div",{"data-testid":"progress",class:"uploading-progress flex items-center justify-center opacity-50 absolute inset-0"},i("mx-circular-progress",{size:"2rem"}))),this.showButton&&i("mx-button",{"data-testid":"upload-button",class:"mt-16",btnType:this.hasFile&&!this.isUploading?"outlined":this.uploadBtnType,onClick:this.onButtonClick.bind(this),disabled:this.isUploading},this.hasFile&&!this.isUploading?this.removeButtonLabel:this.uploadButtonLabel),(this.hasInstructions||this.assistiveText)&&i("p",{class:"caption1 my-16"},i("slot",{name:"instructions"},this.assistiveText)),this.hasSuccess&&i("p",{class:"upload-success caption1 my-16"},i("slot",{name:"success"})),this.hasError&&i("p",{class:"upload-error caption1 my-16"},i("slot",{name:"error"})))}get element(){return h(this)}static get watchers(){return{thumbnailUrl:["onThumbnailUrlChange"]}}};export{n as mx_image_upload}