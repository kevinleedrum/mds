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

@Component({
  tag: 'mx-code',
  shadow: false,
})
export class MxCode {
  codeEl: HTMLElement;
  codeHTML: string;

  /** Unescaped code to format and display.  Escaped code may be placed inside the default slot instead. */
  @Prop() code: string;
  /** The language of the code.  Add a `diff-` prefix for diff highlighting.  See [Supported languages](#supported-languages) */
  @Prop() language = 'none';
  @Prop() lineNumberStart = 1;
  @Prop() showLineNumbers = false;

  @Element() element: HTMLMxCodeElement;

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
    if (this.showLineNumbers) str += ' line-numbers';
    return str;
  }

  get languageClass() {
    let str = 'language';
    str += '-' + this.language;
    if (this.language.startsWith('diff')) str += ' diff-highlight';
    return str;
  }

  render() {
    return (
      <Host class="mx-code">
        <pre class={this.preClass} data-start={this.showLineNumbers ? this.lineNumberStart : null}>
          <code ref={el => (this.codeEl = el)} class={this.languageClass} innerHTML={this.codeHTML}>
            <slot></slot>
          </code>
        </pre>
      </Host>
    );
  }
}
