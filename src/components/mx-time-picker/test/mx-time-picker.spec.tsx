import '../../../utils/matchMedia.mock';
import { newSpecPage } from '@stencil/core/testing';
import { MxTimePicker } from '../mx-time-picker';
import { MxMenuItem } from '../../mx-menu-item/mx-menu-item';
import { MxMenu } from '../../mx-menu/mx-menu';

describe('mx-time-picker', () => {
  let page;
  let root: HTMLMxTimePickerElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTimePicker, MxMenu, MxMenuItem],
      html: `
        <mx-time-picker
          label="Time"
          el-aria-label="aria label"
          input-id="test-id"
          name="test-name"
          value="16:30"
          assistive-text="Enter a valid time"
          data-test="test"
        />
      `,
    });
    root = page.root;
    input = root.querySelector('input');
  });

  it('renders the label text', async () => {
    const label = root.querySelector('label');
    expect(label.textContent).toBe('Time');
  });

  it('uses a time input by default if supported', async () => {
    expect(input.type).toBe('time');
  });

  it('assigns name, id, and value to the input element', async () => {
    expect(input.getAttribute('name')).toBe('test-name');
    expect(input.getAttribute('id')).toBe('test-id');
    expect(input.value).toBe('16:30');
  });

  it('uses the elAriaLabel prop for the aria-label attribute', async () => {
    expect(input.getAttribute('aria-label')).toBe('aria label');
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
    expect(assitive.textContent).toBe('Enter a valid time');
  });

  it('sets the value when a time is selected from the dropdown menu', async () => {
    const menuItems = root.querySelectorAll('mx-menu-item');
    menuItems[36].click(); // 6:00 PM
    await page.waitForChanges();
    expect(input.value).toBe('18:00');
  });

  it('disables the input and menu button based on the disabled prop', async () => {
    const menuButton = root.querySelector('[data-testid="menu-button"]');
    expect(input.getAttribute('disabled')).toBeNull();
    expect(menuButton.getAttribute('disabled')).toBeNull();
    root.disabled = true;
    await page.waitForChanges();
    expect(input.getAttribute('disabled')).not.toBeNull();
    expect(menuButton.getAttribute('disabled')).not.toBeNull();
  });

  it('renders a floating label if the float-label prop is set', async () => {
    let label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(false);
    root.floatLabel = true;
    await page.waitForChanges();
    label = root.querySelector('label');
    expect(label.classList.contains('floating')).toBe(true);
  });

  it('applies any data attributes to the input element', async () => {
    expect(input.getAttribute('data-test')).toBe('test');
  });
});
