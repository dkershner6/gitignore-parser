import { setFailed, info } from '@actions/core';
import gatherAllInputs from './tasks/gatherAllInputs';
import parseGitIgnore from './tasks/parseGitIgnore';
import filterDeniedAndAccepted from './tasks/filterDeniedAndAccepted';
import respond from './tasks/respond';
import packageJson from '../package.json';

export default async function run(inputs?: {
    [key: string]: string;
}): Promise<void> {
    try {
        info(`GitIngore Parser v${packageJson.version}`);
        const { path, mustDeny, mustAccept, failOnError } = gatherAllInputs(
            inputs
        );

        const gitIgnoreLines = parseGitIgnore(path);

        const { notDenied, notAccepted } = filterDeniedAndAccepted(
            mustDeny,
            mustAccept,
            gitIgnoreLines
        );

        respond(notDenied, notAccepted, failOnError);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setFailed(error.message);
    }
}

run();
