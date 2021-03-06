define(function () {

  function volumeProcessor() {
    var self = this,
        audioContext = new AudioContext(),
        volume = 0,
        multiplier = 5,
        callbacks = [];

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }).then(
      gotStream,
      () => {}
    );

    function gotStream(stream) {
      var mediaStreamSource = audioContext.createMediaStreamSource(stream),
          processor = audioContext.createScriptProcessor(512);

      processor.connect(audioContext.destination);
      
      processor.onaudioprocess = onAudioProcess;
      
      mediaStreamSource.connect(processor);
    }

    function onAudioProcess(event) {
      var buf = event.inputBuffer.getChannelData(0),
          bufLength = buf.length,
          currVolume,
          i;

      // square everything and do a root-mean-square
      for (i = 0, sum = 0; i < bufLength; i++) {
        sum += buf[i] * buf[i];
      }

      currVolume = Math.min(1.0, Math.sqrt(sum / bufLength) * multiplier);
      
      volume = Math.max(currVolume, 0.98 * volume);

      callbacks.forEach(function(callback) {
        callback(currVolume, volume);
      });
    }

    self.registerCallback = function(callback) {
      if (typeof callback === 'function') {
        callbacks.push(callback);
      }
    };

    self.getVolume = function() {
      return volume;
    }

    // input as a % 1-100
    // multiplied by 10 and divided by 100%
    self.setSensitivity = function(mul) {
      mul = parseInt(mul);
      if (!isNaN(mul)) {
        multiplier = mul / 10;
      }
    };

    function findAverage(arr) {
      var avg = 0,
          length = arr.length;

      arr.forEach(function(ele) {
        avg += (ele * ele); 
      });

      avg = Math.sqrt(avg / length);
      
      return avg;
    }

    return self;
  }
  
  return new volumeProcessor();
});