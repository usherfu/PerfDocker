module.exports = function(cfg) {

	//cfg - the configuration object, args, from caller
	return function(browser){
		//browser is created using wd.promiseRemote()
	    return browser.sleep(cfg || 5000);
    }
}
