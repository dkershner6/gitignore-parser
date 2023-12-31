import ignore, { Ignore } from 'ignore';
import fs from 'fs';
import { join } from 'path';

const parseGitIgnore = (path: string): Ignore => {
    const gitIgnoreFile = fs.readFileSync(join(path, '.gitignore'), 'utf8');

    const gitIgnore = ignore().add(gitIgnoreFile);

    return gitIgnore;
};
export default parseGitIgnore;
