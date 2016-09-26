var browserPerf = require('browser-perf');

browserPerf('https://www.google.com', function(err, res) {
    if (err) {
        console.log('[Error]', err);
    } else {
        console.log('Result ok!');
	//console.log(JSON.stringify(res));
	console.log(generateTable(res));
    }
}, {
    //selenium: "http://192.168.0.18:4444/wd/hub",
    selenium: "http://10.87.30.246:4444/wd/hub",
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
        return browser.elementByCssSelector("#lst-ib")
        .then(function(el) {
            //console.log(JSON.stringify(el, null, 2));
            //console.log(el);
	    return el.type("sap");
        }).then(function() {
	    return browser.elementByCssSelector("button[name='btnG']");
	}).then(function(el) {
	    return el.click();
	}).catch(function(err) {
            console.log(err);
        });
    }
]
});

function generateTable(data) {
	var cliTable = require('cli-table');
	var Docs = require('browser-perf/docs');

	var MAX_IMPORTANCE = 30; 

	var apiDocs = new Docs();
	var decimalPoints = {
		ms: 3,
		count: 0,
		fps: 3,
		percentage: 2,
	}

	var res = [];
	for (var i = 0; i < data.length; i++) {
		res.push('\n\nBrowser: ', data[i]._browserName + '\n');
		var table = new cliTable({
			head: ['Metrics', 'Value', 'Unit', 'Source'],
			colAligns: ['right', 'right', 'left', 'right'],
			colWidths: [35, 20, 10, 15]
		});
		for (var key in data[i]) {
			if (key.indexOf('_') === 0)
				continue;
			if ((apiDocs.getProp(key, 'importance') || 0) < MAX_IMPORTANCE)
				continue;

			var val = data[i][key];
			var unit = '' + (apiDocs.getProp(key, 'unit') || '');
			if (typeof val === 'number') {
				if (typeof decimalPoints[unit] !== 'undefined') {
					val = val.toFixed(decimalPoints[unit]);
				} else {
					val = val + '';
				}
			}

			table.push([key, val + '', unit, '' + (apiDocs.getProp(key, 'source') || '')]);
		}
		table = table.sort(function(a, b) {
			var rankA = apiDocs.getProp(a[0], 'importance') || -1;
			var rankB = apiDocs.getProp(b[0], 'importance') || -1;

			if (rankA === rankB) {
				if (a[3] === b[3]) {
					return a[0] > b[0] ? 1 : -1;
				} else {
					return a[3] > b[3] ? 1 : -1;
				}
			} else {
				return rankA > rankB ? 1 : (rankA < rankB ? -1 : 0);
			}
		})
		res.push(table.toString());
	}
	return res.join('');
}

