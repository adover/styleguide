// Copyright https://github.com/ng-bootstrap
import { ensureFileSync, writeFileSync } from 'fs-extra';
import * as glob from 'glob';
import { parseOutApiDocs } from './api-doc';

/**
 * Extracts documentation from all sources to a single TS file
 * used by the demo application
 */

const file: string = 'api-docs.ts';
const fileNames: string[] = glob.sync('styleguide/src/**/*.ts', {
	ignore: ['styleguide/src/**/*.spec.ts'],
});

const json: string = JSON.stringify(parseOutApiDocs(fileNames), null, 2);

ensureFileSync(file);
writeFileSync(file, `const API_DOCS = ${json};\n\nexport default API_DOCS;`);
