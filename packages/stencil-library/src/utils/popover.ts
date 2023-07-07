import { createPopper, Placement, Instance as PopperInstance } from '@popperjs/core';
import { OffsetModifier } from '@popperjs/core/lib/modifiers/offset';
import { FlipModifier } from '@popperjs/core/lib/modifiers/flip';
import { HTMLStencilElement } from '@stencil/core/internal';
import { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';

export type PopoverPlacement = Placement;
export type PopoverInstance = PopperInstance;
export type PopoverOffset = [number, number];

/** Create a popover that is anchored to another element or, if not specified, the body.
 * Returns a Promise that resolves once the popover is rendered and positioned. */
export async function createPopover(
  anchorEl: HTMLElement,
  popoverEl: HTMLStencilElement | HTMLElement,
  placement: PopoverPlacement,
  offset?: PopoverOffset,
): Promise<PopoverInstance> {
  if ('componentOnReady' in popoverEl) await popoverEl.componentOnReady();
  const instance = createPopper(anchorEl, popoverEl, {
    placement,
    modifiers: getModifiers(placement, offset),
    strategy: 'fixed',
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

function getModifiers(placement: PopoverPlacement, offset: PopoverOffset) {
  const modifiers: any[] = [<FlipModifier>(<unknown>{
      name: 'flip',
      options: {
        fallbackPlacements: [getOppositeVariationPlacement(placement), 'auto'],
        boundary: document.body,
      },
    }), <PreventOverflowModifier>(<unknown>{
      name: 'preventOverflow',
      options: {
        padding: { top: 32, bottom: 32 },
        boundary: document.body,
      },
    })];
  if (offset)
    modifiers.push(<OffsetModifier>{
      name: 'offset',
      options: {
        offset, // Apply specified offset
      },
    });
  return modifiers;
}

/** Returns the appropriate transform-origin relative to a PopoverPlacement
 * (e.g. a menu with "bottom-start" placement should scale from the top left) */
export function convertPlacementToOrigin(placement: PopoverPlacement) {
  const origins: { [key in PopoverPlacement]?: string } = {
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
function getOppositeVariationPlacement(placement: PopoverPlacement) {
  return placement.replace(/start|end/g, matched => (matched === 'start' ? 'end' : 'start'));
}
