import { Component, Host, h, Element, Prop } from '@stencil/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
Prism.manual = true;
export class MxCode {
  constructor() {
    /** The language of the code.  Add a `diff-` prefix for diff highlighting.  See [Supported languages](#supported-languages) */
    this.language = 'none';
    this.lineNumberStart = 1;
    this.showLineNumbers = false;
  }
  connectedCallback() {
    Prism.plugins.NormalizeWhitespace.setDefaults({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true,
    });
  }
  componentWillRender() {
    if (this.code != null) {
      this.codeHTML = Prism.highlight(this.code, Prism.languages[this.language], this.language);
    }
  }
  componentDidRender() {
    Prism.highlightElement(this.codeEl);
  }
  get preClass() {
    let str = 'text-4 p-16 rounded-lg';
    str += ' ' + this.languageClass;
    if (this.showLineNumbers)
      str += ' line-numbers';
    return str;
  }
  get languageClass() {
    let str = 'language';
    str += '-' + this.language;
    if (this.language.startsWith('diff'))
      str += ' diff-highlight';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-code" },
      h("pre", { class: this.preClass, "data-start": this.showLineNumbers ? this.lineNumberStart : null },
        h("code", { ref: el => (this.codeEl = el), class: this.languageClass, innerHTML: this.codeHTML },
          h("slot", null)))));
  }
  static get is() { return "mx-code"; }
  static get properties() { return {
    "code": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Unescaped code to format and display.  Escaped code may be placed inside the default slot instead."
      },
      "attribute": "code",
      "reflect": false
    },
    "language": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The language of the code.  Add a `diff-` prefix for diff highlighting.  See [Supported languages](#supported-languages)"
      },
      "attribute": "language",
      "reflect": false,
      "defaultValue": "'none'"
    },
    "lineNumberStart": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "line-number-start",
      "reflect": false,
      "defaultValue": "1"
    },
    "showLineNumbers": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-line-numbers",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "element"; }
}
