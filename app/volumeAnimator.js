define(function() {
  
  function volumeAnimator(vp) {
    var self = this,
        volumeProcessor = vp,
        element = document.getElementById('cover'),
        start = 0,
        volume = 0,
        step = 0,
        startHeight = 0,
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

      newHeight = startHeight + ((window.innerHeight * step * Math.min(1.0, (progress / 200))));

      element.style.bottom = newHeight + "px";

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
      element.style.webkitAnimationPlayState = 'paused';
    };

    self.unpause = function() {
      paused = false;
      animationRequestId = window.requestAnimationFrame(self.noiseAnimate);
      element.style.webkitAnimationPlayState = 'running';
    };

    return self;
  }

  return volumeAnimator;
});
