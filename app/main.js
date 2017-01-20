define(function(require) {
  'use strict';

  // entry point
  var volumeProcessor = require('./volumeProcessor'),
      volumeAnimator = new require('./volumeAnimator')(volumeProcessor),
      paused = false,
      pauseButton = document.getElementById('pause-button');

  volumeProcessor.setVolumeMultiplier(5);
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

  pauseButton.addEventListener('click', toggleExecution);
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleExecution();
    }
  });
});