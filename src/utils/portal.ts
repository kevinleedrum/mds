export function moveToPortal(overlayEl) {
  const portal = getPortal();
  portal.appendChild(overlayEl);
}

function getPortal() {
  let portal = document.querySelector('.mds-portal') as HTMLElement;
  if (!portal) {
    portal = document.createElement('div');
    portal.classList.add('mds', 'mds-portal');
    portal.style.position = 'relative';
    portal.style.zIndex = '9999';
    document.body.appendChild(portal);
  }
  return portal;
}
