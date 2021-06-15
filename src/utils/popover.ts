// Wrap the parts of the popperjs API we use to make migration easier in the future.
import { createPopper, Placement, Instance as PopperInstance } from '@popperjs/core';

export type PopoverPlacement = Placement;
export type PopoverInstance = PopperInstance;

export function createPopover(anchorEl: HTMLElement, popoverEl: HTMLElement, placement: PopoverPlacement) {
  // Open popover with hidden visibility initially since it may be positioned incorrectly.
  popoverEl.style.visibility = 'hidden';
  const instance = createPopper(anchorEl, popoverEl, {
    placement: placement,
    strategy: 'fixed',
    modifiers: [
      {
        name: 'flip',
      },
    ],
  });
  setTimeout(() => {
    // Now that we are sure the popover is in the DOM, update its positioning and un-hide it.
    instance.update();
    popoverEl.style.visibility = 'visible';
  }, 5);
  return instance;
}
