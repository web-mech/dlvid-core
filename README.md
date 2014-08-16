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

###Testing

```
npm test
```
