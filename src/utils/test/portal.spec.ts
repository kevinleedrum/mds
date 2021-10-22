import { moveToPortal } from '../portal';

describe('moveToPortal', () => {
  it('creates a portal element', () => {
    moveToPortal(document.createElement('div'));
    expect(document.querySelector('.mds-portal')).not.toBeNull();
  });
  it('only creates one portal if called more than once', () => {
    moveToPortal(document.createElement('div'));
    moveToPortal(document.createElement('div'));
    expect(document.querySelectorAll('.mds-portal').length).toBe(1);
  });
  it('moves the passed element inside the portal', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    moveToPortal(div);
    expect(div.parentElement.classList.contains('mds-portal'));
  });
});
