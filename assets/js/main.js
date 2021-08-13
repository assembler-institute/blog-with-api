"use strict";

import { toggleDarkMode } from '/assets/js/darkMode.js';
import { fillMainPost, fillLinesSection, fillTinderSection, fillInlineSection } from '/assets/js/posts.js';
import { listeningTinder } from '/assets/js/tinder.js';

/**
 * Initialize the blog
 */
(function initialize() {
  toggleDarkMode();
  fillMainPost();
  fillLinesSection();
  fillTinderSection();
  listeningTinder();
  fillInlineSection();
})()
