import { setFailed, info } from "@actions/core";

import filterDeniedAndAccepted from "./tasks/filterDeniedAndAccepted";
import gatherAllInputs from "./tasks/gatherAllInputs";
import parseGitIgnore from "./tasks/parseGitIgnore";
import respond from "./tasks/respond";

export async function run(inputs?: { [key: string]: string }): Promise<void> {
    try {
        info(`GitIngore Parser v2`);
        const { path, mustDeny, mustAccept, failOnError } =
            gatherAllInputs(inputs);

        const gitIgnoreLines = parseGitIgnore(path);

        const { notDenied, notAccepted } = filterDeniedAndAccepted(
            mustDeny,
            mustAccept,
            gitIgnoreLines,
        );

        respond(notDenied, notAccepted, failOnError);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setFailed((error as Error)?.message);
    }
}

void run();
