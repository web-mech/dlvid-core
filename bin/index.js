var helpText = fs.readFileSync(__dirname + '/../lib/help.txt').toString(),
  docopt = require('docopt').docopt,
  args = docopt(helpText);