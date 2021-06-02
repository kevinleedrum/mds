import { newSpecPage } from '@stencil/core/testing';
import { MxTabContent } from '../mx-tab-content';

describe('mx-tab-content', () => {
  let page;
  let contents: NodeListOf<HTMLMxTabContentElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabContent],
      html: `
      <mx-tab-content index="0">First</mx-tab-content>
      <mx-tab-content index="1">Second</mx-tab-content>
      `,
    });
    contents = page.body.querySelectorAll('mx-tab-content');
  });

  it('does not show any tab content when value is not set', async () => {
    expect(contents[0].getAttribute('class')).toContain('hidden');
    expect(contents[1].getAttribute('class')).toContain('hidden');
  });
  it('displays content when the value matches its index', async () => {
    contents.forEach(content => (content.value = 1));
    await page.waitForChanges();
    expect(contents[0].getAttribute('class')).toContain('hidden');
    expect(contents[1].getAttribute('class')).not.toContain('hidden');
  });
});
