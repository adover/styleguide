/**
 * Export your SASS variables
 * TODO: This spits out a tonne of errors at
 * the moment but gives me what I need so
 * I'm not too fussed. Will need a fix
 * at some point
 */

const exporter = require('sass-export').exporter;
const fs = require('fs');
const path = require('path');
const { inDir, outDir, assetDir } = require('./node-base');

let files = [];
let folders = ['1_settings'];
const folderPaths = folders.map(f => path.join(inDir, f));

const exportSassVars = (
  files,
  folder,
  folderName,
  outDirectory,
  fileName = null
) => {
  const options = {
    inputFiles: [...files.map(f => path.join(folder, f))],
    includePaths: [folder],
  }; // don't forget this is the folder path not the files

  const asObject = exporter(options).getStructured();
  const outFile = fileName
    ? fileName
    : `sass-variables-${folderName.replace('/', '-')}.json`;

  const outPath = path.join(outDirectory, outFile);

  fs.writeFile(outPath, JSON.stringify(asObject), err => {
    if (err) {
      return console.log(err);
    }

    console.log(`Sass variable file saved at ${outPath}`);
  });
};

// Export the main config file which we can import into projects
exportSassVars(
  ['_colors.scss', '_transitions.scss'],
  folderPaths[0],
  folders[0],
  assetDir,
  `sass-config-variables.json`
);

// Export Each FolderPath as it's own file
folderPaths.forEach((folder, i) => {
  fs.readdir(folder, function(err, items) {
    files = items;

    if (!files) {
      console.error('No files');
    }

    exportSassVars(files, folder, folders[i], outDir);
  });
});

// sass -export ./libs/styleguide / src / styles.scss - o./ libs / styleguide / src / lib / sass - variables.json - d \"./libs/styleguide/src/lib/1_settings/,./libs/styleguide/src/lib/,./libs/styleguide/src/, libs/styleguide/src, libs/styleguide,\"
