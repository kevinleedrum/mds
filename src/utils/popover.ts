// Wrap the parts of the popperjs API we use to make migration easier in the future.
import { createPopper, Placement, Instance as PopperInstance } from '@popperjs/core';
import { HTMLStencilElement } from '@stencil/core/internal';

export type PopoverPlacement = Placement;
export type PopoverInstance = PopperInstance;

/** Create a popover that is anchored to another element or, if not specified, the body.
 * Returns a Promise that resolves once the popover is rendered and positioned. */
export async function createPopover(
  anchorEl: HTMLElement,
  popoverEl: HTMLStencilElement,
  placement: PopoverPlacement,
): Promise<PopperInstance> {
  if (popoverEl.componentOnReady) await popoverEl.componentOnReady();
  const modifiers = [
    {
      name: 'flip', // Change to another placement if there is no room
    },
    {
      name: 'preventOverflow', // Add offset if there is no room
    },
  ];
  const instance = createPopper(anchorEl, popoverEl, {
    placement: placement,
    strategy: 'fixed',
    modifiers,
  });
  return new Promise(resolve => {
    // Wait a frame for element's width and height to be accurante and then update
    // its placement to ensure it is positioned/centered correctly.
    requestAnimationFrame(() => {
      instance.update();
      resolve(instance);
    });
  });
}
