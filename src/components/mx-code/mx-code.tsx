import { Component, Host, h, Element, Prop } from '@stencil/core';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/components/prism-json';

Prism.manual = true;

@Component({
  tag: 'mx-code',
  shadow: false,
})
export class MxCode {
  codeEl: HTMLElement;
  codeHTML: string;

  @Prop() code: string;
  @Prop() language = 'none';
  @Prop() lineNumberStart = 0;
  @Prop() showLineNumbers = false;

  @Element() element: HTMLMxCodeElement;

  connectedCallback() {
    Prism.plugins.NormalizeWhitespace.setDefaults({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true,
    });
    if (this.code != null) {
      this.codeHTML = Prism.highlight(this.code, Prism.languages[this.language], this.language);
    }
  }

  componentDidRender() {
    Prism.highlightElement(this.codeEl);
  }

  get preClass() {
    let str = 'text-3 p-16';
    str += ` language-` + this.language;
    if (this.showLineNumbers) str += ' line-numbers';
    return str;
  }

  render() {
    return (
      <Host class="mx-code">
        <pre class={this.preClass}>
          <code ref={el => (this.codeEl = el)} class={`language-` + this.language} innerHTML={this.codeHTML}>
            <slot></slot>
          </code>
        </pre>
      </Host>
    );
  }
}
