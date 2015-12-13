(function() {
	var count = 0;
	var start = Date.now();
	var frames = [];
	
	var cb = function() {
		count = count + 1;
		var now = Date.now();
		var detect60Fps = function(frames) {
			for(var i = 0;i < frames.length - 10;i++) {
					var framesGt60fps = frames.slice(i,i+10).map(function(x) {
						return x.fps >= 60;
					});
					if(framesGt60fps.filter(function(x) {return !x }).length <= 1) {
						return i + 1;
					}
				}
				return -1;
		}; 
		if(now - start >= 100) {
			frames.push({fps: count * 10, now: now});
			count = 0;
			start = now;
		}
		
		var index = detect60Fps(frames);
		if(index !== -1) {
			var text = ((frames[index].now - performance.timing.navigationStart) / 1000).toString();
			chrome.runtime.sendMessage({text: text});
		}
		else {
			window.requestAnimationFrame(cb);
		}
	}
	cb();
})();