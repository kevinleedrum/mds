import { q as queryPrefersReducedMotion } from './utils-18e3dfde.js';

var Direction;
(function (Direction) {
  Direction["top"] = "top";
  Direction["right"] = "right";
  Direction["bottom"] = "bottom";
  Direction["left"] = "left";
})(Direction || (Direction = {}));
const FADE_IN = {
  property: 'opacity',
  startValue: '0',
  endValue: '1',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
const FADE_OUT = {
  property: 'opacity',
  startValue: '1',
  endValue: '0',
  timing: 'ease',
};
const SCALE_IN = {
  property: 'transform',
  startValue: 'scale(0.8)',
  endValue: 'scale(1)',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
const getSlideOptions = (direction, isSlidingIn = true) => {
  const translate = [0, 0, 0];
  let translatePercent = 100;
  if ([Direction.top, Direction.left].includes(direction))
    translatePercent *= -1;
  let translateCoordsIndex = 0; // translate X
  if ([Direction.top, Direction.bottom].includes(direction))
    translateCoordsIndex = 1; // translate Y
  translate[translateCoordsIndex] = translatePercent;
  const translateString = translate.map(p => (p === 0 ? p : p + '%')).join(', ');
  return {
    property: 'transform',
    startValue: `translate3d(${isSlidingIn ? translateString : '0, 0, 0'})`,
    endValue: `translate3d(${!isSlidingIn ? translateString : '0, 0, 0'})`,
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
};
const fadeIn = (el, duration = 180) => {
  return executeTransition(el, [FADE_IN], duration);
};
const fadeOut = (el, duration = 150) => {
  return executeTransition(el, [FADE_OUT], duration);
};
/** Fade in and scale from 80% to 100% (Material Fade) */
const fadeScaleIn = (el, duration = 150, transformOrigin) => {
  return executeTransition(el, [FADE_IN, SCALE_IN], duration, transformOrigin);
};
/** Fade and slide in */
const fadeSlideIn = (el, duration = 250, fromDirection = Direction.right) => {
  return executeTransition(el, [getSlideOptions(fromDirection), FADE_IN], duration);
};
/** Fade and slide out */
const fadeSlideOut = (el, duration = 200, toDirection = Direction.right) => {
  return executeTransition(el, [getSlideOptions(toDirection, false), FADE_OUT], duration);
};
/** Slide in */
const slideIn = (el, duration = 250, fromDirection = Direction.top) => {
  return executeTransition(el, [getSlideOptions(fromDirection)], duration);
};
/** Slide out */
const slideOut = (el, duration = 200, toDirection = Direction.top) => {
  return executeTransition(el, [getSlideOptions(toDirection, false)], duration);
};
/** Collapse accordion-style */
const collapse = async (el, duration = 150, collapsedHeight = '0') => {
  const options = {
    property: 'max-height',
    startValue: el.scrollHeight + 'px',
    endValue: collapsedHeight,
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
  return executeTransition(el, [options], duration);
};
/** Expand accordion-style */
const expand = async (el, duration = 150) => {
  const startValue = el.style.maxHeight || '0';
  // Remove maxHeight temporarily to get an accurate expanded scrollHeight
  el.style.maxHeight = '';
  const expandedHeight = el.scrollHeight;
  const options = {
    property: 'max-height',
    startValue,
    endValue: expandedHeight + 'px',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
  await executeTransition(el, [options], duration);
  el.style.maxHeight = '';
};
/** Executes a CSS transition on an element using the provided options and
 * Returns a Promise that resolves once the transition has ended. */
function executeTransition(el, transitionOptions, duration, transformOrigin) {
  return new Promise(async (resolve) => {
    if (queryPrefersReducedMotion() || typeof jest !== 'undefined')
      return resolve();
    // Set the start value for each property
    transitionOptions.forEach(transition => {
      setStyleProperty(el, transition.property, transition.startValue);
    });
    if (transformOrigin)
      el.style.transformOrigin = transformOrigin;
    await new Promise(requestAnimationFrame);
    el.style.transition = transitionOptions
      .map(transition => {
      return `${transition.property} ${duration}ms ${transition.timing}`;
    })
      .join(', ');
    await new Promise(requestAnimationFrame);
    // After a tick, change each property to start the transition
    if (!el)
      return;
    requestAnimationFrame(() => {
      transitionOptions.forEach(transition => {
        setStyleProperty(el, transition.property, transition.endValue);
      });
    });
    // Resolve once the duration passes (setTimeout is safer than transition events)
    setTimeout(resolve, duration);
  });
}
function setStyleProperty(el, property, value) {
  if (!el)
    return;
  if (property !== 'transform') {
    // Set typical style property (e.g. opacity)
    el.style[property] = value;
  }
  else {
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

export { Direction as D, slideIn as a, fadeOut as b, collapse as c, fadeScaleIn as d, expand as e, fadeIn as f, fadeSlideIn as g, fadeSlideOut as h, slideOut as s };
