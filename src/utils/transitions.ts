import { queryPrefersReducedMotion } from './utils';

export type TransitionOptions = {
  /** Property to animate */
  property: string;
  startValue: string;
  endValue: string;
  timing: string;
};

export enum Direction {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

const FADE_IN: TransitionOptions = {
  property: 'opacity',
  startValue: '0',
  endValue: '1',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const FADE_OUT: TransitionOptions = {
  property: 'opacity',
  startValue: '1',
  endValue: '0',
  timing: 'ease',
};

const SCALE_IN: TransitionOptions = {
  property: 'transform',
  startValue: 'scale(0.8)',
  endValue: 'scale(1)',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const getSlideOptions = (direction: Direction, isSlidingIn = true): TransitionOptions => {
  const translate = [0, 0, 0];
  let translatePercent = 100;
  if ([Direction.top, Direction.left].includes(direction)) translatePercent *= -1;
  let translateCoordsIndex = 0; // translate X
  if ([Direction.top, Direction.bottom].includes(direction)) translateCoordsIndex = 1; // translate Y
  translate[translateCoordsIndex] = translatePercent;
  const translateString = translate.map(p => (p === 0 ? p : p + '%')).join(', ');
  return {
    property: 'transform',
    startValue: `translate3d(${isSlidingIn ? translateString : '0, 0, 0'})`,
    endValue: `translate3d(${!isSlidingIn ? translateString : '0, 0, 0'})`,
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
};

export const fadeIn = (el: HTMLElement, duration = 180) => {
  return executeTransition(el, [FADE_IN], duration);
};

export const fadeOut = (el: HTMLElement, duration = 150) => {
  return executeTransition(el, [FADE_OUT], duration);
};

/** Fade in and scale from 80% to 100% (Material Fade) */
export const fadeScaleIn = (el: HTMLElement, duration = 150, transformOrigin?: string) => {
  return executeTransition(el, [FADE_IN, SCALE_IN], duration, transformOrigin);
};

/** Fade and slide in */
export const fadeSlideIn = (el: HTMLElement, duration = 250, fromDirection = Direction.right) => {
  return executeTransition(el, [getSlideOptions(fromDirection), FADE_IN], duration);
};

/** Fade and slide out */
export const fadeSlideOut = (el: HTMLElement, duration = 200, toDirection = Direction.right) => {
  return executeTransition(el, [getSlideOptions(toDirection, false), FADE_OUT], duration);
};

/** Slide in */
export const slideIn = (el: HTMLElement, duration = 250, fromDirection: Direction = Direction.top) => {
  return executeTransition(el, [getSlideOptions(fromDirection)], duration);
};

/** Slide out */
export const slideOut = (el: HTMLElement, duration = 200, toDirection: Direction = Direction.top) => {
  return executeTransition(el, [getSlideOptions(toDirection, false)], duration);
};

/** Collapse accordion-style */
export const collapse = async (el: HTMLElement, duration = 150, collapsedHeight = '0'): Promise<void> => {
  el.style.transition = `max-height ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  await new Promise(requestAnimationFrame);
  el.style.maxHeight = el.scrollHeight + 'px';
  await new Promise(requestAnimationFrame);
  el.style.maxHeight = collapsedHeight;
  return new Promise(resolve => setTimeout(resolve, duration));
};

/** Expand accordion-style */
export const expand = async (el: HTMLElement, duration = 150): Promise<void> => {
  el.style.transition = `max-height ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  await new Promise(requestAnimationFrame);
  el.style.maxHeight = el.scrollHeight + 'px';
  return new Promise(resolve =>
    setTimeout(() => {
      el.style.maxHeight = '';
      resolve();
    }, duration),
  );
};

/** Executes a CSS transition on an element using the provided options and
 * Returns a Promise that resolves once the transition has ended. */
function executeTransition(
  el: HTMLElement,
  transitionOptions: TransitionOptions[],
  duration: number,
  transformOrigin?: string,
): Promise<void> {
  return new Promise(async resolve => {
    if (queryPrefersReducedMotion() || typeof jest !== 'undefined') return resolve();
    // Set the start value for each property
    transitionOptions.forEach(transition => {
      setStyleProperty(el, transition.property, transition.startValue);
    });
    if (transformOrigin) el.style.transformOrigin = transformOrigin;
    requestAnimationFrame(() => {
      // After a tick, change each property and start the transition
      if (!el) return;
      el.style.transition = transitionOptions
        .map(transition => {
          return `${transition.property} ${duration}ms ${transition.timing}`;
        })
        .join(', ');
      requestAnimationFrame(() => {
        transitionOptions.forEach(transition => {
          setStyleProperty(el, transition.property, transition.endValue);
        });
      });
    });
    // Resolve once the duration passes (setTimeout is safer than transition events)
    setTimeout(resolve, duration);
  });
}

function setStyleProperty(el: HTMLElement, property, value) {
  if (property !== 'transform') {
    // Set typical style property (e.g. opacity)
    el.style[property] = value;
  } else {
    // For transforms, we do not want to overwrite the entire transform property.
    // Instead, we need to remove any conflicting transform values and then add the new value.
    // First, parse out an array of transforms (e.g. ['translate(532px, 311px)', 'scale(0.8)'])
    const matchTransforms = /\w*\((-?((\d+)|(\d*\.\d+))\w*,\s*)*(-?(\d+)|(\d*\.\d+))\w*\)/gi;
    let transforms = el.style.transform.match(matchTransforms) || [];
    // Parse out the name of our new transform (e.g. 'scale')
    let transformName = /^(\w*)\(/.exec(value)[1];
    // Remove existing transforms with the same name
    transforms = transforms.filter(t => !t.startsWith(transformName));
    // Add our new transform
    transforms.push(value);
    el.style.transform = transforms.join(' ');
  }
}
