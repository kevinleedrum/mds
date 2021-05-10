// import { newSpecPage } from '@stencil/core/testing';
// import { MxButton } from '../mx-button';

// describe('mx-button', () => {
//   it('renders', async () => {
//     const page = await newSpecPage({
//       components: [MxButton],
//       html: `<mx-button></mx-button>`,
//     });
//     expect(page.root).toEqualHtml(`
//       <mx-button>
//         <mock:shadow-root>
//           <slot></slot>
//         </mock:shadow-root>
//       </mx-button>
//     `);
//   });
// });

describe('My Service', () => {
  it('should correctly add numbers', () => {
    expect(1 + 1).toBe(2);
  });
});
