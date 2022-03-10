import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxCode } from '../mx-code';

describe('mx-code (code prop)', () => {
  let page: SpecPage;
  let root: HTMLMxCodeElement;
  let pre: HTMLPreElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCode],
      html: `<mx-code language="html" />`,
    });
    root = page.root as HTMLMxCodeElement;
    root.code = '<b>Hello</b>&nbsp;World';
    await page.waitForChanges();
    pre = root.querySelector('pre');
  });

  it('renders code passed via the code prop', () => {
    expect(pre.innerText).toBe('<b>Hello</b>&nbsp;World');
  });

  it('adds a language class for Prism based on the language prop', () => {
    expect(pre.classList.contains('language-html')).toBe(true);
  });

  it('adds the line-numbers class for Prism if showLineNumbers is true', async () => {
    root.showLineNumbers = true;
    await page.waitForChanges();
    expect(pre.classList.contains('line-numbers')).toBe(true);
  });

  it('sets the data-start attribute to the value of the lineNumberStart prop', async () => {
    root.showLineNumbers = true;
    root.lineNumberStart = 237;
    await page.waitForChanges();
    expect(pre.getAttribute('data-start')).toBe('237');
  });

  it('trims whitespace', async () => {
    root.code = ` <p>Test</p>  `;
    await page.waitForChanges();
    expect(root.innerText).toBe(`<p>Test</p>`);
  });
});

describe('mx-code (default slot)', () => {
  let page: SpecPage;
  let root: HTMLMxCodeElement;
  let pre: HTMLPreElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxCode],
      html: `
      <mx-code language="html">
        &lt;b&gt;Hello&lt;/b&gt;&amp;nbsp;World
      </mx-code>`,
    });
    root = page.root as HTMLMxCodeElement;
    pre = root.querySelector('pre');
    await page.waitForChanges();
  });

  it('renders code passed via the default slot', () => {
    expect(pre.innerText).toBe('<b>Hello</b>&nbsp;World');
  });
});
