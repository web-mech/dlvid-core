var YoutubeExtactor = require('./extractors/youtube'),
  VimeoExtractor = require('./extractors/vimeo'),
  DailymotionExtractor = require('../extractors/dailymotion'),
  VeohExtractor = require('../extractors/veoh'),
  config = require('../config/config');

module.exports = {
  Youtube: new YoutubeExtactor(),
  Vimeo: new VimeoExtractor(config),
  Veoh: new VeohExtractor(config),
  Dailymotion: new DailymotionExtractor(config)
};