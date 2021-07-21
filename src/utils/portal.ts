export function moveToPortal(overlayEl) {
  const portal = getPortal();
  portal.appendChild(overlayEl);
}

function getPortal() {
  let portal = document.querySelector('.mds-portal') as HTMLElement;
  if (!portal) {
    portal = document.createElement('div');
    portal.classList.add('mds-portal', 'mds');
    document.body.appendChild(portal);
  }
  return portal;
}
