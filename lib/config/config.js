module.exports = {
  endpoints:{
    'dailymotion': 'http://www.dailymotion.com/embed/video/%s',
    'veoh': 'http://www.veoh.com/api/findByPermalink?permalink=%s',
    'vevo': 'http://videoplayer.vevo.com/VideoService/AuthenticateVideo?isrc=%s',
    'vimeo': 'https://player.vimeo.com/video/%s/config?autoplay=0&byline=0&bypass_privacy=1&context=clip.main&default_to_hd=1&portrait=0&title=0',
    'youtube': 'http://www.youtube.com/get_video_info?video_id=%s',
    'yahoo': 'http://video.query.yahoo.com/v1/public/yql?q=%s&env=prod&format=json'
  }
};