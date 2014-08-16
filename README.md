#dlvid-core 

[![Build Status](https://travis-ci.org/web-mech/dlvid-core.png?branch=master)](https://travis-ci.org/web-mech/dlvid-core)

(Ver. 1.0.0)

A driver for downloading video sources from various sites.

##Providers
- Youtube (ytdl-core)
- DailyMotion
- Vimeo

All downloaders are implemented using the deferred interface (Q). These calls return streams that can be piped to any writable stream of choice.

##Usage
  
###Downloading
Downloading a file is simple. Simply pass the url to the extractor of choice and pipe the response to what ever stream you need.
#####Youtube

```
var dlvid = require('dlvid-core');

var download = dlvid.youtube.download('http://...', { filter: 'mp4', quality: 'highest'});

download.done(function(file){
	file.pipe(fs.createWriteStream('movie.mp4'));
});
```

#####DailyMotion
```
dlvid.dailymotion.download('http://...').done(function(file){
	file.pipe(fs.createWriteStream('movie.mp4'));
});
```

#####Vimeo
```
download = dlvid.vimeo.download('http://...', { type: 'h264', quality: 'hd'});

download.done(function(file){
	file.pipe(fs.createWriteStream('movie.mp4'));
});
``` 	

###Information
If you'd just like to gather information about the file available, you can do that as well.
```
var info = dlvid.youtube.info('http://...').done(function(data){
  // do whatever you need to do
});
```

###Testing

```
npm test
```
