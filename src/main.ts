import * as core from '@actions/core';
import gatherAllInputs from './tasks/gatherAllInputs';
import parseGitIgnore from './tasks/parseGitIgnore';
import filterToNotIncluded from './tasks/filterToNotIncluded';
import respond from './tasks/respond';

export default async function run(inputs?: {
    [key: string]: string;
}): Promise<void> {
    try {
        const { path, includesLines, failIfNotFound } = gatherAllInputs(inputs);

        const gitIgnoreLines = parseGitIgnore(path);

        const linesNotIncluded = filterToNotIncluded(
            includesLines,
            gitIgnoreLines
        );

        respond(linesNotIncluded, failIfNotFound);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
