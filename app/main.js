define(function(require) {
  'use strict';

  // entry point
  var volumeProcessor = require('./volumeProcessor'),
      volumeAnimator = new require('./volumeAnimator'),
      paused = false,
      appId = 'noise-thermometer-app',
      pauseButton = document.getElementById('pause-button'),
      slider = document.getElementById('volume-slider'),
      volumeLabel = document.getElementById('volume-label');

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

  function checkLocalStorage() {
    chrome.storage.sync.get(appId + 'sensitivity', function(items) {
      if (items[appId + 'sensitivity']) {
        setSensitivity(items[appId + 'sensitivity']);
      }
    });
  }

  function syncStorage(key, value) {
    var keyValuePair = {};

    keyValuePair[appId + key] = value;
    chrome.storage.sync.set(keyValuePair);
  }

  function setSensitivity(value) {
    volumeLabel.textContent = value + '%';
    volumeProcessor.setSensitivity(value);
    syncStorage('sensitivity', value);
  }

  slider.addEventListener('input', function() {
    setSensitivity(this.value);
  });

  slider.addEventListener('mouseenter', function() {
    this.focus();
  });

  slider.addEventListener('mouseleave', function() {
    this.blur();
  });

  slider.addEventListener('wheel', function(event) {
    this.value = this.value - (event.deltaY / Math.abs(event.deltaY));
    setSensitivity(this.value);
  });

  pauseButton.addEventListener('click', toggleExecution);
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleExecution();
    }
  });


  window.requestAnimationFrame(volumeAnimator.noiseAnimate);
  checkLocalStorage();
});