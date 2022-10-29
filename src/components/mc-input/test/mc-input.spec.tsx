import { newSpecPage } from '@stencil/core/testing';
import { McInput } from '../mc-input';

describe('mc-input', () => {
  let page;
  let root: HTMLMcInputElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [McInput],
      html: `
        <mc-input
          type="text"
          name="foo"
          value="bar"
          inputId="bloop"
          label="Enter Something"
          placeholder="Enter Something"
          instructions="Enter something into the input, ya heard?"
          elAriaLabel="Input for Something"
          leftIcon="ph-apple-logo"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('renders', async () => {
    const elems = document.getElementsByTagName('mc-input');
    expect(elems.length).toBe(1);
  });

  it('assigns proper value for placeholder', async () => {
    const placeholder = input.getAttribute('placeholder');
    expect(placeholder).toBe('Enter Something');
  });

  it('has the right name, value and type', async () => {
    expect(input.getAttribute('name')).toBe('foo');
    expect(input.value).toBe('bar');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('updates the value prop when the input value is changed', async () => {
    root.value = 'bop';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(input.value).toBe('bop');
  });
});
