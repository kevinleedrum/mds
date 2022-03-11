let forcedResult = {
  matches: false,
};
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: forcedResult.matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
/** Change the default `matches` so all `min-width` checks evaluate to `true` */
export const mockLargeScreen = () => (forcedResult.matches = true);
