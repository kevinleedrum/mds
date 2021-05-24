export default function ripple(e: MouseEvent, elem: HTMLElement) {
  let existingRipple = elem.querySelector('.ripple');
  if (existingRipple) existingRipple.remove();

  // Create span element
  let ripple = document.createElement('span');

  // Add ripple class to span
  ripple.classList.add('ripple');

  // Add span to the button
  elem.prepend(ripple);

  // Set the size of the span element
  const diameter = Math.max(elem.clientWidth, elem.clientHeight);
  ripple.style.width = ripple.style.height = diameter + 'px';

  // Position the span element
  const elemOffset = elem.getBoundingClientRect();
  // Center over click coords OR over top left corner if activated by keypress
  const left = Math.max(e.clientX - elemOffset.left, 0);
  const top = Math.max(e.clientY - elemOffset.top, 0);
  ripple.style.left = left - diameter / 2 + 'px';
  ripple.style.top = top - diameter / 2 + 'px';

  // Remove span after 0.3s
  setTimeout(() => {
    ripple.remove();
  }, 300);
}
