var YoutubeExtactor = require('./extractors/youtube'),
  VimeoExtractor = require('./extractors/vimeo'),
  DailymotionExtractor = require('../extractors/dailymotion'),
  config = require('../config/config');

module.exports = {
  Youtube: new YoutubeExtactor(),
  Vimeo: new VimeoExtractor(config),
  Dailymotion: new DailymotionExtractor(config)
};