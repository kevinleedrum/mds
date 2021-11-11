'use strict';

let previousBodyOverflow = '';
let previousBodyPaddingRight = '';
let isLocked = false;
const DATA_ATTRIBUTE = 'data-lock-body-scroll';
function lockBodyScroll(modalEl) {
  // Add data attribute in order to track open modal elements
  if (modalEl)
    modalEl.setAttribute(DATA_ATTRIBUTE, '');
  if (isLocked)
    return;
  previousBodyOverflow = document.body.style.overflow || '';
  previousBodyPaddingRight = document.body.style.paddingRight || '';
  const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
  const computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
  document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
  document.body.style.overflow = 'hidden';
  isLocked = true;
}
function unlockBodyScroll(modalEl) {
  if (!isLocked)
    return;
  if (modalEl)
    modalEl.removeAttribute(DATA_ATTRIBUTE);
  // If another modal is still open, do not unlock
  if (document.querySelector(`[${DATA_ATTRIBUTE}]`))
    return;
  document.body.style.paddingRight = previousBodyPaddingRight;
  document.body.style.overflow = previousBodyOverflow;
  isLocked = false;
}

exports.lockBodyScroll = lockBodyScroll;
exports.unlockBodyScroll = unlockBodyScroll;
