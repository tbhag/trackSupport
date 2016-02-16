var trackSupport = (function() {
	
	var me = {};
	
	me.emit = function() {
		return this.data;
	};
	
	me.user = function() {
		return this.data.userID;
	};	
	
	me.clear = function() {
		localStorage.removeItem('trackSupport');
		this.data.runningTests = [];
	};
	
	me.init = function(settings) {
		var limit = settings.limit;
		var tests = settings.tests;
		var customID = settings.customUserID;
		if (!localStorage.getItem('trackSupport')) {
			me.data = {
				browser: getBrowser(),
				runningTests: [],
				userID: (customID || generateUserID()),
				time: getTime()
			};
		} else {
			me.data = JSON.parse(localStorage.getItem('trackSupport'));	
		}
		tests.forEach(function(item, index, array) {
			generateTestData(item.name, item.activeTests, item.activeCells, limit);
		});
		localStorage.setItem('trackSupport', JSON.stringify(me.data));
	};
	
	return me;


	function generateTestData(name, activeTests, activeCells, limit) {
		var location = window.location;
		var data = {
			activeTests: activeTests,
			activeCells: activeCells,
			page: location.hostname + location.pathname + location.search,
			time: getTime()
		};
		if (me.data.runningTests.length > limit) {
			data.shift();
		}
		me.data.runningTests.push(data);
	}

	function getTime() {
		var d = new Date();
		return d.getTime();
	}

	function generateUserID() {
		return Math.random().toString(36).substr(2, 5);
	}
	
	function getBrowser() {
		return navigator.userAgent;
	}
	
}());
