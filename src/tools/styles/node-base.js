const path = require('path');

module.exports = {
  inDir: path.join(__dirname, '../../', 'libs', 'styleguide', 'src', 'lib'),

  outDir: path.join(__dirname, '../../', 'libs', 'styleguide', 'docs'),
  assetDir: path.join(
    __dirname,
    '../../',
    'libs',
    'styleguide',
    'src',
    'assets'
  ),
};
