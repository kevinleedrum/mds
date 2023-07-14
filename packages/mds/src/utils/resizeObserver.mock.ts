jest.mock('@juggle/resize-observer', () => ({
  ResizeObserver: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));
