(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{312:function(t,s,e){"use strict";e.r(s);var a={mounted(){setTimeout(()=>{const t=this.$refs.code.getBoundingClientRect();this.$refs.code.style.position="absolute",this.$refs.code.style.top=t.top+"px",this.$refs.code.style.left=t.left+"px",this.$refs.code.style.width=t.width+"px",this.$refs.code.style.height=t.height+"px",document.querySelector(".page").appendChild(this.$refs.code),this.$refs.placeholder.style.height=t.height+"px"},200);const t=()=>{this.$refs.code.style.top=this.$refs.placeholder.offsetTop+"px",this.$refs.code.style.left=this.$refs.placeholder.offsetLeft+"px",this.$refs.code.style.width=this.$refs.placeholder.offsetWidth+"px",this.$refs.code.style.height=this.$refs.placeholder.offsetHeight+"px"};window.addEventListener("resize",t),this.$once("hook:beforeDestroy",()=>{window.removeEventListener("resize",t),this.$refs.code.remove()})}},n=e(13),r=Object(n.a)(a,(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"code-blocks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#code-blocks"}},[t._v("#")]),t._v(" Code Blocks")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("mx-code")]),t._v(" component renders code snippets with syntax highlighting (via "),s("a",{attrs:{href:"https://prismjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Prism"),s("OutboundLink")],1),t._v(") and (optionally) line numbers.")]),t._v(" "),s("p",[t._v("For code that is unescaped, it is safer to pass it into the component via the "),s("code",[t._v("code")]),t._v(" prop. Otherwise, it can simply be placed in the default slot. The language must be specified via the "),s("code",[t._v("language")]),t._v(" prop in order for syntax highlighting to function.")]),t._v(" "),s("section",{staticClass:"mds"},[s("div",{ref:"placeholder"}),t._v(" "),s("div",{ref:"code",staticClass:"mds"},[s("mx-code",{attrs:{language:"html",code:"<p>HTML&nbsp;Example</p>"}}),t._v(" "),s("mx-code",{attrs:{language:"js"}},[t._v("\n      const language = 'js'\n    ")]),t._v(" "),s("mx-code",{attrs:{language:"json"}},[t._v('\n      {\n        "json": "json"\n      }\n    ')]),t._v(" "),s("mx-code",{attrs:{language:"css","show-line-numbers":"","line-number-start":"237"}},[t._v("\n      /* This CSS example has line numbers. */\n      .danger {\n        color: #f00;\n      }\n    ")]),t._v(" "),s("mx-code",{attrs:{language:"diff-typescript"}},[t._v("\n      @@ -2,3 +2,3 @@\n        // This example has diff highlighting.\n      - let dude = 'Lebowski';\n      + const dude = 'Lebowski';\n        console.log(`The ${dude} abides`);\n    ")])],1)]),t._v(" "),s("h4",{attrs:{id:"source-for-the-above-examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#source-for-the-above-examples"}},[t._v("#")]),t._v(" Source for the above examples:")]),t._v(" "),s("div",{staticClass:"language-md line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-md"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-code")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("language")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("html"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("code")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("<p>HTML"),s("span",{pre:!0,attrs:{class:"token entity named-entity",title:"&nbsp;"}},[t._v("&nbsp;")]),t._v("Example</p>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-code")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("language")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  const language = 'js'\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-code")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-code")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("language")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("json"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('\n  {\n    "json": "json"\n  }\n'),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-code")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-code")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("language")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("css"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("show-line-numbers")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("line-number-start")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("237"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  /"),s("span",{pre:!0,attrs:{class:"token italic"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("*")]),s("span",{pre:!0,attrs:{class:"token content"}},[t._v(" This CSS example has line numbers. ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("*")])]),t._v("/\n  .danger {\n    color: #f00;\n  }\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-code")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-code")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("language")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("diff-typescript"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  @@ -2,3 +2,3 @@\n    // This example has diff highlighting.\n  "),s("span",{pre:!0,attrs:{class:"token list punctuation"}},[t._v("-")]),t._v(" let dude = 'Lebowski';\n  "),s("span",{pre:!0,attrs:{class:"token list punctuation"}},[t._v("+")]),t._v(" const dude = 'Lebowski';\n    console.log("),s("span",{pre:!0,attrs:{class:"token code-snippet code keyword"}},[t._v("`The ${dude} abides`")]),t._v(");\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-code")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br")])]),s("h3",{attrs:{id:"supported-languages"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#supported-languages"}},[t._v("#")]),t._v(" Supported languages")]),t._v(" "),s("p",[t._v("The following keywords are currently supported for the "),s("code",[t._v("language")]),t._v(" prop:")]),t._v(" "),s("p",[s("code",[t._v("atom")]),t._v(", "),s("code",[t._v("clike")]),t._v(", "),s("code",[t._v("css")]),t._v(", "),s("code",[t._v("diff")]),t._v(", "),s("code",[t._v("html")]),t._v(", "),s("code",[t._v("javascript")]),t._v(", "),s("code",[t._v("js")]),t._v(", "),s("code",[t._v("json")]),t._v(", "),s("code",[t._v("markup")]),t._v(", "),s("code",[t._v("mathml")]),t._v(", "),s("code",[t._v("rss")]),t._v(", "),s("code",[t._v("ruby")]),t._v(", "),s("code",[t._v("sql")]),t._v(", "),s("code",[t._v("ssml")]),t._v(", "),s("code",[t._v("svg")]),t._v(", "),s("code",[t._v("ts")]),t._v(", "),s("code",[t._v("typescript")]),t._v(", "),s("code",[t._v("xml")])]),t._v(" "),s("h3",{attrs:{id:"properties"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#properties"}},[t._v("#")]),t._v(" Properties")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Property")]),t._v(" "),s("th",[t._v("Attribute")]),t._v(" "),s("th",[t._v("Description")]),t._v(" "),s("th",[t._v("Type")]),t._v(" "),s("th",[t._v("Default")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[s("code",[t._v("code")])]),t._v(" "),s("td",[s("code",[t._v("code")])]),t._v(" "),s("td",[t._v("Unescaped code to format and display. Escaped code may be placed inside the default slot instead.")]),t._v(" "),s("td",[s("code",[t._v("string")])]),t._v(" "),s("td",[s("code",[t._v("undefined")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("language")])]),t._v(" "),s("td",[s("code",[t._v("language")])]),t._v(" "),s("td",[t._v("The language of the code. Add a "),s("code",[t._v("diff-")]),t._v(" prefix for diff highlighting. See "),s("a",{attrs:{href:"#supported-languages"}},[t._v("Supported languages")])]),t._v(" "),s("td",[s("code",[t._v("string")])]),t._v(" "),s("td",[s("code",[t._v("'none'")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("lineNumberStart")])]),t._v(" "),s("td",[s("code",[t._v("line-number-start")])]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("number")])]),t._v(" "),s("td",[s("code",[t._v("1")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("showLineNumbers")])]),t._v(" "),s("td",[s("code",[t._v("show-line-numbers")])]),t._v(" "),s("td"),t._v(" "),s("td",[s("code",[t._v("boolean")])]),t._v(" "),s("td",[s("code",[t._v("false")])])])])])])}),[],!1,null,null,null);s.default=r.exports}}]);