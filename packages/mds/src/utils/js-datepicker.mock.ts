jest.mock('js-datepicker', () => (inputEl, options) => {
  inputEl.value = options.formatter(inputEl, options.dateSelected);

  return {
    /* eslint-disable @typescript-eslint/no-empty-function */
    navigate: () => {},
    setDate: () => {},
    calendarContainer: document.createElement('div'),
  };
});
