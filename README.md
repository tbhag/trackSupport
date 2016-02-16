# trackSupport
A simple way to map customer service issues to running ab tests

## How does it work?
Track support stores ab test assignments and test pages in localStorage with an id. Once a user contacts customer support, this id can be used to track which tests. You may send the data as you wish. (I recommend sending right when a customer support link is activated). This way, customer service issues can be mapped to running ab tests.

##Usage
Include after file
```javascript
trackSupport.init({
	limit: 20, // number of local storage entries
	tests:[ // can store ab tests from multiple frameworks
		{
			name:"Optimizely", // or whatever framework you're using
			activeTests: optimizely.activeExperiments, // path to tests 
			activeCells: optimizely.variationNamesMap  // path to cells
		},
		{ // extra framework
			name:"Salesforce AB", 
			activeTests: ..., 
			activeCells: ...  
		}
	]
});
```

###Get Data Object
```javascript
trackSupport.emit();
```

###Get UserID
```javascript
trackSupport.user();
```

###Clear Data
```javascript
trackSupport.clear();
```



