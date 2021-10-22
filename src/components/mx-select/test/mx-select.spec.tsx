import { newSpecPage } from '@stencil/core/testing';
import { MxSelect } from '../mx-select';

describe('mx-select', () => {
  let page;
  let root: HTMLMxSelectElement;
  let select: HTMLSelectElement;
  let selectWrapper: Element;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxSelect],
      html: `<mx-select
          label="Test Label"
          suffix="SUFFIX"
          value="A"
          assistive-text="This is a test"
          select-id="test-id"
          name="test-name"
          label-class="text-blue-500"
          error
          data-test="test"
        >
        <option></option>
        <option>A</option>
        <option>B</option>
      </mx-select`,
    });
    root = page.root;
    select = root.querySelector('select');
    selectWrapper = root.querySelector('[data-testid="select-wrapper"]');
  });

  it('renders a select', async () => {
    expect(select).not.toBeNull();
  });

  it('renders the label with any additional classes from the labelClass prop', async () => {
    const label = root.querySelector('label');
    expect(label.innerText).toBe('Test Label');
    expect(label.getAttribute('class')).toContain('text-blue-500');
  });

  it('sets the initial value', async () => {
    expect(select.value).toBe('A');
  });

  it('renders the assistive text', async () => {
    expect(root.innerHTML).toContain('This is a test');
  });

  it('renders the suffix', async () => {
    expect(selectWrapper.innerHTML).toContain('SUFFIX');
  });

  it('uses the selectId prop for the id attribute', async () => {
    expect(select.getAttribute('id')).toBe('test-id');
  });

  it('uses the label prop for the aria-label attribute', async () => {
    expect(select.getAttribute('aria-label')).toBe('Test Label');
  });

  it('uses the ariaLabel prop for the aria-label attribute', async () => {
    root.label = '';
    root.ariaLabel = 'Hidden Label';
    await page.waitForChanges();
    expect(select.getAttribute('aria-label')).toBe('Hidden Label');
  });

  it('uses the name prop for the name attribute', async () => {
    expect(select.getAttribute('name')).toBe('test-name');
  });

  it('adds an "error" class when the error prop is set', async () => {
    expect(selectWrapper.getAttribute('class')).toContain('error');
  });

  it('updates the select.value when the value prop changes', async () => {
    root.value = 'B';
    await page.waitForChanges();
    expect(select.value).toBe('B');
  });

  it('updates the value prop when select.value changes', async () => {
    select.value = 'B';
    select.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(root.value).toBe('B');
  });

  it('is 48px tall by default', async () => {
    expect(selectWrapper.getAttribute('class')).toContain('h-48');
  });

  it('sets the height to 36px when the dense prop is set', async () => {
    root.dense = true;
    await page.waitForChanges();
    expect(selectWrapper.getAttribute('class')).toContain('h-36');
  });

  it('adds an "elevated" class when the elevated prop is set', async () => {
    root.elevated = true;
    await page.waitForChanges();
    expect(selectWrapper.getAttribute('class')).toContain('elevated');
  });

  it('adds a "flat" class when the flat prop is set', async () => {
    root.flat = true;
    await page.waitForChanges();
    expect(selectWrapper.getAttribute('class')).toContain('flat');
  });

  it('disables the select when the disabled prop is set', async () => {
    root.disabled = true;
    await page.waitForChanges();
    expect(select.getAttribute('disabled')).not.toBeNull();
  });

  it('displays an error icon when the error prop is set', async () => {
    expect(selectWrapper.querySelector('[data-testid="error-icon"]')).not.toBeNull();
  });

  it('displays an arrow SVG when the error prop is NOT set', async () => {
    root.error = false;
    await page.waitForChanges();
    expect(selectWrapper.querySelector('[data-testid=arrow]')).not.toBeNull();
  });

  it('renders a floating label if the float-label prop is set', async () => {
    let label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(false);
    root.floatLabel = true;
    await page.waitForChanges();
    label = selectWrapper.querySelector('label');
    expect(label.classList.contains('floating')).toBe(true);
  });

  it('applies any data attributes to the select element', async () => {
    expect(select.getAttribute('data-test')).toBe('test');
  });
});
