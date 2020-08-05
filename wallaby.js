export default function (wallaby) {
	return {
		files: [
			'tsconfig.json',
			'tsconfig.spec.json',
			'jest.config.js',
			'**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
			'!**/*.spec.ts',
			'!dist/**/*.*',
		],

		tests: ['./**/*.spec.ts'],

		debug: true,
		env: {
			type: 'node',
			runner: 'node',
			params: {
				runner: '--max-old-space-size=12288',
			},
		},

		testFramework: 'jest',

		compilers: {
			'**/*.ts?(x)': wallaby.compilers.typeScript({
				module: 'commonjs',
				getCustomTransformers: () => {
					return {
						before: [
							require('jest-preset-angular/build/StripStylesTransformer').factory({
								compilerModule: require('typescript'),
							}),
							require('jest-preset-angular/build/InlineFilesTransformer').factory({
								compilerModule: require('typescript'),
							}),
						],
					};
				},
			}),
			'**/*.html': (file) => ({
				code: require('ts-jest').process(file.content, file.path, {
					globals: {
						'ts-jest': {
							stringifyContentPathRegex: '\\.html$',
						},
					},
				}),
				map: { version: 3, sources: [], names: [], mappings: [] },
				ranges: [],
			}),
		},

		preprocessors: {
			'**/*.js': (file) =>
				require('@babel/core').transform(file.content, {
					sourceMap: true,
					compact: false,
					filename: file.path,
					presets: [require('babel-preset-jest')],
				}),
		},

		setup: function (wallaby) {
			let jestConfig = require('./jest.config');
			delete jestConfig.preset;
			jestConfig = Object.assign(require('jest-preset-angular/jest-preset'), jestConfig);
			jestConfig.transformIgnorePatterns.push('instrumented.*.(jsx?|html)$');
			jestConfig.rootDir = './';
			jestConfig.setupFilesAfterEnv = ['./src/test-setup.ts'];

			jestConfig.transform = { '^.+\\.(ts)$': 'ts-jest' };

			wallaby.testFramework.configure(jestConfig);
		},

		workers: {
			initial: 6,
			regular: 2,
		},

		filesWithNoCoverageCalculated: [
			'**/*.module.ts',
			'**/__testconfigs/*',
			'**/*.config.ts',
			'**/*.settings.ts',
			'index.ts',
			'environment.ts',
			'environment.prod.ts',
			'environment.standalone.ts',
		],
	};
}
