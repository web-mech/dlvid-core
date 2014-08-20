var YoutubeExtactor = require('./extractors/youtube'),
  VimeoExtractor = require('./extractors/vimeo'),
  DailymotionExtractor = require('./extractors/dailymotion'),
  VeohExtractor = require('./extractors/veoh'),
  VevoExtractor = require('./extractors/vevo'),
  YahooExtractor = require('./extractors/yahoo'),
  config = require('./config/config');

module.exports = {
  Youtube: new YoutubeExtactor(),
  Yahoo: new YahooExtractor(config),
  Vimeo: new VimeoExtractor(config),
  Vevo: new VevoExtractor(config),
  Veoh: new VeohExtractor(config),
  Dailymotion: new DailymotionExtractor(config)
};