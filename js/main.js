var checkTime;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
	console.log('init() called');
	var objElem = document.createElement('object');
	var url = "http://itv.mit-xperts.com/hbbtvtest/media/timecode.php/video.mp4";
	//var url = "https://www.w3schools.com/html/mov_bbb.mp4";
	objElem.type = 'application/avplayer';
    
	objElem.style.left = 100 + 'px';
	objElem.style.top = 200 + 'px';
	objElem.style.width = 600 + 'px';
	objElem.style.height = 400 + 'px';
    
	document.body.appendChild(objElem);
	
	webapis.avplay.open(url);
	
	var listener = {
			  onbufferingstart: function() {
			    console.log("Buffering start.");
			  },

			  onbufferingprogress: function(percent) {
			    console.log("Buffering progress data : " + percent);
			  },

			  onbufferingcomplete: function() {
			    console.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
			    console.log("Stream Completed");
			    webapis.avplay.stop();
			  },

			  oncurrentplaytime: function(currentTime) {
			    console.log("Current playtime: " + currentTime);
			  },

			  onerror: function(eventType) {
			    console.log("event type error : " + eventType);
			  },

			  onevent: function(eventType, eventData) {
			    console.log("event type: " + eventType + ", data: " + eventData);
			  },

			  onsubtitlechange: function(duration, text, data3, data4) {
			    console.log("subtitleText: " + text);
			  },
			  ondrmevent: function(drmEvent, drmData) {
			    console.log("DRM callback: " + drmEvent + ", data: " + drmData);
			  }
			};
	webapis.avplay.setListener(listener);
	
	webapis.avplay.setDisplayRect(100,200,600,400);
	webapis.avplay.prepare();
	
	var successCallback = function() {
		  console.log('The media has finished preparing');
		}

	var errorCallback = function() {
	  console.log('The media has failed to prepare');
	}
	webapis.avplay.prepareAsync(successCallback,errorCallback);
	
	webapis.avplay.play();
	
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		console.log("Left arrow for PAUSE");
    		webapis.avplay.pause();
    		break;
    	case 38: //UP arrow
    		console.log("Up arrow for STOP");
    		webapis.avplay.stop();
    		break;
    	case 39: //RIGHT arrow
    		console.log("Right arrow for PLAy");
    		webapis.avplay.play();
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
//    var today = new Date();
//    var h = today.getHours();
//    var m = today.getMinutes();
//    var s = today.getSeconds();
//    m = checkTime(m);
//    s = checkTime(s);
//    document.getElementById('divbutton1').innerHTML='Current time: ' + h + ':' + m + ':' + s;
//    setTimeout(startTime, 10);
}

function checkTime(i) {
    if (i < 10) {
        i='0' + i;
    }
    return i;
}
