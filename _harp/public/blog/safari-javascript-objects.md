While working on my Vue.js project, I discovered that objects in Safari behaved differently than Chrome and Firefox.

My server would return an object that looked like this:

```json
"data": {
	"2000":-0.091,
	"2001":-0.1189,
	"2002":-0.221,
	"2003":0.2868,
	"2004":0.1088,
	"2005":0.0491,
	"2006":0.1579,
	"2007":0.0549,
	"2008":-0.37,
	"2009":0.2646,
	"2010":0.1506,
	"2011":0.0211,
	"2012":0.16,
	"2013":0.3239,
	"2015":0.012,
	"2014":0.1369,
	"2016":0.1196
}
```

The problem begins when Safari decides to add additional keys starting from 0. My data object would be keyed from 0 to 2016, ONLY ON SAFARI. So a calculation like the average of the data gets divided by 2017 rather than 17. Or when I am trying to loop through, null values are read from 0 to 1999.

For my use case, rather than relying on `for (var i in data)`, my solution was to specifically read the data of the years 2000 to the current year (minus one).
