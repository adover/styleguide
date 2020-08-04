const sassdoc = require('sassdoc');
const fs = require('fs');
const path = require('path');
const { outDir } = require('./node-base');

sassdoc
  .parse('libs/styleguide/src/lib/**/*.scss', { verbose: true })
  .then(function(data) {
    const output = {};

    if (data) {
      data.forEach(
        doc => (output[doc.group] = [...(output[doc.group] || []), doc])
      );
    }

    fs.writeFile(
      path.join(outDir, 'sass-doc.json'),
      JSON.stringify(output),
      err => {
        if (err) {
          return console.log(err);
        }

        console.log(`Sass documentation file saved at ${outDir}sass-doc.json`);
      }
    );
  })
  .catch(function(err) {
    console.log(err);
  });
