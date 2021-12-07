import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
export declare class MxCode {
  codeEl: HTMLElement;
  codeHTML: string;
  /** Unescaped code to format and display.  Escaped code may be placed inside the default slot instead. */
  code: string;
  /** The language of the code.  Add a `diff-` prefix for diff highlighting.  See [Supported languages](#supported-languages) */
  language: string;
  lineNumberStart: number;
  showLineNumbers: boolean;
  element: HTMLMxCodeElement;
  connectedCallback(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  get preClass(): string;
  get languageClass(): string;
  render(): any;
}
