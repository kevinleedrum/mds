let previousBodyOverflow = '';
let previousBodyPaddingRight = '';
let isLocked = false;

export function lockBodyScroll() {
  if (isLocked) return;
  previousBodyOverflow = document.body.style.overflow || '';
  previousBodyPaddingRight = document.body.style.paddingRight || '';
  const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
  const computedBodyPaddingRight = parseInt(
    window.getComputedStyle(document.body).getPropertyValue('padding-right'),
    10,
  );
  document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
  document.body.style.overflow = 'hidden';
  isLocked = true;
}

export function unlockBodyScroll() {
  if (!isLocked) return;
  document.body.style.paddingRight = previousBodyPaddingRight;
  document.body.style.overflow = previousBodyOverflow;
  isLocked = false;
}
