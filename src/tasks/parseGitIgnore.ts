import * as core from '@actions/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore - No Types
import parse from 'parse-gitignore';
import fs from 'fs';
import { join } from 'path';

const parseGitIgnore = (path: string): Set<string> => {
    const gitIgnoreLines: string[] = parse(
        fs.readFileSync(join(path, '.gitignore'))
    );
    const gitIgnoreLinesAsString = gitIgnoreLines.join(',');
    core.debug(gitIgnoreLinesAsString);
    core.setOutput('gitignored', gitIgnoreLinesAsString);
    return new Set(gitIgnoreLines);
};
export default parseGitIgnore;
