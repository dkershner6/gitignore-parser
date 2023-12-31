import { getInput, debug, error } from "@actions/core";

export interface IInputs {
    path: string;
    mustDeny: string[];
    mustAccept: string[];
    failOnError: boolean;
}

const gatherAllInputs = (inputs?: { [key: string]: string }): IInputs => {
    try {
        const pathInput: string = inputs?.path ?? getInput("path");
        debug(`Input - path: ${pathInput}`);

        const mustDenyInput: string =
            inputs?.must_deny ?? getInput("must_deny") ?? "";
        debug(`Input - must_deny: ${mustDenyInput}`);

        const mustAcceptInput: string =
            inputs?.must_accept ?? getInput("must_accept") ?? "";
        debug(`Input - must_accept: ${mustAcceptInput}`);

        const failOnErrorInput: string =
            inputs?.fail_on_error ?? getInput("fail_on_error");
        debug(`Input - fail_on_error: ${failOnErrorInput}`);

        const failOnError = failOnErrorInput === "false" ? false : true;

        return {
            path: pathInput ?? "/",
            mustDeny: mustDenyInput?.split(",") ?? [],
            mustAccept: mustAcceptInput?.split(",") ?? [],
            failOnError,
        };
    } catch (err) {
        error("There was an error while gathering inputs");
        throw err;
    }
};

export default gatherAllInputs;
