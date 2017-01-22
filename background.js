chrome.browserAction.onClicked.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = 500;
  var height = 600;
  
  chrome.windows.create({
    "url": "index.html",
    "type": "popup",
      width: width,
      height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2)
  });
});