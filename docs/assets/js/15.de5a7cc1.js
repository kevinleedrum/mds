(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{311:function(t,a,s){"use strict";s.r(a);var n={data:()=>({isDialogOpen:!1}),methods:{advancedAlert(){this.$refs.dialog.alert("This alert has a heading and a custom confirmation button label.",{heading:"Alert!",confirmLabel:"Okey dokey"})},async confirmation(){const t=await this.$refs.dialog.confirm("Are you sure about this?");this.$refs.dialog.alert(t?"You clicked Okay.":"You did not click Okay.")},async advancedConfirmation(){const t=await this.$refs.dialog.confirm("Would you like some pancakes?",{heading:"Pancakes",confirmLabel:"Yes please",cancelLabel:"No, I do not want pancakes"});this.$refs.dialog.alert(t?"You accepted the pancakes.":"You declined the pancakes.")}}},e=s(13),r=Object(e.a)(n,(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"dialogs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dialogs"}},[t._v("#")]),t._v(" Dialogs")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("mx-dialog")]),t._v(" component is used to inform users about a task and can contain critical information, require decisions, or involve multiple tasks. For more complex UI, a "),a("RouterLink",{attrs:{to:"/components/modals.html"}},[t._v("Modal")]),t._v(" may be preferrable. If user interruption is not strictly required, consider using a "),a("RouterLink",{attrs:{to:"/components/banners.html"}},[t._v("Banner")]),t._v(" or "),a("RouterLink",{attrs:{to:"/components/snackbars.html"}},[t._v("Snackbar")]),t._v(" instead.")],1),t._v(" "),a("h3",{attrs:{id:"simple-dialogs-via-methods"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#simple-dialogs-via-methods"}},[t._v("#")]),t._v(" Simple dialogs via methods")]),t._v(" "),a("p",[t._v("Currently, "),a("code",[t._v("mx-dialog")]),t._v(" exposes two methods: "),a("code",[t._v("alert()")]),t._v(" and "),a("code",[t._v("confirm()")]),t._v(", which are intended to be replacements for "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/alert",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Window.alert()")]),a("OutboundLink")],1),t._v(" and "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Window.confirm()")]),a("OutboundLink")],1),t._v(" respectively. The signatures for these two methods are identical, but with different default values for "),a("code",[t._v("confirmLabel")]),t._v(" and "),a("code",[t._v("cancelLabel")]),t._v(" (to match the behavior of the aforementioned "),a("code",[t._v("Window")]),t._v(" methods).")]),t._v(" "),a("p",[t._v("For simple dialogs without markup, it is possible to use a single instance of the "),a("code",[t._v("mx-dialog")]),t._v(" element to invoke every dialog needed for the page.")]),t._v(" "),a("section",{staticClass:"mds"},[a("div",{staticClass:"flex flex-col items-start space-y-20"},[a("mx-button",{on:{click:()=>t.$refs.dialog.alert("Greetings!")}},[t._v("Basic Alert Call")]),t._v(" "),a("mx-button",{on:{click:t.advancedAlert}},[t._v("Advanced Alert Call")]),t._v(" "),a("mx-button",{on:{click:t.confirmation}},[t._v("Basic Confirm Call")]),t._v(" "),a("mx-button",{on:{click:t.advancedConfirmation}},[t._v("Advanced Confirm Call")]),t._v(" "),a("mx-dialog",{ref:"dialog"})],1)]),t._v(" "),a("div",{staticClass:"language-md line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-md"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("() => $refs.dialog.alert('Greetings!')"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Basic Alert Call"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("advancedAlert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Advanced Alert Call"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("confirmation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Basic Confirm Call"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("advancedConfirmation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Advanced Confirm Call"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-dialog")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("ref")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dialog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("div",{staticClass:"language-md line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-md"}},[a("code",[t._v("advancedAlert() {\n  const options = { heading: 'Alert!', confirmLabel: 'Okey dokey'}\n  this.$refs.dialog.alert('This alert has a heading and a custom confirmation button label.', options)\n},\nasync confirmation() {\n  const confirmed = await this.$refs.dialog.confirm('Are you sure about this?')\n  this.$refs.dialog.alert(confirmed ? 'You clicked Okay.' : 'You did not click Okay.')\n},\nasync advancedConfirmation() {\n  const options = { heading: 'Pancakes', confirmLabel: 'Yes please', cancelLabel: 'No, I do not want pancakes'}\n  const confirmed = await this.$refs.dialog.confirm('Would you like some pancakes?', options)\n  this.$refs.dialog.alert(confirmed ? 'You accepted the pancakes.' : 'You declined the pancakes.')\n}")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("h3",{attrs:{id:"advanced-dialogs-via-slots"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#advanced-dialogs-via-slots"}},[t._v("#")]),t._v(" Advanced dialogs via slots")]),t._v(" "),a("p",[t._v("For more advanced dialog layouts, pass the markup into the default slot, as well as the "),a("code",[t._v("heading")]),t._v(" and "),a("code",[t._v("buttons")]),t._v(" slots, and use the "),a("code",[t._v("isOpen")]),t._v(" prop to toggle the dialog. The dialog\nemits an "),a("code",[t._v("mxClose")]),t._v(" event that may be useful to update the "),a("code",[t._v("isOpen")]),t._v(" boolean in state.")]),t._v(" "),a("section",{staticClass:"mds"},[a("div",{staticClass:"flex flex-col items-start space-y-20"},[a("mx-button",{on:{click:function(a){t.isDialogOpen=!t.isDialogOpen}}},[t._v("Open Dialog")]),t._v(" "),a("mx-dialog",{attrs:{"modal-class":"w-320 sm:w-480 max-h-480"},domProps:{isOpen:t.isDialogOpen},on:{mxClose:function(a){t.isDialogOpen=!1}}},[a("span",{attrs:{slot:"heading"},slot:"heading"},[t._v("Create new audience with selected")]),t._v(" "),a("mx-input",{attrs:{label:"Audience Name"}}),t._v(" "),a("p",{staticClass:"my-16"},[t._v("4,800 contacts will be added to this audience.")]),t._v(" "),a("p",[t._v("\n        We only wear jeans or track pants on Friday. You can’t wear a tank top two days in a row. You can only wear your hair in a ponytail once a week. So, I guess, you picked today. And if you break any of these rules you can’t sit with us at lunch. I mean, not just you, any of us. Like, if I was wearing jeans today, I would be sitting over there with the art freaks.\n      ")]),t._v(" "),a("p",[t._v("\n        We always vote before we ask someone to eat lunch with us, because you have to be considerate of the rest of the group. I mean, you wouldn’t buy a skirt without asking your friends first if it looks good on you. It’s the same with guys. You may think you like someone, but you could be wrong.\n      ")]),t._v(" "),a("div",{attrs:{slot:"buttons"},slot:"buttons"},[a("mx-button",{attrs:{"btn-type":"text"},on:{click:function(a){t.isDialogOpen=!1}}},[t._v("\n          Cancel\n        ")]),t._v(" "),a("mx-button",{attrs:{"btn-type":"text"},on:{click:function(a){t.isDialogOpen=!1}}},[t._v("\n          Save & Add\n        ")])],1)],1)],1)]),t._v(" "),a("div",{staticClass:"language-md line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-md"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isDialogOpen = !isDialogOpen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Open Dialog"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-dialog")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":is-open.prop")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isDialogOpen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("modal-class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("w-320 sm:w-480 max-h-480"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@mxClose")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isDialogOpen = false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("span")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("slot")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("heading"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Create new audience with selected"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("label")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("Audience Name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("my-16"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("4,800 contacts will be added to this audience."),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    We only wear jeans or track pants on Friday. You can’t wear a tank top two days in a row. You can only wear your hair in a ponytail once a week. So, I guess, you picked today. And if you break any of these rules you can’t sit with us at lunch. I mean, not just you, any of us. Like, if I was wearing jeans today, I would be sitting over there with the art freaks.\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    We always vote before we ask someone to eat lunch with us, because you have to be considerate of the rest of the group. I mean, you wouldn’t buy a skirt without asking your friends first if it looks good on you. It’s the same with guys. You may think you like someone, but you could be wrong.\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("slot")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("buttons"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("btn-type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isDialogOpen = false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      Cancel\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mx-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("btn-type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isDialogOpen = false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      Save "),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:"&"}},[t._v("&amp;")]),t._v(" Add\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mx-dialog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br")])]),a("h3",{attrs:{id:"properties"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#properties"}},[t._v("#")]),t._v(" Properties")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Property")]),t._v(" "),a("th",[t._v("Attribute")]),t._v(" "),a("th",[t._v("Description")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Default")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("isOpen")])]),t._v(" "),a("td",[a("code",[t._v("is-open")])]),t._v(" "),a("td",[t._v("Toggles the visibility of the dialog (when using the slots for content).")]),t._v(" "),a("td",[a("code",[t._v("boolean")])]),t._v(" "),a("td",[a("code",[t._v("false")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("modalClass")])]),t._v(" "),a("td",[a("code",[t._v("modal-class")])]),t._v(" "),a("td",[t._v("Additional classes to apply to the inner modal element.")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[a("code",[t._v("undefined")])])])])]),t._v(" "),a("h3",{attrs:{id:"methods"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#methods"}},[t._v("#")]),t._v(" Methods")]),t._v(" "),a("h4",{attrs:{id:"alert-message-string-confirmlabel-cancellabel-heading-dialogoptions-promise-void"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#alert-message-string-confirmlabel-cancellabel-heading-dialogoptions-promise-void"}},[t._v("#")]),t._v(" "),a("code",[t._v("alert(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions) => Promise<void>")])]),t._v(" "),a("p",[t._v("A Promise-based replacement for "),a("code",[t._v("Window.alert()")]),t._v(" with some additional options")]),t._v(" "),a("h4",{attrs:{id:"confirm-message-string-confirmlabel-cancellabel-heading-dialogoptions-promise-boolean"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#confirm-message-string-confirmlabel-cancellabel-heading-dialogoptions-promise-boolean"}},[t._v("#")]),t._v(" "),a("code",[t._v("confirm(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions) => Promise<boolean>")])]),t._v(" "),a("p",[t._v("A Promise-based replacement for "),a("code",[t._v("Window.confirm()")]),t._v(" that resolves to a boolean")]),t._v(" "),a("h3",{attrs:{id:"events"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Event")]),t._v(" "),a("th",[t._v("Description")]),t._v(" "),a("th",[t._v("Type")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("mxClose")])]),t._v(" "),a("td"),t._v(" "),a("td",[a("code",[t._v("CustomEvent<void>")])])])])]),t._v(" "),a("h3",{attrs:{id:"css-variables"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css-variables"}},[t._v("#")]),t._v(" CSS Variables")]),t._v(" "),a("div",{staticClass:"language-scss line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-scss"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Dialogs */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("--mds-bg-dialog-backdrop")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rgba")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0.5"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("--mds-bg-dialog-scroll-thumb")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #d4d4d4"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("--mds-bg-dialog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #f8f8f8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("--mds-text-dialog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #333"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);