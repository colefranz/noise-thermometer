define(function(require) {
  'use strict';

  // entry point
  var volumeProcessor = require('./volumeProcessor'),
      volumeAnimator = new require('./volumeAnimator'),
      paused = false,
      pauseButton = document.getElementById('pause-button'),
      slider = document.getElementById('volume-slider');

  window.requestAnimationFrame(volumeAnimator.noiseAnimate);

  function toggleExecution(event) {
    if (paused) {
      volumeAnimator.unpause();
      pauseButton.textContent = 'pause';
    } else {
      volumeAnimator.pause();
      pauseButton.textContent = 'paused';
    }

    paused = !paused;
  }

  slider.addEventListener('input', function() {
    volumeProcessor.setVolumeMultiplier(this.value / 100);
  });

  pauseButton.addEventListener('click', toggleExecution);
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleExecution();
    }
  });
});