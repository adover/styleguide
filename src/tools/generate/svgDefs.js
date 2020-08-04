const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const SVGSpriter = require('svg-sprite');
const svgDir = 'libs/styleguide/src/assets/icons';
const outDir = 'libs/styleguide/src/lib/4_atoms/components/svg-definitions';
const outFile = 'svg-definitions.component.html';
const outSVG = 'libs/styleguide/src/lib/3_generic/icon-definitions.svg';

console.log('------------------------------------------- \r\n');
console.log('WARNING: Youll need to do some formatting to the SVGs \r\n');
console.log('Remove any groups or any wrapping paths which are used to force the viewbox \r\n');
console.log('Ensure all items use a fill instead of a stroke, get the designers to export the outlines only \r\n');
console.log(
	'Test all the icons once you are done! all items use a fill instead of a stroke, get the designers to export the outlines only \r\n'
);
console.log('-------------------------------------------');

const fullPath = (p) => {
	console.log(path.join(process.cwd(), p));
	return path.join(process.cwd(), p);
};

const config = {
	log: null,
	mode: {
		symbol: {
			bust: false,
			dest: fullPath(outDir),
			inline: true,
			example: {
				template: './tools/svg-sprite.html',
			},
		},
	},
};

const pascalCase = (str) =>
	str
		.replace(/([-_][a-z])/gi, ($1) =>
			$1
				.toUpperCase()
				.replace('-', '')
				.replace('_', '')
		)
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ');

let promises = [];
let svgNames = [];

const m = (module.exports = {
	processFile: (dir, filepath, name) =>
		new Promise((resolve, reject) => {
			fs.readFile(filepath, (error, content) => {
				if (error) reject(error);

				// Remove junk placeholders designers use to export from Sketch
				spriter.add(
					filepath,
					`${name}.svg`,
					content
						.toString()
						// .replace(new RegExp(/(<path d="M0)([^"]*)("\s\/>)/), '') Doesnt work but should
						.replace(`<rect id="bounds" x="0" y="0" width="32" height="32"></rect>`, '')
						.replace(`<path d="M0 0h32v32H0z"/>`, '')
						.replace(`<path d="M0 0h64v64H0z" />`, '')
						.replace(/(class=)(".*?")/, '')
						.replace(/(fill=")(.*?)(")/, '$1inherit$3')
						.replace('fill="#535E65"', 'fill="inherit"')
				);

				resolve(`${name} added`);
			});
		}),
	readFiles: (dir) => {
		fs.unlink(fullPath(outSVG), (error) => {
			fs.readdir(dir, (error, fileNames) => {
				if (error) throw error;
				console.log(fileNames);

				// TODO replace all instances of <rect id="bounds" x="0" y="0" width="32" height="32"></rect>

				fileNames.forEach((filename, i) => {
					const name = path.parse(filename).name;
					const ext = path.parse(filename).ext;
					const filepath = path.resolve(dir, filename);

					fs.stat(filepath, function(error, stat) {
						if (error) throw error;

						const isFile = stat.isFile();

						if (isFile && ext === '.svg') {
							promises.push(module.exports.processFile(dir, filepath, name));
							svgNames.push(name);
						}

						if (i === fileNames.length - 1) {
							Promise.all(promises).then((a) => {
								module.exports.generate();
							});

							module.exports.createSVGNameModel();
						}
					});
				});
			});
		});
	},
	createSVGNameModel: () => {
		const indexFile = './libs/styleguide/src/lib/4_atoms/components/svg-definitions/SVGIcon.ts';

		const index = fs.createWriteStream(indexFile, {
			flags: 'w',
		});

		index.write(`/* SVG Icon Names \n\n`);
		index.write(`${svgNames.join('\n')}\n`);
		index.write(`*/\n\n`);

		index.write('export enum SVGIcon {\n');

		svgNames.forEach((n) => {
			index.write(`\t${pascalCase(n)} = '${n}',\n`);
		});

		index.write('}');

		index.end();
	},
	generate: (_) => {
		spriter.compile(function(error, result) {
			// mkdirp.sync(path.dirname(result[mode][resource].path));
			for (var mode in result) {
				console.log(mode);
				for (var resource in result[mode]) {
					if (resource === 'sprite') {
						mkdirp.sync(path.resolve(fullPath(outDir)));
						console.log(`Generated file: ${result[mode][resource].path}`);
						fs.writeFileSync(path.resolve(fullPath(outDir), outFile), result[mode][resource].contents);
					}
				}
			}
		});
	},
});

m.readFiles(fullPath(svgDir));

var spriter = new SVGSpriter(config);
