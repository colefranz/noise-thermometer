define(['require'], function(require) {
  
  function volumeAnimator() {
    var self = this,
        volumeProcessor = require('./volumeProcessor'),
        coverLayer = document.getElementById('cover-layer'),
        cover = document.getElementById('cover'),
        start = 0,
        volume = 0,
        startHeight = 0,
        step = 0,
        animationRequestId,
        paused = false;
    
    // animate every 200ms
    self.noiseAnimate = function(timestamp) {
      var progress = timestamp - start,
          temp,
          newHeight;

      if (paused) {
        return;
      }

      newHeight = startHeight + ((100 * step * Math.min(1.0, (progress / 200))));
      cover.style.transform = 'translate(0%, ' + -newHeight + '%)';

      if (progress > 200) {
        startHeight = newHeight;
        start = timestamp;
        temp = volume;
        volume = volumeProcessor.getVolume();
        step = volume - temp;
      }
      animationRequestId = window.requestAnimationFrame(self.noiseAnimate);
    };

    self.pause = function() {
      paused = true;
      window.cancelAnimationFrame(animationRequestId);
      coverLayer.style.webkitAnimationPlayState = 'paused';
    };

    self.unpause = function() {
      paused = false;
      animationRequestId = window.requestAnimationFrame(self.noiseAnimate);
      coverLayer.style.webkitAnimationPlayState = 'running';
    };

    return self;
  }

  return new volumeAnimator();
});
