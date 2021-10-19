import { createPopper } from '@popperjs/core';
/** Create a popover that is anchored to another element or, if not specified, the body.
 * Returns a Promise that resolves once the popover is rendered and positioned. */
export async function createPopover(anchorEl, popoverEl, placement, offset) {
  if ('componentOnReady' in popoverEl)
    await popoverEl.componentOnReady();
  const instance = createPopper(anchorEl, popoverEl, {
    placement,
    modifiers: getModifiers(placement, offset),
  });
  return new Promise(resolve => {
    // Wait a frame for the element's width and height to be accurate and then update
    // its placement to ensure it is positioned/centered correctly.
    requestAnimationFrame(() => {
      instance.update();
      resolve(instance);
    });
  });
}
function getModifiers(placement, offset) {
  const modifiers = [
    {
      name: 'flip',
      options: {
        fallbackPlacements: [getOppositeVariationPlacement(placement), 'auto'],
        boundary: document.body,
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: { top: 32, bottom: 32 },
        boundary: document.body,
      },
    },
  ];
  if (offset)
    modifiers.push({
      name: 'offset',
      options: {
        offset, // Apply specified offset
      },
    });
  return modifiers;
}
/** Returns the appropriate transform-origin relative to a PopoverPlacement
 * (e.g. a menu with "bottom-start" placement should scale from the top left) */
export function convertPlacementToOrigin(placement) {
  const origins = {
    'bottom-end': 'top right',
    'bottom-start': 'top left',
    'bottom': 'top',
    'left-end': 'bottom right',
    'left-start': 'top right',
    'left': 'right',
    'right-end': 'bottom left',
    'right-start': 'top left',
    'right': 'left',
    'top-end': 'bottom right',
    'top-start': 'bottom left',
    'top': 'bottom',
  };
  return origins[placement] || 'center';
}
/** Return the opposite placement that is aligned to the same edge of the anchor
 * https://github.com/popperjs/popper-core/blob/master/src/utils/getOppositeVariationPlacement.js */
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, matched => (matched === 'start' ? 'end' : 'start'));
}
