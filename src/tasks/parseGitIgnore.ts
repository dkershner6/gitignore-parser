// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - No Types
import parser from 'gitignore-parser';
import fs from 'fs';
import { join } from 'path';

export interface IGitIgnore {
    accepts: (filePathAndName: string) => boolean;
    denies: (filePathAndName: string) => boolean;
}

const parseGitIgnore = (path: string): IGitIgnore => {
    const gitIgnoreFile = fs.readFileSync(join(path, '.gitignore'), 'utf8');

    const gitIgnore: IGitIgnore = parser.compile(gitIgnoreFile);

    return gitIgnore;
};
export default parseGitIgnore;
