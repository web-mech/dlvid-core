#dlvid-core 

[![Build Status](https://travis-ci.org/web-mech/dlvid-core.png?branch=master)](https://travis-ci.org/web-mech/dlvid-core)

(Ver. 1.2.0)

A driver for downloading video sources from various sites. A lot of modules have been ported from youtube-dl for use in node without the dependency of python.

##Providers
- Youtube (ytdl-core)
- DailyMotion
- Vimeo
- Veoh

All downloaders are implemented using the deferred interface (Q). These calls return streams that can be piped to any writable stream of choice.

##Usage
  
###Downloading
Downloading a file is simple. Simply pass the url to the extractor of choice and pipe the response to what ever stream you need.
######Classes Exported
 - Dailymotion
 - Vimeo
 - Veoh
 - Yahoo
 - Youtube

#####Example

```
var dlvid = require('dlvid-core').Youtube;

var download = dlvid.download('http://...', { filter: 'mp4', quality: 'highest'});

download.done(function(file){
	file.pipe(fs.createWriteStream('movie.mp4'));
});
```

#####Features
|Provider|ClassName|Options|Codecs|
|------|------|------|------|
|Dailymotion|Dailymotion|n/a|column|
|Vimeo|Vimeo|{type: ['h264', 'hls', 'vp8'], quality: ['hd','sd']}|h264, hls, vp8|
|Veoh|Veoh|{ quality: ['hd', 'sd']}|h264|
|Youtube|Youtube|{filter: 'mp4', quality: [(itag), 'highest', 'lowest']}|'h264'|
|Yahoo|Yahoo|n/a|'h264'|

###Information
If you'd just like to gather information about the file available, you can do that as well.

```
var info = dlvid.info('http://...').done(function(data){
  // do whatever you need to do
});
```

###Testing

```
npm test
```
