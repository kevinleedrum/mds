'use strict';

function queryPrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}

exports.queryPrefersReducedMotion = queryPrefersReducedMotion;
