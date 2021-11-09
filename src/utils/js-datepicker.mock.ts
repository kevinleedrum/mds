jest.mock('js-datepicker', () => (inputEl, options) => {
  inputEl.value = options.formatter(inputEl, options.dateSelected);

  return {
    navigate: () => {},
    setDate: () => {},
    calendarContainer: document.createElement('div'),
  };
});
