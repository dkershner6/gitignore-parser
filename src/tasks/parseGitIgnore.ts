import fs from "fs";
import { join } from "path";

import ignore, { Ignore } from "ignore";

const parseGitIgnore = (path: string): Ignore => {
    const gitIgnoreFile = fs.readFileSync(join(path, ".gitignore"), "utf8");

    return ignore().add(gitIgnoreFile);
};
export default parseGitIgnore;
