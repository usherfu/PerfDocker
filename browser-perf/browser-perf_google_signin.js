var browserPerf = require('browser-perf');
var testWebSitUrl = 'http://www.google.com';
var options = {
    selenium: 'http://192.168.0.18:4444/wd/hub',
    browsers: ['chrome'],
    preScript: function (browser) {
        return browser.get(testWebSitUrl).then(function () {
            console.log('Find sign in in discover');
            return browser.elementByCssSelector('.signin-btn')
        }).then(function (el) {
            console.log('Clicking sign in');
            return el.click();
        });
    }
}
browserPerf(null, function (err, res) {
    // res - array of objects. Metrics for this URL
    if (err) {
        console.log('ERROR: ' + err);
    } else {
        console.log("result ----> ");
        console.log(res);
    }
}, options);
