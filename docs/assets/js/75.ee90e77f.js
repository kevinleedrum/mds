(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{376:function(t,e,a){"use strict";a.r(e);var s=a(13),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"responsive-design"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#responsive-design"}},[t._v("#")]),t._v(" Responsive Design")]),t._v(" "),e("p",[t._v("Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.")]),t._v(" "),e("p",[t._v("There are five breakpoints by default, inspired by common device resolutions:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Breakpoint prefix")]),t._v(" "),e("th",[t._v("Minimum width")]),t._v(" "),e("th",[t._v("CSS")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("code",[t._v("sm")])]),t._v(" "),e("td",[t._v("640px")]),t._v(" "),e("td",[e("code",[t._v("@media (min-width: 640px) { ... }")])])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("md")])]),t._v(" "),e("td",[t._v("768px")]),t._v(" "),e("td",[e("code",[t._v("@media (min-width: 768px) { ... }")])])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("lg")])]),t._v(" "),e("td",[t._v("1024px")]),t._v(" "),e("td",[e("code",[t._v("@media (min-width: 1024px) { ... }")])])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("xl")])]),t._v(" "),e("td",[t._v("1280px")]),t._v(" "),e("td",[e("code",[t._v("@media (min-width: 1280px) { ... }")])])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("2xl")])]),t._v(" "),e("td",[t._v("1536px")]),t._v(" "),e("td",[e("code",[t._v("@media (min-width: 1536px) { ... }")])])])])]),t._v(" "),e("p",[t._v("To add a utility but only have it take effect at a certain breakpoint, all you need to do is prefix the utility with the breakpoint name, followed by the "),e("code",[t._v(":")]),t._v(" character:")]),t._v(" "),e("div",{staticClass:"language-html line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- Width of 16 by default, 32 on medium screens, and 48 on large screens --\x3e")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("w-16 **md:w-32** **lg:w-48**"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("..."),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])]),e("p",[t._v("This works for "),e("strong",[t._v("every utility class in the framework")]),t._v(", which means you can change literally anything at a given breakpoint — even things like letter spacing or cursor styles.")]),t._v(" "),e("h2",{attrs:{id:"mobile-first"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mobile-first"}},[t._v("#")]),t._v(" Mobile First")]),t._v(" "),e("p",[t._v("By default, Tailwind uses a mobile first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.")]),t._v(" "),e("p",[t._v("What this means is that unprefixed utilities (like "),e("code",[t._v("uppercase")]),t._v(") take effect on all screen sizes, while prefixed utilities (like "),e("code",[t._v("md:uppercase")]),t._v(") only take effect at the specified breakpoint "),e("em",[t._v("and above")]),t._v(".")]),t._v(" "),e("h3",{attrs:{id:"targeting-mobile-screens"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#targeting-mobile-screens"}},[t._v("#")]),t._v(" Targeting mobile screens")]),t._v(" "),e("p",[t._v("Where this approach surprises people most often is that to style something for mobile, you need to use the unprefixed version of a utility, not the "),e("code",[t._v("sm:")]),t._v(" prefixed version. Don't think of "),e("code",[t._v("sm:")]),t._v(' as meaning "on small screens", think of it as "at the small '),e("em",[t._v("breakpoint")]),t._v('".')]),t._v(" "),e("p",[t._v("Don't use "),e("code",{attrs:{className:"text-4 font-bold text-gray-800"}},[t._v("sm:")]),t._v(" to target mobile devices")]),t._v(" "),e("div",{staticClass:"language-html line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- This will only center text on screens 640px and wider, not on small screens --\x3e")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("sm:text-center"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])]),e("p",[t._v("Use unprefixed utilities to target mobile, and override them at larger breakpoints")]),t._v(" "),e("div",{staticClass:"language-html line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- This will center text on mobile, and left align it on screens 640px and wider --\x3e")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text-center sm:text-left"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])]),e("p",[t._v("For this reason, it's often a good idea to implement the mobile layout for a design first, then layer on any changes that make sense for "),e("code",[t._v("sm")]),t._v(" screens, followed by "),e("code",[t._v("md")]),t._v(" screens, etc.")]),t._v(" "),e("h3",{attrs:{id:"targeting-a-single-breakpoint"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#targeting-a-single-breakpoint"}},[t._v("#")]),t._v(" Targeting a single breakpoint")]),t._v(" "),e("p",[t._v("Tailwind's breakpoints only include a "),e("code",[t._v("min-width")]),t._v(" and don't include a "),e("code",[t._v("max-width")]),t._v(", which means any utilities you add at a smaller breakpoint will also be applied at larger breakpoints.")]),t._v(" "),e("p",[t._v("If you'd like to apply a utility at one breakpoint only, the solution is to "),e("em",[t._v("undo")]),t._v(" that utility at larger sizes by adding another utility that counteracts it.")]),t._v(" "),e("p",[t._v("Here is an example where the background color is red at the "),e("code",[t._v("md")]),t._v(" breakpoint, but teal at every other breakpoint:")]),t._v(" "),e("div",{staticClass:"language-html line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("bg-teal-500 md:bg-red-500 lg:bg-teal-500"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- ... --\x3e")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("p",[t._v("Notice that "),e("strong",[t._v("we did not")]),t._v(" have to specify a background color for the "),e("code",[t._v("sm")]),t._v(" breakpoint or the "),e("code",[t._v("xl")]),t._v(" breakpoint — you only need to specify when a utility should "),e("em",[t._v("start")]),t._v(" taking effect, not when it should stop.")])])}),[],!1,null,null,null);e.default=n.exports}}]);