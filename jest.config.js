module.exports = {
	testMatch: ['**/*.spec.ts'],
	transform: {
		'^.+\\.(ts|js|html)$': 'ts-jest',
	},
	resolver: '@nrwl/jest/plugins/resolver',
	moduleFileExtensions: ['ts', 'js', 'html', 'json'],
	collectCoverage: true,
	coverageReporters: ['cobertura', 'html'],
	reporters: ['default', ['jest-junit', { outputDirectory: 'reports/test', outputName: `test-${Date.now()}.xml` }]],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.html$',
		},
	},
	modulePathIgnorePatterns: ['<rootDir>/dist'],
	snapshotSerializers: [
		'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
