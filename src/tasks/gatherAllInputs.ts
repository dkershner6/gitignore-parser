import { getInput, debug } from '@actions/core';

export interface IInputs {
    path: string;
    includesLines: string[];
    failIfNotFound: boolean;
}

const gatherAllInputs = (inputs?: { [key: string]: string }): IInputs => {
    const pathInput: string = inputs?.path ?? getInput('path');
    debug(`Input - path: ${pathInput}`);

    const includesLinesInput: string =
        inputs?.ignored_includes ?? getInput('ignored_includes');
    debug(`Input - ignored_includes: ${includesLinesInput}`);

    const failIfNotFoundInput: string =
        inputs?.fail_if_not_found ?? getInput('fail_if_not_found');
    debug(`Input - fail_if_not_found: ${failIfNotFoundInput}`);

    const failIfNotFound = failIfNotFoundInput === 'false' ? false : true;

    return {
        path: pathInput ?? '/',
        includesLines: includesLinesInput?.split(',') ?? [],
        failIfNotFound,
    };
};

export default gatherAllInputs;
