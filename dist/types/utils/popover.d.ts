import { Placement, Instance as PopperInstance } from '@popperjs/core';
import { HTMLStencilElement } from '../stencil-public-runtime';
export declare type PopoverPlacement = Placement;
export declare type PopoverInstance = PopperInstance;
export declare type PopoverOffset = [number, number];
/** Create a popover that is anchored to another element or, if not specified, the body.
 * Returns a Promise that resolves once the popover is rendered and positioned. */
export declare function createPopover(anchorEl: HTMLElement, popoverEl: HTMLStencilElement | HTMLElement, placement: PopoverPlacement, offset?: PopoverOffset): Promise<PopoverInstance>;
/** Returns the appropriate transform-origin relative to a PopoverPlacement
 * (e.g. a menu with "bottom-start" placement should scale from the top left) */
export declare function convertPlacementToOrigin(placement: PopoverPlacement): string;
