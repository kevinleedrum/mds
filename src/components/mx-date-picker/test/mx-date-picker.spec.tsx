import '../../../utils/matchMedia.mock';
import '../../../utils/js-datepicker.mock';
import { newSpecPage } from '@stencil/core/testing';
import { MxDatePicker } from '../mx-date-picker';

global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  callback(0);
  return 0;
};

describe('mx-date-picker', () => {
  let page;
  let root: HTMLMxDatePickerElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxDatePicker],
      html: `
        <mx-date-picker
          label="Date"
          el-aria-label="aria label"
          input-id="test-id"
          name="test-name"
          value="2021-04-01"
          assistive-text="Enter a valid date"
          data-test="test"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('renders the label text', async () => {
    const label = root.querySelector('label');
    expect(label.textContent).toBe('Date');
  });

  it('uses a date input by default if supported', async () => {
    expect(input.type).toBe('date');
  });

  it('assigns name and id attributes to the input element', async () => {
    expect(input.getAttribute('name')).toBe('test-name');
    expect(input.getAttribute('id')).toBe('test-id');
  });

  it('sets the height to 36px if dense prop is set', async () => {
    const elem = root.querySelector('.picker-wrapper');
    expect(elem.getAttribute('class')).toContain('h-48');
    root.dense = true;
    await page.waitForChanges();
    expect(elem.getAttribute('class')).toContain('h-36');
  });

  it('renders the assistive text', async () => {
    const assitive = root.querySelector('[data-testid="assistive-text"]');
    expect(assitive.textContent).toBe('Enter a valid date');
  });

  it('disables the input and calendar button based on the disabled prop', async () => {
    const calendarButton = root.querySelector('[data-testid="calendar-button"]');
    expect(input.getAttribute('disabled')).toBeNull();
    expect(calendarButton.getAttribute('disabled')).toBeNull();
    root.disabled = true;
    await page.waitForChanges();
    expect(input.getAttribute('disabled')).not.toBeNull();
    expect(calendarButton.getAttribute('disabled')).not.toBeNull();
  });

  it('sets the min and max attributes based on the prop values', async () => {
    root.min = '2020-01-01';
    root.max = '2020-01-02';
    await page.waitForChanges();
    expect(input.getAttribute('min')).toBe('2020-01-01');
    expect(input.getAttribute('max')).toBe('2020-01-02');
  });

  it('sets the min to today if allowPast is false', async () => {
    root.allowPast = false;
    await page.waitForChanges();
    expect(input.getAttribute('min')).toBe(new Date().toISOString().split('T')[0]);
  });

  it('sets the max to today if allowFuture is false', async () => {
    root.allowFuture = false;
    await page.waitForChanges();
    expect(input.getAttribute('max')).toBe(new Date().toISOString().split('T')[0]);
  });

  it('renders a floating label if the float-label prop is set', async () => {
    let label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(false);
    root.floatLabel = true;
    await page.waitForChanges();
    label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(true);
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(input.getAttribute('aria-label')).toBe('aria label');
  });

  it('applies any data attributes to the input element', async () => {
    expect(input.getAttribute('data-test')).toBe('test');
  });
});
