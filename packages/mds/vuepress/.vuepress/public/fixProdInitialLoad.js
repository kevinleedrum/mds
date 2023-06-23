document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelector('.content__default');
    if (elem && !elem.classList.contains('theme-default-content')) {
      elem.classList.add('theme-default-content');
    }
  });