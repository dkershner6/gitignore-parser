import * as core from '@actions/core';

export interface IInputs {
    path: string;
    includesLines: string[];
    failIfNotFound: boolean;
}

const gatherAllInputs = (inputs?: { [key: string]: string }): IInputs => {
    const pathInput: string = inputs?.path ?? core.getInput('path');
    core.debug(`Input - path: ${pathInput}`);

    const includesLinesInput: string =
        inputs?.includes_lines ?? core.getInput('includes_lines');
    core.debug(`Input - includes_lines: ${includesLinesInput}`);

    const failIfNotFoundInput: string =
        inputs?.fail_if_not_found ?? core.getInput('fail_if_not_found');
    core.debug(`Input - fail_if_not_found: ${failIfNotFoundInput}`);

    return {
        path: pathInput ?? '/',
        includesLines: includesLinesInput?.split(',') ?? [],
        failIfNotFound: Boolean(failIfNotFoundInput) ?? true
    };
};

export default gatherAllInputs;
