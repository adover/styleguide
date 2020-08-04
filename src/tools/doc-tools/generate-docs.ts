// Copyright https://github.com/ng-bootstrap
import * as glob from 'glob';
import { ensureFileSync, writeFileSync } from 'fs-extra';
import { parseOutApiDocs } from './api-doc';

/**
 * Extracts documentation from all sources to a single TS file
 * used by the demo application
 */

const file = 'api-docs.ts';
const fileNames = glob.sync('libs/styleguide/src/**/*.ts', {
	ignore: ['libs/styleguide/src/**/*.spec.ts'],
});

const json = JSON.stringify(parseOutApiDocs(fileNames), null, 2);

ensureFileSync(file);
writeFileSync(file, `const API_DOCS = ${json};\n\nexport default API_DOCS;`);
