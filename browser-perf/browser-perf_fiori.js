var browserPerf = require('browser-perf');

browserPerf('https://www.sapfioritrial.com/sites', function(err, res) {
    if (err) {
        console.log('[Error]', err);
    } else {
        console.log('Result ok!');
	console.log(JSON.stringify(res));
    }
}, {
    selenium: "http://192.168.0.18:4444/wd/hub",
    browsers: [{
        "browserName": "chrome",
	"debug": true,
        "loggingPrefs": {
            "performance": "ALL"
        }
    }],
    //debugBrowser: "true",
    log: console.log.bind(console),
    actions: [
    function(browser) {
        return browser.elementByCssSelector("#__tile2")
	.then(function(el) {
	    return el.click();
	}).catch(function(err) {
            console.log(err);
        });
    }
]
});

